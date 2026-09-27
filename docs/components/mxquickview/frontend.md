---
title: Подключение на сайте
---
# Подключение на сайте

Полный сценарий — [Интеграция на сайт](/components/mxquickview/integration).

1. Подключите `mxQuickView.initialize` один раз в базовом шаблоне. Ключ `mxquickview.assets_url` в transport нет: при необходимости создайте вручную.
2. Выберите `modalLibrary`: `native`, `bootstrap` или `fancybox`.
3. Добавьте триггеры `data-mxqv-click` или `data-mxqv-mouseover`.
4. Укажите режим (`modal`/`selector`) и тип отрисовки (`chunk`/`snippet`/`template`).
5. Проверьте белый список в системных настройках `mxquickview`.
6. Если используете MiniShop3/ms3Variants, проверьте выбор варианта и `add-to-cart` в quick view.
