---
title: "icon"
description: "SVG из каталога Lucide или Heroicons. Не класс Font Awesome. Слой Pro."
---

# Поле icon

Версия: **Pro** (`advanced-fields`).

Пикер выбирает SVG из двух наборов: Lucide (ISC, 24×24) и Heroicons (MIT, 24×24). Класс вроде `fa-star` значением не является.

Имя иконки: строчные буквы, цифры и дефис. В инспекторе можно ввести `lucide:star` или объект `{ "set", "name" }`.

`IconValueResolver` при выводе добавляет готовый `svg`. Неизвестное имя даёт пустые `set`, `name` и `svg`.

## Настройка

```json
{
  "name": "icon",
  "type": "icon",
  "label": "Иконка"
}
```

## Данные секции {#vyvod-v-section-data}

Сохранённое значение:

```json
{
  "icon": { "set": "lucide", "name": "star" }
}
```

После рендера у того же ключа появляется `svg`:

```json
{
  "icon": {
    "set": "lucide",
    "name": "star",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" ...></svg>"
  }
}
```

## Пример в chunk

`svg` уже HTML. Не прогоняйте его через `escape`.

```html
<span class="pb-icon">{$icon.svg}</span>
```

## Похожие типы

- [image](image), если нужен свой файл, а не каталог
