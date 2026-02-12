# Product price management

A new **City — Price** tab is added on the product edit page for price management. In it you will find a table where you can set the product price per city. If no price is set for a city, the default city price is used.

[![City - price](https://file.modx.pro/files/b/a/c/bac1178a12036c2498d8a6af0f693891.png)](https://file.modx.pro/files/b/a/c/bac1178a12036c2498d8a6af0f693891.png)

For the product price to be correct in each city, output it uncached:

```modx
[[!+price]] or [[!*price]]
```
