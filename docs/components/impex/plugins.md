При установке пакета создаются следующие системные события:

### OnImpexBeforeResourceExport
Вызывается перед экспортом ресурса. Доступные переменные:
```
$config_name - имя файла конфигурации
$id - ID ресурса
$field - имя поля
$type - тип поля
$value - значение
```

Пример использования (присоединяет к заголовку страницы ее ID):
```
<?php
switch ($modx->event->name){
    case 'OnImpexBeforeResourceExport':
        if($field == 'pagetitle') $value = $value.'-'.$id;
        $modx->event->returnedValues['value'] = $value;
    break;
}
```

### OnImpexBeforeResourceImport
Вызывается перед импортом ресурса. Доступные переменные:

```
$config_name - имя файла конфигурации
$config - массив полей из конфигурации
$data - массив данных ресурса из файла
```
Пример использования (пропишем конкретному товару значение TV, которого нет в конфиге и файле):
```
<?php
switch ($modx->event->name){
    case 'OnImpexBeforeResourceExport':
        if($data[1] == 'Продукт1'){
                $config[] = ['Вес без упаковки', 3 , 'tv'];
                $data[] = '125';
            }
            $output = [
                'config' => $config,
                'data' => $data
            ];
            $modx->event->returnedValues['output'] = $output;
    break;
}
```

## OnImpexBeforeSetParentProduct
Вызывается перед получением родительской категории. Доступны:
```
$config_name - имя файла конфигурации
$category - строка категорий из файла
$category_id_field - значение параметра конфигурации category_id_field (идентификатор для определения категории)
```
Плагин должен вернуть цепочку категорий через разделитель ||:
```
<?php
switch ($modx->event->name){
    case 'OnImpexBeforeSetParentProduct':
        if($category_id_field != ''){
            $categories = 'Категория1||Категория2||Категория3';
            $modx->event->returnedValues['categories'] = $categories;
        }
    break;
}
```

## OnImpexBeforeFieldImport
Вызывается перед импортом поля ресурса. Доступные переменные такие же как при экспорте:
```
$config_name - имя файла конфигурации
$id - ID ресурса
$field - имя поля
$type - тип поля
$value - значение
```

## OnImpexAfterResourceImport
Вызывается после импорта ресурса. Доступны:
```
$config_name - имя файла конфигурации.
$id - ID импортированного ресурса.
$data - поля/значения импортированного ресурса.
```
Пример использования:
```
<?php
switch ($modx->event->name){
    case 'OnImpexAfterResourceImport':
        if($resource = $modx->getObject('modResource', $id)){
            $resource->set('alias', 'resource-'.$id);
            $resource->save();
        }
    break;
}
```

## OnImpexAterAllImport
Вызывается после импорта всех ресурсов. Доступны:
```
$config_name - имя файла конфигурации.
$ids - массив ID всех импортированных ресурсов.
```
Пример использования:

```<?php
switch ($modx->event->name){
    case 'OnImpexAterAllImport':
        foreach($ids as $id){
            if($resource = $modx->getObject('modResource', $id)){
                $resource->set('published', 1);
                $resource->save();
            }
        }
    break;
}
```
