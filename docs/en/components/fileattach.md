---
title: FileAttach
description: Upload files to resources in the site manager
logo: https://modstore.pro/assets/extras/fileattach/logo-lg.jpg
author: 13hakta
modstore: https://modstore.pro/packages/photos-and-files/fileattach
modx: https://extras.modx.com/package/fileattach
repository: https://github.com/13hakta/FileAttach
---
# FileAttach

Module for uploading files to resources in the site manager.

- Access to upload and download can be restricted with access policies;
- Administrative management of all uploaded files on the site;
- A media source is available for browsing uploaded files (when the package is registered globally during installation);
- File list is stored in a database table.

For each file you can set a description, privacy mode (direct link access), download count, and SHA1 checksum.

Files can be downloaded via direct link. "Private" files get a long generated name that does not match the original filename. "Public" files keep their original name.

You can reorder files by dragging entries in the editor.

Supports MySQL and SQLSrv.

Development: [https://github.com/13hakta/FileAttach](https://github.com/13hakta/FileAttach)

## Chunk FileAttachTpl

Defines how file entries are rendered.

| Name             | Description                                                |
|------------------|------------------------------------------------------------|
| **&description**  | Description                                                |
| **&docid**        | Resource ID the file is attached to                        |
| **&download**     | Download count                                             |
| **&hash**         | SHA1 checksum                                              |
| **&id**           | File ID                                                    |
| **&internal_name**| Internal name (filename on the filesystem)                  |
| **&name**         | File name (same as internal_name when private=no)          |
| **&path**         | Path within the media source                              |
| **&private**      | Whether the file is private                                |
| **&rank**         | Sort order in the list                                     |
| **&size**         | File size in bytes                                        |

Default chunk content:

```modx
<p>[[+description:notempty=`<strong>[[+description]]</strong><br/>`]]
<a href="[[+url]]">[[+name]]</a> <span class="badge">[[+download]]</span>
[[+size:notempty=`<br/><small>Size: [[+size]] bytes</small>`]]
[[+hash:notempty=`<br/><small>SHA1: [[+hash]]</small>`]]</p>
```

## Snippet FileAttach

Outputs the list of files.

| Name               | Default       | Description                                                                 |
| ------------------ | ------------- | --------------------------------------------------------------------------- |
| **&limit**         | `0`           | Max number of files to output (0 = all)                                     |
| **&makeURL**       | `false`       | Generate download link for the file                                         |
| **&outputSeparator**|               | Separator between output entries                                            |
| **&privateUrl**    | `false`       | Force download via connector (counts downloads for public files too)         |
| **&resource**      | `0`           | Resource ID to show files for (0 = current resource)                         |
| **&showSize**      | `false`      | Include file size                                                           |
| **&sortBy**        | `name`       | Sort by field                                                               |
| **&sortDir**       | `ASC`        | Sort direction                                                              |
| **&toPlaceholder** | `false`      | Store result in a placeholder instead of outputting                          |
| **&tpl**           | `FileAttachTpl` | Chunk for each file row                                                  |

## Class FileItem

### Methods

| Name           | Description                                                    | Parameters         |
| -------------- | -------------------------------------------------------------- | ------------------ |
| **generateName** | Generate a new file name                                     | length (int) = 32  |
| **getFullPath**  | Get full path to the file                                    |                    |
| **getPath**      | Get path relative to media source root                       |                    |
| **getSize**      | Get file size                                                |                    |
| **getUrl**       | Get file URL                                                 |                    |
| **rename**       | Rename the file                                              | name (str)         |
| **sanitizeName** | Sanitize invalid characters in the file name                 | name (str)         |
| **setPrivate**   | Set privacy mode                                             | private (bool)      |

## System settings

| Name           | Default | Description                                                                 |
| -------------- | ------- | --------------------------------------------------------------------------- |
| **calchash**   | `false` | Calculate SHA1 checksum on upload                                            |
| **download**   | `true`  | Count downloads                                                              |
| **files_path** | `Path`  | Path relative to media source root (must end with "/")                       |
| **mediasource**| `1`     | Media source ID                                                              |
| **private**    | `false` | Make files private by default on upload                                      |
| **put_docid**  | `false` | Store files in a resource subfolder                                          |
| **templates**  |         | Comma-separated list of document template IDs where the module is active   |
| **user_folders**| `false`| Store files in a user subfolder                                              |

## Download connector

Private files are downloaded through the connector, which hides the direct file URL and counts downloads. You can also serve public files via the connector by setting **&privateUrl**=`1` in the snippet call; the connector will then redirect to the direct link.

Connector URL format: `MODX_ASSETS_URL/components/fileattach/connector.php?action=web/download&ctx=web&id=file_id`, where `file_id` is the file ID in the database.

## Access policies

### Permissions

| Name                     | Description                          |
| ------------------------ | ------------------------------------ |
| **fileattach.doclist**   | Manage files in a document           |
| **fileattach.download**  | Download files                       |
| **fileattach.totallist** | Manage all files                     |

## Usage example

Simple call:

```modx
[[FileAttach]]
```

To count downloads for all files, use the private URL:

```modx
[[FileAttach? &privateUrl=`1`]]
```

Sort by manual order:

```modx
[[FileAttach? &sortby=`rank`]]
```

## Screenshots

- File list in the manager

    ![File list in the manager](http://modstore.pro/assets/uploadify/7/d/0/7d0f1263e99423f3aafb4d4acfadab1e.png) <!-- TODO: 404 -->

- Media source tree

    ![Media source tree](http://modstore.pro/assets/uploadify/7/e/c/7ec6d5cfd2eda4b6beecacbb9dccf137.jpg) <!-- TODO: 404 -->

- File editing

    ![File editing](http://modstore.pro/assets/uploadify/a/7/3/a73f632567a372e4798d4e8a46e6ed66.jpg) <!-- TODO: 404 -->

- File editing in admin mode

    ![File editing in admin mode](http://modstore.pro/assets/uploadify/1/1/e/11e65bc91ab8d98697fa7131d1ef0dce.jpg) <!-- TODO: 404 -->

- File list on the front-end

    ![File list on the front-end](http://modstore.pro/assets/uploadify/7/d/0/7d0f1263e99423f3aafb4d4acfadab1e.png) <!-- TODO: 404 -->

- Upload dialog

    ![Upload dialog](http://modstore.pro/assets/uploadify/d/8/e/d8e762da9506a5a6b17bf895e7b9b512.png) <!-- TODO: 404 -->
