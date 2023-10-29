# Выгрузка товаров из интернет-магазина в RetailCRM

## Описание

RetailCRM позволяет и рекомендует размещать собственный каталог товаров внутри CRM.  Это требуется для более комфортной работы с товарами внутри CRM, для статистики и аналитики продаж конкретных товаров.  Ну и я молчу про остатки, связи товаров и т.п.

С другой стороны, мы можем при оформлении заказа не передавать полное описание товара, включая его цену - а передать лишь идентификатор, количество товара, и опции заказа, если такие были (размер, цвет).

Для связи каталога интернет-магазина и стороннего сервиса давно уже придумана XML выгрузка, как, к примеру в Яндекс-Маркете.
Также поступает и RetailCRM. В чем суть?

1. Мы создаем на сайте XML страницу или отдельный XML файл в котором определенным образом описываем перечень товарных категорий и товаров
2. В RetailCRM указываем ссылку на наш XML  файл
3. RetailCRM парсит товары к себе в базу, при чем постоянно синхронизируется с сайтом (раз в сутки по-моему), таким образом список актуальных товаров и цен всегда совпадает.

## Формат ICML (выдержка из официальной документации)

Формат ICML является расширением формата YML. Он позволяет выгружать техническую информацию о товарах в систему (ID и XML ID товаров, информация об остатках), а также сложную структуру каталогов с торговыми предложениями (SKU). Вы можете генерировать файл выгрузки самостоятельно на стороне вашего интернет-магазина в соответствии с описанием ниже. Для ряда CMS есть готовые модули интеграции, которые умеют генерировать ICML с каталогом товаров.

[Официальная документация по ICML][1]

## Сниппет ICML

Компонент содержит готовый сниппет для формирования ICML выгрузки.

Если у вас небольшой магазин, в котором сотня-две товаров вы можете просто вызвать сниппет на странице и формировать выгрузку на лету, в момент обращения RetailCRM к такой странице.

Если же товаров много, больше тысячи - формирование выгрузки может занимать много ресурсов, перегружая сервер. А RetailCRM может просто не дождаться ответа от страницы и вернуть ошибку.
В таком случае рекомендуется настроить фоновое формирование выгрузки по расписанию, или в момент обновления базы, если у вас настроен скрипт для работы с 1С (например).

### Сниппет принимает следующие параметры

**shop**  Наименование магазина. Значение по умолчанию системная настройка site_name

**company**  Наименование компании . Значение по умолчанию системная настройка site_name

**parents**  Каталог товаров, источник выгрузки. Можно указать несколько каталогов через запятую . Значение по умолчанию системная настройка 0

**outputWrapper**  Шаблон-обертка . Значение по умолчанию

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

**categoryTpl**  Шаблон одной строки категории. Значение по умолчанию

```fenom
@INLINE
<category id="{$id}" {if $parent?}parentId="{$parent}"{/if}>{$pagetitle | replace : "&" : "AND"}</category>
```

**offerTpl**  Шаблон одного товарного предложения.  Значение по умолчанию

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

      {if $modification.article?}<param name="Артикул" code="article">{$modification.article | replace : "&" : "AND"}</param> {/if}
      {foreach $modification.options as $key => $value}
        {switch $key}
          {case "size"}
          <param name="Размер" code="{$key}">{$value | replace : "&" : "AND"}</param>
          {case "color"}
          <param name="Цвет" code="{$key}">{$value | replace : "&" : "AND"}</param>
          {case "weight"}
          <param name="Вес" code="{$key}">{$value | replace : "&" : "AND"}</param>
          {default}
          <param name="{$key}" code="{$key}">{$value | replace : "&" : "AND"}</param>
        {/switch}
      {/foreach}

      <vendor>{$_pls["vendor.name"] | replace : "&" : "AND"}</vendor>
      {if $weight?}<param name="Вес" code="weight">{$weight | replace : "&" : "AND"}</param> {/if}
      {if $modification.weight?}<param name="Вес" code="weight">{$modification.weight | replace : "&" : "AND"}</param> {/if}
      <unit code="pcs" name="Штука" sym="шт." />
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
    {if $article?}<param name="Артикул" code="article">{$article | replace : "&" : "AND"}</param> {/if}
    <vendor>{$_pls["vendor.name"] | replace : "&" : "AND"}</vendor>
    {if $weight?}<param name="Вес" code="weight">{$weight | replace : "&" : "AND"}</param> {/if}
    <unit code="pcs" name="Штука" sym="шт." />
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
    {if $article?}<param name="Артикул" code="article">{$article | replace : "&" : "AND"}</param> {/if}
    <vendor>{$_pls["vendor.name"] | replace : "&" : "AND"}</vendor>
    {if $weight?}<param name="Вес" code="weight">{$weight}</param> {/if}
    <unit code="pcs" name="Штука" sym="шт." />
  </offer>
{/if}
```

### Пошаговое руководство - формируем выгрузку на лету

Итак - мы имеем Интернет-магазин на базе miniShop2, десяток товарных разделов и сотню другую товаров.  Возможно с модификациями msOptionsPrice2

- Создаем в админке страницу ICML, отключаем для нее текстовый редактор, назначаем пустой шаблон и выбираем тип содержимого XML. Сохраняем. При открытии такой страницы в браузере у вас должен открываться XML документ.
- В содержимом (поле content) вызываем сниппет `[[!icml]]`
    При каждом обращении к странице сниппет будет формировать валидный XML код по правилам RetailCRM.
- Следующий шаг - настройка RetailCRM. Переходим в личный кабинет "**Администрирование** - **Магазины** - **Ваш магазин** - **вкладка Каталог**"
    В форме указываем ссылку на нашу ICML страницу в поле **URL ICML-файла**, созданную шагом ранее. Ставим отметку **Загрузить каталог из ICML сейчас**. Жмем кнопку "Сохранить" и через несколько секунд (в зависимости от размера каталога) обновляем страницу. Если RetailCRM в процессе автоматического чтения каталога обнаружит ошибки, она выдаст об этом предупреждение.  Если все нормально - переходим в раздел **Операционная деятельность** - **Товары** и видим наши товары

RetailCRM обновляет каталог автоматически один-два раза в сутки.  Помните об этом, и если у вас есть необходимость обновлять каталог чаще - просто делайте это вручную, повторяя предыдущий шаг.

### Возможные проблемы

1. Страница открывается но - на ней ничего нет, кроме даты и названия магазина. Это значит что не сработала выборка категорий\товаров. Перепроверьте еще раз. Особое внимание обратите на параметры **parents** и  **showHidden**

2. Страница долго загружается и показывает 500-ую ошибку.  Ваш каталог - слишком большой и сервер не успевает его сгенерировать за 30 секунд. В таком случае Вам нужно не генерировать каталог на лету, а физически создать XML файл и через  консоль сделать в него запись.

[1]: https://help.retailcrm.ru/Developers/ICML

### Пошаговое руководство - создание XML файла по расписанию

Рекомендованное действие.  Снимает лишнюю нагрузку с сайта. Позволяет без проблем делать выгрузку любого количества товарных предложений

В этом случае не нужно создавать отдельную страницу в админке.  Достаточно создать пустой XML файл в корне вашего сайта.

В любом удобном месте создаем php скрипт примерно следующего содержания

```php
// Подключаем MODX
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

//Если нужно указываем параметры запуска сниппета
$params = [];

//Запускаем сниппет ICML, получая его содержимое в строку
$xml = $modx->runSnippet('icml', $params);

//Указываем имя файла, в который будем сохранять готовый XML. Файл должен существовать
$filename = MODX_BASE_PATH.'icml.xml';

//Записываем XML в файл
file_put_contents($filename, $xml);
```

::: info
Настраиваем запуск файла по расписанию, согласно документации вашего хостинга, либо запускаем файл в момент обновления вашей базы, если у вас настроено автоматическое обновление базы, например из 1C.
:::
