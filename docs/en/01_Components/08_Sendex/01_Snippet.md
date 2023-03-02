It is a component to work with Email distribution.

Snippet is very simple, it lets users work with subscription on their own: to subscribe and unsubscribe.

If a user is authorized, he/she just needs to press the button. If he/she is not, so he/she will need to confirm the email.

Also if an authorized user is already subscribed for distribution, he/she will be shown the button for the end of subscription. Anonyms will be able to unsubscribe by reference from the letter.


## Parameters

Name                    | Description
------------------------|------------------------
**&id**                 | distribution identifier (number).
**&showInactive**       | show/hide inactive distributions.
| **&msgClass**         | Class that will be displayed in the placeholder `[[+class]]` provided that the placeholder `[[+message]]` **is not empty**. The class is useful if you want to not initially show the block with messages in layout.
**&tplActivate**        | chunk with formatting letter with subscribe activation.
**&tplSubscribeAuth**   | chunk with form of newsletter subscription for authorized users.
**&tplSubscribeGuest**  | chunk with form of newsletter subscription for anonyms.
**&tplUnsubscribe**     | chunk with form of the end of newsletter subscription.

## Snippet activation
Snippet should be activated **uncached**, because it outputs different chunks depending on user authorization. It is necessary to create a distribution before the usage. See section interface.

```php
[[!Sendex? &id=`1`]]
```

All messages for the user are displayed in the placeholder `[[+message]]`, in chunks with a form.

## History
Component was written as a demonstration on paid courses of bezumkin.ru.
All courses [are situated here][1] and you can buy the access to them, if you want.

Initial code on [GitHub][2].

At this moment Sendex is being tested and brought to a stable state.


[1]: http://bezumkin.ru/training/course1/
[2]: https://github.com/bezumkin/Sendex
