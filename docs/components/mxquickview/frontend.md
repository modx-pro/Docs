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

## Библиотеки в поставке

В `assets/components/mxquickview/vendor/` лежат обе библиотеки с файлами `LICENSE` и `THIRD_PARTY.txt`:

| Библиотека | Версия | Файлы |
| --- | --- | --- |
| Bootstrap | 5.3.2 | `vendor/bootstrap/bootstrap.min.css`, `vendor/bootstrap/bootstrap.min.js` |
| Fancybox | 6.1.13 | `vendor/fancybox/fancybox.css`, `vendor/fancybox/fancybox.umd.js` |

Сниппет подставляет путь из настроек `mxquickview_fancybox_*` и `mxquickview_bootstrap_*` как есть, без проверки существования файла, поэтому CDN не используется. Поиск файла в `vendor/` и переход на CDN (`@fancyapps/ui`, `bootstrap@5.3.2`) срабатывают только при пустом значении настройки.

В CDN-ветке Bootstrap подключается `bootstrap.min.js` без Popper, тогда как bundled-файл содержит его. Выпадающие списки и подсказки Bootstrap в этом случае требуют отдельного подключения Popper.

::: warning
Fancybox с CDN загружается без закреплённой версии: пакет подставляет адрес `@fancyapps/ui` целиком. Зафиксируйте версию в настройке `mxquickview_fancybox_js`, если важна стабильность.
:::
