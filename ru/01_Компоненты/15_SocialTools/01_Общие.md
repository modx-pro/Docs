## SocialTools 
SocialTools -  это компонент с социальным функционалом для CMS / CMF MODX. С помощью него можно отправлять и читать сообщения, получать списки входящих и исходящих сообщений.

_рабочия и установленная версия находиться на сайте <a href='http://animeru.tv'>animeru.tv</a>_

###5 шагов для быстрого начала:###

*1. Создать ресурс с формой отправки сообщений.*

 ```
<div class="social-container">[[!socDialogForm]]</div>
```
*2. Создать ресурс со списком входящих сообщений.*

**_В данном примере используется pdoPage, вы можете использывать getPage_**

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

*3. Создать ресурс со списком исходящих сообщений.*


**_В данном примере используется pdoPage, вы можете использывать getPage_**

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

*4. Вызов сниппета для чтения сообщений*

```
<div class="social-container">[[!socDialogReceive]]</div>
```

*5. Сделать правки в чанках по умолчанию.*

Изменить readMsgResourceID - на id вышего ресурса с вызовом сниппета для чтения сообщений.

Изменить formSendResourceID - на id вышего ресурса с вызовом сниппета для формы отправки сообщения.

###Рекомендации, дополнения###
*1*. Установить компоненты _<a href='http://store.simpledream.ru/packages/utilities/dateago.html'>dateAgo</a>_, и _<a href='http://modx.com/extras/package/phpthumbon'>phpthumbon</a>_ для приятного отображения даты отправки сообщения и аватара пользователя в чанках.





*2*. Вывод плейсхолдера непрочитанных сообщений по умолчанию ``` [[!+socIsRead:notempty=`<span class='badge_msg'>[[!+socIsRead]]</span>`]] ``` 

*3*. Заключать все вызовы в div с классом social-container, у этого класса фиксированая ширина, с помощью него вы легко сможете настроить ширину под свой сайт в CSS

*5*. Полезные классы в CSS social-listheader , social-msgcontent - параметр max-width, определяет максимальную ширину этих полей, все что больше будет обрезаться и ставиться многоточие.
Они используется для отображения списка сообщениий. Если вы изменяете параметры класса social-container, то значения в social-listheader , social-msgcontent так же нужно настроить под ваш CSS.

<a rel="fancybox" href="http://st.bezumkin.ru/files/c/2/c/c2ca21272e774ac13d6c9d7bcaaa9bc1.jpg">[![](http://st.bezumkin.ru/files/c/2/c/c2ca21272e774ac13d6c9d7bcaaa9bc1s.jpg)](http://st.bezumkin.ru/files/c/2/c/c2ca21272e774ac13d6c9d7bcaaa9bc1.jpg </a>

## SocialTools 
SocialTools - a component of the social functionality for CMS / CMF MODX. With it you can send and read messages, get a list of incoming and outgoing messages.

### Examples
* To send a message
Create a resource with Snippets ``[[!socDialogForm]]``
* for a list of incoming messages 
 
 *this example used pdoPage, you can also use getPage*
 ``[[!pdoPage?
  &element=`socDialogList` 
  &action=`inbox` 
]]
``
* for a list of outgoing messages

 ``[[!pdoPage?
  &element=`socDialogList` 
  &action=`outbox` 
]]
``
* To read messages

  `` [[!socDialogReceive]] `` 


#### Necessarily need to be corrected before work chunks default
* ~readMsgResourceID - change the resource identifier where calls snippet `` [[!socDialogReceive]] ``

* ~formSendResourceID - change the resource identifier where calls snippet `` [[!socDialogForm]] ``


