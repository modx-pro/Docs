# Плагин msProfile

Плагин msProfile нужен для обработки пополнений счета и проверки суммы при создании нового заказа.

Он реагирует на 3 события:

- **OnManagerPageBeforeRender** - подключает [дополнительную вкладку с профилями][1] на панель управления заказами.
- **msOnBeforeCreateOrder** - проверка, есть ли требуемая сумма для заказа на счете пользователя. Если нет - заказ не будет оформлен и покупатель получит ошибку.
- **msOnChangeOrderStatus** - списание со счета пользователя, при оформлении заказа, если был выбран метод оплаты CustomerAccount.

[![](https://file.modx.pro/files/c/0/0/c004f06da5a54dc4be2fa592148a6af0s.jpg)](https://file.modx.pro/files/c/0/0/c004f06da5a54dc4be2fa592148a6af0.png)

[1]: /components/msprofile/interface
