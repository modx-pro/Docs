# Subscriptions

In the Subscriptions section you create and edit newsletters.

## Creating a newsletter

- Go to **Components** → **Sendex**
- On the **Subscriptions** tab click **Create**, then save after editing.

![Creating a newsletter](https://file.modx.pro/files/2/a/f/2af549ef2d714b69e4369fda479de69e.png)

In the form fill in:

- **Name**
- **Template**
- **Email subject**
- **From email**
- **Reply-to email**
- **Sender name**
- **Enabled**
- **Description**
- **Image** <Badge type="info" text="optional" />

![Creating a newsletter](https://file.modx.pro/files/a/3/0/a3059d34688e43b4c4c17dc0a750c930.png)

## Adding subscribers manually

- Go to **Components** → **Sendex**
- On the **Subscriptions** tab right-click a newsletter and choose **Edit subscription**, then save.

![Adding subscribers manually](https://file.modx.pro/files/a/5/b/a5b5bc9a4020110a51853f073ad71e48.png)

- Open the **Subscribers** tab

![Subscribers](https://file.modx.pro/files/2/c/6/2c6b4a5878e3ba8cca8582ef0665a79e.png)

- In the dropdown select the user to add to the newsletter.

![Subscribers](https://file.modx.pro/files/3/f/b/3fb80280c1ca094329af7cac814a185a.png)

![Subscribers](https://file.modx.pro/files/e/f/7/ef782c213e39f644f76ab716ba187663.png)

## Exporting subscribers

Since 1.1.4-pl you can export subscribers for each newsletter as CSV.

### System settings

| Name                 | Key                       | Default | Values                                                         |
| -------------------- | ------------------------- | ------- | -------------------------------------------------------------- |
| **Export fields**    | `sendex_export_fields`    | email   | id, user_id, email, username, fullname, phone, mobilephone     |
| **Hide export button** | `sendex_hide_export_button` | No    | Yes / No                                                       |
