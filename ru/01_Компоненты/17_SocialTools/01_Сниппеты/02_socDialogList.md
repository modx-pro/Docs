Сниппет предназначен для вывода списка сообщений.

## Параметры ##
Название | По умолчанию | Описание
---|---|---
**&action** | inbox | Выбор списка для отображения, с входящими или исходящими сообщениями. **inbox** - входящие, **outbox** - исходящимие.
**&inboxTpl** | soc.listRowInbox | Шаблон для вывода строки входящего сообщений
**&outboxTpl** | soc.listRowOutbox | Шаблон для вывода строки исходящего сообщений
**&limit** | 10 | Ограничение количества результатов выборки
**&offset** | 0 | Пропуск результатов от начала выборки
**&outputSeparator** | \n | Разделитель строк выборки
**&sortby** | date_sent | Поле для сортировки (возможные поля subject, message, sender - id пользователя, recipient id пользователя, date_sent, is_read)
**&sortdir** | DESC | Направление сортировки: по убыванию или возрастанию.
**&totalVar** | total | Имя плейсхолдера для сохранения общего количества результатов.


### Примеры ###
Пример вывода с пагинацией входящих сообщений 

**_данном примере используется pdoPage, вы можете использывать getPage_**

```
<div class="social-container">
[[!pdoPage?
  &element=`socDialogList`
  &action=`inbox`
]]

<div class="paging">
<ul class="pagination">
  [[+page.nav]]
</ul>
</div>

</div>

```

Пример вывода с пагинацией исходящих сообщений аналогичен

**_данном примере используется pdoPage, вы можете использывать getPage_**

```
<div class="social-container">
[[!pdoPage?
  &element=`socDialogList`
  &action=`outbox`
]]

<div class="paging">
<ul class="pagination">
  [[+page.nav]]
</ul>
</div>

</div>

```





