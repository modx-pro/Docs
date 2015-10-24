Для наложения водяных знаков на изображения в галереи должны соблюдаться 3 условия.

[![](https://file.modx.pro/files/6/c/1/6c18561f4383506c2bfef7a497858841s.jpg)](https://file.modx.pro/files/6/c/1/6c18561f4383506c2bfef7a497858841.png)

**1.** На сервере должен быть установлен **ImageMagick**. Также нужно проследить, чтобы он был доступен для php. [Подробнее здесь][1].

**2.** В источнике файлов ms2Gallery нужно добавить параметр **fltr** с **wmi**:
```
[
	{"w":120,"h":90,"q":90,"zc":"1","bg":"000000","fltr":"wmi|wm.png|BR|80"},
	{"w":360,"h":270,"q":90,"zc":"1","bg":"000000","fltr":"wmi|wm.png|BR|80"}
]
```
Параметры расшифровываются так:
```
"wmi" (WaterMarkImage)
	[ex: &fltr[]=wmi|<f|<a|<o|<x|<y|<r] where
	<f is the filename of the image to overlay;
	<a is the alignment (one of BR, BL, TR, TL, C,
		R, L, T, B, *) where B=bottom, T=top, L=left,
		R=right, C=centre, *=tile)
		*or*
		an absolute position in pixels (from top-left
		corner of canvas to top-left corner of overlay)
		in format {xoffset}x{yoffset} (eg: "10x20")
		note: this is center position of image if <x
		and <y are set
	 <o is opacity from 0 (transparent) to 100 (opaque)
		(requires PHP v4.3.2, otherwise 100% opaque);
	 <x and <y are the edge (and inter-tile) margin in
		pixels (or percent if 0 < (x|y) < 1)
		*or*
		if <a is absolute-position format then <x and
	 <y represent maximum width and height that the
		watermark image will be scaled to fit inside
	 <r is rotation angle of overlaid watermark
```
[Полная документация][2].

**3.** Файл *wm.png* нужно положить в `/assets/components/ms2gallery/` - именно там он будет искаться. Вместо assets может быть другая директория, если вы её переименовывали при advanced установке MODX.

В источнике можно указать не просто *wm.png*, а *images/wm.png* - тогда файл нужно положить в `/assets/components/ms2gallery/images/`.

Если всё сделано правильно - вы получите watermark на своих изображениях при загрузке в галерею.

Еще раз обращаю ваше внимание, что **хостинг должен быть готов к такой сложной работе** с изображениями, как наложение водяных знаков. Понятное дело, что на [modhost.pro][3] всё работает без проблем.


[1]: http://modx.pro/development/619-working-with-phpthumb/
[2]: http://phpthumb.sourceforge.net/demo/docs/phpthumb.readme.txt
[3]: https://modhost.pro