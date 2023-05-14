# Возможности Vitepress


::: info 
VitePress плагин, расширающий возможности markdown.  
Мы можем добавить существенно больше красоты и удобства.
:::

Полный, актуальный текст всех возможностей всегда можно посмотреть на https://vitepress.dev/guide/markdown

Рассмотрим подробнее каждую из "Добавок"

## Заголовки-ссылки
Заголовки автоматически становятся ссылками-якорями вида `Docs/guide/vitepress#zagolovkissylki` . 
Текст заголовка автоматически преобразуется в транслит 

### Произвольный анкор 
Назначайте любому из заголовков удобный анкор, вместо сгенерированного автоматически, используя конструкцию `{#my-anchor}`


```markdown
## Обычный заголовок
### Произвольный анкор{#my-anchor}
```

## Таблицы
Генерируйте таблицы в стиле GitHub 

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

[Список всех доступных эмоджи здесь](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json)

## Навигация в любом месте
Генерируется на основе заголовков

#### Пример

```markdown
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

## Уведомдения с заголовками

#### Пример

```markdown

::: info Выведет заголовок "Информация"
This is an info box.
:::

::: tip Выведет заголовок "Подсказка"
This is a tip.
:::

::: warning Выведет заголовок "Внимание"
This is a warning.
:::

::: danger Выведет заголовок "Осторожно"
This is a dangerous warning.
:::

::: details Выведет заголовок "Подробнее"
This is a details block.
:::

```

#### Вывод

::: info Выведет заголовок "Информация"
This is an info box.
:::

::: tip Выведет заголовок "Подсказка"
This is a tip.
:::

::: warning Выведет заголовок "Внимание"
This is a warning.
:::

::: danger Выведет заголовок "Осторожно"
This is a dangerous warning.
:::

::: details Выведет заголовок "Подробнее"
This is a details block.
:::

## Подсветка синтаксиса в блоках кода

VitePress использует [Shiki](https://shiki.matsu.io/) для подсветки синтаксиса вашего кода в блоках markdown, используя цветной текст
Shiki поддерживает довольно широкий диапазон языков программирования.  Все что вам нужно - указать нужный язык сразу после открывающих блок кода кавычек

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
{'!msProducts'|snippet:[
    'parents' => 0,
    'includeThumbs' => '120x90,360x270'
]}
```
````

#### Вывод
```fenom
{'!msProducts'|snippet:[
    'parents' => 0,
    'includeThumbs' => '120x90,360x270'
]}
```

Перечень поддерживаемых языков можно посмотреть [по этой ссылке](https://github.com/shikijs/shiki/blob/main/docs/languages.md#all-languages)

## Подсветка строки внутри кода

#### Пример
````markdown
```fenom{2}
{'!msProducts'|snippet:[
    'parents' => 0,
    'includeThumbs' => '120x90,360x270'
]}
```
````

#### Вывод
```fenom{2}
{'!msProducts'|snippet:[
    'parents' => 0,
    'includeThumbs' => '120x90,360x270'
]}
```


Вдобавок к однострочным выделениям есть и многострочные 
- Диапазон `{5-8}`, `{3-10}`,` {10-17}`
- Перечисление `{4,7,9}`
- Микс `{4,7-13,16,23-27,40}`

#### Пример
````markdown
```fenom{1,3}
{'!msProducts'|snippet:[
    'parents' => 0,
    'includeThumbs' => '120x90,360x270'
]}
```
````

#### Вывод
```fenom{1,3}
{'!msProducts'|snippet:[
    'parents' => 0,
    'includeThumbs' => '120x90,360x270'
]}
```

## Фокусировка
Добавляем комментарий `// [!code focus]` В нужной строке кода, и весь код, кроме указанной строки будет размыт
Также,  вы можете задать номера строк `// [!code focus:<lines>]`.

::: warning 
Между `code` и  `focus`  ОДИН пробел. 
В примерах для корректного вывода добавлен лишний пробел
:::

#### Пример

````markdown
```fenom
{'!msProducts'|snippet:[
    'parents' => 0, // [!code  focus]
    'includeThumbs' => '120x90,360x270'
]}
```
````

#### Вывод

```fenom
{'!msProducts'|snippet:[
    'parents' => 0, // [!code focus]
    'includeThumbs' => '120x90,360x270'
]}
```


## Подсветка различий

Adding the `// [!code --]` or `// [!code ++]` comments on a line will create a diff of that line, while keeping the colors of the codeblock.

Добавляем комментарии `// [!code --]` или `// [!code ++]`  в нужных строках и получаем красивую подсветку разницы

#### Пример

````markdown
```fenom
{'!msProducts'|snippet:[
    'parents' => 0, // [!code  --]
    'parents' => 5, // [!code  ++]
    'includeThumbs' => '120x90,360x270'
]}
```
````

#### Вывод

```fenom
{'!msProducts'|snippet:[
    'parents' => 0, // [!code --]
    'parents' => 5, // [!code ++]
    'includeThumbs' => '120x90,360x270'
]}
```


## Ошибки и предупреждения в блоках кода

Добавляем комментарии  `// [!code warning]` или `// [!code error]` в нужную строку и раскрашиваем ее в указанный цвет.

#### Пример

````markdown
```fenom
{'!msProducts'|snippet:[
    'parents' => 0, // [!code  error]
    'parents' => 5, // [!code  warning]
    'includeThumbs' => '120x90,360x270'
]}
```
````



#### Вывод

```fenom
{'!msProducts'|snippet:[
    'parents' => 0, // [!code error]
    'parents' => 5, // [!code warning]
    'includeThumbs' => '120x90,360x270'
]}
```


## Группы кода

Есть возможность группировать блоки кода вот таким образом:

````markdown
    ::: code-group
    ```modx  
    [[!msProducts?
      &parents=`0`
      &includeThumbs=`120x90,360x270`
    ]]
    ```
    ```fenom
    {'!msProducts'|snippet:[
        'parents' => 0,
        'includeThumbs' => '120x90,360x270'
    ]}
    ```
:::
````

::: code-group
```modx  
[[!msProducts?
  &parents=`0`
  &includeThumbs=`120x90,360x270`
]]
```
```fenom
{'!msProducts'|snippet:[
    'parents' => 0,
    'includeThumbs' => '120x90,360x270'
]}
```
:::
