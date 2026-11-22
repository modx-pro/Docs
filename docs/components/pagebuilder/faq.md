---
title: FAQ
description: "Типовые проблемы PageBuilder: редактор, права, кеш, Pro и миграция"
---

# FAQ

## Редактор «Секции» не появляется

1. Установите **VueTools** 1.1.2+ и очистите кеш.
2. Включите `pagebuilder_resource_tab_enabled = 1`.
3. Проверьте `pagebuilder_resource_tab_parents`. Пустой список означает все ресурсы. Иначе подходит id самого ресурса, прямого родителя или любого предка.
4. Выдайте `pagebuilder_view` или `save_document`, и политику `view` на ресурс. Политика нужна, чтобы открыть форму.

Ошибки загрузки VueTools видны в консоли браузера на вкладке «Секции».

## На сайте пусто, в менеджере секции есть

- Сохранили ресурс MODX (**Сохранить**)? Автосохранение пишет только черновик. Сниппет читает опубликованную версию.
- В шаблоне стоит `[[!PageBuilder]]` с некэширующим `!`.
- После публикации очистите кеш MODX или вызовите сниппет с `use_cache=0`.

## Превью черновика не открывается

- Проверьте `pagebuilder_preview_secret` (после установки значение не должно быть пустым).
- URL превью: `{assets_url}components/pagebuilder/preview.php`.
- Пользователю нужно `pagebuilder_view` или `save_document`.

## CSS на сайте не тот, что в превью

Превью подключает CSS шаблона (`pagebuilder_preview_include_template_css`) и адреса из `pagebuilder_preview_css_urls`. На сайте Free грузится `pagebuilder-sections.css`. При capability `pro` добавляются `pagebuilder-sections-pro.css` и `pagebuilder-commerce.css`, если файлы есть. Подключите стили темы в общем layout или перенесите нужные правила.

## Секция Pro в палитре серая

Нужен установленный **pagebuilderpro** (capability `pro`). Отдельную проверку лицензии при открытии палитры код не делает. Commerce-секции дополнительно требуют **miniShop3**.

## Ошибка «Package provider not found» при установке

Платное дополнение с modstore.pro: добавьте провайдер `https://modstore.pro/extras/` в **Пакеты → Провайдеры** перед установкой.

## Своя секция не в списке

Зарегистрируйте JSON через `pbOnRegisterSectionDefinitions` или создайте UI-тип на вкладке **Blocks** в CMP (право `pagebuilder_manage_types`). Проверьте синтаксис JSON и уникальность `key`. Вкладка Bundle в текущем релизе скрыта. Импорт бандла через CMP недоступен.

## UTM-правила не работают

Вызовите `[[!PageBuilderUtmSession]]` до `PageBuilder` в том же запросе. UTM должны быть в query string первого захода пользователя. В инспекторе откройте диалог **Видимость** (нужна `pagebuilder_inspector_visibility_enabled = 1`).

## Поле migx без грида

Нужен установленный пакет **MIGX**. Без него поле показывает textarea с JSON. См. [migx](fields/migx).

## После обновления нет новых ключей настроек

Resolver не перезаписывает существующие значения (`update.settings = false`). Отсутствующие ключи (breakpoints, visibility) добавляет Phinx при установке или обновлении пакета. Очистите кеш MODX после обновления.

## Connector 403 или 401

Пользователь не авторизован в менеджере или у него нет `pagebuilder_view` / `pagebuilder_save` для вызываемого процессора.

## Форма квиза или contact_form недоступна

Нужен пакет **FetchIt**. Без него секция показывает сообщение лексикона `pagebuilder_fe_form_unavailable`. Получатель письма: поле **Notify email** в секции или системная настройка `emailsender`. Сниппет `PageBuilderFetchIt` выводит формы через Fenom.

Сборка: [quiz](sections/quiz), [contact_form](sections/contact_form).

## Где логи

Включите отладку, связанную с `pagebuilder`, через стандартный log MODX (`core/cache/logs/`). VueTools пишет ошибки в консоль браузера на вкладке «Секции».
