# Creating a custom modifier

Any snippet can be used as an output modifier. Just specify the snippet name instead of the modifier. For example, we will create a snippet `[[makeExciting]]` that appends a given number of exclamation marks to the output:

```modx
[[*pagetitle:makeExciting=`4`]]
```

This tag call passes the following parameters to the makeExciting snippet:

| Parameter  | Value          | Example                                 | Description                                            |
|-----------|----------------|-----------------------------------------|--------------------------------------------------------|
| `input`   | Element value  | ``$input = `[[*pagetitle]]`;``          | Value of the element the modifier is applied to.      |
| `options` | Modifier value | ``$options = `4`;``                     | Extra parameters (after `=`).                         |
| `token`   | Element type   | ``$token = `*`;``                       | Character that defines the tag type.                  |
| `name`    | Element name   | ``$name = `pagetitle`;``               | Name of the placeholder the modifier is applied to.   |
| `tag`     | Full tag       | ``$tag = `[[*pagetitle:makeExciting=`4`]]`;`` | The complete tag.                             |

Here is the makeExciting snippet code:

```php
<?php
$defaultExcitementLevel = 1;
$result = $input;

if (isset($options)) {
  $numberOfExclamations = $options;
}
else {
  $numberOfExclamations = $defaultExcitementLevel;
}

for ($i = $numberOfExclamations; $i > 0; $i--) {
  $result = $result . '!';
}

return $result;
```

The tag outputs whatever the snippet returns. In our case it will return the value of the tag `[[*pagetitle]]` with four exclamation marks.

::: tip
If the snippet returns an empty string, the original tag value will be output on the page.
:::
