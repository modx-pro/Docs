# SeoImg

Сниппет предназначен для формирования изображение с текстом при выводе результата.

## Параметры:

- **img** - ссылка на изображение
- **points** - баллы
- **title** - заголовок
- **description** - описание

## Пример:

	{set $img = '!SeoImg' | snippet: [
	    'img' => 'assets/img/quiz/1.jpg',
	    'title' => 'SEOIMG',
	    'description' => 'Описание',
	]}
![SEOIMG](https://file.modx.pro/files/b/2/7/b27da551764eab74ab332402354b3a98.png)