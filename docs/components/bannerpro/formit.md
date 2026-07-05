---
title: FormIt
description: "Lead-баннер BannerPro с FormIt: HTML-баннер, click_url и landing с формой"
---

# FormIt

BannerPro не включает FormIt в ядро. Связка «баннер → landing с формой» строится на HTML-баннере, плейсхолдере `click_url` и странице с FormIt.

**Требования:** BannerPro, FormIt, ресурс-лендинг с формой.

## Схема

```text
Баннер (HTML) → клик → учёт клика → landing с FormIt
                      ↳ UTM в URL (опционально, см. [настройки](settings#utm-при-клике))
```

## Шаг 1. Landing с FormIt

Создайте ресурс, например «Заявка с баннера»:

::: code-group

```fenom
{'!FormIt' | snippet : [
  'hooks' => 'email',
  'emailSubject' => 'Заявка с баннера',
  'emailTo' => 'manager@example.com',
  'validate' => 'name:required,email:email:required'
]}
<form method="post">
  <input type="text" name="name" placeholder="Имя" />
  <input type="email" name="email" placeholder="Email" />
  <input type="hidden" name="source" value="bannerpro" />
  <button type="submit">Отправить</button>
</form>
{if $_modx->getPlaceholder('fi.error.name')}
  <p class="error">{$_modx->getPlaceholder('fi.error.name')}</p>
{/if}
{if $_modx->getPlaceholder('fi.error.email')}
  <p class="error">{$_modx->getPlaceholder('fi.error.email')}</p>
{/if}
```

```modx
[[!FormIt?
  &hooks=`email`
  &emailSubject=`Заявка с баннера`
  &emailTo=`manager@example.com`
  &validate=`name:required,email:email:required`
]]
<form method="post">
  <input type="text" name="name" placeholder="Имя" />
  <input type="email" name="email" placeholder="Email" />
  <input type="hidden" name="source" value="bannerpro" />
  <button type="submit">Отправить</button>
</form>
[[+fi.error.name:notempty=`<p class="error">[[+fi.error.name]]</p>`]]
[[+fi.error.email:notempty=`<p class="error">[[+fi.error.email]]</p>`]]
```

:::

## Шаг 2. HTML-баннер в BannerPro

Тип баннера: **HTML**. Чанк `tplHtml`:

::: code-group

```fenom
<div class="bannerpro-lead">
  <p>{$name|escape}</p>
  <a href="{$click_url|escape:'html'}" class="btn">Оставить заявку</a>
</div>
```

```modx
<div class="bannerpro-lead">
  <p>[[+name:htmlent]]</p>
  <a href="[[+click_url:htmlent]]" class="btn">Оставить заявку</a>
</div>
```

:::

URL баннера в админке укажите на ресурс с FormIt. Компонент обернёт HTML в ссылку учёта клика через `click_url`.

## Шаг 3. UTM (опционально)

Включите UTM в [системных настройках](settings#utm-при-клике) или во вкладке **Настройки** админки. Параметры попадут в URL баннера после клика (поле `redirect_url` в webhook и событиях).

## Шаг 4. Вызов сниппета

::: code-group

```fenom
{'!BannerPro' | snippet : [
  'positionName' => 'lead-sidebar',
  'tplHtml' => '@FILE chunks/byad-lead.fenom.tpl',
  'limit' => 1
]}
```

```modx
[[!BannerPro?
  &positionName=`lead-sidebar`
  &tplHtml=`@FILE chunks/byad-lead.fenom.tpl`
  &limit=`1`
]]
```

:::

## Отличие от MS3 attribution

FormIt не создаёт заказ MiniShop3. Для e-commerce смотрите [MiniShop3](minishop3).

## Связанные разделы

- [Интеграция](integration): `click_url`, `sortby`, кэш
- [Системные настройки](settings): UTM, webhook
- [Сниппет BannerPro](snippets/BannerPro): параметры `tplHtml`
