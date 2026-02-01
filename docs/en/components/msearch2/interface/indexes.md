# Indexing

Page for creating the search index.

Building the index is heavy, so it is split into many requests sent via Ajax in a loop.

[![](https://file.modx.pro/files/e/8/a/e8abae2883fc9b722910b31930910d09s.jpg)](https://file.modx.pro/files/e/8/a/e8abae2883fc9b722910b31930910d09.png)

You can set how many resources to index per batch. 10 is a good default. If you get timeout errors, lower this value.

According to system settings, resource columns are loaded from the DB, split into words, and word forms are generated via [phpMorphy][1] and saved to the index table.

## System settings

| Name | Default | Description |
|------|---------|-------------|
| **mse2_index_comments** | `true` | Index **Tickets** comments |
| **mse2_index_comments_weight** | `1` | Search weight for words from comments |
| **mse2_index_fields** | `content:3, description:2, introtext:2, pagetitle:3, longtitle:3` | Resource fields to index. Field name and weight separated by colon. |
| **mse2_index_min_words_length** | `4` | Minimum word length to index |

The main setting is **mse2_index_fields**; it sets how much weight words in each field have.

## How it works

Each index row contains the word, its weight from settings, and the resource where it was found.

A special algorithm allows indexing non-standard fields, e.g. miniShop2 product properties — just add them to the settings. miniShop2 can also expose data from `msVendor` with the `vendor_` prefix, e.g. `vendor_name` for manufacturer search.

For TV parameters use the `tv_` prefix, e.g. `tv_subtitle:3`.

mSearch2 can index **Tickets** comments; the option is on by default.

So the site is split into many word variants that are used for search. Only resources with **searchable** (Participates in search) checked are indexed.

A bundled plugin keeps the index up to date on **OnDocFormSave** according to system settings.

Generate the index in the manager only when:

- Installing the component for the first time
- Changing indexing-related system settings

## Adding custom words to the index

Sometimes you need to add your own words to a resource's index. From **1.5.2-pl** you can use a plugin on **mse2OnBeforeSearchIndex**:

```php
<?php
switch ($modx->event->name) {
  case 'mse2OnBeforeSearchIndex':
    $mSearch2->fields['my_field'] = 1;
    $resource->set('my_field', 'My Words');

    if ($resource->get('class_key') == 'msProduct') {
      $mSearch2->fields['product_field'] = 1;
      $resource->set('product_field', 'Product Property');
    }
    break;
}
```

In this example all resources get `my_field` with "WORDS" in the index ("my" is skipped due to min length), and miniShop2 products also get `product_field` with "Product" and "Property".

![](https://file.modx.pro/files/5/7/9/579567140e4f4e8667380edd9ee2b224.png)

You can add any custom words to the index this way.

### Indexing product options

Another use of custom words is indexing miniShop2 product options:

```php
<?php
switch ($modx->event->name) {
  case 'mse2OnBeforeSearchIndex':
    $names = array(
      'option1',
      'option2'
    );

    foreach ($names as $key) {
      $mSearch2->fields[$key] = 1;
      $c = $modx->newQuery('msProductOption', array(
        'product_id' => $resource->id,
        'key' => $key,
      ));
      $c->select('value');
      if ($c->prepare() && $c->stmt->execute()) {
        $value = $c->stmt->fetchAll(PDO::FETCH_COLUMN);
        if (!empty($value[0])) {
          $resource->set($key, $value);
        }
      }
    }
    break;
}
```

You will need to handle parsing and saving for non-standard options if you have any.

[1]: http://phpmorphy.sourceforge.net/dokuwiki/
