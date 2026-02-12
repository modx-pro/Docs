---
title: WebDAV
description: WebDAVMediaSource — network media source for MODX Revolution
logo: https://modstore.pro/assets/extras/webdav/logo-lg.jpg
author: 13hakta
modstore: https://modstore.pro/packages/photos-and-files/webdav
modx: https://extras.modx.com/package/webdav
repository: https://github.com/13hakta/modx-WebDAV
---
# WebDAV

WebDAVMediaSource is a network media source for MODX Revolution.

Supported operations:

- List directory contents
- Upload files
- Create file
- Edit file
- Delete directory/file
- Drag and drop in tree
- Cache directory contents and file metadata
- Access resources via site proxy

Supports MySQL and SQLSrv schemas. Works with WebDAV v1. Locking is not supported.

Tested with SabreDAV, CloudMe.com, Yandex Disk.

## Parameters

| Name                  | Default                              | Description                                                                                                                                                    |
| --------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **allowedFileTypes**  |                                      | If set, only files with these extensions. Comma-separated, no dot.                                                                                             |
| **authMethod**        |                                      | Auth scheme: basic or digest. Use scheme supported by server                                                                                                   |
| **basePath**          |                                      | Path to source files.                                                                                                                                          |
| **baseUrl**           |                                      | URL for file access. Ignored if proxy is enabled.                                                                                                              |
| **cached**            | `false`                              | Cache directory contents                                                                                                                                       |
| **cacheTime**         | `10`                                 | Cache lifetime in minutes                                                                                                                                      |
| **imageExtensions**   | `jpg,jpeg,png,gif`                   | Comma-separated image extensions. MODX creates thumbnails for these.                                                                                           |
| **login**             |                                      | Username                                                                                                                                                       |
| **password**          |                                      | Password                                                                                                                                                       |
| **preview**           | `false`                              | Create image thumbnails. May load the network. Use with caution.                                                                                               |
| **proxy**             | `false`                              | Access resources via site proxy if server is not publicly accessible                                                                                           |
| **server**            |                                      | Server address as proto://host. Port after colon                                                                                                               |
| **skipFiles**         | `.svn,.git,_notes,nbproject,.idea,.DS_Store` | Comma-separated. MODX skips files/folders matching these masks.                                                                                       |
| **thumbnailQuality**  | `90`                                 | Thumbnail quality 0–100.                                                                                                                                       |
| **thumbnailType**     | `png`                                | Image type for thumbnails.                                                                                                                                     |
| **verifySSL**         | `true`                               | Verify SSL certificates                                                                                                                                        |

## Security policy

| Name   | Description                |
| ------ | -------------------------- |
| **load** | Ability to download objects |

## Download via proxy

If the WebDAV server does not allow direct download, use the proxy processor.
URL format: `http://yoursite.ru/assets/components/webdav/index.php?ctx=web&action=proxy&source=SOURCEID&src=path/file.ext`
Parameters include sourceID and file path. Works only with WebDAV sources.
