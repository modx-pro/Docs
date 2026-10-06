---
title: ISR revalidation
description: meta.revalidate в webhooks для Next.js и Nuxt
---

# ISR revalidation

Теги `meta.revalidate` в webhook помогают сбрасывать кэш headless-фронта после изменений через API mxHeadless.

## Поток

```text
Мутация через API mxHeadless → outbox → worker POST → ваш /api/revalidate → purge кэша Next.js / Nuxt
```

mxHeadless не вызывает фронт синхронно в HTTP-запросе API. Доставка асинхронная через [webhook worker](workers).

## Правки из админки событий не порождают

События возникают только при мутациях через API mxHeadless: `Services\ObjectService` вызывает `Services\MutationHooks::afterMutation()` после create, update и delete. Плагин пакета висит на одном `OnHandleRequest`, слушателей `OnResourceSave` или `OnManagerEvent` в пакете нет.

Практический вывод: сохранение ресурса в админке MODX не инвалидирует ни кэш mxHeadless, ни фронт-кэш. Варианты:

1. Править контент через API mxHeadless.
2. Свой плагин на `OnResourceSave` на стороне сайта, который дёргает ваш `/api/revalidate`.
3. Ручной вызов вашего revalidate-обработчика.

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

## Проверка подписи

Заголовок доставки: `X-MxHeadless-Signature`. Формат пакета: `t=<unix>,v1=<hex>`, где `v1` это HMAC-SHA256 от строки `"{t}.{rawBody}"` секретом подписки. Литерала `sha256=<hex>` пакет не производит.

Подписчик отклоняет запрос, если разбор заголовка не дал оба поля или расхождение с `time()` больше 300 секунд.

## Пример Next.js App Router

`app/api/revalidate/route.ts`:

```typescript
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'crypto';

export async function POST(request: NextRequest) {
  const secret = process.env.MXHEADLESS_WEBHOOK_SECRET ?? '';
  const rawBody = await request.text();
  const header = request.headers.get('x-mxheadless-signature') ?? '';

  if (secret && !verifySignature(secret, rawBody, header)) {
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
  let timestamp: number | null = null;
  let signature: string | null = null;

  for (const part of header.split(',')) {
    const [key, value] = part.trim().split('=');
    if (key === 't') timestamp = Number(value);
    if (key === 'v1') signature = value;
  }

  if (timestamp === null || signature === null) return false;
  if (Math.abs(Date.now() / 1000 - timestamp) > 300) return false;

  const expected = createHmac('sha256', secret)
    .update(`${timestamp}.${body}`)
    .digest('hex');

  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Secret в подписке MODX и в env фронта должны совпадать.

## Подписка

1. Создайте запись в `mxheadless_webhook_subscriptions` через `bin/webhook-subscribe.php`.
2. URL: `https://frontend.example/api/revalidate`
3. Events: точные имена `resources.created,resources.updated,resources.deleted` или `*`
4. Secret общий с фронтом
5. [Worker](workers) в cron каждую минуту

Сравнение событий строгое: подходит только точное имя из списка или литерал `*`. Префиксные шаблоны вроде `resources.*` не поддержаны, подписка с ними не получит ни одного события.

См. также [Webhooks](/components/mxheadless/operations/webhooks) и [Next.js](/components/mxheadless/examples/nextjs).

## Инвалидация кеша mxHeadless

Мутация через API поднимает версии тегов в кеше MODX (namespace `mxheadless/tags`):

- `object:{name}` для всех запросов к этому объекту
- `context:{context_key}` для контента контекста

Версии входят в ключ HTTP-кэша вместе с путём, query и контекстом, поэтому любая мутация через API сбрасывает записи `GET`/`HEAD` этого объекта и контекста. Без мутации запись живёт до `mxheadless_cache_ttl`. Для запросов с credentials кэш приватный и не хранится.
