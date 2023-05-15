# Фильтры вывода

В Revolution фильтры вывода ведут себя так же, как и PHx в Evolution, только фильтры теперь встроены прямо в движок MODX. Синтаксис выглядит так:

```modx
[[element:modifier=`value`]]
```

Фильтры могут применяться последовательно. Для этого напишите их подряд (слева направо):

```modx
[[element:modifier:anothermodifier=`value`:andanothermodifier:yetanother=`value2`]]
```

Также фильтры могут применяться для модификации вывода сниппетов. Фильтр нужно прописывать перед всеми параметрами (перед знаком вопроса):

```modx
[[mySnippet:modifier=`value`? &mySnippetParam=`something`]]
```
