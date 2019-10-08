Page for search index creating.

Creating an index is a hard operation. It is divided into multiple queries which are sent through Ajax in a cycle. 

[![](https://file.modx.pro/files/e/8/a/e8abae2883fc9b722910b31930910d09s.jpg)](https://file.modx.pro/files/e/8/a/e8abae2883fc9b722910b31930910d09.png)

You can indicate the number of resources to index your site through at once.
10 resources is an optimal value.
But of you get the timeout error, lessen this value.


According to the system settings columns of resources and commentaries that are needed are extracted from the database and divided into words.
Then for each word different forms of it are generated with help of [phpMorphy][1]. They’re saved into the index table.

## System settings

Name					    | By default			| Description
----------------------------|-----------------------|-----------------------------
mse2_index_comments			| true					| Activate the indexation of commentaries for component **Tickets**
mse2_index_comments_weight	| 1						| Search weight of a word from the commentary 
mse2_index_fields			| content:3,description:2,introtext:2,pagetitle:3,longtitle:3	| Indexation of the resource fields setting. Name of the field and its weight after a colon. mse2_index_min_words_length	| 4						| Minimal length of a word for its participation in search. 

The most important parameter is **mse2_index_fields**, it defines the value of words in different fields of the document. 

## Work logic
Table record consists of the very word, its weight (which you indicate in settings) and the link of the resource where it can be found.

Thanks to a special algorithm unusual fields of documents can be indexed, like products characteristics miniShop2, 
if you just indicate them in settings as well as others.
mSearch2 can also index **Tickets** commentaries,
the needed setting is on by default.

This means that all your site is divided into thousands of variants of words, by which search is done.
Only those documents which have **searchable** parameter matched are included in index.

You don’t have to control index’s relevance – the plugin that is included does it with full accordance with system settings, working to event **OnDocFormSave**.

You should generate search index in admin area in two cases:

* When you first install the component
* When you change system settings responsible for indexation 

## Adding arbitrary words to the index 
There are cases in which you have to add some arbitrary words of yours to the documents of the index. 
With version **1.5.2-pl**, you can use plugin to event **mse2OnBeforeSearchIndex**:
```
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
In this example all resources will get field `my_field` with the word "WORDS" in their index
("my" will not be included in the index because of the restriction of length by default). Products miniShop2 will also be given 
`product_field` with the words "Product" and "Property".

[![](https://file.modx.pro/files/5/7/9/579567140e4f4e8667380edd9ee2b224s.jpg)](https://file.modx.pro/files/5/7/9/579567140e4f4e8667380edd9ee2b224.png)

Thereby, you can add different arbitrary words in the resource index. 

### Products’ options indexation 
Another example of adding arbitrary words to the index is the indexation of the options of products miniShop2.
```
<?php
switch ($modx->event->name) {
   case 'mse2OnBeforeSearchIndex':
        // Имена опций
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
Certainly, you’ll have to write the analysis and saving of unusual options if you’re going to have those.

[1]: http://phpmorphy.sourceforge.net/dokuwiki/



