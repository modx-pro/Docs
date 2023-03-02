Component PageBreaker operates with following system settings:


Parameter					| Value on default				| Description
----------------------------|-------------------------------|----------
pagebreaker_splitter		| &lt;!-- pagebreak --&gt;		| Set of symbols to delimiter the text on subpages
pagebreaker_page_var		| p								| Variable that will be used for page generation
pagebreaker_frontend_js		| [[+assetsUrl]]js/default.js	| Link to JavaScript to load it on the page. It operates only if **pagebreaker_ajax** is on
pagebreaker_frontend_css	| [[+assetsUrl]]css/default.css	| CSS formatting to load it on the page
pagebreaker_ajax			| false							| Ajax regime
pagebreaker_ajax_selector	| #pagebreaker_content			| CSS block selector with page content `[[*content]]`

[![](https://file.modx.pro/files/3/3/a/33aa6a26ab948732ec6dc0ab6de69929s.jpg)](https://file.modx.pro/files/3/3/a/33aa6a26ab948732ec6dc0ab6de69929.png)

## Link generation
These types of links will be generated, it depends on parameter **pagebreaker_splitter**:

Friendly urls **off**:
```
http://domain.com/?id=15
http://domain.com/?id=15&p=2
http://domain.com/?id=15&p=5
```

Friendly urls **on**:

* Document is a container  (*isfolder = 1*)
```
http://domain.com/page/
http://domain.com/page/p2.html
http://domain.com/page/p5.html
```

* Common document
```
http://domain.com/page.html
http://domain.com/page-p2.html
http://domain.com/page-p5.html
```

If friendly urls are on, system parameters also take part:

* **friendly_alias_word_delimiter** - delimiter for common documents, on default `-`
* **container_suffix** - delimiter for containers, on default `/`
