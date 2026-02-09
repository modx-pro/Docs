---
title: События модели заказа (xPDO)
---
# События модели заказа (xPDO)

Низкоуровневые события xPDO для модели msOrder: сохранение и удаление объектов.

::: warning Уровень событий
Эти события вызываются на уровне xPDO модели, а не контроллера. Они срабатывают при любом сохранении/удалении объекта msOrder, включая:

- Создание заказа через фронтенд
- Редактирование в админке
- Программное изменение через API
:::

## msOnBeforeSaveOrder

Вызывается **перед** сохранением объекта заказа (xPDO `save()`).

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `msOrder` | `msOrder` | Объект заказа |
| `mode` | `string` | Режим: `new` или `upd` |

### Пример использования

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeSaveOrder':
        /** @var \MiniShop3\Model\msOrder $order */
        $order = $scriptProperties['msOrder'];
        $mode = $scriptProperties['mode'];

        // Автозаполнение полей для нового заказа
        if ($mode === 'new') {
            if (empty($order->get('uuid'))) {
                $order->set('uuid', \Ramsey\Uuid\Uuid::uuid4()->toString());
            }
        }

        // Обновление времени при любом сохранении
        $order->set('updatedon', time());
        break;
}
```

### Валидация перед сохранением

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeSaveOrder':
        $order = $scriptProperties['msOrder'];

        // Проверка минимальной суммы
        $cost = $order->get('cost');
        if ($cost > 0 && $cost < 500) {
            // Примечание: прерывание через output() здесь не работает,
            // нужно использовать return false в методе save() модели
            $modx->log(modX::LOG_LEVEL_WARN,
                '[Order] Сумма заказа меньше минимальной: ' . $cost
            );
        }
        break;
}
```

---

## msOnSaveOrder

Вызывается **после** успешного сохранения объекта заказа.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `msOrder` | `msOrder` | Сохранённый объект заказа |
| `mode` | `string` | Режим: `new` или `upd` |

### Пример использования

```php
<?php
switch ($modx->event->name) {
    case 'msOnSaveOrder':
        $order = $scriptProperties['msOrder'];
        $mode = $scriptProperties['mode'];

        if ($mode === 'new') {
            $modx->log(modX::LOG_LEVEL_INFO, sprintf(
                '[Order] Создан новый заказ #%d',
                $order->get('id')
            ));
        }

        // Синхронизация с внешней системой
        // $externalApi->syncOrder($order->toArray());
        break;
}
```

---

## msOnBeforeRemoveOrder

Вызывается **перед** удалением объекта заказа.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `msOrder` | `msOrder` | Объект заказа для удаления |

### Пример использования

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeRemoveOrder':
        $order = $scriptProperties['msOrder'];

        // Архивирование перед удалением
        $archiveData = [
            'order_id' => $order->get('id'),
            'order_num' => $order->get('num'),
            'data' => json_encode($order->toArray()),
            'deleted_at' => date('Y-m-d H:i:s'),
            'deleted_by' => $modx->user->get('id'),
        ];

        $archive = $modx->newObject('msOrderArchive', $archiveData);
        $archive->save();

        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[Order] Заказ #%s архивирован перед удалением',
            $order->get('num')
        ));
        break;
}
```

---

## msOnRemoveOrder

Вызывается **после** удаления объекта заказа.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `msOrder` | `msOrder` | Удалённый объект заказа |

### Пример использования

```php
<?php
switch ($modx->event->name) {
    case 'msOnRemoveOrder':
        $order = $scriptProperties['msOrder'];

        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[Order] Удалён заказ #%s (ID: %d)',
            $order->get('num'),
            $order->get('id')
        ));

        // Уведомление администратора
        // $notifier->send('Заказ #' . $order->get('num') . ' удалён');
        break;
}
```

---

## msOnBeforeUpdateOrder

Вызывается **перед** обновлением заказа через процессор админки.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `msOrder` | `msOrder` | Объект заказа |
| `mode` | `string` | Режим: `upd` |

### Пример использования

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeUpdateOrder':
        $order = $scriptProperties['msOrder'];

        // Сохранить историю изменений
        $changes = $order->getDirty();
        if (!empty($changes)) {
            $modx->log(modX::LOG_LEVEL_INFO, sprintf(
                '[Order] Изменения заказа #%d: %s',
                $order->get('id'),
                json_encode($changes)
            ));
        }
        break;
}
```

---

## msOnUpdateOrder

Вызывается **после** обновления заказа через процессор админки.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `msOrder` | `msOrder` | Обновлённый объект заказа |
| `mode` | `string` | Режим: `upd` |

### Пример использования

```php
<?php
switch ($modx->event->name) {
    case 'msOnUpdateOrder':
        $order = $scriptProperties['msOrder'];

        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[Order] Заказ #%d обновлён менеджером %s',
            $order->get('id'),
            $modx->user->get('username')
        ));

        // Синхронизация с CRM
        // $crm->updateOrder($order->toArray());
        break;
}
```

---

## Полный пример: аудит изменений заказов

```php
<?php
/**
 * Плагин: Аудит изменений заказов
 * События: msOnBeforeSaveOrder, msOnSaveOrder, msOnRemoveOrder
 */

switch ($modx->event->name) {

    case 'msOnBeforeSaveOrder':
        $order = $scriptProperties['msOrder'];
        $mode = $scriptProperties['mode'];

        if ($mode === 'upd') {
            // Сохраняем состояние до изменений для сравнения
            $modx->eventData['orderAudit'] = [
                'before' => $order->toArray(),
                'dirty' => $order->getDirty(),
            ];
        }
        break;

    case 'msOnSaveOrder':
        $order = $scriptProperties['msOrder'];
        $mode = $scriptProperties['mode'];

        $auditData = $modx->eventData['orderAudit'] ?? null;

        $audit = $modx->newObject('msOrderAudit', [
            'order_id' => $order->get('id'),
            'user_id' => $modx->user->get('id') ?: 0,
            'action' => $mode === 'new' ? 'create' : 'update',
            'ip' => $_SERVER['REMOTE_ADDR'] ?? '',
            'createdon' => date('Y-m-d H:i:s'),
        ]);

        if ($mode === 'new') {
            $audit->set('changes', json_encode(['action' => 'create']));
        } else {
            $audit->set('changes', json_encode($auditData['dirty'] ?? []));
        }

        $audit->save();
        break;

    case 'msOnRemoveOrder':
        $order = $scriptProperties['msOrder'];

        $audit = $modx->newObject('msOrderAudit', [
            'order_id' => $order->get('id'),
            'user_id' => $modx->user->get('id') ?: 0,
            'action' => 'delete',
            'ip' => $_SERVER['REMOTE_ADDR'] ?? '',
            'createdon' => date('Y-m-d H:i:s'),
            'changes' => json_encode([
                'order_num' => $order->get('num'),
                'cost' => $order->get('cost'),
            ]),
        ]);
        $audit->save();
        break;
}
```
