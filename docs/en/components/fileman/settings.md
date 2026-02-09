# Settings

Component settings are in **System settings**, namespace **fileman**.

| Setting              | Default                                                    | Description                                                                                                                                                       |
|----------------------|------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| fileman_auto_title   | Yes                                                        | Auto-generate title from file name (without extension) on upload                                                                                                  |
| fileman_calchash     | No                                                         | Compute SHA1 hash of the file on upload                                                                                                                           |
| fileman_grid_fields  | id, thumb, name, title, description, group, private, download | Comma-separated list of fields shown in the file list                                                                                                        |
| fileman_mediasource  | 1                                                          | Media source used by the component                                                                                                                                |
| fileman_path         | files/{resource}/                                          | Path inside the file source. Must end with "/". Supports {year}, {month}, {day}, {user}, {resource}. E.g. files/{resource}/{year}/.                               |
| fileman_pdotools     | No                                                         | Use pdoTools parser and Fenom. See Snippets / fmFiles for details                                                                                                 |
| fileman_private      | No                                                         | By default save files with random names so they cannot be accessed by name. Download count is only for private files.                                             |
| fileman_templates    | empty                                                      | Comma-separated list of template IDs; the "Files" tab is shown for resources with these templates                                                                |
