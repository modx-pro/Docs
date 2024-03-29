---
title: msSalePrice
description: Дополнительные цены, зависящие от выбранного количества товара
logo: https://modstore.pro/assets/extras/mssaleprice/logo-lg.png
author: nizart91
modstore: https://modstore.pro/packages/discounts/mssaleprice

dependencies: miniShop2
---

# msSalePrice

Компонент для дополнительных цен товаров, которые будут подставлены для расчета в зависимости от выбранного количества.

## Оптовые цены

На странице продукта доступна вкладка "Оптовые цены". Можно создать/изменить настройки количества/цены продукта.

![Оптовые цены](https://file.modx.pro/files/7/a/0/7a02cd74733318595bf06511e9ffb96f.png)

![Редактирование](https://file.modx.pro/files/a/3/4/a342a53328fcbee4cc9336901e232787.png)

## Сниппет msSalePrice

Предназначен для вывода возможных оптовых цен продукта. Нужно вызвать сниппет

```modx
[[!msSalePrice]]
```

Дефолтный скрипт отслеживает изменение формы продукта и подгружает соответствующие цены, в зависимости от выбранного количества.
Для работы скрипта необходимо добавить следующие классы

- форма товара — `mssaleprice_form`
- цена товара — `mssaleprice-cost-[[*id]]`
- старая цена товара — `mssaleprice-old-cost-[[*id]]`

![Поле количества](https://file.modx.pro/files/9/b/7/9b7cb346817b3e8e8a15075c7cfe31ee.png)
