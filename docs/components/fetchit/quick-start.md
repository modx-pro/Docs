# Быстрый старт

Для быстрого старта достаточно вызвать единственный сниппет **FetchIt** указав в параметре `form` в качестве значения название вашего чанка.

::: warning Важно!
Сниппет должен быть вызван некэшированным, т.е. перед его названием должен быть восклицательный знак.
:::

::: code-group

```modx
[[!FetchIt?
  &snippet=`FormIt`
  &form=`myForm.tpl`
  &hooks=`email`
  &emailSubject=`Тема письма`
  &emailTo=`info@domain.com`
  &validate=`name:required,email:required`
  &validationErrorMessage=`В форме содержатся ошибки!`
  &successMessage=`Сообщение успешно отправлено`
]]
```

```fenom
{'!FetchIt' | snippet : [
  'snippet' => 'FormIt',
  'form' => 'myForm.tpl',
  'hooks' => 'email',
  'emailSubject' => 'Тема письма',
  'emailTo' => 'info@domain.com',
  'validate' => 'name:required,email:required',
  'validationErrorMessage' => 'В форме содержатся ошибки!',
  'successMessage' => 'Сообщение успешно отправлено',
]}
```

:::

Допустим, что форма в вашей вёрстке выглядит так:

```html
<form action="#" method="post">
  <input type="text" name="name" placeholder="Ваше имя">
  <span class="input-error"></span>

  <input type="email" name="email" placeholder="E-mail">
  <span class="input-error"></span>

  <button type="submit">Отправить</button>
</form>
```

Минимальное что вам нужно сделать это добавить дата атрибут `data-error` со значением совпадающим с названием поля, элементам которые будут отображены в случае, если они не пройдут валидацию.

Остальное на ваш вкус и цвет.

::: code-group
```modx [myForm.tpl]
<form action="[[~[[*id]]]]" method="post">
  <input type="text" name="name" placeholder="Ваше имя" value="[[+fi.name]]">
  <span class="input-error" data-error="name">[[+fi.error.name]]</span>

  <input type="email" name="email" placeholder="E-mail" value="[[+fi.email]]">
  <span class="input-error" data-error="email">[[+fi.error.email]]</span>

  <button type="submit">Отправить</button>
</form>
```
:::

<!-- <script setup>
import { inBrowser } from 'vitepress'

if (inBrowser) {
  window.addEventListener('click', (e) => {
    const el = e.target
    if (el.matches('.vp-code-group input')) {
      const allGroups = document.querySelectorAll('.vp-code-group')
      const group = el.parentElement?.parentElement
      const i = Array.from(group?.querySelectorAll('input') || []).indexOf(el)
      for (let index = 0; index < allGroups.length; index++) {
        if (allGroups[index] === group) continue
        allGroups[index].querySelectorAll('input')[i].click()
      }
    }
  })
}
</script> -->
