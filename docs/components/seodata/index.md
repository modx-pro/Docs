---
title: SeoData
description: SEO-шаблоны заголовков, description и контента для MODX 3 и MiniShop3
repository: https://github.com/adm93rus/SeoData
author: adm93rus
dependencies:
  - VueTools
  - pdoTools
compatibility:
  - modx3
  - php81
  - vue3
  - minishop3
items:
  - text: Быстрый старт
    link: quick-start
  - text: Шаблоны
    link: templates
  - text: Плейсхолдеры
    link: placeholders
  - text: Словоформы
    link: word-forms
  - text: Свои поля
    link: fields
  - text: Индексация
    link: indexing
  - text: Настройки
    link: settings
---

# SeoData

SeoData подставляет SEO-поля страницы по шаблонам Fenom. Одно правило задаёт заголовок, meta-title, description и контент для документа MODX, товара или категории MiniShop3.

| Поле правила | Куда попадает |
| --- | --- |
| Шаблон заголовка страницы | `pagetitle`, тег H1 |
| Шаблон meta-заголовка | `longtitle`, тег `<title>` |
| Шаблон meta-описания | `description` |
| Шаблон контента | `content` |

Пример категории «Яхты»:

```fenom
{$pagetitle} купить в «{$site_name}»{if $page?} {$page}{/if}
```

```fenom
Купить {$pagetitle.acc|lc} в «{$site_name}» от {$price.min} ₽. В наличии {$count} наименований.
```

На витрине это даёт title вроде `Яхты купить в «Название_компании» | Страница 2` и description с ценой и количеством товаров.

Плагин на событии `OnLoadWebDocument` записывает результат в ресурс. Тот же набор полей возвращает сниппет `SeoData`, если плагин выключен.

Компонент продолжает идею [mvtSeoData](https://modstore.pro/packages/other/mvtseodata) для MODX 3: общие правила по родителю и шаблону MODX, свои поля MiniShop3 и TV, словарь словоформ. Админка собрана на [VueTools](https://docs.modx.pro/components/vuetools/) с темой `modx`.

## Панель

Пункт меню **Приложения → SeoData**.

![Вкладка «Инструкция» в панели SeoData](./img/guide.png)

Шесть вкладок:

1. **Общие шаблоны** — правила по типу страницы, родителю и шаблону MODX.
2. **Персональные шаблоны** — одно активное правило на ресурс.
3. **Свои поля** — колонки MiniShop3, опции и TV, которые становятся плейсхолдерами.
4. **Словоформы** — падежи для шаблонов.
5. **Обслуживание** — индекс цен и количества товаров в категориях.
6. **Инструкция** — эта же справка внутри панели.
