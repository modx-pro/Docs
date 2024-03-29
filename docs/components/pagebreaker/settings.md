# Настройки PageBreaker

Компонент PageBreaker использует следующие системные настройки:

| Параметр                      | Значение по умолчанию           | Описание                                                                                           |
|-------------------------------|---------------------------------|----------------------------------------------------------------------------------------------------|
| **pagebreaker_splitter**      | `<!-- pagebreak -->`            | Набор символов для разделения текста на подстраницы                                                |
| **pagebreaker_page_var**      | `p`                             | Переменная, которая будет использована для генерации страницы                                      |
| **pagebreaker_frontend_js**   | `[[+assetsUrl]]js/default.js`   | Ссылка на javascript для загрузки на страницу. Работает только при включенном **pagebreaker_ajax** |
| **pagebreaker_frontend_css**  | `[[+assetsUrl]]css/default.css` | CSS оформление для загрузки на страницу                                                            |
| **pagebreaker_ajax**          | `false`                         | Режим ajax                                                                                         |
| **pagebreaker_ajax_selector** | `#pagebreaker_content`          | CSS селектор блока с контентом страницы `[[*content]]`                                             |

![Настройки PageBreaker](https://file.modx.pro/files/3/3/a/33aa6a26ab948732ec6dc0ab6de69929.png)

## Генерация ссылок

В зависимости от параметра **pagebreaker_splitter**, будут генерироваться следующие типы ссылок:

Friendly urls **выключены**:

```
http://domain.com/?id=15
http://domain.com/?id=15&p=2
http://domain.com/?id=15&p=5
```

Friendly urls **включены**:

- Документ - контейнер (*isfolder = 1*)

  ```
  http://domain.com/page/
  http://domain.com/page/p2.html
  http://domain.com/page/p5.html
  ```

- Обычный документ

  ```
  http://domain.com/page.html
  http://domain.com/page-p2.html
  http://domain.com/page-p5.html
  ```

При включенных дружественных url также принимают участие системные параметры:

- **friendly_alias_word_delimiter** - разделитель для обычных документов, по умолчанию `-`
- **container_suffix** - разделитель для контейнеров, по умолчанию `/`
