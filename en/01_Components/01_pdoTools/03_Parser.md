The new parser appeared in pdoTools with version 1.9.0. It can be initiated after installation of the application
[![](http://st.bezumkin.ru/files/7/2/0/7201839278375611e08d97ef3ed9e7f3s.jpg)](http://st.bezumkin.ru/files/7/2/0/7201839278375611e08d97ef3ed9e7f3.png)

All chunks and adds MODX of this parser process are a bit faster, because it does not take frameworks and filters, just simple tags like [[+id]] and [[~15]]. However, it does modPaser faster because it does not create odd objects.
If a tag has any condition, it is processed by the original modParser and no mistakes should be made. It is likely that over some time pdoParser will begin to process more functions and we will accelerate by degrees.
If you use snippets pdoTools, everything has already been accelerated there, and you will not notice the difference, but the increment can be considerable for other snippets.

## fastField  tag
In addition, you can also get the new facilities for convenient data output from different resource.
I think many people know about interesting component fastField, which adds the processing extra placeholders to the system, like [[#15.pagetitle]]. This functional has already been added to pdoParser by the permission of the author and it has even been a bit expanded.

### Examples
All fastField tags beguin with # and contain either recourse id or the name of the global array.

General field resource:
```
[[#15.pagetitle]]
[[#20.content]]
```

TV resource parameters:
```
[[#15.date]]
[[#20.some_tv]]
```

Fields of goods miniShop2:
```
[[#21.price]]
[[#22.article]]
```

Arrays of resources and goods:
```
[[#12.properties.somefield]]
[[#15.size.1]]
```

Superglobal arrays:
```
[[#POST.key]]
[[#SESSION.another_key]]
[[#GET.key3]]
[[#REQUEST.key]]
[[#SERVER.key]]
[[#FILES.key]]
[[#COOKIE.some_key]]
```

You can indicate any fields in arrays:
```
[[#15.properties.key1.key2]]
```

If you do not know what values are in an array – just indicate it and it will be printed entirely:
```
[[#GET]]
[[#15.colors]]
[[#12.properties]]
```

Tags fastField can be combined with tags MODX:
```
[[#[[++site_start]].pagetitle]]
<pre>
	[[#[[++site_start]]]]
</pre>
```

## Disable
No problems in pdoParser have been found yet, but it is still considered experimental and you use it at your own hook.
If you want to disable Parser, just delete the system settings: **parser_class** & **parser_class_path**.


[1]: http://modx.com/extras/package/fastfield
[2]: https://github.com/argnist/fastField/issues/5
