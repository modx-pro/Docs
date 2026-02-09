# How to add a tag

A tag in this component is a handler class in `core/components/textadvs/handlers/tags/`. Add your custom class there and the component will use it.

## Requirements for the handler class

1. Class name format: `txaTag{tag}`
2. File name format: `txatag{tag}.class.php`
3. The class must extend the abstract class `txaTagBase`
4. The class must have 2 public properties:
   - `$key` — the tag key (the tag itself),
   - `$name` — the tag label (shown in the Manager).
5. The class must have a public method `prepare($content)` that calls `preg_replace_callback` with the needed regex and callback `$this->pregReplaceCallback()`.

Let's look at a concrete example.
Suppose we want to add the tag `hr`. The class would look like this:

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
        $this->idx = 0; // reset the found tag index
        $content = preg_replace_callback('/<hr[^>]*>/usi', array($this, 'pregReplaceCallback'), $content);

        return $content;
    }
}
```

The file must be named `txataghr.class.php`.

That’s how you can extend the textAdvs component when needed.
