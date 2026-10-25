# Системные события

Все события принимают массив `$data`.

## sfOnBeforeAddIndex

Вызывается перед индексированием полей ресурса. Например нужно удалить пустые значения TV (где только разделители):

```php
case 'sfOnBeforeAddIndex':
  $vals = str_replace(['-','||','#'], '', $data['values']);
  if($vals == '') $data['values'] = '';
  $modx->event->returnedValues['data'] = $data;
break;
```

## sfOnGetIds

Вызывается после первоначального сбора ID выводимых ресурсов. Можно добавить ресурс, прописав его ID или полностью переписать набор.

```php
case 'sfOnGetIds':
  $data[] = 101; // добавляем ресурс с ID = 101
  $modx->event->returnedValues['data'] = $data; 
break;
```

## sfOnBeforeCreateFilter

Вызывается при создании блока фильтра. Например, можно изменить название блока, значения для слайдера и т. д.

```php
case 'sfOnBeforeCreateFilter':
  if($data['filter'] == 'ms_tags'){
    $data['title'] = 'Категории';
  }
  $modx->event->returnedValues['data'] = $data; 
break;
```

## sfOnGetFilterValues

Вызывается после создания значений фильтра. Принимает массив со значениями, названием и типом фильтра.  
К примеру, в качестве значений фильтра `materials` указаны ID ресурсов. Нужно для названий чекбоксов использовать `pagetitle` и весь список отсортировать по ним.  

```php
case 'sfOnGetFilterValues':
    if($data['filter'] == 'materials'){
        $values = $data['values'];
        $tmp = [];
        foreach($values as $id){
            if(!$res = $modx->getObject('modResource', $id)) continue;
            $tmp[$id] = $res->get('pagetitle'); // получаем pagetitle, добавляем в качестве значения во временный массив с ключом $id
        }
        // сортируем массив по значениям (pagetitle)
        uasort($tmp, function ($a, $b) {
            return strcoll($a, $b);
        });
        $data['values'] = array_keys($tmp); // возвращаем ID в новом порядке
    }
  $modx->event->returnedValues['data'] = $data; 
break;
```

## sfOnBeforeCreateFilterRow

Вызывается при создании строки (элемента фильтра). Можно заменить названия, значения и т. д.  
А продолжение предыдущего примера выводим для фильтра `materials` не ID, а `pagetitle` ресурсов:

```php
case 'sfOnBeforeCreateFilterRow':
  $item = $data['item'];
  if($item['filter'] == 'materials'){
    if($res = $modx->getObject('modResource', $item['value'])){
      $data['item']['title'] = $res->get('pagetitle');
    }
  }
  $modx->event->returnedValues['data'] = $data; 
break;
```

## sfOnCheckResource

Вызывается при проверке ресурса на соответствие значению выбранного фильтра. Приходит id ресурса, название фильтра и значение.  
Чтобы ресурс добавился в выборку, событие должно возвращать `$data['result'] = true;`

```php
case 'sfOnCheckResource':
  $d = $data['data'];
  $data['result'] = false;
  if($d['id'] == 101 && $d['filter'] == 'ms_price'){
    if($d['value'] > 2000) $data['result'] = true; // добавляем 101 ресурс, если выбрана цена больше 2000 руб. 
  }
  $modx->event->returnedValues['data'] = $data;
break;
```

## sfOnBeforeCreateSeoRule

Вызывается перед созданием SEO-правила. Приходит массив `$data` с данными правила.  
Формирование транслитерированного URI для параметра `material`, если в значении указан ID ресурса:

```php
case 'sfOnBeforeCreateSeoRule':
  $item = $data['data'];
  if($item['alias'] == 'material'){
    if($res = $modx->getObject('modResource', $item['value'])){
      $translit = $modx->filterPathSegment($res->get('pagetitle')); // получаем pagetitle ресурса по его ID и делаем транслит
      $data['data']['uri'] = 'material/'.$translit; // формируем новый URI
    }
  }
  $modx->event->returnedValues['data'] = $data; 
break;
```

## sfOnCheckSeoRule

Вызывается при проверке SEO-правила на количество ресурсов, удовлетворяющих значению фильтра. Приходит массив `$data` с данными будущей страницы и самого правила.  
Например, нужно не создавать URL для фильтра `weight` в категории с шаблоном = 7:

```php
case 'sfOnBeforeCreateSeoRule':
  if(is_array($data)){
      $newData = $data;
      if($data['page']['template'] == 7){
          if($data['rule']['filter'] == 'weight') $newData['skip'] = 1;
      }
      $modx->event->returnedValues['data'] = $newData;
  }
break;
```

## sfOnGetSeoPage

Вызывается перед формированием SEO-страницы. Приходит массив `$data` с плейсхолдерами, данными SEO-правила, SEO-страницы и URI. Можно вернуть новые значения плейсхолдеров для конкретных страниц, шаблонов и т. д.  
Например, надо заменить во всех тегах старый заголовок на новый:

```php
case 'sfOnGetSeoPage':
  if(is_array($data)){
      $newdata = $data;
      if($data['page']['resource_id'] == 3){
          $newdata = [];
          foreach($data as $k => $v){
              $newdata[$k] = str_replace('Старый заголовок', 'Новый заголовок', $v);
          }
      }
      $modx->event->returnedValues['data'] = $newdata; 
  }
break;
```

## sfOnCheckSeoPage

Вызывается при проверке SEO-страницы. Приходит массив `$data` с данными страницы.  
Например, товары физически находятся в разделе с ID = 10, а SEO-страницы нужно сформировать для ресурса с ID = 12.

```php
case 'sfOnGetSeoPage':
  if(is_array($data)){
      if($data['id'] == 12) $data['sf_parent'] = 10; // меняем параметр sf_parent на 10, чтобы ресурсы забирались оттуда
      $modx->event->returnedValues['data'] = $data;
  }
break;
```
