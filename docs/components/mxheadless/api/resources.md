---
title: Resources и Pages
description: CRUD ресурсов MODX и выборка страницы по URI через mxHeadless
---

# Resources и Pages

## Resources

| Метод | Path | Публичное чтение | Scope | Успех |
| --- | --- | --- | --- | --- |
| GET | `/resources` | да | `resources.read` | `200` |
| GET | `/resources/{id}` | да | `resources.read` | `200` |
| POST | `/resources` | - | `resources.create` | `201` |
| PUT / PATCH | `/resources/{id}` | - | `resources.update` | `200` |
| DELETE | `/resources/{id}` | - | `resources.delete` | `200` |

```bash
curl -s 'https://example.com/api/v1/resources?limit=5&filter[published]=1&fields=id,pagetitle,uri'
```

`PUT` требует все поля из `required` (у `resources` это `pagetitle`), `PATCH` нет. Разбор: [Мутации](mutations).

Удаление по умолчанию мягкое и каскадное: помечает `deleted` ресурс и всех потомков по дереву. `?force=1` удаляет окончательно только строку самого ресурса, потомков не трогает.

::: warning Проверьте ветку перед удалением папки

`DELETE /resources/{id}` без `force` рекурсивно помечает удалёнными всех потомков (`ObjectService::softDeleteResourceTree`), но в ответе возвращает только id запрошенного ресурса. Для headless-клиента это невидимое расширение области действия: после удаления папки из выборки исчезает вся ветка вместе с опубликованными страницами.

Чтобы этого избежать, перевесите нужных потомков на другого родителя (`PATCH` с `parent`) до удаления, либо используйте `?force=1`, который не трогает потомков, но оставляет их с несуществующим `parent`.

:::

Восстановление: `PATCH` с `{"deleted":0}`. Параметр `include_deleted=1` в `update()` не читается, но поиск строки включает soft-deleted, поэтому ресурс восстанавливается и без него. Права: `resources.update`.

## Pages

| Метод | Path | Публичное чтение | Scope |
| --- | --- | --- | --- |
| GET | `/pages/{uri}` | да | `resources.read` |

`{uri}` — путь без ведущего `/`. Слэши в path не кодируйте целиком через `encodeURIComponent`. Сегменты можно кодировать по отдельности. Кодирование `%XX` снимается.

| Запрос | Кандидаты URI |
| --- | --- |
| `/pages/about` | `about`, `about.html`, `about/` |
| `/pages/about.html` | `about.html`, `about` |
| `/pages/blog/post` | `blog/post`, `blog/post.html`, `blog/post/` |
| `/pages/index` | `index.html`, `index`, пустой URI |

В `meta`: `uri` (как в запросе), `resolved_uri` (совпавший URI MODX), `context`.

```bash
curl -s 'https://example.com/api/v1/pages/about' \
  -H 'X-Context: web'
```

## Query

Параметры: [Запросы](querying): `filter`, `sort`, `fields`, `limit`/`offset`/`page`, `include`.

## TV, media и связи

Значения TV на ресурсе: `?tv_fields=name1,name2`, `?include_tv=1` или `include=tvs` (без списка — все TV). Определения TV: `GET /tvs`, не поля `resources`. Связи ресурса: `include=parent,children`. Подробности в `/schema`.

Резолвер media sources (`MediaUrlResolver`) срабатывает только на поля с именами `image`, `thumbnail`, `photo`, `avatar`, `file`, `media`. У `resources` таких полей в определении нет, поэтому значения в `content`, `introtext` или TV пакет не преобразует: относительные пути остаются как есть, абсолютные `http://` и `https://` не меняются. Правило работает для extras-объектов, которые сами объявят поле с одним из этих имён.
