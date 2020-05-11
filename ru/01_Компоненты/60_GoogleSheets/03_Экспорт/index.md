## **Настройка**

![](https://file.modx.pro/files/f/5/1/f517f34c3a93ebc6d70eefa23f5fda24.jpg)

### **URL таблицы**

Ссылка гугл таблицы, куда будут импортироваться данные.

### **Лист таблицы**

Название листа в гугл таблице

### **Тип экспорта**

-   **modResource** (обычные ресурсы)
-   **msCategory** (категории minishop2)
-   **msProduct** (товары minishop2)
-   **msOrder** (заказы minishop2)
-   **msVendor** (производители minishop2)
-   **modUser** (пользователи)
-   **msClient** (покупатели minishop2)
-   **msOptionsPrice2** (дополнительные опции minishop2)
-   **msProductRemains** (остатки товара minishop2)

### **Настройка экспорта**

-   **Append** (добавляет новые данные к старым)
-   **Update** (обновляет всю таблицу)

> \*Списки указываются через запятую

## Системные события

До форматирование полей:

-   **gsOnBeforeExportValues**

После:

-   **gsOnExportValues**

У этих событиях есть 2 параметра:

-   **values** - данные для экспорта
-   **range** - название листа, куда данные будут экспортироваться

Используя любое из этих событий можно изменить данные. Например, мы добавили поле **template**, которое выведет id шаблона, но мы хотим чтобы было в таком формате: **Название шаблона (id)**.

Реализация:

```php
<?php
if($modx->event->name == 'gsOnBeforeExportValues') {
  $modx->event->params['values'] = array_map(function($value) use (& $modx){
    if(!empty($value['template'])) {
      // Получаем нужный нам шаблон
      if($template = $modx->getObject('modTemplate', $value['template'])) {
        $value['template'] = $template->get('templatename') . ' (' . $value['template'] . ')';
      }
    }
    return $value;
  },$values);
}

Результат:

![](https://file.modx.pro/files/8/b/5/8b52e7e4197fad59e365c48f55235c31.jpg)
```
