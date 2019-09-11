Beginning from the version 2.0 ms2Gallery can integrate with different addons.

## miniShop2
Replacing the standard ms2 gallery gives you the following: 
1. Uniformity with other pages. 
2. The possibility to turn off files without having to delete them.
3. Additional fields for files.
4. Tags of files (with a reservation).

For correct work you need:
1. Update miniShop2 to the version **2.4.8-pl**.
2. Turn on system setting **ms2gallery_sync_ms2**.
3. Import images from ms2 to ms2Gallery through the console script `core/components/ms2gallery/cli/import_ms2.php`
4. Check that the native gallery has hidden and that only ms2Gallery is shown with the source of files for goods (by default MS2 Images). It is very important that the new gallery takes on the old source, otherwise duplicates will be generated.

Please notice that the starting gallery is just hidden, but its records in the database will synchronize with the new one.
It is done for support of the native snippets like ms2 and side addons.

[![](https://file.modx.pro/files/a/a/7/aa7d937eb6536671e83b44e733b6cbc4s.jpg)](https://file.modx.pro/files/a/a/7/aa7d937eb6536671e83b44e733b6cbc4.png)

There is one particularity of which you are to know: if you import images into the old gallery through its native
processor, they will also be updated in the new gallery but the files' ids will be changed. 
Tags of files are attached to those ids and will be diverted in this case.

That is:
— if you commit all actions with files only through the admin space and processors ms2Gallery 
(and then synchronization works one-sidedly for the old gallery). 
— if you inport files through side addons to the old gallery, they will be synchronized with the new one and you just
will not use tags. 

## Tickets
Tickets do not have a gallery of their own. You do not see files loaded by the user in the admin space.

To compensate for this inconvenience you have to:
1. Update Tickets to the version **1.8.0-pl**.
2. Turn on system setting **ms2gallery_sync_tickets**.
3. Import tickets files into ms2Gallery through the console script `core/components/ms2gallery/cli/import_tickets.php`
4. Check that the gallery uses the right source of files (by default Tickets Files).

After that you will be able to load files into tickets from the frontend and see them in the admin space. Delete them, edit them, etc.

[![](https://file.modx.pro/files/3/5/d/35dd39bad850cf7b5ad7da4f2bc066bds.jpg)](https://file.modx.pro/files/3/5/d/35dd39bad850cf7b5ad7da4f2bc066bd.png)
[![](https://file.modx.pro/files/2/d/4/2d44c2350a51adb99f1f0d1e6c4e905fs.jpg)](https://file.modx.pro/files/2/d/4/2d44c2350a51adb99f1f0d1e6c4e905f.png)

You only have to remember that, if a link to a file is pasted into the content of the page, then when deleting through ms2Gallery
it will not be removed — so you have to look after this by yourself. Sorting for output through **TicketMeta** also has no influence here.

The tags situation is as with ms2. In all other cases we have normal double-sided files synchronization.
