# Snippets

## Create / Edit snippet

A snippet is a piece of PHP code that processes data.
To create a snippet you must set a name and provide the snippet code. You can set a site mask — the snippet will then be looked up automatically by URL.

![Create / Edit snippet](https://file.modx.pro/files/a/6/b/a6b22899f14deac867ab4aa831e01094.png)

You can add your own handlers for fetching and parsing data; the corresponding snippet classes handle this.
The `static` flag loads the snippet code from a file.

The snippet must return an array of loaded data, which is then used for **creating**/**updating** the resource.
