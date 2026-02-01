# SeoImg snippet

Snippet creates an image with text for quiz result output.

## Parameters

- **img** - image URL
- **points** - score
- **title** - title
- **description** - description

## Example

```fenom
{set $img = '!SeoImg' | snippet: [
  'img' => 'assets/img/quiz/1.jpg',
  'title' => 'SEOIMG',
  'description' => 'Description',
]}
```

![SEOIMG](https://file.modx.pro/files/b/2/7/b27da551764eab74ab332402354b3a98.png)
