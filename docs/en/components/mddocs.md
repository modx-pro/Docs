---
title: mdDocs
description: Component that turns a fresh site into a documentation system
logo: https://modstore.pro/assets/extras/mddocs/logo-lg.png
author: mvoevodskiy
modstore: https://modstore.pro/packages/content/mddocs
---
# mdDocs

Component that lets you build an analogue of the **old** docs.modx.pro from any clean MODX Revolution site.

## Installation

Configure the connection to the MODSTORE.PRO repository, then install mdDocs via "Package Manager". The following will be installed automatically:

- pdoTools
- Markdown
- Theme.Bootstrap

## Configuration

After installation, assign the "mdDocs" template to a resource and save that resource ID in the system setting **mddocs_docs_page_id**. If you install on a clean site with no other purpose, that page can be the main page with `ID = 1`.

## System settings

| Setting            | Default          | Description                                                                                                                                                                                            |
| -------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| mddocs_custom_css    |                                | Custom CSS file for styling                                                                                                                                            |
| mddocs_docs_page_id  | `1`                            | ID of the page where documentation is displayed                                                                                                                                                            |
| mddocs_docs_path     | `{corePath}gitdocs/`           | Default path to documentation relative to site root                                                                                                                                           |
| mddocs_git_token     | *<Generated on install>* | Token for the webhook that accepts requests to run git pull                                                                                                                                        |
| mddocs_lang_default  | `en`                           | Default language                                                                                                                                                                                   |
| mddocs_lang_switch   | `{"ru":"RU","en":"EN"}`       | JSON object mapping folder names to displayed language labels                                                                                                                        |
| mddocs_logo          |                                | Path to logo image                                                                                                                                                                      |
| mddocs_remote_images | `Yes`                           | Images are stored on a remote server or locally in the docs folder. If local, set to "No" and ensure files from the docs folder are accessible to users |

## URL transliteration

By default all URLs are generated from file names. So Russian file and folder names appear in Russian in the URL.

If the **translit** component is installed, all URL segments are automatically transliterated through it.

## Pulling from git

For automatic documentation updates a webhook is used: `SITE_URL>/assets/components/mddocs/gitpull.php?token=<TOKEN>`

In your git (e.g. GitHub) settings specify the full webhook URL including the token. Example:

![mdDocs](https://file.modx.pro/files/4/a/c/4ace9f4f5606c58f100d6b74ff1a33a4.png)
