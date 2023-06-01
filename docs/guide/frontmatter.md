---
outline: [2,3]
lastUpdated: false
---

# Frontmatter - Дополнительные свойства страниц и компонентов

Помимо возможностей, которые дает markdown и vitepress, на нашем проекте предусмотрена и дополнительная разметка страницы с помощью Frontmatter. Для его добавления вам необходимо в начале файла в блоке между `---` тремя символами дефиса написать пары: название свойства и её значение.

Пример:

```markdown
---
title: Заголовок страницы
description: Описание страницы
---
```

## Общие свойства

Ниже список основных свойств которые помогут вам лучше представить читателю вашу документацию.

### Заголовок страницы

- Тип: `string`
- По умолчанию: Первый заголовок в файле

```yaml
title: Это заголовок страницы
```

Также данное свойство отвечает за название вашего компонента, если у вас одностраничная документация, то в том единственном файле, а в случае многостраничной документации в файле `index.md` в корне папки вашего компонента.

### Описание страницы

- Тип: `string`

```yaml
description: Это описание страницы
```

Данное свойство отвечает за содержимое мета-тега description. А в случае с главным файлом компонента еще и за описание в списке компонентов.

### Оглавление

- Тип: `number | [number, number] | 'deep' | false`
- По умолчанию: `2`

```yaml
outline: [2,3]
```

Уровень или уровни заголовков из которых необходимо сгенерировать оглавление.

Вы можете указать конкретный уровень, передав число, или задать диапазон. Есть возможность указать `deep` который эквивалентен значению: `[2, 6]` для того чтобы оглавление сгенерировалось из всех заголовков кроме `h1`. Также можно указать `false` для того, чтобы его скрыть.

Например у данной страницы указано значение: `[2, 3]` и поэтому вы видите оглавление сгенерированное из заголовков второго и третьего уровня.

### Последнее обновление

- Тип: `boolean`
- По умолчанию: `true`

```yaml
lastUpdated: false
```

Отображать ли дату последнего обновления в конце страницы.

### Ссылка на обновление

- Тип: `boolean`
- По умолчанию: `true`

```yaml
editLink: false
```

Отображать ли ссылку на обновление страницы.

## Свойства компонента

В данном разделе представлен список свойств относящихся только к данным компонентов, т.е. они могут быть указаны в файле документации компонента если у вас одностраничная документация (Пример: `ajaxform.md`) или если у вас многостраничная документация, то в файле `index.md` который находится в корне папки вашего компонента (Пример: `minishop2/index.md`).

### Логотип компонента

- Тип: `string`

```yaml
logo: https://modstore.pro/assets/extras/minishop2/logo-lg.png
```

Ссылка на логотип компонента.

### Страница компонента на [modstore.pro]

- Тип: `string`

```yaml
modstore: https://modstore.pro/packages/ecommerce/minishop2
```

Ссылка на страницу компонента в маркетплейсе [modstore.pro].

### Страница компонента на [modx.com]

- Тип: `string`

```yaml
modx: https://modx.com/extras/package/minishop2
```

Ссылка на страницу компонента в официальном репозитории [modx.com].

### Репозиторий исходного кода компонента

- Тип: `string`

```yaml
repository: https://github.com/modx-pro/miniShop2
```

Ссылка на репозиторий исходного кода компонента.

### Автор компонента

- Тип: `string`

```yaml
author: modx-pro
```

Укажите свой логин на [github.com].  В файле по пути `docs/authors.json` хранится объект с данными авторов в нескольких возможных форматах. Если в нём нет вашего аккаунта, то добавьте.

```json
{
  "логин": "Имя автора"
}

// или

{
  "логин": {
    "name": "Имя автора",
    "modstore": "Ссылка на страницу автора в маркетплейсе modstore.pro"
  }
}

// или

{
  "логин": {
    "name": {
      "ru": "Имя автора на русском",
      "en": "Имя автора на английском"
    },
    "modstore": "Ссылка на страницу автора в маркетплейсе modstore.pro"
  }
}
```

### Меню компонента

- Тип: `SidebarItem[]`

```yaml
items: [
  {
    text: 'Сниппеты',
    items: [
      { text: 'pdoResources', link: 'snippets/pdoresources' },
      { text: 'pdoMenu', link: 'snippets/pdomenu' },
      { text: 'pdoPage', link: 'snippets/pdopage' },
    ],
  },
  {
    text: 'Классы',
    link: 'classes/',
    items: [
      { text: 'pdoTools', link: 'classes/pdotools' },
      { text: 'pdoFetch', link: 'classes/pdofetch' },
      { text: 'pdoParser', link: 'classes/pdoparser' },
    ],
  },
  { text: 'Общие параметры', link: 'general-properties' },
  { text: 'Файловые элементы', link: 'file-elements' },
  { text: 'Парсер', link: 'parser' },
]

// или

items:
  - text: Сниппеты
    items:
      - text: pdoResources
        link: snippets/pdoresources
      - text: pdoMenu
        link: snippets/pdomenu
      - text: pdoPage
        link: snippets/pdopage
  - text: Классы
    link: classes/
    items:
      - text: pdoTools
        link: classes/pdotools
      - text: pdoFetch
        link: classes/pdofetch
      - text: pdoParser
        link: classes/pdoparser
  - text: Общие параметры
    link: general-properties
  - text: Файловые элементы
    link: file-elements
  - text: Парсер
    link: parser
```

Данное свойство отвечает за меню документации вашего компонента. Ссылки нужно указывать относительно корня вашей папки и соответственно без `.md`.

```ts
interface SidebarItem {
  /**
   * Текст пункта меню.
   */
  text?: string

  /**
   * Ссылка на пункт меню.
   */
  link?: string

  /**
   * Список вложенных пунктов.
   */
  items?: SidebarItem[]
}
```

[modstore.pro]: https://modstore.pro
[modx.com]: https://modx.com/extras
[github.com]: https://github.com
