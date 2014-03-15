Сниппет предназначен для вывода формы чтения сообщения.

Сниппет проверяет наличине параметров **msgID** и **action** в ``$_GET`` или ``$_POST`` если их нет, или сообщение не принадлежит авторизированому пользователю сниппет выдаст ошибку.

Пример ссылки: _<a href='[[~1? &msgID=`[[+id]]` &action=`inbox`]]'  </a>_ 

## Параметры
Название | По умолчанию | Описание
---|---|---
**&tplFormReadInbox** | soc.readFormInbox | Шаблон для вывода входящего сообщений
**&tplFormReadOutbox** | soc.readFormOutbox | Шаблон для вывода строки исходящего сообщений



## Примеры
Пример вывода с пагинацией входящих сообщений _данном примере используется pdoPage, вы можете использывать getPage_
```<div class='social-container'>
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

Пример исходящих аналогичен _данном примере используется pdoPage, вы можете использывать getPage_
```<div class='social-container'>
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

