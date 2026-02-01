# Sitemap formation

## Snippet sitemap.php

```php
<?php
$output = "";
$resources = $modx->runSnippet('pdoResources', [
  'parents' => 0,
  'limit' => 0,
  'leftJoin' => '{
      "localizator" : {
        "class" : "localizatorContent",
        "alias" : "localizator",
        "on" : "localizator.resource_id = modResource.id"
      }
    }',
  'select' => '{ "localizator" : "modResource.*, localizator.*, modResource.id" }',
  'where' => [
    'localizator.key' => $modx->localizator_key,
    'localizator.active' => 1,
  ],
  'return' => 'json',
]);

if ($resources) {
  $resources = json_decode($resources);
  foreach ($resources as $resource) {

    $url = $modx->config['site_url'] . $resource->uri;
    $changefreq = 'weekly';
    $priority = '0.5';

    // modification date
    $lastmod = date('Y-m-d', $resource->editedon ?: $resource->createdon);

    /* if($row['last_review_date']){
    $date = new DateTime($row['last_review_date']);
    $lastmod = $date->format('Y-m-d');
    } */

    // hourly update flag, category IDs
    if (in_array($resource->parent, [3, 7, 11])) $changefreq = 'hourly';

    // priority
    if (in_array($resource->id, [13])) $priority = '1.0';

    $output .= "
      <url>
        <loc>{$url}</loc>
        <lastmod>{$lastmod}</lastmod>
        <changefreq>{$changefreq}</changefreq>
        <priority>{$priority}</priority>
      </url>
    ";
  }
}

return $output;
```

In the resource set this code:

```xml
<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    {'@FILE snippets/sitemap.php' | snippet}
  </urlset>
```
