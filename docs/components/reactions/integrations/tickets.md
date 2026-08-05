---
title: Интеграция с Tickets
---
# Интеграция с Tickets

**Статус:** на MODX 3 не проверено. Актуальный Tickets под Revolution 3 пока недоступен, runtime-проверку отложили до совместимого релиза.

API компонента generic: любой объект с `class_key` + `object_id`. Для комментариев ожидается `class_key` = `TicketComment` (или FQCN пакета, когда он появится) и `object` = ID комментария. Примеры ниже — целевая схема подключения.

## Блок реакций под комментарием

::: code-group

```modx
<div class="comment-body">[[+text]]</div>
[[!Reactions?
    &class=`TicketComment`
    &object=`[[+id]]`
    &set=`updown`
]]
```

```fenom
<div class="comment-body">{$text}</div>
{'!Reactions' | snippet : [
    'class'  => 'TicketComment',
    'object' => $id,
    'set'    => 'updown',
]}
```

:::

## Счётчик лайков

::: code-group

```modx
[[!ReactionsCount?
    &class=`TicketComment`
    &object=`[[+id]]`
    &format=`👍 {LIKES}`
]]
```

```fenom
{'!ReactionsCount' | snippet : [
    'class'  => 'TicketComment',
    'object' => $id,
    'format' => '👍 {LIKES}',
]}
```

:::

## Реакции на сам тикет (ресурс)

Tickets хранит тикеты как ресурсы MODX. Для реакций на страницу тикета:

::: code-group

```modx
[[!Reactions? &set=`github`]]
```

```fenom
{'!Reactions' | snippet : ['set' => 'github']}
```

:::

## Топ комментариев

::: code-group

```modx
[[!TopLiked?
    &class=`TicketComment`
    &period=`week`
    &limit=`5`
    &tpl=`tpl.top.comment`
]]
```

```fenom
{'!TopLiked' | snippet : [
    'class'  => 'TicketComment',
    'period' => 'week',
    'limit'  => 5,
    'tpl'    => 'tpl.top.comment',
]}
```

:::

По рейтингу:

::: code-group

```modx
[[!TopRated?
    &class=`TicketComment`
    &period=`month`
    &limit=`10`
]]
```

```fenom
{'!TopRated' | snippet : [
    'class'  => 'TicketComment',
    'period' => 'month',
    'limit'  => 10,
]}
```

:::

## Чанк для топа комментариев

`tpl.top.comment` (MODX-плейсхолдеры):

```html
<li class="top-comment" data-idx="[[+idx]]">
    <span class="top-comment__likes">[[+likes]] 👍</span>
    <span class="top-comment__rating">рейтинг: [[+rating]]</span>
    <span class="top-comment__id">#[[+object_id]]</span>
</li>
```

Fenom-эквивалент (`@INLINE` / файл):

```html
<li class="top-comment" data-idx="{$idx}">
    <span class="top-comment__likes">{$likes} 👍</span>
    <span class="top-comment__rating">рейтинг: {$rating}</span>
    <span class="top-comment__id">#{$object_id}</span>
</li>
```

Для ссылки на комментарий получите объект `TicketComment` по `object_id` в отдельном сниппете или через pdoTools.

## AJAX и контекст

Комментарии Tickets обычно рендерятся в контексте `web`. JS-виджет передаёт `context` из data-атрибута. Если комментарии в другом контексте, укажите `context` явно.

::: code-group

```modx
[[!Reactions?
    &class=`TicketComment`
    &object=`[[+id]]`
    &set=`updown`
    &context=`web`
]]
```

```fenom
{'!Reactions' | snippet : [
    'class'   => 'TicketComment',
    'object'  => $id,
    'set'     => 'updown',
    'context' => 'web',
]}
```

:::

## Модерация

Заблокируйте IP или пользователя через CLI:

```bash
php core/components/reactions/cli.php ban add --ip=203.0.113.10 --reason=spam --days=7
php core/components/reactions/cli.php ban add --user=42 --reason=abuse
```
