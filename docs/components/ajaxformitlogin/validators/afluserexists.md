# aflUserExists

Сниппет проверяет существование пользователя с таким username на сайте. Возвращает ошибку если пользователь **НАЙДЕН**. Используется при регистрации пользователя на сайте.

## Пример использования

```fenom
...
'customValidators' => 'aflUserExists',
'validate' => 'email:required:aflUserExists',
...
```
