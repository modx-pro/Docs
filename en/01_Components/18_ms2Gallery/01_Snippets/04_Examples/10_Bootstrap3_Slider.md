Image output in ms2Gallery in [a typical slider Bootstrap3][0] with help of pdoResources.

## Call on the page

A ready-made standard call from the example on the site Bootstrap3.
```
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
By default the snippet shows images of the current resource in **360x270** quality, but you can indicate your own selection criteria in parameter **&where=``**:
```
&where=`{"msResourceFile.resource_id:IN":[1,2,3,4,5]", "msResourceFile.parent":0}`
```
It will show big images from the resources 1 to 5. 


### Snippet GenerateIndicators

Snippet accepts the general quantity of slider's images and generated indicators for switching:
```
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
You can transmit **&tpl** and **&toPlaceholder** if you need to.


## Work logic
pdoResources shows images by the indicated conditions and puts out a placeholder with their general quantity on the page. It is in its turn accepted by snippet **GenerateIndicators**, which generates indicators for switching on the images.

The generation snippet should be called for after pdoResources, so that there already is a number in placeholder`[[+slider.total]]`. The indicators should be shown before the images, that is why the snippet puts them in placeholder `[[+indicators]]`.



[0]: http://getbootstrap.com/javascript/#carousel
