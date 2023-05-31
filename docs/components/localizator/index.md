---
title: Localizator
description: Мультиязычность, сео и автоматизация
author: modx-pro
modstore: https://modstore.pro/packages/utilities/localizator
repository: https://github.com/modx-pro/localizator

items: [
  { text: 'Сниппет Localizator', link: 'snippet-localizator' },
  { text: 'Переключение языков', link: 'switch-languages' },
  { text: 'События', link: 'events' },
  { text: 'Формирование sitemap', link: 'sitemap-formation' },
  { text: 'Импорт в локализации', link: 'import-in-localization' },
  { text: 'seoTemplates', link: 'seotemplates' },
  { text: 'Атрибут hreflang', link: 'hreflang-attribute' },
]
---
# Localizator

Компонент Localizator дает возможность создания языковых версий / сателитов без контекстов, с автоматическим
переводом всех полей ресурса, включая дополнительные параметры, а также автоперевод лексиконов.

- Для работы должны быть включены ЧПУ (friendly URLs)
- Компонент требует установки pdoTools и MIGX.

## Настройка

Создание псевдоконтекстов «локализации» (можно вместе работать через site.ru/en/ и ch.site.ru)

![псевдоконтексты](https://file.modx.pro/files/a/2/d/a2d8c479da8603723ac5b480e0e2408d.png)

У ресурса есть таб, где заполняются все стандартные поля ресурса + сео + дополнительные поля, далее по нажатию кнопки это все можно перевести на другие языки.

![таб локализатора](https://file.modx.pro/files/1/5/2/152cc01c77ac4a8a5c923cb7204f678f.png)
![окно локализации](https://file.modx.pro/files/3/b/3/3b382b1f2be63655d70f844555369527.png)

### Системные настройки

Для работе со сниппетами пакета pdoTools (pdoResources, pdoMenu) для выборки ресурсов, необходимо заменить значение системной настройки:

```
pdoFetch.class = pdotools.pdofetchlocalizator
```

Все поля ресурса подменяются локализированными, кроме `content`, он выводится через `{$_modx->resource.localizator_content}`.

Для правильной работы с mFilter2 сделан обработчик. Для его активации нужно указать:

```
mse2_filters_handler_class = mse2LocalizatorFilter
```

| Название                                    | По умолчанию                                                                    | Описание                                                                                                                                                                                                     |
| ------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **localizator_default_language**            | `Нет`                                                                           | Ключ локализации по умолчанию                                                                                                                                                                                |
| **localizator_default_translator**          | `Yandex`                                                                        | Переводчик для автоматического перевода                                                                                                                                                                      |
| **localizator_key_yandex**                  | `Нет`                                                                           | API ключ для Яндекс переводчика, <https://translate.yandex.ru/developers/keys>                                                                                                                               |
| **localizator_translate_fields**            | `pagetitle,longtitle,menutitle,seotitle,keywords,introtext,description,content` | Список полей для перевода, которые будут переведены при использовании автоматического перевода, в том числе и доп.поля                                                                                       |
| **localizator_translate_translated**        | `Нет`                                                                           | При использовании автоматического перевода переведет ПУСТЫЕ поля у существующих локализаций                                                                                                                  |
| **localizator_translate_translated_fields** | `Нет`                                                                           | При использовании автоматического перевода перезапишет все поля локализациии                                                                                                                                 |
| **localizator_tv_fields**                   | `Нет`                                                                           | Указанные дополнительные поля будут доступны для редактирования в локализации. Оставьте настройку пустой, если нужны все доп.поля. Укажите поля со знаком минус в начале чтобы исключить доп.поля ('-image') |

## Настройка локализаций типа site.ru/en/

### Apache2

Для правильной работы нужно указать правило в **.htaccess**

```apache
RewriteRule ^(ru|en)/assets(.*)$ assets$2 [L,QSA]
```

### NGINX

```nginx
location ~ ^/(ru|en) {
  rewrite ^/(ru|en)/(favicon.ico|assets.*)$ /$2 redirect;
  try_files $uri $uri/ @rewrite;
}
```
