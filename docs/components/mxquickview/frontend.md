---
title: Подключение на сайте
---
# Подключение на сайте

Для полного сценария внедрения используйте [Интеграция на сайт](integration).

Краткий минимум:

1. Подключите `mxQuickView.initialize` один раз в базовом шаблоне.
2. Выберите `modalLibrary`: `native`, `bootstrap` или `fancybox` (по необходимости).
3. Добавьте триггеры `data-mxqv-click` или `data-mxqv-mouseover`.
4. Укажите режим вывода (`modal`/`selector`) и тип рендера (`chunk`/`snippet`/`template`).
5. Проверьте whitelist в системных настройках `mxquickview`.
6. Если используете MiniShop3/ms3Variants, проверьте сценарии выбора варианта и `add-to-cart` в quick view.
