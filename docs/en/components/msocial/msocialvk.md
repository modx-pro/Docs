# mSocialVK

The module implements posting to VKontakte social network based on the mSocial extension.

- Install mSocialVK (mSocial installs automatically if not present).
- Register on VKontakte and log in.
- App Manager is [here](https://vk.com/apps?act=manage), go there.
- Create an application in VK.
- Enter the name, select application type **Standalone**.
- Don't forget to enable the app by changing the *State* select and save changes.
- Go to settings and copy the Application ID. Replace {Application ID} in the URL `https://oauth.vk.com/authorize?client_id={Application ID}&scope=groups,wall,offline,photos&redirect_uri=https://oauth.vk.com/blank.html&display=page&v=5.21&response_type=token` with your Application ID and paste in the browser bar.
- In the popup window click Allow.
- You get a string like `https://oauth.vk.com/blank.html#access_token=349252841f7c58495dd5692d8b55ab6460ec23aa60dsfdsfdsfdsfdsfdsfdsfsdfsdfsddfsddfcx&expires_in=0&user_id=30314063` — copy access_token to a notepad.
- Now open our site. Go to System Settings / mSocial and enter the required parameters.
- Open chunk tpl.msocial.vk or the one used for posting, add the required parameters for posting. Example: `[[+pagetitle]]` - `[[+content]]`
- Now just enable the vkPost TV parameter for those templates whose documents should participate in posting. Posting happens when the resource is saved, if the vkPost TV parameter is set to Yes.

## System settings

| Name              | Default           | Description                                                                                                                                                                                                          |
|-------------------|-------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **msocial_im_fg** | `0`               | Post on behalf of group when posting to a group.                                                                                                                                                                     |
| **msocial_vk_at** |                  | Access Token for VKontakte.                                                                                                                                                                                          |
| **msocial_vk_id** |                  | VKontakte page id where messages will be added. If you want to add to a group, specify the id with a minus prefix. So if your group id is 32432432432, use -32432432432.                                             |
| **msocial_vk_tp** | `tpl.msocial.vk` | Chunk template for posting to VKontakte                                                                                                                                                                               |

## Component contents

TVs

- **vkPost** — TV for tracking posting to VKontakte.

Chunks

- **tpl.msocial.vk** — template for posting to VKontakte.

::: info
In the chunk you can use all document fields as well as TV fields.
:::

## Attached image info for VKontakte

For images to load correctly they must be present in the message body as

```html
<img src="path to image"/>
```

For example you can insert images into the content field body using TinyMCE editor. The image path should be in the form `files/mSocial.jpg`.

VKontakte supports the following formats: PNG, JPEG, WEBP and GIF.
