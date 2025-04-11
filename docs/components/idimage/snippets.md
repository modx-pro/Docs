## Сниппеты

### idImageSimilar

Сниппет `idImageSimilar` **только предоставляет информацию** о том, какие ID товаров являются похожими на ID выбранного товара.

Он **не отвечает за отображение** блока с товарами, а лишь передает данные о схожих товарах для дальнейшей обработки.

```modx
[[!idImageSimilar]]
[[!msProducts?
    &resources=`[[+idimage.ids]]`
    &sortby=`FIELD(msProduct.id, [[+idimage.ids]])`
    &tpl=`@FILE chunks/catalog/product.row.tpl`
    &parents=`0`
]]
```

**Плейсхолдеры**

Создание плейсхолдеров при вызове сниппета idImageSimilar

**idimage.ids** - список id товаров с сортировкой по максимальной схожести
**idimage.probability** - список процентов схожести (ключ id товара, значение процент схожести)

**Параметры**

| Имя            | По умолчанию        | Описание                                                                                                                              |
|----------------|---------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| **&pid**       | $modx->resource->id | id товара для которого нужно вернуть близкие изображения                                                                              |
| **&min_scope** | 70                  | минимальная вероятность схожести изображения от 0 до 100. Чем меньше вероятность тем больше изображение будет отличаться от оригинала |
| **&max_scope** | 100                 | Максимальная вероятность от 100 до 0 (по умолчанию 100, если изображение схоже с оригиналом то вероятность будет 100%)                |
| **&limit**     | 10                  | Кол-во возвращаемых id товаров похожих на оригинал                                                                                    |

::: code-group

```fenom
# записываем id товаров в плейсхолдер idimage.ids
{$modx->runSnippet('idImageSimilar', [
  'min_scope' => 65
])}

{var $ids = $modx->getPlaceholder('idimage.ids')}
{if  $ids}
  {$modx->runSnippet('msProducts', [
    'tpl' => '@FILE chunks/catalog/product.row.tpl',
    'resources' => $ids,
    'sortby' => "FIELD(msProduct.id, {$ids})",
    'parents' => 0,
  ])}
{/if}
```

```php
# Процент схожести
{var $similar= 'idimage.probability' | placeholder}
{var $probability = $similar[$id]}
```

:::
