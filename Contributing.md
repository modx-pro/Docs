
# Правила оформления документации

## Структура

Формат репозитория определяется следующей структурой:

1. Языковая версия
2. Раздел
3. Тема
4. Дальше структура определяется в зависимости от темы
5. Чтобы указать порядок директорий и файлов, мы используем числовые префиксы.

Вот путь к файлу с описанием сниппета HybridAuth на русском:

``` php
/ru/01_Компоненты/04_HybridAuth/01_Сниппеты/01_HybridAuth
```

## Заголовки

Для заголовков мы используем хештэги \#\# и между ними и текстом ставим пробел. Например: \#\# Заголовок

Заголовки должны быть не больше h2, то есть, 2 решетки \#\#:

* h2 = \#\#
* h3 = \#\#\#
* h4 = \#\#\#\#

Между заголовком и текстом сверху оставляется одна пустая строка. Между заголовком и текстом снизу отступов делать не нужно.

## Ссылки

Ссылки на документы нужно проставлять в конце страницы, чтобы их было удобно искать и обновлять. В markdown это делается так:

``` php
[Название ссылки][1]
[Название другой ссылки][2]

[1]: http://mylink.com/
[2]: http://mylink.com/test.html
```

Помимо прочего, это позволяет использовать одну ссылку несколько раз на странице:

``` php
[Ссылка 1][1]
[Ссылка 2][2]

[1]: http://mylink.com/
```

Ссылки на страницы репозитория необходимо указывать от корня, с ведущим слешем, тогда по ним можно переходить прямо на GitHub:

``` php
[Ссылка на русский раздел pdoTools][3];

[3]: /ru/01_Компоненты/01_pdoTools
```

Проще всего открывать нужную страницу на GitHub и копировать адрес из url.

Ссылки на изображения можно вставлять сразу в тексте. Для указания изображений лучше использовать сервис на [file.modx.pro][1] (требует авторизацию).
Он автоматически сгенерирует уменьшенную копию и код markdown для вставки.

``` php
[![](https://file.modx.pro/files/8/5/3/85333575318f1fb2e7fe2881eb25559as.jpg)](https://file.modx.pro/files/8/5/3/85333575318f1fb2e7fe2881eb25559a.png)
```

[![](https://file.modx.pro/files/9/1/3/9133c7c64f340c967fa9c6dba57cd2f9s.jpg)](https://file.modx.pro/files/9/1/3/9133c7c64f340c967fa9c6dba57cd2f9.png)

## Выделение

Cистемные параметры нужно выделять жирным текстом, например: \*\*&parametr\*\* будет выглядеть, как **&parametr**.

Плейсхолдеры оборачиваются в одинарные обратные апострофы. Например: \`[[+placeholder]]\` будет выглядеть, как `[[+placeholder]]`.

Для обрамления кода нужно использовать 3 обратных апострофа  \`\`\` перед секцией кода, и после:

``` plain
Здесь код
```

Сам код начинается с новой строки. Пустые строки до и после кода - по желанию.

## Таблицы

Вы можете использовать таблицы для удобного отображения различных данных, например параметров какого-то сниппета:

``` table
First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell
```

First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell

======================================

# Rules of drawing up documents

## Structure

The format of the repository is defined by the following structure:

1. Language version
2. Section
3. Theme
4. Further structure is defined depending on the theme
5. To specify the order of the directories and files, we use the numeric prefixes.

Here is the path to the file with the description of a snippet HybridAuth on English:

``` php
/en/01_Components/04_HybridAuth/01_Snippets/01_HybridAuth
```

## Headers

For the headlines we use hashtags \#\# and between them and the text put a space. For example: \#\# Header

Headlines should not be more h2, e.g - 2 hashtags \#\#:

* h2 = \#\#
* h3 = \#\#\#
* h4 = \#\#\#\#

Between the header and the text from the top and one blank line. Between the header and the text of the bottom blank line not needed.

## Links

Links to documents need to set at the end of the page to make it searchable and update. In markdown this is accomplished by:

``` php
[Link][1]
[Name of another link][2]

[1]: http://mylink.com/
[2]: http://mylink.com/test.html
```

Among other things, this allows you to use one link multiple times on a page:

``` php
[Link 1][1]
[Link 2][2]

[1]: http://mylink.com/
```

Links to pages of the repository, you must specify the root, with a leading slash, then you can go directly on GitHub:

``` php
[Link to the english section of pdoTools][3];

[3]: /en/01_Components/01_pdoTools
```

Easier to open the desired page on GitHub and copy the address from the url.

The image links can be inserted directly in the text. To specify the image, and use the service on [file.modx.pro][1] (requires authorization).
It automatically generates thumbnail and markdown code for insertion.

``` php
[![](https://file.modx.pro/files/8/5/3/85333575318f1fb2e7fe2881eb25559as.jpg)](https://file.modx.pro/files/8/5/3/85333575318f1fb2e7fe2881eb25559a.png)
```

[![](https://file.modx.pro/files/9/1/3/9133c7c64f340c967fa9c6dba57cd2f9s.jpg)](https://file.modx.pro/files/9/1/3/9133c7c64f340c967fa9c6dba57cd2f9.png)

## Highlighting

System settings need to use bold text, for example: \*\*&parametr\*\* will look like **&parametr**.

Placeholders wrapped in single reverse apostrophes. For example: \`[[+placeholder]]\` will look like `[[+placeholder]]`.

For block with code we using 3 reverse apostrophe \`\`\` before and after:

``` plain
Here is the code
```

The code starts from the new line. Blank lines before and after the code voluntarily.

## Tables

You can use tables for easy display data, such as snippet properties:

``` table
First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell
```

First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell

[1]: https://file.modx.pro