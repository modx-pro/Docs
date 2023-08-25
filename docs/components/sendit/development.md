# Разработка

## Заменить стандартные уведомления miniShop2
```js:line-numbers
document.addEventListener('si:init', (e) => {   
    if(typeof miniShop2 !== 'undefined'){
        miniShop2.Message = SendIt.Notify;
    }    
});
```

## Отправить запрос на свой коннектор
```js:line-numbers
document.addEventListener('si:init', (e) => {    
    document.addEventListener('submit', (e) => {
        const target = e.target.closest('.js-my-form');
        if(!target) return;
        const params = new FormData(target);
        const url = 'assets/action.php';
        const headers = {};
    })
    SendIt.Sending.send(target, url, headers, params);
});
```
::: warning
Отправляя данные на собственный коннектор позаботьтесь о том, чтобы защити сервер от XSS атак и ботов.
:::

## Отправить запрос на стандартный коннектор
```js:line-numbers
document.addEventListener('si:init', (e) => {    
    document.addEventListener('submit', (e) => {
        const target = e.target.closest('.js-my-form');
        if(!target) return;
        const preset = target.dataset[Sendit.Sending.config.presetKey];        
    })
    SendIt.Sending.prepareSendParams(target, preset);
});
```
::: tip
Предполагается, что ключ пресета записан в атрибуте **data-si-preset**.
:::


## Свой сниппет для обработки данных
::: tip
В вашем сниппете параметры пресета будут доступны в виде переменных, а данные формы можно получить из массива $_POST, файлы из массива $_FILES.
:::
```php:line-numbers
if($flag){
    return $SendIt->success($successMessage, ['somedata' => 1234]);
}else{
    return $SendIt->error($validationErrorMessage, ['erorrs' => ['fieldName' => 'Тут текст ошибки']]);
}
```
::: tip
Вы можете делегировать валидацию полей компоненту **FormIt**, для этого просто добавьте в пресет параметр **validate**.
:::

## Создать интерфейс управления формами в админке
