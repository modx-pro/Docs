# Frontmatter - Дополнительные возможности разметки страниц

Помимо возможностей, которые дает markdown и vitepress, на нашем проекте предусмотрена и дополнительная разметка страницы.
Если вы откроете страницы большинства компонентов, то сможете увидеть виджет, содержащий:

- Логотип компонента
- Ссылку на страницу modstore.pro
- Краткое описание компонента
- Автора
- Ссылку на github автора

Эти возможности реализованы при помощи разметки Frontmatter. Давайте разберемся как устроена такая разметка.

## Формат данных

Блок с данными Frontmatter размещается строго в начале markdown файла.
Выделяется такой блок тройным дефисом сверху и снизу.


```markdown
---
title: miniShop2
description: Самый гибкий и быстрый компонент интернет-магазина для MODX Revolution
logo: https://modstore.pro/assets/extras/minishop2/logo-lg.png
author: modx-pro
modstore: https://modstore.pro/packages/ecommerce/minishop2
modx: https://modx.com/extras/package/minishop2
repository: https://github.com/modx-pro/miniShop2
---

# Тут заголовок страницы

```

Кроме мета данных, необходимых для появления виджета, именно в этом блоке задается перечень страниц для навигации.
Это простой JSON массив из двух параметров: `text, value`

```yaml
items: [
  { text: 'Быстрый старт', link: 'quick-start' },
  { text: 'Системные требования и зависимости', link: 'requirements-and-dependencies' },
  {
    text: 'Интерфейс',
    items: [
      { text: 'Категория', link: 'interface/category' },
      { text: 'Товар', link: 'interface/product' },
      { text: 'Заказы', link: 'interface/orders' },
      { text: 'Настройки', link: 'interface/settings' },
      { text: 'Галерея', link: 'interface/gallery' },
      { text: 'Менеджер задач', link: 'interface/task-manager' },
    ],
  },
  {
    text: 'Сниппеты',
    link: 'snippets/',
    items: [
      { text: 'msProducts', link: 'snippets/msproducts' },
      { text: 'msCart', link: 'snippets/mscart' },
      { text: 'msOrder', link: 'snippets/msorder' },
      { text: 'msMiniCart', link: 'snippets/msminicart' },
      { text: 'msGetOrder', link: 'snippets/msgetorder' },
      { text: 'msGallery', link: 'snippets/msgallery' },
      { text: 'msOptions', link: 'snippets/msoptions' },
      { text: 'msProductOptions', link: 'snippets/msproductoptions' },
    ],
  },
  {
    text: 'Разработка',
    items: [
      { text: 'Плагины товаров', link: 'development/product-plugins' },
      { text: 'Скрипты и стили', link: 'development/scripts-and-styles' },
      { text: 'События', link: 'development/events' },
      {
        text: 'Службы',
        items: [
          { text: 'Корзина', link: 'development/services/cart' },
          { text: 'Заказ', link: 'development/services/order' },
          { text: 'Доставка', link: 'development/services/delivery' },
          { text: 'Оплата', link: 'development/services/payment' },
          { text: 'Подключение', link: 'development/services/connection' },
        ],
      },
    ],
  },
  { text: 'Модули оплаты', link: 'payments' },
  { text: 'Другие дополнения', link: 'modules'},
  {
    text: 'Полезные выборки',
    items: [
      { text: 'Вывод количества товаров в категории', link: 'useful-queries/count-category-products' },
      { text: 'Вывод производителей товаров MS2', link: 'useful-queries/get-vendors' },
      { text: 'Получение id товаров по опции MS2', link: 'useful-queries/get-product-id-by-option' },
      { text: 'Дерево ресурсов', link: 'useful-queries/get-resource-tree' },
      { text: 'Вывод всех категорий товара', link: 'useful-queries/get-categories' },
      { text: 'Выбор товаров по опциям', link: 'useful-queries/get-products-by-options' },
      { text: 'Вывод ссылок на дополнительные категории товара', link: 'useful-queries/get-categories-links' },
    ],
  },
]
```

Как видите - ничего особенного.

В завершнее покажем пример целиком

```markdown
---
title: miniShop2
description: Самый гибкий и быстрый компонент интернет-магазина для MODX Revolution
logo: https://modstore.pro/assets/extras/minishop2/logo-lg.png
author: modx-pro
modstore: https://modstore.pro/packages/ecommerce/minishop2
modx: https://modx.com/extras/package/minishop2
repository: https://github.com/modx-pro/miniShop2

items: [
  { text: 'Быстрый старт', link: 'quick-start' },
  { text: 'Системные требования и зависимости', link: 'requirements-and-dependencies' },
  {
    text: 'Интерфейс',
    items: [
      { text: 'Категория', link: 'interface/category' },
      { text: 'Товар', link: 'interface/product' },
      { text: 'Заказы', link: 'interface/orders' },
      { text: 'Настройки', link: 'interface/settings' },
      { text: 'Галерея', link: 'interface/gallery' },
      { text: 'Менеджер задач', link: 'interface/task-manager' },
    ],
  },
  {
    text: 'Сниппеты',
    link: 'snippets/',
    items: [
      { text: 'msProducts', link: 'snippets/msproducts' },
      { text: 'msCart', link: 'snippets/mscart' },
      { text: 'msOrder', link: 'snippets/msorder' },
      { text: 'msMiniCart', link: 'snippets/msminicart' },
      { text: 'msGetOrder', link: 'snippets/msgetorder' },
      { text: 'msGallery', link: 'snippets/msgallery' },
      { text: 'msOptions', link: 'snippets/msoptions' },
      { text: 'msProductOptions', link: 'snippets/msproductoptions' },
    ],
  },
  {
    text: 'Разработка',
    items: [
      { text: 'Плагины товаров', link: 'development/product-plugins' },
      { text: 'Скрипты и стили', link: 'development/scripts-and-styles' },
      { text: 'События', link: 'development/events' },
      {
        text: 'Службы',
        items: [
          { text: 'Корзина', link: 'development/services/cart' },
          { text: 'Заказ', link: 'development/services/order' },
          { text: 'Доставка', link: 'development/services/delivery' },
          { text: 'Оплата', link: 'development/services/payment' },
          { text: 'Подключение', link: 'development/services/connection' },
        ],
      },
    ],
  },
  { text: 'Модули оплаты', link: 'payments' },
  { text: 'Другие дополнения', link: 'modules'},
  {
    text: 'Полезные выборки',
    items: [
      { text: 'Вывод количества товаров в категории', link: 'useful-queries/count-category-products' },
      { text: 'Вывод производителей товаров MS2', link: 'useful-queries/get-vendors' },
      { text: 'Получение id товаров по опции MS2', link: 'useful-queries/get-product-id-by-option' },
      { text: 'Дерево ресурсов', link: 'useful-queries/get-resource-tree' },
      { text: 'Вывод всех категорий товара', link: 'useful-queries/get-categories' },
      { text: 'Выбор товаров по опциям', link: 'useful-queries/get-products-by-options' },
      { text: 'Вывод ссылок на дополнительные категории товара', link: 'useful-queries/get-categories-links' },
    ],
  },
]
---
```

## Категории и зависимости

В текущей версии документации предусмотрено указание зависимостей для компонентов.

```markdown
---
title: mspPayPal
description: Компонент платежной системы PayPal для minishop2
logo: https://modstore.pro/assets/extras/msppaypal/logo-lg.png
author: modx-pro
modstore: https://modstore.pro/packages/payment-system/msppaypal
repository: https://github.com/modx-pro/PayPal

dependencies: miniShop2
categories: payment
---
```

К примеру для платежных систем, подключаемых к miniShop2 зависимостью является сам miniShop2.
Если указать это на странице платежной системы, то получим дополнительный виджет-уведомление.

Также можно указать категорию компонента. Так мы закладываем будущую реализацию фильтра по категориям.

## Список компонентов категории

Вы всегда можете добавить на страницу нужый вам перечень компонентов, отсортировав их по `dependencies` и `categories`.
В качестве примера можно взглянуть на страницу "Список модулей оплаты" для miniShop2

С виду она довольно объемная, но имеет очень простую разметку

```markdown
# Список модулей оплаты

Ниже представлен список модулей оплаты **miniShop2**:

<DocsComponentsList dependency="miniShop2" category="payment" />
```
