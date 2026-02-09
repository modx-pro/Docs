# Translation principle for entities other than modResource and query translation

Any snippet that outputs a list of resources (not necessarily modResource, but also gallery files, comments, etc.) works by receiving parameters, building a database query, fetching data, processing it and returning it.

pdoTools snippets provide a way to override the class that performs the selection via a system setting.

| Setting            | Value                                                      |
|--------------------|------------------------------------------------------------|
| pdoFetch.class     | `mlFetch`                                                 |
| pdofetch_class_path| `{core_path}components/multilingual/model/multilingual/` |

To get translated results for resource classes other than modResource (and its subclasses), write your own class extending mlFetch, override **getArray** and **prepareRows**, and add the same selection preparation logic as in mlFetch.

Then, when using pdoResources or another custom snippet that uses the class from `pdoFetch.class`, you will get results translated to the current language.
