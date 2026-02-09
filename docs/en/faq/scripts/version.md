---
author: alexsoin
---

# Output version of included file

This Fenom modifier helps when including styles and scripts so the browser does not use a cached file.

Create a snippet named `version`:

```php
<?php
$filepath = MODX_BASE_PATH . $input;
if (file_exists($filepath)) {
  return $input . '?v=' . date('dmYHis', filemtime($filepath));
}
```

Example usage:

```fenom
<link rel="stylesheet" href="{'assets/template/css/styles.css' | version}" type="text/css"/>
<script src="{'assets/template/js/scripts.min.js' | version}" type="text/javascript"></script>
```

*P.S.* Based on this [comment](https://modx.pro/solutions/17860#comment-108776).
