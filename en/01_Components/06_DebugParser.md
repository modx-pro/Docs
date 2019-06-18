Plugin for identification bottlenecks of the site. It shows all handled tags and expended time.

Now you can specify and optimize slow calls on every page.

[![](https://file.modx.pro/files/1/a/c/1acbdf642c641a641ad6a646576fe4b3s.jpg)](https://file.modx.pro/files/1/a/c/1acbdf642c641a641ad6a646576fe4b3.png)

Tag MODX activation, number of queries to the database when it is operation, time of queries and total time spent on processing are shown in the table.

If a tag is activated several times on the page, so these tags are totalized.

*Parameters `Queries` and `Queries time` can be inaccurate if any snippet works with the database directly and don not write data in variable `modX::executedQueries` and `modX::queryTime`. E.g. **pdoResources** is written, but there is no **getProducts**.*

At the bottom of the table you see total according to statistics and general data: PHP version, database and etc.

## Parameters
Plugin debugParser works only for the users authorized in mgr context. It gets all the parameters through $_GET.

* **debug** — activates debugging mode and tablet output.
* **cache** — permits to use cached pages. On default - no.
* **top** — the quantity of tags for output. On default – unlimited.
* **add** — add the tablet at the end of the page, but don’t replace it totally. On default – no.

## Support of Fenom
For displaying Fenom tags you must:

* Use pdoTools <b>2.1.8</b>-pl or newer</li>
* Use debugParser <b>1.1.0</b>-pl or newer</li>
* Execute methods of <b>{$_modx}</b>. There is no way to catch system call via disabled by default {$modx} variable.

[![](https://file.modx.pro/files/f/f/2/ff2a021a63bfda91d10dab7a5cc84be6s.jpg)](https://file.modx.pro/files/f/f/2/ff2a021a63bfda91d10dab7a5cc84be6.png)

## Examples
General output:

```
http://mystite.com/?debug=1
```

Table with report will replace the content of the page, so you will see only the page.

***

Display with cache:

```
http://mystite.com/?debug=1&cache=1
```

If the page loads from cache, only uncached tags will be displayed.

***

Display of 10 first slowest tags:

```
http://mystite.com/?debug=1&cache=1&top=10
```

All unchaches tags are sorted by the runtime, that is why some of the most labor-intensive can be shown.

***

Display with attaching table to the page content:

```
http://mystite.com/?debug=1&cache=1&top=10&add=1
```