---
title: Сниппеты
---

# Сниппеты mxDadata

Три веб-сниппета для подсказок DaData в браузере.

| Сниппет | Назначение |
|---------|------------|
| [mxDadataAddressSuggest](mxDadataAddressSuggest) | Подсказки адреса, заполнение полей города, индекса, FIAS и запись адреса в черновик заказа MS3 |
| [mxDadataPartySuggest](mxDadataPartySuggest) | Подсказки и выбор юрлица по ИНН, автозаполнение реквизитов |
| [mxDadataForm](mxDadataForm) | Универсальная форма: JSON-конфиг полей (ADDRESS, PARTY, BANK, NAME, EMAIL, GEOLOCATE, VERSION_INFO) |

Вызовы в типичном сценарии **MiniShop3** — **некэшированные** (`[[!…]]` или `!` в Fenom).

Все три сниппета только регистрируют скрипты и возвращают пустую строку: без JavaScript подсказок не будет. `mxDadataAddressSuggest` для записи в заказ читает `window.ms3Config.actionUrl`, без инициализированного MS3 адрес уйдёт только в поля формы.

Плейсхолдеры с URL коннектора для шаблонов: [Для разработчиков → Плейсхолдеры веб-контекста](../developer#плейсхолдеры-веб-контекста-onwebpageinit).
