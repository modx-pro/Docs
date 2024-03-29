# Генерация промо-кода в письме на следующий заказ

С версии 1.1.12 появился метод `mspc2Manager::generateCoupon`, который позволяет сгенерировать промо-код с кодом в заданном формате и заданными параметрами.
Это значительно упрощает процесс генерации купона с уникальным кодом.

## Шаг 1

Создаём сниппет `generateCoupon` с кодом:

```php
$mspc2 = $modx->getService('mspromocode2', 'msPromoCode2',
    MODX_CORE_PATH . 'components/mspromocode2/model/mspromocode2/');
$mspc2->initialize($modx->context->key);
$manager = $mspc2->getManager();

$order_id = (int)$modx->getOption('order', $scriptProperties) ?: 0;
if (empty($order_id)) {
  return 'Укажите id заказа.';
}

// Сначала попробуем найти уже сгенерированный промо-код для этого заказа
if ($couponObj = $modx->getObject('mspc2Coupon', ['properties LIKE "%\"prev-order\":' . $order_id . '%"'])) {
  $coupon = $manager->getCoupon((int)$couponObj->get('id'));
}

// Не удалось найти промо-код
if (empty($coupon) || !is_array($coupon)) {
  // Формат промо-кода в виде regex-like синтаксиса
  $format = '[a-zA-Z0-9]{12}';

  // Параметры промо-кода
  $data = [
    'list' => 'for-next-order', // Поле "Список" для промо-кода
    'count' => 1, // Сколько раз можно применить генерируемый промо-код
    'discount' => '10%', // Размер скидки для генерируемого промо-кода
    'description' => 'Скидка на следующий заказ', // Описание промо-кода

    // Конфиг
    'showinfo' => true, // Показывать предупреждения
    'oneunit' => false, // На одну единицу товара
    'onlycart' => true, // Только в корзине
    'unsetifnull' => false, // Не применять без скидки
    'unsetifnull_msg' => '', // Текст при отмене
    'oldprice' => false, // Без старой цены

    // Время действия
    'lifetime' => strtotime('1 month'), // +1 месяц в секундах

    // Сохраним id заказа в properties
    'properties' => [
      'prev-order' => $order_id,
    ],
  ];
  $coupon = $manager->generateCoupon($format, $data);
}

return $coupon;
```

## Шаг 2

В чанке письма, в котором вы хотите сгенерировать промо-код для клиента (у меня это `tpl.msEmail.paid.user`) вызываем сниппет и прописываем вывод данных купона, примерно так:

```fenom
{extends 'tpl.msEmail'}

{block 'title'}
  {'ms2_email_subject_paid_user' | lexicon : $order}
{/block}

{block 'products'}
  {var $newCoupon = ('!generateCoupon' | snippet : [
    'order' => $order.id,
  ])}
  {if ($newCoupon is not empty) && is_array($newCoupon)}
    <div style="margin: -10px 20px 40px;">
      Специально для Вас мы сгенерировали промокод -{$newCoupon.discount} на следующую покупку:
      <span style="display: inline-block;background: #ffecec;padding: 4px 4px;border: 2px solid #ff4f50;border-radius: 4px;font-size: 18px;line-height: 1;">
        {$newCoupon.code}
      </span>.
      Вставьте его в корзине нашего сайта при следующем заказе, чтобы получить персональную скидку.
      {if $newCoupon.stoppedon?}
        <br>Скидка действительна до {$newCoupon.stoppedon | date : 'd.m.Y H:i'}
      {/if}
    </div>
  {/if}

  {parent}
{/block}
```

Выглядеть это будет как-то так:

![](https://file.modx.pro/files/1/f/f/1ff4ab1c2c9889f958ddaff304541b6f.png)
