# События UserAuthHash

Доступны следующие события:

* `uahOnBeforeGetAuthHash`
* `uahOnGetAuthHash` - получение хэш-кода
  *`object` - хэш-код объект
  *`user` - пользователь объект
* `uahOnBeforeProcessAuthHash`
* `uahOnProcessAuthHash` - обработка хэш-кода
  *`object` - хэш-код объект
  *`user` - пользователь объект
* `uahOnBeforeRemoveAuthHash`
* `uahOnRemoveAuthHash` - удаление хэш-кода
  *`user` - пользователь объект
