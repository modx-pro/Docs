---
title: Подключение на сайте
---
# Подключение на сайте

Полный сценарий — [Интеграция на сайт](/components/mxquickview/integration).

1. Подключите `mxQuickView.initialize` один раз в базовом шаблоне. В transport нет ключа `mxquickview.assets_url`: при необходимости создайте вручную.
2. Выберите `modalLibrary`: `native`, `bootstrap` или `fancybox`.
3. Добавьте триггеры `data-mxqv-click` или `data-mxqv-mouseover`.

<!-- MEDIA: Пример триггера на сайте с data-mxqv-click | фронтенд сайта, карточка товара с атрибутом data-mxqv-click -->
4. Укажите режим (`modal`/`selector`) и тип отрисовки (`chunk`/`snippet`/`template`).
5. Проверьте белый список в системных настройках `mxquickview`.
6. Если используете MiniShop3/ms3Variants, проверьте выбор варианта и `add-to-cart` в quick view.

## Библиотеки в поставке

В `assets/components/mxquickview/vendor/` лежат обе библиотеки с файлами `LICENSE` и `THIRD_PARTY.txt`:

| Библиотека | Версия | Файлы |
| --- | --- | --- |
| Bootstrap | 5.3.2 | `vendor/bootstrap/bootstrap.min.css`, `vendor/bootstrap/bootstrap.min.js` |
| Fancybox | 6.1.13 | `vendor/fancybox/fancybox.css`, `vendor/fancybox/fancybox.umd.js` |

Сниппет проверяет существование файла по пути из настроек. Если файл не найден, компонент пробует загрузить из `vendor/`, затем переходит на CDN. CDN используется только как fallback.

В CDN-версии Bootstrap 5.x подключается `bootstrap.min.js` **без Popper**. Локальный файл `vendor/bootstrap/bootstrap.min.js` включает Popper. Выпадающие списки, тултипы и popover требуют отдельного подключения `@popperjs/core`.

::: warning
Fancybox с CDN загружается без закреплённой версии: пакет подставляет адрес `@fancyapps/ui` целиком. Зафиксируйте версию в настройке `mxquickview_fancybox_js`, если важна стабильность.
:::
