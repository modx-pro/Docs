---
title: Paywall на страницах
description: Защита ресурсов MODX — плагин content protection, сниппет PremiumAccess, закрытый CTA
---

# Paywall на страницах

Закрытый HTML не попадает в ответ, пока у посетителя нет **активного доступа** к тарифу, указанному в правиле для этой страницы.

## Автоматический paywall (рекомендуется)

Плагин **`premiumaccess_content_protection`**:

| Событие | Действие |
| --- | --- |
| `OnLoadWebDocument` | Подготовка контекста |
| `OnWebPagePrerender` | Проверка доступа → подмена `[[*content]]` |

Включите плагин после установки пакета PremiumAccess.

### Что видит гость

Chunk **`paLockedCta`**: заголовок, сообщение, цена и срок из тарифа, кнопка покупки ([PremiumAccessBuy](../snippets/PremiumAccessBuy) внутри CTA или рядом в chunk).

Кастомный chunk: **`premiumaccess.locked_cta_chunk`**.

### Что видит пользователь с доступом

Полный content ресурса, включая подстановку premium blocks `[[pa-block:uuid]]`.

## Ручной paywall в шаблоне

Если плагин отключён для шаблона или нужен paywall только для части layout:

::: code-group

```fenom
{'!PremiumAccess' | snippet : [
  'content' => $_modx->resource.content,
  'resourceId' => $_modx->resource.id
]}
```

```modx
[[!PremiumAccess?
  &content=`[[*content]]`
  &resourceId=`[[*id]]`
]]
```

:::

Вызов **некэшируемый** (`[[!...]]` / `{'!...' | snippet}`).

## Кнопка «Купить доступ»

::: code-group

```fenom
{'!PremiumAccessBuy' | snippet : ['resourceId' => $_modx->resource.id]}
```

```modx
[[!PremiumAccessBuy? &resourceId=`[[*id]]`]]
```

:::

Chunk **`paBuyButton`** — форма MS3:

```html
<input type="hidden" name="ms3_action" value="cart/add">
<input type="hidden" name="id" value="[[+msProductId]]">
```

Скрипты miniShop3 подключаются автоматически. Проверьте `ms3_cart_page_id` и `ms3_order_page_id`.

## Условные фрагменты (Fenom)

Плагин **`premiumaccess_fenom`** регистрирует модификаторы на `pdoToolsOnFenomInit`.

### TV-поле

::: code-group

```fenom
{if 'protected_body' | pa_access : ['target_type' => 'tv', 'target_identifier' => 'protected_body']}
  {$_modx->resource.protected_body}
{else}
  <p class="pa-locked">Фрагмент доступен после покупки.</p>
  {'!PremiumAccessBuy' | snippet : ['resourceId' => $_modx->resource.id]}
{/if}
```

```modx
[[!PremiumAccessBuy? &resourceId=`[[*id]]`]]
```

:::

Правило с типом `tv` и идентификатором `protected_body` создайте в **Правила**.

### Contact

::: code-group

```fenom
{if 'support@example.com' | pa_access : ['target_type' => 'contact', 'target_identifier' => 'support@example.com']}
  <a href="mailto:support@example.com">support@example.com</a>
{else}
  <span class="pa-locked">Контакт доступен после покупки</span>
{/if}
```

```modx
[[!PremiumAccessBuy? &resourceId=`[[*id]]`]]
```

:::

Правило: тип `contact`, идентификатор `support@example.com`.

### Group

```fenom
{if 3 | pa_access : ['target_type' => 'group', 'target_identifier' => '3']}
  {* контент для группы #3 *}
{/if}
```

Правило на группу (`target_type=group`) открывает все элементы из [группы доступа](../interface/products-and-rules#access-group).

### Category

```fenom
{if 10 | pa_access : ['target_type' => 'category', 'target_identifier' => '10']}
  {* контент категории #10 *}
{/if}
```

Правило на категорию наследуется для дочерних страниц при проверке доступа.

### File

```fenom
{if 'courses/guide.pdf' | pa_access : ['target_type' => 'file', 'target_identifier' => 'courses/guide.pdf']}
  {'!PremiumAccessFile' | snippet : ['file' => 'courses/guide.pdf']}
{else}
  <p class="pa-locked">Файл доступен после покупки.</p>
{/if}
```

### Premium block

```fenom
{if '550e8400-e29b-41d4-a716-446655440000' | pa_access : ['target_type' => 'premium_block', 'target_identifier' => '550e8400-e29b-41d4-a716-446655440000']}
  {* HTML premium block или include *}
{else}
  <p class="pa-locked">Premium block закрыт.</p>
{/if}
```

Маркер `[[pa-block:uuid]]` в content обрабатывает плагин `premiumaccess_content_protection` без Fenom.

### Resource (короткая форма)

```fenom
{if $_modx->resource.id | pa_resource_access}
  {* платный контент *}
{/if}
```

Алиасы: `pasraccess`, `pascaccess`.

Без params `pa_access` на ID ресурса:

```fenom
{if $_modx->resource.id | pa_access}
  {* доступ к текущему resource *}
{/if}
```

## AJAX-проверка

Для SPA или своего JavaScript на витрине:

```text
GET {assets_url}components/premiumaccess/connector.php
  ?action=web/access/check
  &target_type=resource
  &target_identifier=2046
```

Ответ:

```json
{
  "success": true,
  "allowed": false,
  "reason": "premiumaccess_access_denied"
}
```

Событие **`OnPaAccessCheck`** — для логирования проверок без изменения результата.

## Кэширование страниц

Paywall зависит от **текущего** пользователя web-контекста. Некэшируемые сниппеты обязательны.

При кэше HTML (ImageOptimizer и др.):

- Шаблоны `premiumaccess_*` выставляют `imageoptimizer.skip_html_cache`.
- Авторизованным пользователям не отдавайте закэшированный HTML гостя.
- После тестов очистите `core/cache/`.

## Частично открытая страница

1. **Не** ставьте правило на страницу.
2. Вставьте [premium block](../interface/resources-and-blocks#premium-blocks) с маркером `[[pa-block:uuid]]`.
3. Вступление видно всем, блок закрыт отдельным тарифом.

## Чеклист перед запуском

| # | Проверка |
| --- | --- |
| 1 | Правило включено на странице или блоке |
| 2 | `premiumaccess.enabled` = Да |
| 3 | `ms_product_id` заполнен у тарифа |
| 4 | Плагины autoload, order_access, content_protection включены |
| 5 | Плагин miniShop3 включён; `ms3_cart_page_id`, `ms3_order_page_id` |
| 6 | Гость видит закрытый CTA; после оплаты — контент |

## См. также

- [Интеграция — покупка](../integration)
- [PremiumAccess](../snippets/PremiumAccess)
- [CSS закрытого CTA](../frontend)
- [FAQ](../faq)
