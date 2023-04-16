# sfWord

Простой сниппет для быстрой выборки Значения и Синонима из Словаря. Может вызываться как модификатор.

Если значение для такого слова с переданным ID поля не найдено, то оно будет создано. Поэтому используйте с осторожностью. Может применяться там, где нужно получить синоним и значение слова, независимо от страницы.

По умолчанию, возвращает массив (для обработки через Fenom), но может вернуть обработанный результат, если передан параметр tpl.

Если же нужно сформировать одну или несколько полноценных ссылок с корректным адресом, то рекомендую воспользоваться сниппетом [sfLink][0].

Если же нужно вывести много ссылок, а точнее целое меню, с подсчётами результатов и дополнительными условиями - то есть сниппет [sfMenu][1]

## Параметры

Всего может принять от 2 до 3 параметров. По умолчанию в параметрах нет никаких значений.

| Параметр                       | Описание                                                                                           | Пример                                                   |
| ------------------------------ | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| **&field_id** или **&options** | Обязательный параметр! Нужно передавать ID поля из первой вкладки SeoFilter.                       | 5                                                        |
| **&input**                     | Обязательный параметр! Нужно передавать оргинальное значение(запрос) из поля ресурса               | `[[*color]]`                                             |
| **&tpl**                       | Небязательный. Служит для обработки результата. Обработка через pdoTools, поддержка INLINE-чанков. | `@INLINE <a href="{$15 \| url}color-{$alias}">{$value}</a>` |

::: warning
Если не будет найдено значение для переданного поля, то оно будет создано и записано в словарь. Соответственно синоним создастся автоматически и слово будет просклонировано по падежам, если включено в настройках.
:::

## Примеры

Все примеры подразумевают, что вы помните id страницы, правило формирования ссылок и не используете индивидуальные адреса для SEO страниц.

1. Генерация ссылок на цвета из опций miniShop2 в чанке **tpl.msProducts.row** (13 - id поля Цвет в SeoFilter):

    ```fenom
    {if $color | iterable?}
      {foreach $color as $c}
        {var $word = $c | sfWord : 13}
        <a href="{9 | url}cvet-{$word.alias}" class="label label-info">{$word.value}</a>
      {/foreach}
    {/if}
    ```

2. Формирование ссылок в каталоге статей на демо-сайте (Тип ТВ: Авто-метка выводится через разделитель `,`):

    ```fenom
    {if $tags?}
      {var $tags_a = $tags | split}
      {foreach $tags_a as $tag}
        {set $word = $tag | sfWord : 14}
        <a href="{31 | url}{$word.alias}" class="label label-success">{$word.value}</a>
      {/foreach}
    {/if}

    ```

3. Вызов в синтаксисе MODX

    ```modx
    [[!sfWord? &input=`[[*parent]]` &field_id=`12` &tpl=`@INLINE <a href="{9 | url}{$alias}">{$value}</a>`]]
    ```

Сниппет прост в использовании и работает быстро, позволяя добвалять новые слова с фронта.
Для более сложных ссылок и вообще любых ссылок с учётом условий по полям используйте сниппет [sfLink][0].

[0]: /components/seofilter/snippets/sflink
[1]: /components/seofilter/snippets/sfmenu