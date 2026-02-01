# Working with mFilter2

Object filtering on the map via `mFilter2` is built-in and works in three steps:

## New method

Works from **version 1.1.0 and above**. Allows outputting results both in text format and as objects on the map.

### Step 1

At the desired place on the page, call `mFilter2` with these parameters:

```fenom
{'!mFilter2' | snippet: [
  'parents' => $_modx->resource.id,
  'limit' => 0,
  'filters' => '
    tv|symbol,
  ',
]}
```

Of course, parameter `&filters` should be your own, with your own fields.

### Step 2

Chunk `tpl.mFilter2.outer` should look approximately like this:

```modx
<div class="row msearch2" id="mse2_mfilter">
  <div class="span3 col-md-3">
    <form action="[[~[[*id]]]]" method="post" id="mse2_filters">
      <div>
        [[+filters]]
      </div>
      [[+filters:isnot=``:then=`
        <button type="reset" class="btn btn-default hidden">[[%mse2_reset]]</button>
        <button type="submit" class="btn btn-success pull-right hidden">[[%mse2_submit]]</button>
        <div class="clearfix"></div>
      `]]
    </form>
  </div>

  <div class="span9 col-md-9">
    [[!YandexMaps2?
      &mode=`mfilter2`
    ]]

    <div id="mse2_results">
      [[+results]]
    </div>
  </div>
</div>
```

### Step 3

Chunk `tpl.mSearch2.row` should look approximately like this:

```modx
<div class="mse2-row">
  [[+idx]]. <a href="[[+uri]]">[[+pagetitle]]</a>[[+weight]]
  [[+intro]]
</div>

<div class="js-ym2-mse2-objects" style="display:none">
  {'!YandexMaps2' | snippet: [
    'parent' => $id,
    'scripts' => false,
    'tpl' => '@INLINE {(($objects | toJSON: 9) | replace: "{": "{ ") | replace: "[": "[ "}',
  ]}
</div>

<!--msearch2_weight  ([[%mse2_weight]]: [[+weight]])-->
<!--msearch2_intro <p>[[+intro]]</p>-->
```

Block with class `.js-ym2-mse2-objects` and exactly this snippet call is **required**!

## Old method

For version **1.0.5 and below**. Does not output results except as objects on the map.

### Old method Step 1

At the desired place on the page, call `mFilter2` with these parameters:

```fenom
{'!mFilter2' | snippet: [
  'parents' => $_modx->resource.id,
  'limit' => 0,
  'outputSeparator' => ',',
  'filters' => '
    tv|symbol,
  ',
]}
```

Of course, parameter `&filters` should be your own, with your own fields.

### Old method Step 2

Chunk `tpl.mFilter2.outer` should look approximately like this:

```modx
<div class="row msearch2" id="mse2_mfilter">
  <div class="span3 col-md-3">
    <form action="[[~[[*id]]]]" method="post" id="mse2_filters">
      <div>
        [[+filters]]
      </div>
      [[+filters:isnot=``:then=`
        <button type="reset" class="btn btn-default hidden">[[%mse2_reset]]</button>
        <button type="submit" class="btn btn-success pull-right hidden">[[%mse2_submit]]</button>
        <div class="clearfix"></div>
      `]]
    </form>
  </div>

  <div class="span9 col-md-9">
    {'!YandexMaps2' | snippet: [
      'objects' => $results,
      'mode' => 'mfilter2',
    ]}
  </div>
</div>
```

### Old method Step 3

Chunk `tpl.mSearch2.row` **must** look like this:

```fenom
{'!YandexMaps2' | snippet: [
  'parent' => $id,
  'scripts' => false,
  'tpl' => '@INLINE {(($objects | toJSON: 9) | replace: "{": "{ ") | replace: "[": "[ "}',
]}
```
