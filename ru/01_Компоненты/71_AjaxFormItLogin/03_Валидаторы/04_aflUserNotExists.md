# aflUserNotExists

Сниппет проверяет существование пользователя с таким username на сайте. Возвращает ошибку, если пользователь НЕ НАЙДЕН. Используется при восстановлении доступа на сайт.

## Пример использования

```html
...
'customValidators' => 'aflUserNotExists',
'validate' => 'email:required:aflUserNotExists',
...
```
