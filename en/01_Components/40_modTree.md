## ModTree

With this component, you can link resources of your site with each other and show them on page as a tree.

Make links between resources on CMP.

[![](https://file.modx.pro/files/b/3/1/b31a66bf709cb4e4212e157d7c1d496ds.jpg)](https://file.modx.pro/files/b/3/1/b31a66bf709cb4e4212e157d7c1d496d.jpg)

See result on [live demo][1].

Or see on the screen.

[![](https://file.modx.pro/files/4/1/1/41169caaac34dbce4a1215f8a61963ffs.jpg)](https://file.modx.pro/files/4/1/1/41169caaac34dbce4a1215f8a61963ff.png)

Uses AJAX. JQuery not required.

### Examples:

#####Display child resources and search fields

&queryLinks=`0`. Display child resourses of resource 7 instead of related. Search fields are displayed as default.

```
[[modTree?
    &parent=`7`
    &limitList=`5`
    &queryLinks=`0`
    ]]
```

#####Display linked resources

Display related resources of resource 15.

```
[[modTree?
    &parent=`15`
    &limitList=`5`
    ]]
```

###Snippet parameters

#####Result parameters

| Name                  | Default                     | Description                                                                                     |
| --------------------- | ------------------------------------------------- | ------------------------------------------------------------------------- |
| **&tplOuter**         | tpl.ModTree.outer           | main template            |
| **&tplList**          | tpl.ModTree.itemList        | template for start items |
| **&tplTree**          | tpl.ModTree.itemTree        | template for childs branches on tree |
| **&tplSearchField**   | tpl.ModTree.itemSearchField | template for search fields |
| **&tplButtons**       | tpl.ModTree.paginateBtns    | template for paginate buttons |
| **&sortBy**           | menuindex                   |  |
| **&sortDir**          | ASC                         |  |
| **&limit**            | 0                           | limit on tree for child branches |
| **&limitList**        | 15                          | limit for start search  |
| **&contentIdPrefix**  | modtree-                    | prefix of ID for content fields. In case using two or more snippet on page you must use othor &tplOuter with other $contentIdPrefix. Fields can be placed anywhere on the page, even outside of the &tplOuter |

#####Search parameters

| Name                  | Default                     | Description                                                                                     |
| --------------------- | ------------------------------------------------- | ------------------------------------------------------------------------- |
| **&queryLinks**       | 1                           | Determines the start search. `1` - related resources. `0` - child resources. If `0` - search fields are displayed as default |
| **&parent**           | curren resource             | Resource for start search |
| **&queryForce**       | 1                           | Determines whether to perform a start search. `1` - do start search, `0` - search only on search button click |
| **&linkWay**          | 0                           | Link direction. `1` - master to slave. `-1` - slave to master. `0` - both way |
| **&searchFields**     | padetitle,content           | Search fields. String with comma separator. Displayed only if &queryLinks = `0` |



[1]: http://modtree.visermort.ru/examples.html