---
title: FAQ
description: Типовые проблемы PageBuilder — редактор, права, кеш, Pro и миграция
---
# FAQ

## Редактор «Секции» не появляется

1. Установлен **VueTools** 1.1.2+ и очищен кеш.
2. `pagebuilder_resource_tab_enabled = 1`.
3. Ресурс подходит под `pagebuilder_resource_tab_parents` (или список родителей пуст).
4. У пользователя есть `pagebuilder_view` и политика `view` на ресурс.

Проверьте консоль браузера на ошибки загрузки VueTools.

## На сайте пусто, в менеджере секции есть

- Нажата ли **Опубликовать**? Сниппет читает `published_json`, не черновик.
- В шаблоне `[[!PageBuilder]]` с некэширующим `!`.
- После публикации сбросьте кеш MODX или вызовите с `use_cache=0`.

## Превью черновика не открывается

- Проверьте `pagebuilder_preview_secret` (не пуст после установки).
- URL preview: `{assets_url}components/pagebuilder/preview.php`.
- Пользователь должен иметь `pagebuilder_view`.

## CSS на сайте не тот, что в превью

Превью подключает CSS шаблона (`pagebuilder_preview_include_template_css`) и `pagebuilder_preview_css_urls`. На фронте по умолчанию только `pagebuilder-sections.css`. Подключите стили темы в layout или скопируйте нужные правила.

## Секция Pro в палитре серая

Нужен transport **pagebuilderpro** и валидная лицензия Pro. Commerce-секции дополнительно требуют **miniShop3**.

## Ошибка «Package provider not found» при установке

Платный transport с modstore.pro: добавьте провайдер `https://modstore.pro/extras/` в **Пакеты → Провайдеры** перед установкой.

## Custom секция не в списке

Зарегистрируйте JSON через `pbOnRegisterSectionDefinitions` или импорт в CMP (Pro). Проверьте синтаксис JSON и уникальность `key`.

## UTM-правила не работают

Вызовите `[[!PageBuilderUtmSession]]` до `PageBuilder` в том же запросе. UTM должны быть в query string первого захода пользователя.

## Connector 403 или 401

Пользователь не авторизован в менеджере или нет `pagebuilder_view` / `pagebuilder_save` для action processor.

## Где логи

Включите `pagebuilder`-related debug через стандартный log MODX (`core/cache/logs/`). VueTools может писать ошибки в консоль браузера на вкладке «Секции».
