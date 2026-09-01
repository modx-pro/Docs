---
title: ISR revalidation
description: meta.revalidate в webhooks для Next.js и Nuxt
---

# ISR revalidation

Теги `meta.revalidate` в webhook помогают сбрасывать кэш headless-фронта после изменений в MODX.

## Поток

```text
Мутация MODX → outbox → worker POST → ваш /api/revalidate → purge кэша Next.js / Nuxt
```

mxHeadless не вызывает фронт синхронно в HTTP-запросе API. Доставка асинхронная через [webhook worker](workers).

## Формат тегов

Строки в `meta.revalidate`:

| Тег | Когда инвалидировать |
| --- | --- |
| `mxheadless:resources` | Любое изменение ресурса |
| `mxheadless:resources:{id}` | Один ресурс |
| `mxheadless:uri:{path}` | Страница по URI |
| `mxheadless:context:{key}` | Контент контекста |
| `mxheadless:resources:list` | Удаление ресурса (списки) |
| `mxheadless:resources:{parentId}` | Изменение дочернего (меню родителя) |

Сопоставьте теги с путями роутера в handler revalidate.

## Пример Next.js App Router

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

Secret в подписке MODX и в env фронта должны совпадать.

## Подписка

1. Запись в `mxheadless_webhook_subscriptions`
2. URL: `https://frontend.example/api/revalidate`
3. Events: `resources.*` или `*`
4. Secret общий с фронтом
5. [Worker](workers) в cron каждую минуту

См. также [Webhooks](/components/mxheadless/operations/webhooks) и [Next.js](/components/mxheadless/examples/nextjs).
