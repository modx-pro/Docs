Платный компонент предназначен для добавления меток к ресурсам.

* Демо-версия [http://usermarker.bustep.ru/demo.html][1]
* Видео с демонстрацией [https://www.youtube.com/watch?v=0nksuTp1spQ][1]
* [Купить ][1]

## Основные особенности:

* Можно назначать метки не только ресурсам но и другим любым объектам. Для этого нужно задавать свой classKey для кнопки
* Так же учитывается контекст откуда был добавлен ресурс (можно отключить)
* Возможность вывода отмеченых ресурсов пользователя через сниппет ***[[!userMarker.Resource? &label=`Проверен`]]*** с указанием нужной метки
* Управление созданными метками через личный кабинет
* Управление правами приложения. Возможность назначить права управления метками только определенным группа и контектам. Шаблон политики доступа **userMarker**

## Быстрый старт


#### Инициализация скриптов. 
Подключаем сниппет на страницу для инициализации скриптов js и css (вставить в верхнюю часть сайта)

```
[[!userMarker.Initialize]]
```

#### Список меток. 
Вставляем сниппет с метками и кнопкой добавить метку

```
[[!userMarker.Label]]
```


#### Чанк для ресурса. 
пример **tpl.userMarker.resource.row**
```
<h3>[[+pagetitle]]</h3>
[[!userMarker.Record? &resource_id=`[[+id]]`]]
```

#### Вывод списка ресурсов. 

Добавить на страницу для вывода отмеченых ресурсов

```
[[!pdoPage?
    &element=`userMarker.Resource`
]]
[[!+page.nav]]
```

Или с помощью pdoResources

```
[[!pdoResources?
    &tpl=`tpl.userMarker.resource.row`
    &innerJoin=`{
            "Marker": {
                    "class": "userMarkerResource",
                    "on": "modResource.id=Marker.resource_id"
            }
    }`
]]
```

Вывод списка ресурсов с указанием метки

```
[[!pdoPage?
    &label=`Имя метки`
    &element=`userMarker.Resource`
]]
[[!+page.nav]]
```



#### Управление метками
Вставить на страницу для авторизованного пользователя.
```
[[!userMarker.label?
     &tpl=`tpl.userMarker.manager.row`
     &tplOuter=`tpl.userMarker.manager.outer`
]]
```



### Переназначения js для модельного окна

Добавлены события для js modal
```
    // Событие для открытия модельного окна
    userMarker.Modal.show = function() {
        
        // Сюда можно прописать свой скрипт запуска модельного окна
        $(userMarker.options.modal).modal('show')
        
        // После закрытия автоматически стерам данные
        $(userMarker.options.modal).on('hidden.bs.modal', function (e) {
            userMarker.removeModal()
        })
                
    };
    
    // Событие для закрытия модельного окна
    userMarker.Modal.hide = function() {
        if ($(userMarker.options.modal).length) {
        
            // Сюда можно прописать свой скрипт закрытия модельного окна
           $(userMarker.options.modal).modal('hide')
        }
    };

```

[1]: https://modstore.pro/packages/ecommerce/usermarker
