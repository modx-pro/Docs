---
title: msMCD
description: Динамическое обновление мини-корзины miniShop2
logo: https://modstore.pro/assets/extras/msminicartdynamic/logo-lg.png
author: marabar
modstore: https://modstore.pro/packages/integration/msminicartdynamic
repository: https://github.com/Marabar/msMiniCartDynamic

dependencies: miniShop2
---

# Компонент msMCD (mini cart dynamic) для miniShop2

Компонент msMCD (mini cart dynamic) для miniShop2 — это рефакторинг старого компонента msMiniCartDynamic с рядом улучшений и предназначен для обновления мини корзины на лету — динамически. msMiniCartDynamic поддерживаться больше не будет.

Теперь не нужно самостоятельно добавлять скрипты на страницу, msMCD делает это сам. Все чанки переписаны на Fenom и Bootstrap4.

## Возможности msMCD

- Динамическое обновление мини-корзины
- Добавление товара в корзину как кнопкой, так и ручным вводом, а также кнопками -/+. Опционально
- Анимация добавления товара (полёт картинки). Опционально
- Возможность выбора полей для передачи в мини-корзину. Опционально
- Удаление выбранного товара
- Работа с разными контекстами

## Сниппет msMCDMiniCart

Сниппет msMCDMiniCart — выводит текущую мини-корзину

После установки компонента, вместо стандартного сниппета `msMiniCart` воспользуйтесь `msMCDMiniCart`, который идёт с компонентом msMCD.

```fenom
{'!msMCDMiniCart' | snippet: [
  'img' => '50x50',
]}
```

### Параметры msMCDMiniCart

- `tpl` — `[msMCDMiniCartRowTpl]`, чанк для каждого результата
- `tplOuter` — `[msMCDMiniCartOuterTpl]`, чанк обёртка
- `jsUrl` — путь до файла со скриптами
- `img` — картинка товара. Указывается так же как и в источнике файлов, например: 50x50

## Вывод товаров

В комплекте с msMCDM идут идут два примера чанков для вывода товаров: `msMCDProductsRowTpl` и `msMCDProductsRowInputTpl`. Например для добавления товара в корзину кнопкой, вызов сниппета `msProducts` будет таким:

```fenom
{'!msProducts' | snippet: [
  'tpl' => 'msMCDProductsRowTpl',
]}
```

Соответственно для добавления товара кнопками/ручным вводом таким:

```fenom
{'!msProducts' | snippet: [
  'tpl' => 'msMCDProductsRowInputTpl',
]}
```

Эти чанки служат только для примера, и обратите внимание, что картинка товара находится в теге form. Это необходимо для анимации добавления товара (полёт картинки).

## Сниппет msMCDCount

Сниппет `msMCDCount` — для добавления товара, вместо кнопки выводит инпут с `-/+`.
Вызов этого сниппета прописан в чанке `msMCDProductsRowInputTpl`.

### Параметры msMCDCount

- `tpl` — `[msMCDCountTpl]`, чанк для вывода инпута
- `jsUrl` — путь до файла со скриптами

## Системные настройки

- `msmcd_fields_mini_cart` — Поля, которые необходимо передать в мини корзину, по умолчанию: `pagetitle`. Доступны все поля объектов:`msProduct(modResource), msProductData, msVendor` В мини-корзине есть всегда: `id, price, count, options, weight, ctx, sum, img`
- `msmcd_animate_mini_cart` — Включает анимацию добавления товара, по умолчанию: выключено.
- `msmcd_dropdown_mini_cart` — Открывать мини-корзину при добавлении товара, по умолчанию: выключено
