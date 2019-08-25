# msOptionsPrice

Компонент предназначен для установки дополнительных цен к товару в зависимости от их характеристик.

## Настройки модуля

Для редактирования настроек скрипта перейдите в раздел "Настройки системы" и выберите фильтр "msoptionsprice"

[![](http://modx.pro/assets/images/tickets/3409/8636c50d7d7c56de9ecf75b700a83ee47e5e451e.png)](http://modx.pro/assets/images/tickets/3409/8636c50d7d7c56de9ecf75b700a83ee47e5e451e.png)

* включить / выключить дополнительные цены товара
* файл c javascript для обновления цен на фронте сайта
* на вкладке «Поле Minishop» указать доп. поле minishop к которому необходимы цены

## Вкладка доп. цен

После активации модуля в ресурсе товара Minishop у вас появится новая вкладка 'Параметры-цены'

[![](http://modx.pro/assets/images/tickets/3409/8f710546c040201c963873de2ebc044d942e1bb7.png)](http://modx.pro/assets/images/tickets/3409/8f710546c040201c963873de2ebc044d942e1bb7.png)

### В данном случае сформированы доп. цены для различных размеров товара.

[![](http://modx.pro/assets/images/tickets/3409/30ce2928760b6518fa5d65a1e6eae17a743f9b1d.png)](http://modx.pro/assets/images/tickets/3409/30ce2928760b6518fa5d65a1e6eae17a743f9b1d.png)

### При выборе товара с данными свойствами на сайте автоматически обновится стоимость товара.

[![](http://modx.pro/assets/images/tickets/3409/198b956b16510e7c3a24092a2faef19e3b7cb240.png)](http://modx.pro/assets/images/tickets/3409/198b956b16510e7c3a24092a2faef19e3b7cb240.png)

### Обновление цен при выборе опции

Для автоматического обновления цены товара на сайте, необходимо обернуть плейсходер [[!+price]] в span с классом `pr_change`

```html
<span class="pr_change">[[!+price]]</span>
```
