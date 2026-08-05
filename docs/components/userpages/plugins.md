Системные события для плагинов:

## upOnBeforeChangeResource

Вызывается перед созданием / редактированием ресурса.  
Принимает массив `$data` с входящими данными. Должен также возвращать `$data`.  
Если добавить `$date['error_message']` выведется соответствующее сообщение об ошибке и скрипт прекратит работу.  

Например, нужно проверить TV-параметр tv_seotitle на длину и если она больше 70 знаков вывести сообщение об ошибке, а если нет, добавить фразу ", купить недорого":

```
<?php
switch($modx->event->name){
    case 'upOnBeforeChangeResource':
        if(mb_strlen($data['tv_seotitle']) > 70){
            $data['error_message'] = 'Слишком длинный заголовок';
        }else{
            if(mb_stripos($data['tv_seotitle'], ', купить недорого') === false){
                $data['tv_seotitle'] = $data['tv_seotitle'].', купить недорого';
            }
        }
        $modx->event->returnedValues['data'] = $data;
    break;
}
```

## upOnAfterChangeResource

Вызывается после сохранения ресурса.  
Принимает объект ресурса `$object`, ничего не возвращает.  

Например, нужно все внешние ссылки в контенте заменить на [ссылка]:

```
<?php
switch($modx->event->name){
    case 'upOnAfterChangeResource':
        if($object){
            $content = preg_replace('/(?:https?|ftp):\/\/[^\s]+|www\.[^\s]+/', '[ссылка]', $object->get('content'));
            $object->set('content', $content);
            $object->save();
        }
    break;
}
```
