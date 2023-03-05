Open Source documentation for MODX Revolution

### Purpose
The main purpose of this documentation is to give the opportunity to contribute for everyone.
It is not needed to be logged in at once, to ask anybody for access, you simply send a commit to this repository, and it will be accepted.

We describe a 3rd party components and the core of MODX in two languages: Russian and English.
If you are ready to manage documentation in another language, please contact us by creating [issue][1].

### Format
All files are written in the [Markdown][2], the names are compatible with [daux.io][3].
At any moment you can clone this repository and deploy it on your server. Also you can read files directly on GitHub.


## Rules of drawing up documents

### Structure
The format of the repository is defined by the following structure:
1. Language version
2. Section
3. Theme
4. Further structure is defined depending on the theme
5. To specify the order of the directories and files, we use the numeric prefixes.

Here is the path to the file with the description of a snippet HybridAuth on English:
```
/en/02_Components/04_HybridAuth/01_Snippets/01_HybridAuth
```

### Headers
For the headlines we use hashtags \#\# and between them and the text put a space. For example: \#\# Header

Headlines should not be more h2, e.g - 2 hashtags \#\#:

* h2 = \#\#
* h3 = \#\#\#
* h4 = \#\#\#\#

Between the header and the text from the top and one blank line. Between the header and the text of the bottom blank line not needed.

### Links
Links to documents should be added to the end of the page to make it easy to search and update. In markdown this is accomplished by:
<pre>
[Link]&#91;1&#93;
[Name of another link]&#91;2&#93;

&#91;1&#93;: http://mylink.com/
&#91;2&#93;: http://mylink.com/test.html
</pre>

Among other things, this allows you to use one link multiple times on a page:
<pre>
[Link 1]&#91;1&#93;
[Link 2]&#91;1&#93;

&#91;1&#93;: http://mylink.com/
</pre>

Links to pages of the repository should start with a leading slash which specifies the root, then you can go directly on GitHub:
<pre>
[Link to the english section of pdoTools]&#91;3&#93;

&#91;3&#93;: /en/01_Components/01_pdoTools
</pre>
Easier to open the desired page on GitHub and copy the address from the url.

The image links can be inserted directly in the text. To specify the image, and use the service on [file.modx.pro][4] (requires authorization).
It automatically generates thumbnail and markdown code for insertion.
```
[![](https://file.modx.pro/files/8/5/3/85333575318f1fb2e7fe2881eb25559as.jpg)](https://file.modx.pro/files/8/5/3/85333575318f1fb2e7fe2881eb25559a.png)
```

[![](https://file.modx.pro/files/9/1/3/9133c7c64f340c967fa9c6dba57cd2f9s.jpg)](https://file.modx.pro/files/9/1/3/9133c7c64f340c967fa9c6dba57cd2f9.png)

### Highlighting
System settings need to use bold text, for example: \*\*&parametr\*\* will look like **&parametr**.

Placeholders wrapped in single reverse apostrophes. For example: \`[[+placeholder]]\` will look like `[[+placeholder]]`.

For block with code we using 3 reverse apostrophe \`\`\` before and after:
<pre>
&#96;&#96;&#96;
Here is the code
&#96;&#96;&#96;
</pre>

The code starts from the new line. Blank lines before and after the code voluntarily.

### Newline
For making the forced line break you need to add two spaces at the end of the line. Parser will replace them with the tag `br`.

### Tables
You can use tables for easy display data, such as snippet properties:
```
First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell
```

First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell


[1]: https://github.com/bezumkin/Docs/
[2]: http://daringfireball.net/projects/markdown/syntax
[3]: http://daux.io
[4]: https://file.modx.pro
