---
title: Сниппеты
---
# Сниппеты msRussianPost

Дополнение предоставляет два сниппета для страницы оформления заказа: лексикон для JavaScript и подключение стилей, скрипта и конфигурации виджета.

- [msrpLexiconScript](msrpLexiconScript) — выставляет `window.msrpLexicon` из лексикона MODX. Нужен для локализации текста, вызывать **первым**, до `msRussianPost`.
- [msRussianPost](msRussianPost) — CSS, JS и объект `window.msRussianPostConfig`. Вызывать **после** `msrpLexiconScript`.

Пропустить `msrpLexiconScript` нельзя: в JavaScript нет запасных строк, и без лексикона посетитель видит в виджете имена ключей (`msrussianpost_error_api`). Подробности в разделе [Почему сниппет обязателен](msrpLexiconScript#why-required).
