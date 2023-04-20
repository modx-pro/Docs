Package to upload and attach files to resources in site manager.

- Supports upload and download limitation by policies;
- Has admin managing tool to control all uploaded files;
- There is a media source for viewing uploaded files. It becomes available while package is globally registered during installation;
- File list is kept in table

For every file could be set description, privacy mode (accessibility by direct link), download count, SHA1 checksum.

Files are accessible to download by direct link. For "private" files long name is randomly generated, that is not matched to original filename.
For "open" files original filename is preserved.

Custom order may be set by enabling order column in editor and dragging selected rows to corresponding position.

Supports MySQL and SQLSrv DB schemes.

Component development is here: [https://github.com/13hakta/FileAttach](https://github.com/13hakta/FileAttach)

## Chunk FileAttachTpl

Allows to customize view of file item output.

| Name               | Description                                               |
|------------------- | --------------------------------------------------------- |
| **&description**   | Description                                               |
| **&docid**         | Resource ID, where file uploaded                          |
| **&download**      | Download count                                            |
| **&hash**          | SHA1 checksum                                             |
| **&id**            | File ID                                                   |
| **&internal_name** | Internal name. File name in file system                   |
| **&name**          | File name. When private=false internal_name equal to name |
| **&path**          | Path in media source                                      |
| **&private**       | Privacy flag                                              |
| **&rank**          | Order in file list. May be used for custom sorting        |
| **&size**          | File size in bytes                                        |

Initial chunk content:

```
<p>[[+description:notempty=`<strong>[[+description]]</strong><br/>`]]
<a href="[[+url]]">[[+name]]</a> <span class="badge">[[+download]]</span>
[[+size:notempty=`<br/><small>Size: [[+size]] bytes</small>`]]
[[+hash:notempty=`<br/><small>SHA1: [[+hash]]</small>`]]</p>
```

## Snippet FileAttach

Outputs file list.

| Name                 | Default value | Description                                                                                                                 |
| -------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **&limit**           | 0             | The number of files to limit per page. Show all items if not set                                                            |
| **&makeURL**         | false         | Generate URL for file download                                                                                              |
| **&outputSeparator** |               | A string to separate each row with.                                                                                         |
| **&privateUrl**      | false         | Force private url. Allows to count downloads even with open files                                                           |
| **&resource**        | 0             | Show files for resource id                                                                                                  |
| **&showSize**        | false         | Retrieve file size                                                                                                          |
| **&sortBy**          | name          | The field to sort by.                                                                                                       |
| **&sortDir**         | ASC           | The direction to sort by.                                                                                                   |
| **&toPlaceholder**   | false         | If set, will output the content to the placeholder specified in this property, rather than outputting the content directly. |
| **&tpl**             | FileAttachTpl | The chunk to use for each row of files.                                                                                     |

## Class FileItem

### Methods

| Name             | Description                                         | Arguments         |
| ---------------- | --------------------------------------------------- | ----------------- |
| **generateName** | Generate new filename                               | length (int) = 32 |
| **getFullPath**  | Get full file path                                  |                   |
| **getPath**      | Get file path relatively to media source root       |                   |
| **getSize**      | Get file size                                       |                   |
| **getUrl**       | Get file link                                       |                   |
| **rename**       | Rename file                                         | name (str)        |
| **sanitizeName** | Filter unacceptable symbol combination in file name | name (str)        |
| **setPrivate**   | Set privacy mode                                    | private (bool)    |

## System options

| Name             | Default value | Description                                       |
| ---------------- | ------------- | ------------------------------------------------- |
| **calchash**     | false         | Calculate file hash at upload                     |
| **files_path**   |               | Path relative to media source root. Ends with "/" |
| **mediasource**  | 1             | Media source ID                                   |
| **private**      | false         | Make file private at upload                       |
| **put_docid**    | false         | Upload file in subfolder with resource ID         |
| **templates**    |               | List of templates to activate module              |
| **user_folders** | false         | Upload file in user ID subfolder                  |

## Connector for file download

Private file are downloaded through connector, what allows to hide direct link and and count downloads.
It's available to download opened files through connector by calling snippet with **&privateUrl**=`1`, in this case connector will redirect to direct link.

Connector link looks like: `MODX_ASSETS_URL/components/fileattach/connector.php?action=web/download&ctx=web&id=file_id`,
where file_id - sequential file ID in DB table.

## Access policies

### Permissions list

| Name                     | Description                  |
| ------------------------ | ---------------------------- |
| **fileattach.doclist**   | Manage files in resource     |
| **fileattach.download**  | Permission to download files |
| **fileattach.totallist** | Manage all files             |

## Usage example

In simple case just call snippet:

```
[[FileAttach]]
```

To force download count it's needed to open files through private link:

```
[[FileAttach? &privateUrl=`1`]]
```

Custom sorting:

```
[[FileAttach? &sortby=`rank`]]
```

## Screenshots

- File list in manager
[![File list in manager](http://modstore.pro/assets/uploadify/7/d/0/7d0f1263e99423f3aafb4d4acfadab1es.jpg)](http://modstore.pro/assets/uploadify/7/d/0/7d0f1263e99423f3aafb4d4acfadab1e.png)

- Media source tree
[![Media source tree](http://modstore.pro/assets/uploadify/7/e/c/7ec6d5cfd2eda4b6beecacbb9dccf137s.jpg)](http://modstore.pro/assets/uploadify/7/e/c/7ec6d5cfd2eda4b6beecacbb9dccf137.jpg)

- File editor
[![File editor](http://modstore.pro/assets/uploadify/a/7/3/a73f632567a372e4798d4e8a46e6ed66s.jpg)](http://modstore.pro/assets/uploadify/a/7/3/a73f632567a372e4798d4e8a46e6ed66.jpg)

- Editor in admin mode
[![Editor in admin mode](http://modstore.pro/assets/uploadify/1/1/e/11e65bc91ab8d98697fa7131d1ef0dces.jpg)](http://modstore.pro/assets/uploadify/1/1/e/11e65bc91ab8d98697fa7131d1ef0dce.jpg)

- File list in frontend
[![File list in frontend](http://modstore.pro/assets/uploadify/7/d/0/7d0f1263e99423f3aafb4d4acfadab1es.jpg)](http://modstore.pro/assets/uploadify/7/d/0/7d0f1263e99423f3aafb4d4acfadab1e.png)

- Upload dialog window
[![Upload dialog window](http://modstore.pro/assets/uploadify/d/8/e/d8e762da9506a5a6b17bf895e7b9b512s.jpg)](http://modstore.pro/assets/uploadify/d/8/e/d8e762da9506a5a6b17bf895e7b9b512.png)
