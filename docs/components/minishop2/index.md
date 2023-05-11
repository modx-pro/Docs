---
name: miniShop2
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
# miniShop2

Самый гибкий и быстрый компонент интернет-магазина для MODX Revolution.

![](https://file.modx.pro/files/b/c/f/bcfbd29cf5841b32268b499918a39e86.png)

Компонент расширяет родные ресурсы MODX, в том числе, получая возможность использовать стандартное взаимодействие со страницами MODX, права доступа, процессоры, функционал создания и редактирования страниц.

Вы получаете два новых типа ресурсов:

## Категория товаров

![](https://file.modx.pro/files/0/7/e/07ebf3fae30d22d1010ee9d817466b0e.png)

## Страница товара

![](https://file.modx.pro/files/1/6/3/1630ce8451bd182c60749cc824a8c80e.png)

Страницы кастомизируются. То есть, в настройках miniShop можно указать где и какие поля отображать, что в таблице товаров категории, что в странице редактирования самого товара

Вкладки товара и таблица категории запоминают своё состояние. Вы можете нажимать F5, ходить туда-сюда, они будут вам усердно помогать.

Переосмыслены старые привычные кнопки справа вверху, теперь там есть быстрый переход по соседним ресурсам быстрое удаление\публикация товара. Иконки на кнопках — glyphicons из Bootstrap.

Работа с мультикатегориями в miniShop сделана в виде дерева — так гораздо удобнее.

![](https://file.modx.pro/files/4/b/b/4bb6f97595cacc72fb73e51f51e4e263.png)

Товарам заложено определенное количество параметров различных типов. Есть возможность добавлять поля, используя специальные плагины и компоненты.

![](https://file.modx.pro/files/a/7/c/a7caf8816b9975d414c6b32dbcf38dbf.png)

### Галерея товара

miniShop2 использует собственную систему управления изображениями товаров.

![](https://file.modx.pro/files/4/c/e/4ce58fdd74b771db28969aba8975ab11.png)

- Html5 загрузчик через drag-n-drop.
- Работа через медиа ресурсы MODX.
- Автоматическая генерация эскизов заданных параметров (Размеры, качество, обрезка, приближение).
- Наложение водяных знаков
- Преобразование изображений в заданный формат jpg, png, webp
- Редактирование имени и описания.
- Сортировка перетаскиванием. Первое изображение — основное для товара.

Вы можете указать нужные параметры в настройке источника файлов (для MS2 устанавливается свой, конечно).
При изменении параметров можно перегенерировать превьюшки для всех картинок товара сразу.

## Фронтенд

MiniShop2 использует только свои modx сниппеты, работающие через pdoTools, что даёт нам повышенную скорость и кастомизацию. Вы можете легко переименовать стандартный modx сниппет, поменять под себя его логику и использовать.
Благодаря pdoTools особо напрягаться при переделке не придётся.

В комплекте идут modx сниппеты для вывода картинок, каталога товаров, их опций и корзины.
Описание каждого сниппета и примеры работы смотрите в документации

Все нужные стили и скрипты подключаются автоматически. Первичная настройка интернет-магазина на MODX Revo займёт от силы 10 минут.
