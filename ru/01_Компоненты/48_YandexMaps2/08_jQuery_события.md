С версии 1.2.0 в компонент были добавлены jQuery триггеры.
Подобная логика позволяет навесить свой JS код на фронт-энд события карты.

## ymOnLoadMap

Сработает при загрузке карты.

### Пример

```javascript
$(document).ready(function() {
    $(document).on('ymOnLoadMap', function(e, ym2, map) {
        console.log('ym2', ym2); // Экземпляр класса YandexMaps2
        console.log('map', map); // Объект карты
    });
});
```
