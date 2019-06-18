# 10_Слайдер_Bootstrap3

Вывод изображений ms2Gallery в [типовом слайдере Bootstrap3][0] с помощью pdoResources.

## Вызов на странице

Готовый вызов со стандартным оформлением из примера на сайте Bootstrap3.

```php
<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
    <!-- Indicators -->
    <ol class="carousel-indicators">
        [[+indicators]]
    </ol>

    <!-- Wrapper for slides -->
    <div class="carousel-inner">
        [[!pdoResources?
            &class=`msResourceFile`
            &loadModels=`ms2gallery`
            &sortby=`rank`
            &sortdir=`ASC`
            &totalVar=`slider.total`
            &tplFirst=`@INLINE <div class="item active">
                <img src="[[+url]]" alt="">
                <div class="carousel-caption">
                    <h3>[[+name]]</h3>
                    <p>[[+description]]</p>
                </div>
            </div>`
            &tpl=`@INLINE <div class="item">
                <img src="[[+url]]" alt="">
                <div class="carousel-caption">
                    <h3>[[+name]]</h3>
                    <p>[[+description]]</p>
                </div>
            </div>`
            &where=`{"msResourceFile.resource_id":[[*id]], "msResourceFile.path:LIKE":"%360x270%"}`
      ]]
    </div>
    [[!GenerateIndicators?
        &input=`[[+slider.total]]`
        &toPlaceholder=`indicators`
    ]]

    <!-- Controls -->
      <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left"></span>
      </a>
      <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right"></span>
      </a>
    </div>
</div>
```

По умолчанию сниппет выводит картинки текущего ресурса в разрешении **360x270**, но вы можете указать свои собственные критерии выборки в параметр **&where=``**:

```php
&where=`{"msResourceFile.resource_id:IN":[1,2,3,4,5]", "msResourceFile.parent":0}`
```

Это выведет большие картинки из ресурсов с первого по пятый.

### Сниппет GenerateIndicators

Сниппет принимает общее количество картинок слайдера и генерирует индикаторы для переключения:

```php
<?php
if (empty($tpl)) {
    $tpl = '@INLINE <li data-target="#carousel-example-generic" data-slide-to="[[+idx]]" [[+class]]></li>';
}

if (empty($input)) {
    return '';
}

$pdo = $modx->getService('pdoTools');
$output = '';
for ($i = 0; $i < $input; $i++) {
    $data = array(
        'class' => $i === 0 ? 'class="active"' : '',
        'idx' => $i
    );
    $output .= $pdo->getChunk($tpl, $data);
}

if (!empty($toPlaceholder)) {
    $modx->setPlaceholder($toPlaceholder, $output);
}
else {
    return $output;
}
```

Вы можете передавать свои параметры **&tpl** и **&toPlaceholder**, если нужно.

## Логика работы

pdoResources выводит картинки по заданным условиям и выставляет плейсхолдер с их общим количеством на страницу. Его принимает сниппет **GenerateIndicators** и генерирует индикаторы для переключения изображений.

Сниппет генерации должен вызываться после pdoResources, чтобы в плейсхолдере `[[+slider.total]]` уже было число. А сами индикаторы должны выводиться до изображений, поэтому сниппет выводит их в плейсхолдер `[[+indicators]]`.

[0]: http://getbootstrap.com/javascript/#carousel
