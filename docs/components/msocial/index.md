---
title: mSocial
description: Постинг в Twitter
logo: https://modstore.pro/assets/extras/msocial/logo-lg.png
author: DevPastet
modstore: https://modstore.pro/packages/alerts-mailing/msocial
repository: https://github.com/DevPastet/mSocial

items: [
  { text: 'mSocialVK', link: 'msocialvk' },
  { text: 'mSocialFB', link: 'msocialfb' },
]
---
# mSocial

Расширение реализует основу для постинга в соцсети. В основной набор входит только Twitter.

## Как настроить mSocial?

- Устанавливаем расширение.
- Регистрируемся в Twitter, авторизовываемся.
- Менеджер приложений находится [тут](https://apps.twitter.com/).
- Регистрируем приложение в Twitter.
- Жмем кнопочку Create New App и заполняем простую форму.
- После создания приложения переходим на вкладку Keys and Access Tokens и жмем кнопку Create my access token. Копируем поля: Consumer Key, Consumer Secret, Access Token, Access Token Secret.

::: warning
в поле Access Level должно стоять значение Read and write.
:::

![Как настроить mSocial - 1](https://file.modx.pro/files/1/1/8/118dc35db2127bd1a16c557a8b86e0e0.png)

- Теперь открываем наш сайт. Переходим в Системные настройки / mSocial.

![ Как настроить mSocial - 2](https://file.modx.pro/files/e/7/a/e7a3b081010c426a93bc7602bd63ab66.png)

- Открываем чанк tpl.msocial.tw или тот который используется для постинга, вносим нужные параметры для постинга. Пример: `[[+pagetitle]]` - `[[+content]]`

- Теперь осталось только включить tv-параметр twPost для тех шаблонов, документы которых должны участвовать в постинге. Постинг происходит при сохранении ресурса, в том случае если tv-параметр twPost переключен на Да.

## Системные настройки

| Имя               | По умолчанию     | Описание                                                                                                                                                                                      |
| ----------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **msocial_tt_ot** |                  | Access Token для Twitter                                                                                                                                                                      |
| **msocial_tw_ck** |                  | Consumer Key (API Key) для Twitter                                                                                                                                                            |
| **msocial_tw_cs** |                  | Consumer Secret (API Secret) для Twitter                                                                                                                                                      |
| **msocial_tw_os** |                  | Access Token Secret для Twitter                                                                                                                                                               |
| **msocial_tw_tp** | `tpl.msocial.tw` | Чанк шаблона для постинга в Twitter                                                                                                                                                           |
| **msocial_im_ps** | `0`              | Дополнять ли посты в соцсети изображениями на основе парсинга поста (те если сообщение содержит изображения они будут прикреплены к посту, при условии что данный параметр переключен на Да). |

## Содержимое компонента

Плагины

- **mSocial** - производит постинг в соцсети.

TVs

- **twPost** - tv для отслеживания постинга в Twitter.

Чанки

- **tpl.msocial.tw** - шаблон для постинга в Twitter.

::: info
В чанке можно использовать все поля документа, а так же TV поля
:::

## Информация о прикрепляемых изображениях для Twitter

Для того что бы изображения корректно загружались нужно что бы они присутствовали в теле сообщения, в виде

```html
<img src="путь до изображения"/>
```

Например можно вставлять изображения в тело поля content с помощью редактора TinyMCE. Путь к изображению должен быть следующего вида `files/mSocial.jpg`.

Twitter поддерживаются следующие форматы: PNG, JPEG, WEBP и GIF.

С требованиями к изображениям можно ознакомиться [тут](https://dev.twitter.com/rest/public/uploading-media/).
Обсуждение первого релиза [тут](https://modx.pro/solutions/7782-msocial-first-release/).
