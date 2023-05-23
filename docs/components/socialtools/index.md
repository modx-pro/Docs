---
name: SocialTools
description: Компонент с социальным функционалом для MODX. С помощью него можно отправлять и читать сообщения, получать списки входящих и исходящих сообщений
logo: https://modstore.pro/assets/extras/socialtools/logo-lg.jpeg
author: Asanvery
modstore: https://modstore.pro/packages/alerts-mailing/socialtools
modx: https://extras.modx.com/package/socialtools
repository: https://github.com/Asanvery/SocialTools

items: [
  {
    text: 'Сниппеты',
    items: [
      { text: 'socDialogForm', link: 'snippets/socdialogform' },
      { text: 'socDialogList', link: 'snippets/socdialoglist' },
      { text: 'socDialogReceive', link: 'snippets/socdialogreceive' },
    ],
  },
]
---
# SocialTools

SocialTools -  это компонент с социальным функционалом для CMS / CMF MODX.
С его помощью можно отправлять и читать сообщения, получать списки входящих и исходящих сообщений.

## 5 шагов для быстрого начала

1. Создать ресурс с формой отправки сообщений.

    ```modx
    [[!socDialogForm]]
    ```

2. Создать ресурс со списком входящих сообщений.

    В данном примере используется pdoPage, вы можете использовать getPage

    ```modx
    [[!pdoPage?
      &element=`socDialogList`
      &action=`inbox`
    ]]

    [[+page.nav]]
    ```

3. Создать ресурс со списком исходящих сообщений.

   В данном примере используется pdoPage, вы можете использовать getPage

    ```modx
    [[!pdoPage?
      &element=`socDialogList`
      &action=`outbox`
    ]]

    [[+page.nav]]
    ```

4. Создать ресурс для чтения сообщения

    ```modx
    [[!socDialogReceive]]
    ```

5. Сделать правки в чанках по умолчанию.

    Изменить readMsgResourceID - на id вашего ресурса с вызовом сниппета для чтения сообщений.

    Изменить formSendResourceID - на id вашего ресурса с вызовом сниппета для формы отправки сообщения.

### Рекомендации, дополнения

- Установить компоненты [dateAgo](https://modstore.pro/packages/utilities/dateago), и [phpthumbon](http://modx.com/extras/package/phpthumbon) для приятного отображения даты отправки сообщения и аватара пользователя в чанках.
- Вывод плейсхолдера непрочитанных сообщений по умолчанию

```modx
[[!+socIsRead:notempty=`Новые сообщения! ([[!+socIsRead]])`]]
```

- Заключать все вызовы в div с классом social-container, у этого класса фиксированая ширина, с помощью него вы легко сможете настроить ширину под свой сайт в CSS
- Полезные классы в CSS `social-listheader`, `social-msgcontent` - параметр max-width, определяет максимальную ширину этих полей, все что больше будет обрезаться и ставиться многоточие. Они используется для отображения списка сообщений.

Если вы изменяете параметры класса `social-container`, то значения в `social-listheader`, `social-msgcontent` так же нужно настроить под ваш CSS.

![Рекомендации](https://file.modx.pro/files/c/2/c/c2ca21272e774ac13d6c9d7bcaaa9bc1.jpg)

::: tip
Вы всегда можете сделать свои чанки, с собственным CSS, на основе чанков по умолчанию.
:::
