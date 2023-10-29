# Галерея miniShop2

Панель загрузки файлов товара, которая является упрощённой версией платного дополнения [ms2Gallery][4].
В основном используется для загрузки изображений, но может хранить и другие типы файлов, разрешенные в настройках источника медиа.

Появляется только при редактировании товара.

[![](https://file.modx.pro/files/5/c/b/5cb7350a4826a7c3253265279d615a43s.jpg)](https://file.modx.pro/files/5/c/b/5cb7350a4826a7c3253265279d615a43.png)

Основным отличием от аналогов является **генерация превью в момент загрузки** и полный отказ от использования *phpthumbof* и других подобных фильтров вывода.
Это даёт максимальную скорость, поскольку выводятся прямые ссылки на готовые изображения, и позволяет выносить файлы товара на сторонние CDN сервисы (Amazon S3, Selectel Cloud Storage).

[![](https://file.modx.pro/files/a/4/b/a4b89af1ea440c0581e16d0f3aed5930s.jpg)](https://file.modx.pro/files/a/4/b/a4b89af1ea440c0581e16d0f3aed5930.png)

Файлы можно сортировать перетаскиванием, есть контекстное меню и мультивыделение через [[Ctrl]] [[⌘ Cmd]] и [[Shift]].

Первая картинка товара является для него основной и выводится на вкладке "Документ".
Ссылки на неё и её превью сохраняются в свойствах `image` и `thumb` товара, чтобы можно было выводить их в каталоге без дополнительных запросов.

У каждого товара есть свой источник файлов (Media source), который управляет параметрами загрузки. Основные свойства:

- **basePath** - путь к директории с файлами товаров. По умолчанию: `assets/images/products/`
- **basePathRelative** - basePath может быть указан относительно корня сайта, если включена эта опция.
- **baseUrl** - url директории с файлами товаров, обычно совпадает с *basePath*, если включена *basePathRelative*.
- **baseUrlRelative** - baseUrl может быть указан относительно корня сайта, если включена эта опция.
- **allowedFileTypes** - разрешённые для загрузки типы файлов. По умолчанию только изображения: `jpg,jpeg,png,gif`.
- **imageExtensions** - какие типы файлов являются изображениями. По умолчанию: `jpg,jpeg,png,gif`
- **thumbnailType** - формат файлов превью: JPG или PNG.
- **thumbnailQuality** - качество генерируемого превью, от 0 до 100, где 100 - максимальное качество.
- **skipFiles** - служебные типы файлов, которые не нужно показывать.
- **thumbnails** - настройка генерации картинок-превью в виде JSON массива. Можно указывать любые параметры, которые [примет phpThumb][5].
- **maxUploadWidth** - максимальная ширина изображения. Всё что больше, будет пережато javascript на клиенте, перед загрузкой.
- **maxUploadHeight** - максимальная высота изображения. Всё что больше, будет пережато javascript на клиенте, перед загрузкой.
- **maxUploadSize** - максимальный размер изображения, в байтах.
- **imageNameType** - вид наименования файлов: hash от содержимого, или обработка названия файла алгоритмом генерации friendly имён ресурсов.

При изменении источника медиа товара, уже загруженные файлы в него не будут скопированы - вам нужно позаботиться об этом самостоятельно.

## Основные настройки phpThumb

- **w** - ширина превью в пикселях
- **h** - высота превью в пикселях
- **zc** - приблизить и обрезать изображение, чтобы вписать его в заданные *h* и *w*
- **bg** - цвет фона в виде html color hex (ffffff, 000000 и т.п.)
- **far** - подогнать в размеры *h* и *w* без обрезки. Требует указания фона в *bg*
- **q** - качество изображения, от 0 до 100
- **ar** - автоповорот изображения c использованием данных EXIF

Если нужно подгонять изображения только по высоте или ширине, то нужно указывать только *h* или *w*.

```json
[{"w":120,"q":90,"zc":"1","bg":"000000"},{"h":270,"q":90,"far":"1","bg":"ffffff"}]
```

Остальные параметры смотрите в [документации phpThumb][5].

## Обновление превью

При изменении настроек источника файлов нужно перегенерировать все превью.

Если товаров немного, то можно сделать это вручную, выбирая нужные картинки и обновляя через контекстное меню

[![](https://file.modx.pro/files/1/8/2/182e6f257fcf683235327edb160c4566s.jpg)](https://file.modx.pro/files/1/8/2/182e6f257fcf683235327edb160c4566.png)

Или вы можете обновить сразу **все картинки** специальным скриптом:

```php
<?php

$step = 5;
$offset = isset($_SESSION['galgenoffset']) && $_SESSION['galgenoffset'] ? $_SESSION['galgenoffset'] : 0;
$miniShop2 = $modx->getService('minishop2');
$modx->setLogLevel(MODX_LOG_LEVEL_ERROR);
$q = $modx->newQuery('msProductFile', array('parent' => 0));
$total = $modx->getCount('msProductFile', $q);
$q->sortby('product_id', 'ASC');
$q->sortby('rank', 'DESC');
$q->limit($step,$offset);
$resources = $modx->getCollection('msProductFile', $q);
foreach ($resources as $resource) {
  $modx->runProcessor('mgr/gallery/generate', array('id' => $resource->id),
    array('processors_path' => $modx->getOption('core_path').'components/minishop2/processors/'));
}

$_SESSION['galgenoffset'] = $offset + $step;
if ($_SESSION['galgenoffset'] >= $total) {
  $success = 100;
  $_SESSION['Console']['completed'] = true;
  unset($_SESSION['galgenoffset']);
} else {
  $success = round($_SESSION['galgenoffset'] / $total, 2) * 100;
  $_SESSION['Console']['completed'] = false;
}
for ($i=0; $i<=100; $i++) {
  if ($i <= $success) {
    print '=';
  } else {
    print '_';
  }
}
$current = $_SESSION['galgenoffset'] ?
           $_SESSION['galgenoffset'] :
           ($success == 100 ? $total : 0);
print "\n";
print $success . '% (' . $current . ')' . "\n\n";
```

Так как операция генерации превью может занять длительное время, лучше запускать этот скрипт из консоли сервера.

[4]: /components/ms2gallery/
[5]: http://phpthumb.sourceforge.net/demo/docs/phpthumb.readme.txt
