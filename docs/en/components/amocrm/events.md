# Events

The component fires events so you can modify data or handle amoCRM responses:

- amocrmOnBeforeOrderSend
- amocrmOnOrderSend
- amocrmOnBeforeUserSend
- amocrmOnUserSend
- amocrmOnWebhookProcess
- amocrmOnBeforeWebhookProcess

All plugins receive **$amoCRM**, an instance of the _amoCRM_ class.
