---
title: mspPaySelectionWidget
description: Оплата заказов miniShop2 через виджет платежного сервиса PaySelection
logo: https://modstore.pro/assets/extras/msppayselectionwidget/logo.png
author: gvozdb
modstore: https://modstore.pro/packages/payment-system/msppayselectionwidget

dependencies: miniShop2
categories: payment
---

# mspPaySelectionWidget

Оплата заказов miniShop2 через виджет платежной системы PaySelection.


## Настройка

1. Установить компонент;

2. Указать данные в системных настройках `ms2_msppsw_widget_public_key` и `ms2_msppsw_widget_site_id`;

3. Прописать вызов сниппета `mspPaySelectionWidget` на странице, где вызывается сниппет `msGetOrder` (обычно это страница корзины). Нам важно, чтобы после оформления заказа, средствами miniShop2 происходил редирект на эту страницу с GET параметром `msorder={id_заказа}`;

4. Прописать в ЛК мерчанта вебхук с примерно такой ссылкой: `https://ваш_домен/assets/components/minishop2/payment/msppayselectionwidget.php`

5. Включить в настройках miniShop2 способ оплаты PaySelection;

6. Проверить платежи тестовыми картами;

7. Обязательно выключить тестовый режим на боевом сайте в системной настройке `ms2_msppsw_test_mode` и в ЛК мерчанта (делается через их техподдержку).

