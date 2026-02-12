---
title: mSocial
description: Posting to Twitter
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

The extension provides a base for posting to social networks. The main package includes Twitter only.

## How to set up mSocial?

- Install the extension.
- Register and sign in to Twitter.
- App manager is [here](https://apps.twitter.com/).
- Register an app in Twitter.
- Click Create New App and fill in the form.
- After creating the app, go to Keys and Access Tokens and click Create my access token. Copy: Consumer Key, Consumer Secret, Access Token, Access Token Secret.

::: warning
Access Level must be "Read and write".
:::

![How to set up mSocial - 1](https://file.modx.pro/files/1/1/8/118dc35db2127bd1a16c557a8b86e0e0.png)

- Open your site. Go to System settings / mSocial.

![How to set up mSocial - 2](https://file.modx.pro/files/e/7/a/e7a3b081010c426a93bc7602bd63ab66.png)

- Open chunk tpl.msocial.tw (or the one used for posting) and set the posting parameters. Example: `[[+pagetitle]]` - `[[+content]]`

- Enable TV parameter **twPost** for templates whose documents should be posted. Posting happens on resource save when twPost is set to Yes.

## System settings

| Name               | Default        | Description                                                                                                                                  |
| ------------------ | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **msocial_tt_ot** |                | Access Token for Twitter                                                                                                                     |
| **msocial_tw_ck** |                | Consumer Key (API Key) for Twitter                                                                                                            |
| **msocial_tw_cs** |                | Consumer Secret (API Secret) for Twitter                                                                                                      |
| **msocial_tw_os** |                | Access Token Secret for Twitter                                                                                                               |
| **msocial_tw_tp** | `tpl.msocial.tw` | Chunk template for Twitter posts                                                                                                            |
| **msocial_im_ps** | `0`            | Attach images to social posts by parsing the post (if the message contains images they are attached when this is Yes).                        |

## Component contents

Plugins

- **mSocial** — performs posting to social networks.

TVs

- **twPost** — TV to control Twitter posting.

Chunks

- **tpl.msocial.tw** — template for Twitter posts.

::: info
You can use all document fields and TV parameters in the chunk.
:::

## Twitter image attachment

For images to upload correctly they must appear in the message body as:

```html
<img src="path to image"/>
```

For example insert images in the content field with TinyMCE. Image path should look like `files/mSocial.jpg`.

Twitter supports: PNG, JPEG, WEBP, GIF.

See [Twitter media requirements](https://dev.twitter.com/rest/public/uploading-media/).
Discussion: [first release](https://modx.pro/solutions/7782-msocial-first-release/).
