---
author: alexsoin
---

# Вывод версии подключаемого файла

Данный модификатор для феном полезен при подключении стилей и скриптов на сайт, чтобы не получать закешированный файл.

Создаем сниппет с именем `version`

```php
<?php
$filepath = MODX_BASE_PATH . $input;
if (file_exists($filepath)) {
    return $input . '?v=' . date('dmYHis', filemtime($filepath));
}
```

Пример вызова модификатора:

```fenom
<link rel="stylesheet" href="{'assets/template/css/styles.css' | version}" type="text/css"/>
<script src="{'assets/template/js/scripts.min.js' | version}" type="text/javascript"></script>
```

*P.S.* По следам [комментария](https://modx.pro/solutions/17860#comment-108776).
