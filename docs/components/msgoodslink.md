---
title: msGoodsLinks
description: Навигация, перелинковка
logo: https://modstore.pro/assets/extras/msgoodslink/logo-lg.png
author: prihod
modstore: https://modstore.pro/packages/other/msgoodslink
---

# msGoodsLinks

msGoodsLinks – инструмент навигации, предназначенный для создания перелинковки по опциям и свойствам товаров в miniShop2. Пакет позволяет настроить ссылки с товара на категории, в которых присутствует данный товар.

Основная идея разработки пакета – дать пользователям сайта возможность перейти в заранее подготовленную категорию с похожими товарами при клике по опции или свойству. Создавая msGoodsLinks, мы преследовали цели улучшения пользовательского опыта (удобно, когда ссылка на похожие по свойству товары под рукой) и поведенческих факторов сайта (увеличивается время на сайте, увеличивается глубина просмотра, снижаются отказы), а также увеличения статического веса продвигаемых страниц сайта.

Данный инструмент будет полезен интернет-магазинам, которые активно занимаются рубрикацией своих товаров и SEO-продвижением. Мы рекомендуем использовать данный пакет вместе с дополнением msProductsComposerSelection.

Благодарю за помощь в разработке и тестировании команду [DSMC](https://dsmc.agency/)

[![](https://file.modx.pro/files/3/5/8/358d2d91e94d914b8d426bde0b9ebed4s.jpg)](https://file.modx.pro/files/3/5/8/358d2d91e94d914b8d426bde0b9ebed4.png)

[![](https://file.modx.pro/files/6/3/b/63b925878bacc66a6cfdaef400a19362s.jpg)](https://file.modx.pro/files/6/3/b/63b925878bacc66a6cfdaef400a19362.png)

## Сниппеты

### Вывод списка ссылок

#### Параметры

| Имя          | Описание                                                                                                                                      |
|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| `up`         | Искать ссылки у родительских категорий если у текущей категории их нет. По умолчанию: `1`.                                                      |
| `id`         | ID товара для которого нужно вернуть ссылки. По умолчанию ID товара где вызван сниппет.                                                       |
| `cid`        | ID категории в которой искать ссылки. Если значение задано то значение из опции up игнорируется. По умолчанию: `0`.                             |
| `return`     | Способ вывода результатов. Если указать "data" то сниппет вернет массив данных.                                                               |
| `scheme`     | Scheme URL. По умолчанию: `-1`                                                                                                                  |
| `tpl`        | Имя чанка для оформления результата. Если не указан, то содержимое полей ресурса будет распечатано на экран. По умолчанию: `tpl.msGoodsLink`. |
| `tplEmpty`   | Чанк оформления пустого результата.                                                                                                           |
| `tplWrapper` | Чанк-обёртка, для заворачивания всех результатов. Принимает один плейсхолдер: `[[+output]]`.                                                  |

## Использование в чанке сниппета msProductOptions

```fenom
{set $links = $_modx->runSnippet('msGoodsLink',['return'=>'data'])}
{foreach $options as $option}
    <div class="form-group row align-items-center">
        <label class="col-6 col-md-3 text-right text-md-left col-form-label">{$option.caption}:</label>
        <div class="col-6 col-md-9">
            {if $option.value is array}
                {set $count = count($option.value)-1}
                {foreach $option.value as $idx => $val}
                    {set $keyVal = "{$key}{$val|md5}"}
                    {if $links[$keyVal]?}<a href="{$links[$keyVal]['link']}" target="_blank">{$val}</a>{else}{$val}{/if}{if $idx < $count}, {/if}
                {/foreach}
            {else}
                {set $keyVal = "{$key}{$option.value|md5}"}
                {if $links[$keyVal]?}<a href="{$links[$keyVal]['link']}" target="_blank">{$option.value}</a>{else}{$option.value}{/if}
            {/if}
        </div>
    </div>
{/foreach}
```
