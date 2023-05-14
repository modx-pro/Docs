---
outline: [0,3]
---
# Возможности Vitepress

::: info
VitePress использует [markdown-it](https://github.com/markdown-it/markdown-it) в качестве парсера который расширает возможности markdown.
Мы можем добавить существенно больше красоты и удобства.
:::

Полный, актуальный текст всех возможностей всегда можно посмотреть на https://vitepress.dev/guide/markdown.

Рассмотрим подробнее каждую из "Добавок"

## Заголовки-ссылки

Заголовки автоматически становятся ссылками-якорями вида `guide/vitepress#zagolovkissylki` .
Текст заголовка автоматически транслитерируется и обрезается до 25-ти символов (без обрезки слов).

### Произвольный анкор
Назначайте любому из заголовков удобный анкор, вместо сгенерированного автоматически, используя конструкцию `{#my-anchor}`.

```markdown
## Обычный заголовок
### Произвольный анкор {#my-anchor}
```

## Таблицы

Генерируйте таблицы в стиле GitHub.

#### Пример

```markdown
| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |
```

#### Вывод

| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |

## Эмоджи

#### Пример
```markdown
:tada: :100:
```

#### Вывод
:tada: :100:

[Список всех доступных эмоджи здесь](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json).

## Вывод оглавления в любом месте

Генерируется на основе заголовков.

#### Пример

```
[[toc]]
```

#### Вывод

[[toc]]

## Красивые уведомления

#### Пример

```markdown
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

#### Вывод

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## Уведомдения с произвольными заголовками

#### Пример

````markdown
::: info Произвольный заголовок
This is an info box.
:::

::: danger Опасно
This is a dangerous warning.
:::

::: details Нажмите для отображения кода
```js
console.log('Привет, VitePress!');
```
:::
````

#### Вывод

::: info Произвольный заголовок
This is an info box.
:::

::: danger Опасно
This is a dangerous warning.
:::

::: details Нажмите для отображения кода
```js
console.log('Привет, VitePress!');
```
:::

## Подсветка синтаксиса в блоках кода

VitePress использует [Shiki](https://shiki.matsu.io/) для подсветки синтаксиса вашего кода в блоках markdown, используя цветной текст
Shiki поддерживает довольно широкий диапазон языков программирования. Все что вам нужно - указать нужный язык сразу после открывающих блок кода кавычек.

#### Пример

````markdown
```modx
[[!msProducts?
  &parents=`0`
  &includeThumbs=`120x90,360x270`
]]
```
````

#### Вывод

```modx
[[!msProducts?
  &parents=`0`
  &includeThumbs=`120x90,360x270`
]]
```

#### Пример

````markdown
```fenom
{'!msProducts' | snippet : [
  'parents' => 0,
  'includeThumbs' => '120x90,360x270',
]}
```
````

#### Вывод

```fenom
{'!msProducts' | snippet : [
  'parents' => 0,
  'includeThumbs' => '120x90,360x270',
]}
```

Перечень поддерживаемых языков можно посмотреть [по этой ссылке](https://github.com/shikijs/shiki/blob/main/docs/languages.md#all-languages).

## Подсветка строки внутри кода

#### Пример

````markdown
```fenom{2}
{'!msProducts' | snippet : [
  'parents' => 0,
  'includeThumbs' => '120x90,360x270',
]}
```
````

#### Вывод

```fenom{2}
{'!msProducts' | snippet : [
  'parents' => 0,
  'includeThumbs' => '120x90,360x270',
]}
```

Вдобавок к однострочным выделениям есть и многострочные:

- Диапазон `{5-8}`, `{3-10}`,` {10-17}`
- Перечисление `{4,7,9}`
- Микс `{4,7-13,16,23-27,40}`

#### Пример

````markdown
```fenom{1,3}
{'!msProducts' | snippet : [
  'parents' => 0,
  'includeThumbs' => '120x90,360x270',
]}
```
````

#### Вывод

```fenom{1,3}
{'!msProducts' | snippet : [
  'parents' => 0,
  'includeThumbs' => '120x90,360x270',
]}
```

## Фокусировка

Добавляем комментарий `// [!code focus]` в нужной строке кода, и весь код, кроме указанной строки будет размыт
Также, вы можете задать номера строк `// [!code focus:<lines>]`.

::: warning
Между `code` и `focus` **один** пробел. В примерах для корректного вывода добавлен лишний.
:::

#### Пример

````markdown
```fenom
{'!msProducts' | snippet : [
  'parents' => 0, // [!code  focus]
  'includeThumbs' => '120x90,360x270',
]}
```
````

#### Вывод

```fenom
{'!msProducts' | snippet : [
  'parents' => 0, // [!code focus]
  'includeThumbs' => '120x90,360x270',
]}
```

## Подсветка различий

Добавляем комментарии `// [!code --]` или `// [!code ++]` в нужных строках и получаем красивую подсветку разницы.

#### Пример

````markdown
```fenom
{'!msProducts' | snippet : [
  'parents' => 0, // [!code  --]
  'parents' => 5, // [!code  ++]
  'includeThumbs' => '120x90,360x270',
]}
```
````

#### Вывод

```fenom
{'!msProducts' | snippet : [
  'parents' => 0, // [!code --]
  'parents' => 5, // [!code ++]
  'includeThumbs' => '120x90,360x270',
]}
```

## Ошибки и предупреждения в блоках кода

Добавляем комментарии `// [!code warning]` или `// [!code error]` в нужную строку и раскрашиваем ее в указанный цвет.

#### Пример

````markdown
```fenom
{'!msProducts'|snippet:[
  'parents' => 0, // [!code  error]
  'parents' => 5, // [!code  warning]
  'includeThumbs' => '120x90,360x270',
]}
```
````

#### Вывод

```fenom
{'!msProducts'|snippet:[
  'parents' => 0, // [!code error]
  'parents' => 5, // [!code warning]
  'includeThumbs' => '120x90,360x270',
]}
```

## Группы кода

Есть возможность группировать блоки кода вот таким образом:

#### Пример

````markdown
::: code-group

```modx
[[!msProducts?
  &parents=`0`
  &includeThumbs=`120x90,360x270`
]]
```

```fenom
{'!msProducts' | snippet : [
  'parents' => 0,
  'includeThumbs' => '120x90,360x270',
]}
```

:::
````

#### Вывод

::: code-group
```modx
[[!msProducts?
  &parents=`0`
  &includeThumbs=`120x90,360x270`
]]
```
```fenom
{'!msProducts' | snippet : [
  'parents' => 0,
  'includeThumbs' => '120x90,360x270',
]}
```
:::

Вы также можете указать произвольный заголовок каждой вкладке, например для того, чтобы указать названия файлов или чанков.
#### Пример

````markdown
::: code-group

```modx [В шаблоне]
[[!pdoMenu?
  &parents=`0`
  &tplOuter=`MyMenuOuterChunk`
  &tpl=`MyMenuItemChunk`
]]
```

```modx [MyMenuOuterChunk]
<ul [[+classes]]>
  [[+wrapper]]
</ul>
```

```modx [MyMenuItemChunk]
<li [[+classes]]>
  <a href="[[+link]]" [[+attributes]]>
    [[+menutitle]]
  </a>
  [[+wrapper]]
</li>
```

:::
````

#### Вывод

::: code-group

```modx [В шаблоне]
[[!pdoMenu?
  &parents=`0`
  &tplOuter=`MyMenuOuterChunk`
  &tpl=`MyMenuItemChunk`
]]
```

```modx [MyMenuOuterChunk]
<ul [[+classes]]>
  [[+wrapper]]
</ul>
```

```modx [MyMenuItemChunk]
<li [[+classes]]>
  <a href="[[+link]]" [[+attributes]]>
    [[+menutitle]]
  </a>
  [[+wrapper]]
</li>
```

:::
