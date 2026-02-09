# Interface

## Files tab

After installing the component, a new **Files** tab appears on the resource edit page, with a table of attached files and controls at the top.

[![](https://file.modx.pro/files/9/9/8/9981ae049804949173dcf32855e70b4bs.jpg)](https://file.modx.pro/files/9/9/8/9981ae049804949173dcf32855e70b4b.png)

The component provides two ways to attach files:

- From the user's computer, via the standard MODX file upload dialog;
- By URL, without saving the file to the computer first.

[![](https://file.modx.pro/files/b/d/8/bd82ccc44d5cda78e5e3eae2a42f3ed8s.jpg)](https://file.modx.pro/files/b/d/8/bd82ccc44d5cda78e5e3eae2a42f3ed8.png)

Bulk actions are available for files:

[![](https://file.modx.pro/files/9/c/f/9cfcdc6e12fe0043c2ca22f86f6bad38s.jpg)](https://file.modx.pro/files/9/c/f/9cfcdc6e12fe0043c2ca22f86f6bad38.png)

For images you can enable thumbnails (add `thumb` to the `fileman_grid_fields` setting):

[![](https://file.modx.pro/files/7/f/1/7f142cf09287a0cf17f73506367c7779s.jpg)](https://file.modx.pro/files/7/f/1/7f142cf09287a0cf17f73506367c7779.png)

## File edit window

After a file is uploaded, you can edit its metadata.

For each record you can set (database field name in parentheses):

- **Title** (title) – human-readable title for the file;
- **Description** (description) – detailed description;
- **Group** (group) – group files into sections (e.g. Documentation, Certificates, Catalogs);
- **File name** (name) – name used when downloading;
- **Private** (private) – file is not available by direct link and is served via the connector; enables download counting.

[![](https://file.modx.pro/files/f/9/6/f9643d1ecbede409ec92783e455e9fa5s.jpg)](https://file.modx.pro/files/f/9/6/f9643d1ecbede409ec92783e455e9fa5.png)

Some fields are stored but not editable: path, size, extension, internal_name, hash. You can use them in your snippets.

[![](https://file.modx.pro/files/8/2/3/8237cf70f2a6e95774f7114e5725b1d9s.jpg)](https://file.modx.pro/files/8/2/3/8237cf70f2a6e95774f7114e5725b1d9.png)

## Managing all attached files

Besides managing files on the resource page, there is a separate section under **Packages / FileMan** that lists all attached files site-wide.

The same actions are available there except uploading and sorting (those are resource-specific).
