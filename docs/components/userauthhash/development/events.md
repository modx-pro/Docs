# События UserAuthHash

Доступны следующие события:

* `uahOnBeforeGetAuthHash`
* `uahOnGetAuthHash` - получение хеш-кода
  *`object` - хеш-код объект
  *`user` - пользователь объект
* `uahOnBeforeProcessAuthHash`
* `uahOnProcessAuthHash` - обработка хеш-кода
  *`object` - хеш-код объект
  *`user` - пользователь объект
* `uahOnBeforeRemoveAuthHash`
* `uahOnRemoveAuthHash` - удаление хеш-кода
  *`user` - пользователь объект
