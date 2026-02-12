# Notifications

## Create / Edit notification

The notification fires when the entity status changes.

[![](https://file.modx.pro/files/1/0/8/1081d703c933784602832a7d79c7c9e4s.jpg)](https://file.modx.pro/files/1/0/8/1081d703c933784602832a7d79c7c9e4.png)

To create a notification you must specify the class and status. Set email, subject and body.

Each entity defines the methods `{getClientEmails}` and `{getManagerEmails}`.
The result is filled into the variables:

- `{$client_email}` — client email
- `{$manager_email}` — manager email

So you can use `{$client_email | join}`: for the client entity it will be the client email, for the content entity it will be the email of all clients with an active subscription to this content, etc.
