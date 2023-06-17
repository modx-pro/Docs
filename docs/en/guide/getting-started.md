---
lastUpdated: false
---
# Getting Started

This service is linked to our [github repository][repository]. Any changes made to the repository are displayed on the site.

From the inside, the project is a VUE application, with a VitePress plugin that converts md markup into beautiful HTML.
VitePress also provides tools that spruce up the strict style of md markup.

All you need is to change the text inside a specific *.md file (or create a new file/directory) and send a Pull Request with your changes.

You can change or add new text in different ways.
The easiest way is to do it right inside github. It has enough tools for working with text.
But to track the quality of the changes (especially if you add visual design to the text) will not work. You need to deploy the project locally on your computer.

## Easiest way to make changes to the documentation

The quickest and easiest way to make small edits is to do it right inside the [github repository][repository].

::: info INFO
You must have a GitHub account ([simple signup](https://github.com/signup)).
:::

Select the required file for editing in the `docs/components/` directory.

## Recommended way to make changes to the documentation

::: info INFO
For the recommended way, you will need git skills (clone, fetch, add, commit, push), as well as an npm or yarn package manager installed on your computer.
Knowledge and skills of working with VUE are not required.
:::

::: tip TIP
Link to step by step instructions
[How to correctly send a Pull Request to someone else's project](https://gist.github.com/AgelxNash/a030d9c080eda4a3791e#file-pull-request-md)
:::

1. Sign up for GitHub if you don't have an account.
2. Fork the repository.

    [![](https://file.modx.pro/files/6/1/2/612882dad02d9ba59041e114f060b9b5s.jpg)](https://file.modx.pro/files/6/1/2/612882dad02d9ba59041e114f060b9b5.png)

    ::: warning WARNING
    If you already have a documentation fork, be sure to sync it to get the latest changes.
    :::

3. Clone your fork to your computer.

    ```shell
    git clone https://github.com/your-fork/Docs.git
    ```

4. It is recommended to create a separate branch for the changes you make, but this is not required.
5. If you want to preview your changes on your computer (recommended) before submitting a Pull Request, install the required dependencies.

    ::: code-group

    ```shell [npm]
    npm install
    npm run dev
    ```

    ```shell [yarn]
    yarn install
    yarn dev
    ```

    :::

6. Make the required changes to the existing documentation file or create a new one.
7. Add your changes to git by creating a new commit.

    ```shell
    git add .
    git commit -m "new change in my extra"
    git push -u origin 999-your-branch-name
    ```

## Structure of the documentation

All documentation is located in the `docs` directory.

```
📦docs
 ┣ 📂components     - extras documentation
 ┣ 📂faq            - ready-made solutions, blanks for frequently encountered tasks
 ┣ 📂guide          - documentation for documentation
 ┣ 📂system         - MODX documentation
 ┣ 📂en             - english language documentation
 ┃ ┣ 📂components
 ┣ 📂public         - logos, images used within the project
 ┗ 📜authors.json   - list of authors
```

The documentation for extras in the `docs/components` directory is organized as follows:

You can create one single file with the name of the extra and the extension `.md` (for example `ajaxform.md`) and place all the necessary information in it.

You can create a directory with the name of the extra and place any number of `.md` files inside, according to the theme of your extra.
In this case, the main required file will be `index.md`, which will contain links to other page files.

::: info Naming requirements for files and folders
Use concise file and folder names (for example, use `settings` instead of `system-settings`).

Use latin letters.
Use only lowercase words.
Do not use punctuation other than a hyphen (use to link words).
:::

## plop generator

For those who want to add new documentation of the extra to the project, the [plop] generator script is integrated.

### Instructions

1. After installing the dependencies, you need to enter the following command in the terminal:
    ::: code-group

    ```sh [npm]
    npm run generate
    ```

    ```sh [yarn]
    yarn generate
    ```

    :::
2. So you will run the CLI helper and you will see the following message. Use the [[&uarr;]] and [[&darr;]] keys to select the desired language and press [[Enter]]:

    ```sh
    $ plop
    ? Выберите язык / Choose language (Use arrow keys)
      Русский
    > English
    ```

3. Next, you will be asked to select a documentation template, there are two of them: **Single-page** and **Multi-page documentation**. Select the one you want and press [[Enter]].

    ```sh
    $ plop
    ? Выберите язык / Choose language English
    ? Choose documentation template (Use arrow keys)
      Single-page documentation
    > Multi-page documentation
    ```

4. Now you need to give your extra a name and press [[Enter]] as well.

    ```sh
    $ plop
    ? Выберите язык / Choose language English
    ? Choose documentation template Multi-page documentation
    ? Enter the component name
    ```

5. Finally, you will need to select the language versions of the documentation. By using the [[&uarr;]] and [[&darr;]] keys and pressing the [[Space]] you can mark the languages you need. Then press the [[Enter]] button.

    ```sh
    $ plop
    ? Выберите язык / Choose language English
    ? Choose documentation template Multi-page documentation
    ? Enter the component name myFirstComponent
    ? Select the language versions of the documentation (Press <space> to select, <a> to toggle all, <i> to invert
    selection, and <enter> to proceed)
     ( ) Русский
    >(*) English
    ```

6. **Done!** You will see something like this in the terminal. This means that the script has created the necessary structure, and you will have to fill out the documentation for your extra.

    ```sh
    $ plop
    ? Выберите язык / Choose language English
    ? Choose documentation template Multi-page documentation
    ? Enter the component name myFirstComponent
    ? Select the language versions of the documentation English
    ✔  +! 8 files added
    -> \docs\components\myfirstcomponent\events.md
    -> \docs\components\myfirstcomponent\index.md
    -> \docs\components\myfirstcomponent\quick-start.md
    -> \docs\components\myfirstcomponent\interface\categories.md
    -> \docs\components\myfirstcomponent\interface\items.md
    -> \docs\components\myfirstcomponent\snippets\getcategories.md
    -> \docs\components\myfirstcomponent\snippets\getitems.md
    -> \docs\components\myfirstcomponent\snippets\index.md
    Done in 1071.49s.
    ```

    ::: tip TIP
    Of course, you can change the structure, add or change files and directories, the script is intended only for quick deployment of the template structure of the documentation of extra.
    :::

[plop]: https://github.com/plopjs/plop
[repository]: https://github.com/modx-pro/Docs
