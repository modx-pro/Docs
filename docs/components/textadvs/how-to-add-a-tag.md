# Как добавить тег

Тег для компонента - это класс-обработчик в папке `core/components/textadvs/handlers/tags/`. Сюда мы можем добавить наш кастомный класс и его подхватит компонент.

## Требования для класса-обработчика

1. Название класса в формате `txaTag{tag}`
2. Название файла в формате `txatag{tag}.class.php`
3. Класс должен расширять абстрактный класс `txaTagBase`
4. Класс должен иметь 2 публичных свойства:
    - `$key` - ключ тега, по сути это сам тег,
    - `$name` - название тега (отображается менеджеру).
5. Класс должен иметь публичный метод `prepare($content)`, в котором происходит вызов функции `preg_replace_callback` с необходимым для обработки регулярным выражением и указанием колбека `$this->pregReplaceCallback()`.

Давайте рассмотрим всё вышеописанное на конкретном примере!
Допустим, мы хотим добавить тег `hr`. Наш класс будет выглядеть так:

```php
class txaTagHr extends txaTagBase
{
    /** @var string $key */
    public $key = 'hr';
    /** @var string $name */
    public $name = '<hr>';

    /**
     * @param string $content
     *
     * @return string
     */
    public function prepare($content)
    {
        $this->idx = 0; // здесь мы обнуляем номер найденного тега
        $content = preg_replace_callback('/<hr[^>]*>/usi', array($this, 'pregReplaceCallback'), $content);

        return $content;
    }
}
```

Называться файл должен `txataghr.class.php`

Вот так просто и легко мы можем расширять функционал компонента `textAdvs`, если это требуется.
