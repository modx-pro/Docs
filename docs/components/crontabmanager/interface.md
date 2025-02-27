# Интерфейс

## Добавить задание - контроллер

Через скрипт контроллера

[![](https://file.modx.pro/files/5/a/6/5a63ac91b0aec4774b2e863e175ba999s.jpg)](https://file.modx.pro/files/5/a/6/5a63ac91b0aec4774b2e863e175ba999.png)

## Добавить задание - сниппет

Создайте сниппет который будет запускать автоматически и привяжите его крон заданию

[![](https://file.modx.pro/files/d/5/e/d5ecfe8fbc76872995c252d40ee6940fs.jpg)](https://file.modx.pro/files/d/5/e/d5ecfe8fbc76872995c252d40ee6940f.png)

### Содержание сниппета

```php
<?php
echo "Test" . PHP_EOL;

return 0; # Ошибка
return 1; # Успех
```

Для успешного завершения задачи, необходимо вернуть: `return 1;` иначе крон задание завершиться с ошибкой
