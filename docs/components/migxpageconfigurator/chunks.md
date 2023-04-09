# Работа с чанками

## Чанки сниппетов

Вы можете отметить атрибутом `data-mpc-chunk` любой элемент внутри элемента с атрибутом `data-mpc-snippet` и всё его содержимое будет вырезано в отдельный файл. В качестве значения атрибута, нужно передать путь к будущему файлу  относительно папки указанной в системной настройке `mpc_path_to_chunks`, по умолчанию это `chunks/`.

```fenom
<div data-mpc-snippet="!Test|preset">
  <div data-mpc-chunk="common/chunk_1.tpl">
    <p>{$placeholder}</p>
  </div>
</div>
```

В результате обработки данного html, вы получите файл `chunks/common/chunk_1.tpl` со следующим содержимым

```fenom
<div data-mpc-chunk="common/chunk_1.tpl">
  <p>{$placeholder}</p>
</div>
```

## Включаемые чанки

Чанки можно использовать не только со сниппетами, но и включать, используя модификатор `include`. Чтобы использовать эту возможность, в html-элементу с атрибутом `data-mpc-chunk` нужно добавить атрибут `data-mpc-include`

```fenom
<div data-mpc-chunk="common/common_fields.tpl" data-mpc-include="">
  <input class="visually-hidden" type="hidden" name="formName" value="{$formName}">
  <input class="visually-hidden" type="text" name="secret" data-secret="{$secret}" style="position: absolute;opacity:0;z-index: -1;" autocomplete="off">
  <small class="text-danger error_secret"></small>
</div>
```

В примере показано, как в чанк формы можно добавить общие поля. Атрибут `data-mpc-include` можно использовать без значения.

## Обрабатываемые чанки

В чанки можно передавать свои данные, т.е. парсить чанк со своимми плейсхолдерами. Чтобы использовать эту возможность добавьте атрибут `data-mpc-parse` к элементу с атрибутом `data-mpc-chunk`, в качестве значения можно передать валидный JSON или массив.

```fenom
<div data-mpc-chunk="common/chunk_3.tpl" data-mpc-parse="['id' => 1]">
  <p>Контент распарсенного чанка - {$id}</p>
</div>
```

Уместным будет отметить, что в случае, когда нужно распарсить чанк непосредственно на фронте, а не заранее, следует использовать атрибут `data-mpc-symbol` со значением `##`.
