WebDAVMediaSource is a network media source for MODx Revolution.

Supported operations:

- List directory
- Upload files
- Create file
- Edit file
- Delete directory/file
- Drag&drop items in tree
- Cache directory listing and file meta
- Proxify download requests to remote storage

Supports MySQL and SQLSrv DB schemes. Works with WebDAV v1 protocol. Recently no locking is supported.

Tested with SabreDAV, CloudMe.com, Yandex Disk.

## Options

| Name                 | Default value                              | Description                                                                                                                                                  |
| -------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **allowedFileTypes** |                                            | If set, will restrict the files shown to only the specified extensions. Please specify in a comma-separated list, without the dots preceding the extensions. |
| **authMethod**       |                                            | Authorization method: basic or digest. Select method supported on a server.                                                                                  |
| **basePath**         |                                            | The file path to point the Source to.                                                                                                                        |
| **baseUrl**          |                                            | The URL that this source can be accessed from. Ignored if proxified.                                                                                         |
| **cached**           | false                                      | Cache directory listing and file meta.                                                                                                                       |
| **cacheTime**        | 10                                         | Hold cached data for period in minutes.                                                                                                                      |
| **imageExtensions**  | jpg,jpeg,png,gif                           | A comma-separated list of file extensions to use as images. MODX will attempt to make thumbnails of files with these extensions.                             |
| **login**            |                                            | Login name                                                                                                                                                   |
| **password**         |                                            | Password                                                                                                                                                     |
| **preview**          | false                                      | Generate thumbnails for images. May heavily load network traffic as it needs to get whole remote file. Enable with care.                                     |
| **proxy**            | false                                      | Proxify download requests                                                                                                                                    |
| **server**           |                                            | Server address. Specify as: http[s]://host[:port]                                                                                                            |
| **skipFiles**        | .svn,.git,_notes,nbproject,.idea,.DS_Store | A comma-separated list. MODX will skip over and hide files and folders that match any of these.                                                              |
| **thumbnailQuality** | 90                                         | The quality of the rendered thumbnails, in a scale from 0-100.                                                                                               |
| **thumbnailType**    | png                                        | The image type to render thumbnails as.                                                                                                                      |
| **verifySSL**        | true                                       | Check host and peer for SSL certificate                                                                                                                      |


## Permission security

| Name     | Description                 |
| -------- | --------------------------- |
| **load** | Ability to download objects |
