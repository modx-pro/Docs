# Модификаторы для работы со строками

## `cat`

Добавляет значение после тега.

```modx
[[+numbooks:cat=`книг`]]
```

## `lcase`, `lowercase`, `strtolower` {#lcase}

Переводит все буквы в нижний регистр.

```modx
[[+title:lcase]]
```

## `ucase`, `uppercase`, `strtoupper` {#ucase}

Переводит все буквы в верхний регистр.

```modx
[[+headline:ucase]]
```

## `ucwords`

Делает первую букву в словах заглавной.

```modx
[[+title:ucwords]]
```

## `ucfirst`

Делает первую букву в строке заглавной.

```modx
[[+name:ucfirst]]
```

## `htmlent`, `htmlentities` {#htmlent}

Преобразует все символы в соответствующие HTML-сущности.

```modx
[[+email:htmlent]]
```

## `esc`, `escape` {#esc}

Безопасно экранирует символы, используя регулярные выражения и `str_replace()`. Также экранирует теги MODX.

```modx
[[+email:escape]]
```

## `strip`

Заменяет все переносы, табуляции и любое количество пробелов только одним пробелом.

```modx
[[+textdocument:strip]]
```

## `stripString`

Вырезает из строки указанную подстроку.

```modx
[[+name:stripString=`Mr.`]]
```

## `replace`

Производит замену подстрок.

```modx
[[+pagetitle:replace=`Mr.==Mrs.`]]
```

## `striptags`, `stripTags`, `notags`, `strip_tags` {#notags}

Вырезает все теги (можно указать разрешенные теги). Не используйте для обеспечения безопасности.

```modx
[[+code:strip_tags]]
```

## `len`, `length`, `strlen` {#strlen}

Выводит длину строки.

```modx
[[+longstring:strlen]]
```

## `reverse`, `strrev` {#reverse}

Переворачивает строку символ за символом.

```modx
[[+mirrortext:reverse]]
```

## `wordwrap`

Вставляет перенос строки после каждого n-ого символа (слова не разбиваются).

```modx
[[+bodytext:wordwrap=`80`]]
```

## `wordwrapcut`

Вставляет перенос строки после каждого n-ого символа, даже если этот символ будет внутри слова.

```modx
[[+bodytext:wordwrapcut=`80`]]
```

## `limit`

Выводит определенное количество символов с начала строки.

- По умолчанию: `100`

```modx
[[+description:limit=`50`]]
```

## `ellipsis`

Добавляет многоточие и обрезает строку, если она длиннее, чем указанное количество символов.

- По умолчанию: `100`

```modx
[[+description:ellipsis=`50`]]
```

## `tag`

Экранирование. Отображает элемент так как он есть, без `:tag`. Для использования в документации.

```modx
[[+showThis:tag]]
```

## `add`, `increment`, `incr` {#add}

Прибавляет указанное число.

- По умолчанию: `+1`

```modx
[[+downloads:incr]] [[+blackjack:add=`21`]]
```

## `subtract`, `decrement`, `decr` {#decr}

Вычитает указанное число.

- По умолчанию: `-1`

```modx
[[+countdown:decr]] [[+moneys:subtract=`100`]]
```

## `multiply`, `mpy` {#mpy}

Умножает на указанное число.

- По умолчанию: `*2`

```modx
[[+trifecta:mpy=`3`]]
```

## `divide`,`div` {#div}

Делит на указанное число.

- По умолчанию: `/2`

```modx
[[+rating:div=`4`]]
```

## `modulus`,`mod` {#mod}

Возвращает модуль числа.

- По умолчанию: `%2`
- Возвращает: `0 | 1`

```modx
[[+number:mod]]
```

## `ifempty`,`default`,`empty`, `isempty` {#default}

Возвращает значение модификатора, если значение тега пусто.

```modx
[[+name:default=`anonymous`]]
```

## `notempty`, `!empty`, `ifnotempty`, `isnotempty` {#notempty}

Возвращает значение модификатора, если значение тега **не** пусто.

```modx
[[+name:notempty=`Hello [[+name]]!`]]
```

## `nl2br`

Заменяет символы новой строки `\n` на HTML-тег `br`.

```modx
[[+textfile:nl2br]]
```

## `date`

Переводит таймстамп в текст, в соответствии с указанным форматом (формат даты).

```modx
[[+birthyear:date=`%Y`]]
```

## `strtotime`

Переводит дату в виде текста в UNIX таймстамп.

```modx
[[+thetime:strtotime]]
```

## `fuzzydate`

Принимает таймстамп и возвращает дату в виде "Сегодня в 16:20 PM".

```modx
[[+createdon:fuzzydate]]
```

## `ago`

Возвращает число секунд, минут, недель или месяцев, прошедших с даты, указанной в теге.

```modx
[[+createdon:ago]]
```

## `md5`

Создаёт MD5-хеш значения.

```modx
[[+password:md5]]
```

## `cdata`

Оборачивает вывод тегами CDATA.

```modx
[[+content:cdata]]
```

## `userinfo`

Возвращает запрашиваемое значение из профиля пользователя. Необходимо указывать ID пользователя.

```modx
[[!+modx.user.id:userinfo=`username`]]
```

Подробнее о данном модификаторе можно узнать по [ссылке](/system/basics/modifiers/userinfo).

## `isloggedin`

Возвращает 1, если пользователь авторизован в текущем контексте.

```modx
[[!+modx.user.id:isloggedin:is=`1`:then=`Yes`:else=`No`]]
```

## `isnotloggedin`

Возвращает 1, если пользователь **не**авторизован в текущем контексте.

```modx
[[!+modx.user.id:isnotloggedin:is=`1`:then=`No`:else=`Yes`]]
```

## `urlencode`

Конвертирует значение как URL, то есть применяет PHP функцию `urlencode()`.

```modx
[[+mystring:urlencode]]
```

## `urldecode`

Конвертирует значение как из URL, то есть применяет PHP функцию `urldecode()`.

```modx
[[+myparam:urldecode]]
```

::: warning
Модификаторы для работы с пользователями нужно вызывать некэшированными, чтобы каждый юзер видел актуальные данные.
:::
