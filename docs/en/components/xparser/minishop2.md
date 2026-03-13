# Working with miniShop2 products

Version 1.5.0 added support for miniShop2 product properties/options.
You can parse store products.

## Features

When creating miniShop2 products with xParser:

1. In task configuration select section with type "Product category".
2. In task fields create **resource | class_key** with default value: `msProduct`
3. For correct export of fields such as `tags`, `color`, `size`, when creating task fields use the **Decode JSON string to array** option. When creating products via the processor, miniShop2 expects PHP arrays for these fields, so JSON must be decoded to PHP. Example:

![Features](https://file.modx.pro/files/4/0/f/40ffc7e65359342dd91976e475c6bd38.png)

Other steps are standard. See:

- [RSS parser][1]
- [HTML parser + Combined tasks][2]

[1]: /en/components/xparser/parser-rss
[2]: /en/components/xparser/parser-html
