A component as a unit goes with plugin **pagebreaker** for TinyMCE (TypoMCE), which is automatically installed and activated.

[![](https://file.modx.pro/files/1/0/7/107a1db721d445261fef7fd5d707e80ds.jpg)](https://file.modx.pro/files/1/0/7/107a1db721d445261fef7fd5d707e80d.png)

Plugin adds 4 buttons to the toolbar.

* Manual burst. Specify a delimiter on the place of cursor.
* Automatic burst through indicated quantity of characters.
* Automatic burst after every 2000 characters.
* Delimiter cleanup.

In addition, it shows the places where delimiters were specified.

## Automatic burst
Auto burst functions by sections. At first text is divided by tags p, then content of each block is sampled and divided into pages.

E.g., you have 10 sections in text, each of them content 1500 characters. If you indicated to lay out this page every 2000 characters, then you will get 5 pages.

* Page is laid out by 10 sections.
* The first section is less than 2000 characters – it goes to the first page.
* The second section + the first section = 3000 characters, it is over the limit, thus delimiter is put after adding the second section to the first page.

Thus 10 sections will turn into 5 pages. If you do not like the burst of a document – you can delete all delimiters and indicate a new quantity of characters for auto burst.

Apparently, if there is no tags p in the text, auto burst wont function. However, using TinyMCE, sections are set by enter. IAC, you can put delimiters manually.

## Installation and deletion
Installation is fully automatic. PageBreaker copies its extention into editors, enables and adds buttons to the third row of buttons itself.

Deleting a component, its extention for editors is also deleted together with all overpatching of settings.

I.e. you do not need to do anything – everything is fully automatic.
