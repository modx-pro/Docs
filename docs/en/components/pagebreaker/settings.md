# PageBreaker Settings

PageBreaker uses the following system settings:

| Parameter                      | Default               | Description                                                                                           |
|--------------------------------|-----------------------|--------------------------------------------------------------------------------------------------------|
| **pagebreaker_splitter**       | `<!-- pagebreak -->`  | String used to split text into subpages                                                                |
| **pagebreaker_page_var**       | `p`                   | Variable used in the page URL                                                                          |
| **pagebreaker_frontend_js**    | `[[+assetsUrl]]js/default.js`   | Path to JavaScript to load. Only when **pagebreaker_ajax** is enabled                                 |
| **pagebreaker_frontend_css**   | `[[+assetsUrl]]css/default.css` | Path to CSS to load                                                                                    |
| **pagebreaker_ajax**           | `false`               | Ajax mode                                                                                              |
| **pagebreaker_ajax_selector**  | `#pagebreaker_content` | CSS selector for the block containing `[[*content]]`                                                   |

![PageBreaker Settings](https://file.modx.pro/files/3/3/a/33aa6a26ab948732ec6dc0ab6de69929.png)

## Link generation

Depending on **pagebreaker_splitter**, links are generated as follows:

Friendly URLs **disabled**:

```
http://domain.com/?id=15
http://domain.com/?id=15&p=2
http://domain.com/?id=15&p=5
```

Friendly URLs **enabled**:

- Container document (*isfolder = 1*)

  ```
  http://domain.com/page/
  http://domain.com/page/p2.html
  http://domain.com/page/p5.html
  ```

- Regular document

  ```
  http://domain.com/page.html
  http://domain.com/page-p2.html
  http://domain.com/page-p5.html
  ```

With friendly URLs, these system settings also apply:

- **friendly_alias_word_delimiter** — delimiter for regular documents, default `-`
- **container_suffix** — delimiter for containers, default `/`
