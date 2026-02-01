# Uploading Products from Online Store to RetailCRM

## Description

RetailCRM allows and recommends hosting your own product catalog inside the CRM. This is needed for more comfortable work with products in the CRM, for statistics and sales analytics of specific products. Not to mention stock levels, product relations, and the like.

On the other hand, when placing an order we can avoid sending the full product description including price—and send only the identifier, quantity, and order options if any (e.g. size, color).

To link the online store catalog with the external service, XML export has long been used, as with Yandex.Market, for example. RetailCRM works the same way. What is the idea?

1. We create an XML page on the site or a separate XML file that describes the list of product categories and products in a defined format.
2. In RetailCRM we specify the URL of our XML file.
3. RetailCRM parses products into its database and keeps syncing with the site (e.g. once a day), so the list of current products and prices always matches.

## ICML Format (excerpt from official documentation)

The ICML format is an extension of the YML format. It allows exporting technical product information into the system (product ID and XML ID, stock information) as well as a complex catalog structure with trade offers (SKU). You can generate the export file on your online store side according to the description below. For some CMS there are integration modules that can generate ICML with a product catalog.

[Official ICML documentation][1]

## ICML Snippet

The component includes a ready-made snippet for building the ICML export.

If you have a small store with a hundred or two products, you can simply call the snippet on a page and generate the export on the fly when RetailCRM requests that page.

If you have many products (more than a thousand), generating the export can be resource-intensive and overload the server. RetailCRM may not wait for the page response and return an error. In that case it is recommended to set up scheduled background export generation, or generation when the database is updated (e.g. if you have a 1C sync script).

### Snippet parameters

**shop** Store name. Default: `site_name` system setting.

**company** Company name. Default: `site_name` system setting.

**parents** Product catalog(s), source of export. Multiple catalogs can be listed comma-separated. Default: system setting `0`.

**outputWrapper** Wrapper template. Default:

```fenom
@INLINE
<yml_catalog date="{$date}">
  <shop>
    <name>{$name | replace : "&" : "AND"}</name>
    <company>{$company | replace : "&" : "AND"}</company>
    <categories>{$categories}</categories>
    <offers>{$offers}</offers>
  </shop>
</yml_catalog>
```

**categoryTpl** Template for one category row. Default:

```fenom
@INLINE
<category id="{$id}" {if $parent?}parentId="{$parent}"{/if}>{$pagetitle | replace : "&" : "AND"}</category>
```

**offerTpl** Template for one product offer. Default:

```fenom
{if $modifications?}
  {foreach $modifications as $modification}
    <offer id="mod-{$id}-{$modification.id}" productId="{$id}" {if $modification.count?}quantity="{$modification.count}"{/if}>
      <url>{$id | url : ["scheme" => "full"] }</url>
      <price>{if $modification.price?}{$modification.price}.00{else}{$price}.00{/if}</price>
      <categoryId>{$parent}</categoryId>
      {if $image}<picture>{"site_url" | option | preg_replace : "#/$#" : ""}{$image}</picture> {/if}

      <name>{$modification.name | replace : "&" : "AND"}</name>
      {if $xmlId}<xmlId>{$xmlId}</xmlId> {/if}
      <productName>{$pagetitle | replace : "&" : "AND"}</productName>

      {if $modification.article?}<param name="Article" code="article">{$modification.article | replace : "&" : "AND"}</param> {/if}
      {foreach $modification.options as $key => $value}
        {switch $key}
          {case "size"}
          <param name="Size" code="{$key}">{$value | replace : "&" : "AND"}</param>
          {case "color"}
          <param name="Color" code="{$key}">{$value | replace : "&" : "AND"}</param>
          {case "weight"}
          <param name="Weight" code="{$key}">{$value | replace : "&" : "AND"}</param>
          {default}
          <param name="{$key}" code="{$key}">{$value | replace : "&" : "AND"}</param>
        {/switch}
      {/foreach}

      <vendor>{$_pls["vendor.name"] | replace : "&" : "AND"}</vendor>
      {if $weight?}<param name="Weight" code="weight">{$weight | replace : "&" : "AND"}</param> {/if}
      {if $modification.weight?}<param name="Weight" code="weight">{$modification.weight | replace : "&" : "AND"}</param> {/if}
      <unit code="pcs" name="Piece" sym="pcs" />
    </offer>
  {/foreach}
  <offer id="{$id}" productId="{$id}">
    <url>{$id | url : ["scheme" => "full"] }</url>
    <price>{$price}.00</price>
    <categoryId>{$parent}</categoryId>
    <picture>{"site_url" | option | preg_replace : "#/$#" : ""}{$image}</picture>
    <name>{$pagetitle | replace : "&" : "AND"}</name>
    {if $xmlId}<xmlId>{$xmlId}</xmlId> {/if}
    <productName>{$pagetitle | replace : "&" : "AND"}</productName>
    {if $article?}<param name="Article" code="article">{$article | replace : "&" : "AND"}</param> {/if}
    <vendor>{$_pls["vendor.name"] | replace : "&" : "AND"}</vendor>
    {if $weight?}<param name="Weight" code="weight">{$weight | replace : "&" : "AND"}</param> {/if}
    <unit code="pcs" name="Piece" sym="pcs" />
  </offer>
{else}
  <offer id="{$id}" productId="{$id}">
    <url>{$id | url : ["scheme" => "full"] }</url>
    <price>{$price}.00</price>
    <categoryId>{$parent}</categoryId>
    <picture>{"site_url" | option | preg_replace : "#/$#" : ""}{$image}</picture>
    <name>{$pagetitle | replace : "&" : "AND"}</name>
    {if $xmlId}<xmlId>{$xmlId}</xmlId> {/if}
    <productName>{$pagetitle | replace : "&" : "AND"}</productName>
    {if $article?}<param name="Article" code="article">{$article | replace : "&" : "AND"}</param> {/if}
    <vendor>{$_pls["vendor.name"] | replace : "&" : "AND"}</vendor>
    {if $weight?}<param name="Weight" code="weight">{$weight}</param> {/if}
    <unit code="pcs" name="Piece" sym="pcs" />
  </offer>
{/if}
```

### Step-by-step guide — generating export on the fly

So we have an online store on miniShop2, a dozen product sections and a hundred or so products, possibly with msOptionsPrice2 modifications.

- In the manager create an ICML page, disable the text editor for it, assign an empty template and set content type to XML. Save. Opening this page in the browser should show an XML document.
- In the content field call the snippet `[[!icml]]`. On each request the snippet will build valid XML according to RetailCRM rules.
- Next, configure RetailCRM. Go to the dashboard: **Administration** → **Stores** → **Your store** → **Catalog** tab. In the form enter the URL of your ICML page in **ICML file URL** (created above). Check **Load catalog from ICML now**. Click **Save** and after a few seconds (depending on catalog size) refresh the page. If RetailCRM finds errors while reading the catalog, it will show a warning. If everything is fine, go to **Operations** → **Products** and you will see your products.

RetailCRM updates the catalog automatically once or twice a day. If you need to update it more often, do it manually by repeating the step above.

### Possible issues

1. The page opens but shows nothing except the date and store name. This means the category/product query did not run. Double-check, especially **parents** and **showHidden**.

2. The page loads slowly and shows a 500 error. Your catalog is too large and the server cannot generate it within 30 seconds. In that case do not generate the catalog on the fly; create the XML file physically and write to it via a console script.

[1]: https://help.retailcrm.ru/Developers/ICML

### Step-by-step guide — creating XML file on a schedule

Recommended approach. Reduces load on the site and allows exporting any number of product offers without issues.

In this case you do not need a separate page in the manager. Just create an empty XML file in the site root.

Create a PHP script somewhere convenient with content similar to:

```php
// Load MODX
define('MODX_API_MODE', true);
while (!isset($modx) && ($i = isset($i) ? --$i : 10)) {
  if (($file = dirname(!empty($file) ? dirname($file) : __FILE__) . '/index.php') AND !file_exists($file)) {
    continue;
  }
  require_once $file;
}
if (!is_object($modx)) {
  exit('{"success":false,"message":"Access denied"}');
}

$modx->getService('error', 'error.modError');
$modx->setLogLevel(modX::LOG_LEVEL_ERROR);
$modx->setLogTarget('FILE');
$modx->error->reset();
$modx->initialize('web');

// Optional: set snippet run parameters
$params = [];

// Run the ICML snippet and get output as string
$xml = $modx->runSnippet('icml', $params);

// File to save the XML to (must exist)
$filename = MODX_BASE_PATH.'icml.xml';

// Write XML to file
file_put_contents($filename, $xml);
```

::: info
Configure the script to run on a schedule according to your hosting documentation, or run it when your database is updated (e.g. if you have automatic sync from 1C).
:::
