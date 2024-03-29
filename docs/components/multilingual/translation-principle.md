# Принцип перевода сущностей, отличных от modResource и перевода выборок

Работа любых сниппетов, выводящих список каких-либо ресурсов (не обязательно modResource, но также и файлов галереи,
комментариев и т.д.), заключается в том, что сниппет, получает на вход набор параметров, формирует запрос к базе данных, получает данные, проводит с ними какую-либо обработку и затем отдает дальше.

В сниппетах pdoTools предусмотрен механизм, позволяющий заменой системной настройки переопределить класс,
осуществляющий выборку каких-либо ресурсов.

| Настройка           | Значение                                                 |
| ------------------- | -------------------------------------------------------- |
| pdoFetch.class      | `mlFetch`                                                |
| pdofetch_class_path | `{core_path}components/multilingual/model/multilingual/` |

Для того, чтобы иметь возможность получать выборки с переводами ресурсов, отличных от класса modResource (и наследуемых от него), вам необходимо написать свой класс, наследуемый от класса  mlFetch, переопределив методы **getArray** и **prepareRows**, добавив в них логику подготовки выборки перед отдачей дальше по аналогии с тем, как это сделано в классе mlFetch.

После этого, получая выборки при помощи сниппета pdoResources или при помощи другого, самописного сниппета, использующего
класс из настройки `pdoFetch.class` для этих целей, вы сможете получать выборки с переводами на текущий язык.
