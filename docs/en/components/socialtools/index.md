---
title: SocialTools
description: "Social features for MODX: send and read messages, inbox and outbox"
logo: https://modstore.pro/assets/extras/socialtools/logo-lg.jpeg
author: Asanvery
modstore: https://modstore.pro/packages/alerts-mailing/socialtools
modx: https://extras.modx.com/package/socialtools
repository: https://github.com/Asanvery/SocialTools

items: [
  {
    text: 'Snippets',
    items: [
      { text: 'socDialogForm', link: 'snippets/socdialogform' },
      { text: 'socDialogList', link: 'snippets/socdialoglist' },
      { text: 'socDialogReceive', link: 'snippets/socdialogreceive' },
    ],
  },
]
---
# SocialTools

SocialTools adds social features to MODX. Send and read messages, view inbox and outbox.

## 5 quick-start steps

1. Create a resource with the message send form.

    ```modx
    [[!socDialogForm]]
    ```

2. Create a resource for the inbox list.

    This example uses pdoPage; you can use getPage.

    ```modx
    [[!pdoPage?
      &element=`socDialogList`
      &action=`inbox`
    ]]

    [[+page.nav]]
    ```

3. Create a resource for the outbox list.

   This example uses pdoPage; you can use getPage.

    ```modx
    [[!pdoPage?
      &element=`socDialogList`
      &action=`outbox`
    ]]

    [[+page.nav]]
    ```

4. Create a resource for reading a message.

    ```modx
    [[!socDialogReceive]]
    ```

5. Edit default chunks.

    Set readMsgResourceID to the ID of your read-message resource.
    Set formSendResourceID to the ID of your send-form resource.

### Tips

- Install [dateAgo](https://modstore.pro/packages/utilities/dateago) and [phpthumbon](http://modx.com/extras/package/phpthumbon) for date and avatar display.
- Unread messages placeholder:

```modx
[[!+socIsRead:notempty=`New messages! ([[!+socIsRead]])`]]
```

- Wrap all calls in a div with class `social-container` (fixed width; adjust in CSS).
- CSS classes `social-listheader`, `social-msgcontent` - `max-width` limits width, overflow gets ellipsis. Used for message list.

If you change `social-container`, adjust `social-listheader` and `social-msgcontent` accordingly.

![Tips](https://file.modx.pro/files/c/2/c/c2ca21272e774ac13d6c9d7bcaaa9bc1.jpg)

::: tip
You can create custom chunks with your own CSS based on the defaults.
:::
