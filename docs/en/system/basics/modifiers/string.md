# String modifiers

## `cat`

Appends a value after the tag.

```modx
[[+numbooks:cat=`books`]]
```

## `lcase`, `lowercase`, `strtolower` {#lcase}

Converts all letters to lowercase.

```modx
[[+title:lcase]]
```

## `ucase`, `uppercase`, `strtoupper` {#ucase}

Converts all letters to uppercase.

```modx
[[+headline:ucase]]
```

## `ucwords`

Capitalizes the first letter of each word.

```modx
[[+title:ucwords]]
```

## `ucfirst`

Capitalizes the first letter of the string.

```modx
[[+name:ucfirst]]
```

## `htmlent`, `htmlentities` {#htmlent}

Converts all characters to their HTML entities.

```modx
[[+email:htmlent]]
```

## `esc`, `escape` {#esc}

Safely escapes characters using regular expressions and `str_replace()`. Also escapes MODX tags.

```modx
[[+email:escape]]
```

## `strip`

Replaces all line breaks, tabs and any amount of spaces with a single space.

```modx
[[+textdocument:strip]]
```

## `stripString`

Removes the specified substring from the string.

```modx
[[+name:stripString=`Mr.`]]
```

## `replace`

Replaces substrings.

```modx
[[+pagetitle:replace=`Mr.==Mrs.`]]
```

## `striptags`, `stripTags`, `notags`, `strip_tags` {#notags}

Strips all tags (allowed tags can be specified). Do not use for security.

```modx
[[+code:strip_tags]]
```

## `len`, `length`, `strlen` {#strlen}

Outputs the length of the string.

```modx
[[+longstring:strlen]]
```

## `reverse`, `strrev` {#reverse}

Reverses the string character by character.

```modx
[[+mirrortext:reverse]]
```

## `wordwrap`

Inserts a line break after every n-th character (words are not split).

```modx
[[+bodytext:wordwrap=`80`]]
```

## `wordwrapcut`

Inserts a line break after every n-th character, even if that character is inside a word.

```modx
[[+bodytext:wordwrapcut=`80`]]
```

## `limit`

Outputs a given number of characters from the start of the string.

- Default: `100`

```modx
[[+description:limit=`50`]]
```

## `ellipsis`

Adds an ellipsis and truncates the string if it is longer than the specified number of characters.

- Default: `100`

```modx
[[+description:ellipsis=`50`]]
```

## `tag`

Escaping. Displays the element as-is, without `:tag`. For use in documentation.

```modx
[[+showThis:tag]]
```

## `add`, `increment`, `incr` {#add}

Adds the specified number.

- Default: `+1`

```modx
[[+downloads:incr]] [[+blackjack:add=`21`]]
```

## `subtract`, `decrement`, `decr` {#decr}

Subtracts the specified number.

- Default: `-1`

```modx
[[+countdown:decr]] [[+moneys:subtract=`100`]]
```

## `multiply`, `mpy` {#mpy}

Multiplies by the specified number.

- Default: `*2`

```modx
[[+trifecta:mpy=`3`]]
```

## `divide`,`div` {#div}

Divides by the specified number.

- Default: `/2`

```modx
[[+rating:div=`4`]]
```

## `modulus`,`mod` {#mod}

Returns the modulus.

- Default: `%2`
- Returns: `0 | 1`

```modx
[[+number:mod]]
```

## `ifempty`,`default`,`empty`, `isempty` {#default}

Returns the modifier value if the tag value is empty.

```modx
[[+name:default=`anonymous`]]
```

## `notempty`, `!empty`, `ifnotempty`, `isnotempty` {#notempty}

Returns the modifier value if the tag value is **not** empty.

```modx
[[+name:notempty=`Hello [[+name]]!`]]
```

## `nl2br`

Replaces newline characters `\n` with the HTML `br` tag.

```modx
[[+textfile:nl2br]]
```

## `date`

Formats a timestamp as text according to the specified date format.

```modx
[[+birthyear:date=`%Y`]]
```

## `strtotime`

Converts a date string to a UNIX timestamp.

```modx
[[+thetime:strtotime]]
```

## `fuzzydate`

Takes a timestamp and returns a date like "Today at 4:20 PM".

```modx
[[+createdon:fuzzydate]]
```

## `ago`

Returns the number of seconds, minutes, weeks or months since the date in the tag.

```modx
[[+createdon:ago]]
```

## `md5`

Creates an MD5 hash of the value.

```modx
[[+password:md5]]
```

## `cdata`

Wraps the output in CDATA tags.

```modx
[[+content:cdata]]
```

## `userinfo`

Returns the requested value from the user profile. The user ID must be specified.

```modx
[[!+modx.user.id:userinfo=`username`]]
```

See the [UserInfo modifier](/en/system/basics/modifiers/userinfo) for details.

## `isloggedin`

Returns 1 if the user is logged in to the current context.

```modx
[[!+modx.user.id:isloggedin:is=`1`:then=`Yes`:else=`No`]]
```

## `isnotloggedin`

Returns 1 if the user is **not** logged in to the current context.

```modx
[[!+modx.user.id:isnotloggedin:is=`1`:then=`No`:else=`Yes`]]
```

## `urlencode`

Encodes the value for use in a URL (PHP `urlencode()`).

```modx
[[+mystring:urlencode]]
```

## `urldecode`

Decodes a URL-encoded value (PHP `urldecode()`).

```modx
[[+myparam:urldecode]]
```

::: warning
User-related modifiers must be called uncached so each user sees their own data.
:::
