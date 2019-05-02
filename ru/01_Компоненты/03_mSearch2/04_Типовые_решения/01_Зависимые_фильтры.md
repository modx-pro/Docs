# Зависимые фильтры

В mFilter2 нет зависимой работы фильтров, потому что все данные выбраются и выводятся сразу. Однако, можно сымитировать их, с помощью специального javascript.

Например, у вас есть 2 ТВ параметра: марка и модель автомобиля, причём, **название модели включает в себя марку**.

Вывод фильтра будет вот такой:

```php
[[!mFilter2?
    &parents=`0`
    &filters=`
        tv|marka,
        tv|model
    `
    &aliases=`
        tv|model==model,
        tv|marka==marka,
    `
    &suggestionsRadio=`
        tv|marka,
        tv|model
    `
    &tplFilter.outer.model=`tpl.mFilter2.filter.select`
    &tplFilter.row.model=`tpl.mFilter2.filter.option`
    &tplFilter.outer.marka=`tpl.mFilter2.filter.select`
    &tplFilter.row.marka=`tpl.mFilter2.filter.option`
]]
```

*&suggestionsRadio нам нужен для нормальной работы select фильтров*.

Теперь пишем скрипт, который будет скрывать модели автомобилей, название которых **не начинается на выбранную марку**:

```javascript
var modelFilter = {
    // Наши селекторы
    options: {
        marka: '#mse2_tv\\|marka',
        model: '#mse2_tv\\|model',
    },
    // Запуск функции
    initialize: function() {
        $this = this;
        // Получаем нужные элементы исохраняем как свойства объекта
        this.marka = $(this.options['marka']);
        this.model = $(this.options['model']);

        // Смотрим в параметры адресной строки на предмет выбранной марки
        var params = mSearch2.Hash.get();
        // Если нет - отключаем модели
        if (params['marka'] == undefined) {
            $this.disableModel();
        }
        // Если есть - включаем
        else {
            $this.enableModel();
        }

        // Вешаем обработчик на изменение марки
        this.marka.find('select').on('change', function() {
            // Если что-то выбрано, то включаем модели
            if ($(this).val() != '') {
                // Переключем модель на первый пункт "Выберите из списка"
                $this.model.find('option:first').attr('selected', true);
                // И активируем блок
                $this.enableModel();
            }
            // Если нет - отключаем
            else {
                $this.disableModel();
            }
        })
    },

    // Функция отключения моделей
    disableModel: function() {
        // Ищем все поля с непустым value
        $this.model.find('option[value!=""]').attr('selected', false).attr('disabled', true);
        // И прячем весь блок
        $this.model.hide();
    },

   // Функция включения моделей
    enableModel: function() {
        // Получаем марку автомобиля
        var marka = this.marka.find(':selected').text().replace(/\(.*?\)$/, '').replace(/\s+$/, '');
        var re = new RegExp('^' + marka);
        // Пробегаем по всем моделям и проверяем имя
        $this.model.find('option').each(function() {
            var $this = $(this);
            // Имя не совпадает - нужно отключить эту модель
            if (!$this.text().match(re) && $this.prop('value') != '') {
                $this.attr('disabled', true);
                $this.hide();
            }
            // В противном случае - включить
            else {
                $this.attr('disabled', false);
                $this.show();
            }
        });
        // И показываем весь блок с моделями
        $this.model.show();
    },
}

// Скрипт запускается после полной загрузки документа
$(document).ready(function() {
    // И если на странице есть фильтры
    if ($('#mse2_mfilter').length > 0) {
        modelFilter.initialize();
    }
});
```

Этот скрипт подключается на страницу самостоятельно, и никак не мешает работе стандартного скрипта mSearch2.

Вот, что должно получиться в итоге (кликабельная GIFка):

[![](https://file.modx.pro/files/4/a/3/4a32ca06fe335d43de148c0faf640e04s.jpg)](https://file.modx.pro/files/4/a/3/4a32ca06fe335d43de148c0faf640e04.gif)
