
## Служба msb2Manager

Данная служба, в контексте публичного API, отвечает за:

* получение количества баллов пользователя,
* начисление, списание баллов пользователю,
* установку, отмену бонусов на корзину,
* установку, отмену бонусов на заказ.


### Подключение

```php
$msb2 = $modx->getService('msbonus2', 'msBonus2',
    MODX_CORE_PATH . 'components/msbonus2/model/msbonus2/');
$msb2->initialize($modx->context->key);
$manager = $msb2->getManager();
```


