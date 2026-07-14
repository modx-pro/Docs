---
title: Tickets integration
---
# Tickets integration

**Status:** unverified on MODX 3. A current Tickets release for Revolution 3 is not available yet, so runtime checks wait for a compatible release.

The component API is generic: any object with `class_key` + `object_id`. For comments, expect `class_key` = `TicketComment` (or the package FQCN when it ships) and `object` = comment ID. The examples below are the target wiring.

## Reaction block under a comment

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
{'!Reactions' | snippet : [
    'class'  => 'TicketComment',
    'object' => $comment.id,
    'set'    => 'updown',
]}
```

:::

## Likes counter

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
    'object' => $comment.id,
    'format' => '👍 {LIKES}',
]}
```

:::

## Reactions on the ticket itself (resource)

Tickets stores tickets as MODX resources. For reactions on the ticket page:

::: code-group

```modx
[[!Reactions? &set=`github`]]
```

```fenom
{'!Reactions' | snippet : [
    'class'  => 'modResource',
    'object' => $_modx->resource.id,
    'set'    => 'github',
]}
```

:::

## Top comments

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

By rating:

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

## Chunk for top comments

`tpl.top.comment` (MODX placeholders):

```html
<li class="top-comment" data-idx="[[+idx]]">
    <span class="top-comment__likes">[[+likes]] 👍</span>
    <span class="top-comment__rating">rating: [[+rating]]</span>
    <span class="top-comment__id">#[[+object_id]]</span>
</li>
```

Fenom equivalent (`@INLINE` / file):

```html
<li class="top-comment" data-idx="{$idx}">
    <span class="top-comment__likes">{$likes} 👍</span>
    <span class="top-comment__rating">rating: {$rating}</span>
    <span class="top-comment__id">#{$object_id}</span>
</li>
```

To link to a comment, load the `TicketComment` object by `object_id` in a separate snippet or via pdoTools.

## AJAX and context

Tickets comments usually render in the `web` context. The JS widget sends `context` from the data attribute. If comments live in another context, set `context` explicitly.

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
    'object'  => $comment.id,
    'set'     => 'updown',
    'context' => 'web',
]}
```

:::

## Moderation

Ban an IP or user via CLI:

```bash
php core/components/reactions/cli.php ban add --ip=203.0.113.10 --reason=spam --days=7
php core/components/reactions/cli.php ban add --user=42 --reason=abuse
```
