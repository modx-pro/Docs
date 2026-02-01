# Bootstrap3 Slider

Displaying ms2Gallery images in the [standard Bootstrap3 carousel][Bootstrap 3 Carousel] using pdoResources.

## Page call

Ready-to-use call with standard styling from the Bootstrap3 example site:

```modx
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
```

By default the snippet outputs images of the current resource at **360x270** resolution; you can set your own criteria in **&where=``**:

```modx
&where=`{"msResourceFile.resource_id:IN":[1,2,3,4,5]", "msResourceFile.parent":0}`
```

This will output full-size images from resources 1 through 5.

### GenerateIndicators snippet

The snippet takes the total number of slider images and generates indicators for switching:

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

You can pass your own **&tpl** and **&toPlaceholder** parameters if needed.

## How it works

pdoResources outputs images by the given conditions and sets a placeholder with their total count. The **GenerateIndicators** snippet reads that and generates the slide indicators.

The generator snippet must be called after pdoResources so that the `[[+slider.total]]` placeholder already has a value. The indicators themselves should appear before the images, so the snippet outputs them to the `[[+indicators]]` placeholder.

[Bootstrap 3 Carousel]: https://getbootstrap.com/docs/3.4/javascript/#carousel
