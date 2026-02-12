# Programmatic API

## msb2Manager service

In the public API this service is responsible for:

- getting the user's bonus balance,
- crediting and debiting user points,
- applying and removing cart bonuses,
- applying and removing order bonuses.

### Loading

```php
$msb2 = $modx->getService('msbonus2', 'msBonus2',
    MODX_CORE_PATH . 'components/msbonus2/model/msbonus2/');
$msb2->initialize($modx->context->key);
$manager = $msb2->getManager();
```
