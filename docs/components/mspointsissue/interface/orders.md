# Заказы

При создании заказа [miniShop2][01020103] вся информация компонента сохраняется в поле `properties`.

Например

```json
[id] => 1
[user_id] => 2
[createdon] => 2018-05-13 12:43:47
[updatedon] =>
[num] => 1805/1
[cost] => 800
[cart_cost] => 600
[delivery_cost] => 200
[weight] => 0
[status] => 1
[delivery] => 9
[payment] => 3
[address] => 1
[context] => web
[comment] =>
[properties] => Array
  (
    [mspointsissue] => {"mspointsissue_process_blocks":"{\"msPointsIssue.block.address\":\".mspointsissue-address\",\"msPointsIssue.block.info\":\".mspointsissue-info\",\"msPointsIssue.block.map\":\".mspointsissue-map\"}","mspointsissue_delivery_terminal[3]":"7","mspointsissue_delivery_point":"2","mspointsissue_delivery_terminal":"4","mspointsissue_delivery_point[3]":"4","mspointsissue_delivery_point[4]":"9","mspointsissue_delivery_terminal[7]":"17","mspointsissue_delivery_point[7]":"15","mspointsissue_delivery_point[8]":"3","mspointsissue_delivery_terminal[9]":"4","mspointsissue_delivery_point[9]":"2","point":{"id":2,"delivery":9,"identifier":"","active":true,"rank":1,"name":"Санкт-Петербург","resource":0,"cost":"0","description":null,"properties":null},"terminal":{"id":4,"point":"2","identifier":"","active":true,"rank":3,"name":"спб 1","resource":0,"cost":"200","phone":"","address":"ул. Рубинштейна, 24, Санкт-Петербург, Россия, 191002","coords":"59.92970529999999,30.344619400000056","description":null,"properties":null}}
  )
[type] => 0
```

В дальнейшем эту информацию можно получить как

```fenom
{if $properties.mspointsissue}
  {var $tmp = $properties.mspointsissue | json_decode}
  {* $tmp | print *}

  {if $tmp.point}
    Точка доставки: {$tmp.point.name}<br>
  {/if}
  {if $tmp.terminal}
    Терминал доставки: {$tmp.terminal.name}<br>
    {$tmp.terminal.address}
  {/if}
{/if}
```

[01020103]: /components/minishop2/interface/orders
