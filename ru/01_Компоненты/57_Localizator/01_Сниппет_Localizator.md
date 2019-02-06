Сниппет предназначен для вывода переведенных в локализаторе ресурсов.

## Параметры

Сниппет Localizator работает со сниппетами пакета pdoTools. Не работает с getImageList

Название					| По умолчанию									| Описание
----------------------------|-----------------------------------------------|------------------------------------------------------------------------------------------
**snippet**				| pdoResources								| Имя сниппета для запуска
**class**				| modResource								| Класс получаемого объекта
**localizator_key**				| Нет								| Ключ локализации, по умолчанию текущий
**localizatorTVs**				| Нет								| Список переведенных доп.полей. Если не заполнять, то будут подтягиваться поля в соответствии с системной настройкой **localizator_tv_fields**

##  Примеры

Вывод через pdoMenu
```
{'Localizator' | snippet : [
    'snippet' => 'pdoMenu',
    'includeTVs' => 'img',
    'processTVs' => 'img',
    'parents' => 0,
    'level' => 1,
]}
```

Вывод ресурсов через pdoPage
```
<div id="pdopage">
    <div class="rows">
    	{'!pdoPage' | snippet : [
    		'element' => 'Localizator',
    		'parents' => 0,
    		'ajaxMode' => 'default',
    	]}
    </div>
    {'page.nav' | placeholder}
</div>
```

Вывод ресурсов через mFilter2
```
{'!mFilter2' | snippet : [
    'element' => 'Localizator',
    'parents' => 0,
]}
```
