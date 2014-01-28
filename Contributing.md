Правила оформления документации
-------------------------------

### Структура
Формат репозитория определяется следующей структурой:
1. Языковая версия
2. Раздел
3. Тема
4. Дальше структура определяется в зависимости от темы
5. Чтобы указать порядок директорий и файлов, мы используем числовые префиксы.

Вот путь к файлу с описанием сниппета HybridAuth на русском:
```
/ru/01_Компоненты/04_HybridAuth/01_Сниппеты/01_HybridAuth
```

### Заголовки
Для заголовков мы используем хештэги \#\# и между ними и текстом ставим пробел. Например: \#\# Заголовок

Заголовки должны быть не больше h2, то есть, 2 решетки \#\#:

* h2 = \#\#
* h3 = \#\#\#
* h4 = \#\#\#\#

Между заголовком и текстом сверху оставляется одна пустая строка. Между заголовком и текстом снизу отступов делать не нужно.

### Ссылки
Ссылки на документы нужно проставлять в конце страницы, чтобы их было удобно искать и обновлять. В markdown это делается так:
<pre>
[Название ссылки]&#91;21&#93;
[Название другой ссылки]&#91;2&#93;

&#91;1&#93;: http://mylink.com/
&#91;2&#93;: http://mylink.com/test.html
</pre>

Помимо прочего, это позволяет использовать одну ссылку несколько раз на странице:
<pre>
[Ссылка 1]&#91;1&#93;
[Ссылка 2]&#91;2&#93;

&#91;1&#93;: http://mylink.com/
</pre>

Ссылки на страницы репозитория необходимо указывать от корня, с ведущим слешем, тогда по ним можно переходить прямо на GitHub:
<pre>
[Ссылка на русский раздел pdoTools]&#91;3&#93;

&#91;3&#93;: /ru/01_Компоненты/01_pdoTools
</pre>

Проще всего открывать нужную страницу на GitHub и копировать адрес из url.

Ссылки на изображения можно вставлять сразу в тексте. Для указания изображений лучше использовать сервис на [st.bezumkin.ru][1] (требует авторизацию).
Он автоматически сгенерирует уменьшенную копию и код markdown для вставки.
```
[![](http://st.bezumkin.ru/files/8/5/3/85333575318f1fb2e7fe2881eb25559as.jpg)](http://st.bezumkin.ru/files/8/5/3/85333575318f1fb2e7fe2881eb25559a.png)
```

[![](http://st.bezumkin.ru/files/9/1/3/9133c7c64f340c967fa9c6dba57cd2f9s.jpg)](http://st.bezumkin.ru/files/9/1/3/9133c7c64f340c967fa9c6dba57cd2f9.png)

### Выделение
Cистемные параметры нужно выделять жирным текстом, например: \*\*&parametr\*\* будет выглядеть, как **&parametr**.

Плейсхолдеры оборачиваются в одинарные обратные апострофы. Например: \`[[+placeholder]]\` будет выглядеть, как `[[+placeholder]]`.

Для обрамления кода нужно использовать 3 обратных апострофа  \`\`\` перед секцией кода, и после:
<pre>
&#96;&#96;&#96;
Здесь код
&#96;&#96;&#96;
</pre>

Сам код начинается с новой строки. Пустые строки до и после кода - по желанию.

### Таблицы
Вы можете использовать таблицы для удобного отображения различных данных, например параметров какого-то сниппета:
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



======================================



Rules of drawing up documents
-----------------------------

### Structure
The format of the repository is defined by the following structure:
1. Language version
2. Section
3. Theme
4. Further structure is defined depending on the theme
5. To specify the order of the directories and files, we use the numeric prefixes.

Here is the path to the file with the description of a snippet HybridAuth on English:
```
/en/01_Components/04_HybridAuth/01_Snippets/01_HybridAuth
```

### Headers
For the headlines we use hashtags \#\# and between them and the text put a space. For example: \#\# Header

Headlines should not be more h2, e.g - 2 hashtags \#\#:

* h2 = \#\#
* h3 = \#\#\#
* h4 = \#\#\#\#

Between the header and the text from the top and one blank line. Between the header and the text of the bottom blank line not needed.

### Links
Links to documents need to set at the end of the page to make it searchable and update. In markdown this is accomplished by:
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

Links to pages of the repository, you must specify the root, with a leading slash, then you can go directly on GitHub:
<pre>
[Link to the english section of pdoTools]&#91;3&#93;

&#91;3&#93;: /en/01_Components/01_pdoTools
</pre>
Easier to open the desired page on GitHub and copy the address from the url.


The image links can be inserted directly in the text. To specify the image, and use the service on [st.bezumkin.ru][1] (requires authorization).
It automatically generates thumbnail and markdown code for insertion.
```
[![](http://st.bezumkin.ru/files/8/5/3/85333575318f1fb2e7fe2881eb25559as.jpg)](http://st.bezumkin.ru/files/8/5/3/85333575318f1fb2e7fe2881eb25559a.png)
```

[![](http://st.bezumkin.ru/files/9/1/3/9133c7c64f340c967fa9c6dba57cd2f9s.jpg)](http://st.bezumkin.ru/files/9/1/3/9133c7c64f340c967fa9c6dba57cd2f9.png)

### Highlighting
System settings need to use bold text, for example: \*\*&parametr\*\* will look like **&parametr**.

Зlaceholders wrapped in single reverse apostrophes. For example: \`[[+placeholder]]\` will look like `[[+placeholder]]`.

For block with code we using 3 reverse apostrophe \`\`\` before and after:
<pre>
&#96;&#96;&#96;
Here is the code
&#96;&#96;&#96;
</pre>

The code starts from the new line. Blank lines before and after the code voluntarily.

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


[1]: http://st.bezumkin.ru