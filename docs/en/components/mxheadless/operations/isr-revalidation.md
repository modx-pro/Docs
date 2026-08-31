---
title: ISR revalidation
description: meta.revalidate in webhooks for Next.js and Nuxt
---

# ISR revalidation

Tags in `meta.revalidate` help invalidate headless frontend cache after MODX changes.

## Flow

```text
MODX mutation → outbox → worker POST → your /api/revalidate → Next.js / Nuxt cache purge
```

mxHeadless does not call the frontend synchronously inside the API HTTP request. Delivery is async via the [webhook worker](workers).

## Tag format

Strings in `meta.revalidate`:

| Tag | Invalidate when |
| --- | --- |
| `mxheadless:resources` | Any resource change |
| `mxheadless:resources:{id}` | One resource |
| `mxheadless:uri:{path}` | Page by URI |
| `mxheadless:context:{key}` | Context content |
| `mxheadless:resources:list` | Resource deleted (lists) |
| `mxheadless:resources:{parentId}` | Child changed (parent menu) |

Map tags to router paths in your revalidate handler.

## Next.js App Router example

`app/api/revalidate/route.ts`:

```typescript
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'crypto';

export async function POST(request: NextRequest) {
  const secret = process.env.MXHEADLESS_WEBHOOK_SECRET ?? '';
  const rawBody = await request.text();
  const signature = request.headers.get('x-mxheadless-signature') ?? '';

  if (secret && !verifySignature(secret, rawBody, signature)) {
    return NextResponse.json({ error: 'invalid signature' }, { status: 401 });
  }

  const event = JSON.parse(rawBody) as {
    type: string;
    meta?: { revalidate?: string[] };
  };

  for (const tag of event.meta?.revalidate ?? []) {
    revalidateTag(tag);
  }

  return NextResponse.json({ revalidated: true, type: event.type });
}

function verifySignature(secret: string, body: string, header: string): boolean {
  const expected = 'sha256=' + createHmac('sha256', secret).update(body).digest('hex');
  const a = Buffer.from(expected);
  const b = Buffer.from(header);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

The subscription secret in MODX and the frontend env must match.

## Subscription

1. Row in `mxheadless_webhook_subscriptions`
2. URL: `https://frontend.example/api/revalidate`
3. Events: `resources.*` or `*`
4. Shared secret with the frontend
5. [Worker](workers) on cron every minute

See also [Webhooks](/components/mxheadless/operations/webhooks) and [Next.js](/components/mxheadless/examples/nextjs).
