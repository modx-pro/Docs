# Опросники

**SendIt** позволяет создавать пошаговые формы, другими словами квизы или опросники.

::: details Пример формы

```html:line-numbers
<form data-si-form="quizBig" data-si-preset="quiz">
  <div data-qf-progress>
    <div data-qf-progress-value>0%</div>
  </div>

  <!-- Общие вопросы -->
  <div data-qf-item="1">
    <p>Сфера деятельности Вашей компании или название продукта?</p>
    <input type="hidden" name="questions[1]" value="Сфера деятельности Вашей компании?">
    <label>
      <input type="text" name="answers[1]" placeholder="Продажа вантузов">
      <p data-si-error="answers[1]"></p>
    </label>
  </div>
  <div data-qf-item="2" data-qf-auto="1">
    <p>Есть ли действующий сайт?</p>
    <input type="hidden" name="questions[2]" value="Есть ли действующий сайт?">
    <div>
      <input type="radio" name="answers[2]" data-qf-next="" id="answer-2-1" value="Да">
      <label for="answer-2-1">Да</label>
    </div>
    <div>
      <input type="radio" name="answers[2]" data-qf-next="4" class="" id="answer-2-2" value="Нет">
      <label for="answer-2-2">Нет</label>
    </div>
  </div>
  <div data-qf-item="3">
    <p>Укажите ссылку на действующий сайт и кратко опишите, что Вас в нём не устраивает?</p>
    <input type="hidden" name="questions[3]" value="Что не так с действующим сайтом?">
    <label class="mb-15">
      <textarea name="answers[3]" placeholder="Причины заказа нового сайта"></textarea>
      <p data-si-error="answers[3]"></p>
    </label>
  </div>
  <div data-qf-item="4">
    <p>Укажите 2-3 ссылки на сайты, которые Вам НЕ нравятся и кратко опишите, что именно НЕ нравится?</p>
    <input type="hidden" name="questions[4]" value="Какие сайты не нравятся?">
    <label>
      <textarea name="answers[4]" placeholder="На сайте гугла мне не нравятся кнопки  - портят лаконичность"></textarea>
      <p data-si-error="answers[4]"></p>
    </label>
  </div>
  <div data-qf-item="5">
    <p>Укажите 2-3 ссылки на сайты, которые Вам нравятся и кратко опишите, что именно нравится?</p>
    <input type="hidden" name="questions[5]" value="Какие сайты нравятся?">
    <label class="mb-15">
      <textarea name="answers[5]" placeholder="Мне нравится этот сайт возможностью изменить тему с темной на светлую и обратно"></textarea>
      <p data-si-error="answers[5]"></p>
    </label>
  </div>

  <div data-qf-item="49">
    <p>На каких языках будет публиковаться контент сайта?</p>
    <input type="hidden" name="questions[6]" value="На каких языках будет публиковаться контент сайта?">
    <label>
      <input type="text" name="answers[6]"  placeholder="Русский">
      <p data-si-error="answers[6]"></p>
    </label>
  </div>
  <!-- Общие вопросы -->

  <!-- Вопросы по многостраничнику -->
  <div data-qf-item="38">
    <p>Выберите внутренние страницы сайта?</p>
    <input type="hidden" name="questions[7]" value="Выберите внутренние страницы сайта?">
    <div>
      <div>
        <input type="checkbox" name="answers[7][]" id="answer-34-1" value="О компании">
        <label for="answer-34-1">О компании</label>
      </div>
      <div>
        <input type="checkbox" name="answers[7][]" id="answer-34-2" value="Контакты">
        <label for="answer-34-2">Контакты</label>
      </div>
      <div>
        <input type="checkbox" name="answers[7][]" id="answer-34-3" value="Блог">
        <label for="answer-34-3">Блог</label>
      </div>
      <div>
        <input type="checkbox" name="answers[7][]" id="answer-34-4" value="Статья">
        <label for="answer-34-4">Статья</label>
      </div>
      <div>
        <input type="checkbox" name="answers[7][]" id="answer-34-5" value="Новости">
        <label for="answer-34-5">Новости</label>
      </div>
      <div class="form__input_checkbox mb-15">
        <input type="checkbox" name="answers[7][]" id="answer-34-6" value="Новость">
        <label for="answer-34-6">Новость</label>
      </div>
      <div>
        <input type="checkbox" name="answers[7][]" id="answer-34-7" value="Оплата и доставка">
        <label for="answer-34-7">Оплата и доставка</label>
      </div>
      <div>
        <input type="checkbox" name="answers[7][]" id="answer-34-8" value="Кейсы/портфолио/гелерея">
        <label for="answer-34-8">Кейсы/портфолио/гелерея</label>
      </div>
    </div>
    <p data-si-error="answers[7][]"></p>
  </div>
  <!-- /Вопросы по многостраничнику -->

  <!-- Финальные блоки -->
  <div data-qf-item="47" data-qf-auto="1">
    <p>
      Отлично! Остался всего один шаг <br>
      и мы подготовим Вам предварительный расчет.
    </p>
    <label>
      <input type="text" name="name" placeholder="Ваше имя">
    </label>
    <label class="">
      <input type="tel" name="phone" placeholder="+7(">
    </label>
  </div>
  <div data-qf-finish>
    <p>
      Спасибо за потраченное время!<br>
      Ваш подарок: скидка 10% на первый заказ!
    </p>
  </div>
  <!-- /Финальные блоки -->

  <!-- Кнопки управления и пагинация -->
  <div>
    <button data-qf-btn="prev" type="button">Назад</button>
    <p data-qf-pages>
      <span data-qf-page></span>/<span data-qf-total></span>
    </p>
    <button data-qf-btn="next" type="button">Вперед</button>
    <div data-qf-btn="reset">
      <button type="reset">Начать с начала</button>
    </div>
    <button data-qf-btn="send" type="submit">Отправить</button>
  </div>
  <!-- /Кнопки управления и пагинация -->
</form>
```

:::

::: danger
Для корректной работы необходимо в стилях определить класс **v_hidden** отвечающий за визуальное скрытие элементов, или указать его аналог в
JavaScript конфигурации модуля.
:::

## Описание атрибутов

| Атрибут | Описание |
|---------|----------|
| `data-qf-progress` | Блок-обёртка индикации прогресса, сам блок может отсутствовать |
| `data-qf-progress-value` | Блок индикации прогресса, не требует значения |
| `data-qf-item` | Шаг формы, значение должно быть числом уникальным для данного опросника |
| `data-qf-auto` | Указывает на шаг формы, который необходимо автоматически переключить при получении ответа от пользователя, обязательно должен иметь значение `1` |
| `data-qf-next` | Указывает на какой шаг перейти, используется при необходимости пропустить 1 или несколько шагов; в качестве значения принимает значение атрибута `data-qf-item` целевого шага |
| `data-qf-finish` | Обозначает финальный блок, сам блок может отсутствовать |
| `data-qf-btn` | Обозначает кнопку управления: `prev` — *"Назад"*, `next` — *"Вперед"*, `reset` — *"Начать сначала"*, `send` — *"Отправить"* |
| `data-qf-pages` | Блок вывода положения пользователя относительно общего кол-ва вопросов, может отсутствовать |
| `data-qf-page` | Блок вывода текущего шага |
| `data-qf-total` | Блок вывода общего количества шагов |

## Порядок работы

Внутри тега **form** с атрибутами **data-si-form** и **data-si-preset**, нужно создать необходимое количество блоков-шагов, обозначенных атрибутами **data-qf-item**, в
качестве значения этого атрибута проще всего указать порядковый номер шага. Внутри шага можно размещать любую информацию и любое количество полей ввода. Если требуется
сделать так, чтобы в зависимости от ответа, пользователь переходил не на следующий по порядку шаг, а пропускал 1 или несколько шагов, добавьте полю ввода атрибут
**data-qf-next**, где в качестве значения укажите номер шага, на который следует отправить пользователя в случае выбора данного ответа.

::: info
Для создания ветвлений лучше всего использовать поля типа **radio**
:::

::: danger
При создании ветвлений не рекомендуется отправлять пользователя назад, так как это может запутать его и привести к некорректной работе скрипта.
:::

::: tip
В примере формы у шага *data-qf-item="2"* есть два варианта ответа *Да* или *Нет*. Если пользователь ответит *Да*, то попадёт на шаг *data-qf-item="3"*, если выберет
*Нет* - шаг *data-qf-item="3"* будет пропущен и пользователь попадёт сразу на шаг *data-qf-item="4"*.
:::

Чтобы облегчить задачу пользователю, вы можете добавить шагу атрибут **data-qf-auto** со значением *1*, и тогда после ввода ответа, шаг сменится автоматически.
Если внутри формы присутствует блок для отображения прогресса, шкала его будет заполняться по мере получения ответов от пользователя.

::: warning
При наличии ветвлений в опроснике изменение шкалы прогресса может быть нелинейным, но к финальному блоку в случае, если пользователь ответил на все вопросы, прогресс будет
100%
:::

Также, если внутри формы присутствует блок пагинации, пользователь будет понимать на какой вопрос по счёту отвечает и сколько всего вопросов есть.
Управление происходит посредством кнопок, коих может быть 4 типа: *Вперед*, *Назад*, *Отправить*, *Сбросить*. Все кнопки требуют явно указанного атрибута **type**.
Для кнопок *Вперед* и *Назад* он должен иметь значение *button*, для кнопки *Отправить* - *submit*, для кнопки *Сбросить* - *reset*.
Блок обозначенный атрибутом **data-qf-finish**, в случае его наличия, будет показан при успешной отправке данных. Если же такого блока не будет, рекомендую в пресете
прописать значение для параметра `successMessage`.

## Валидация данных

Возможны два подхода к проверке данных. Первый классический: вы прописываете в пресете список валидаторов для каждого поля. Однако у такого подхода есть существенный
недостаток: большие трудозатраты при наличие большого количества вопросов. Поэтому рекомендую использовать второй подход. Суть его в том, чтобы разделить вопросы, ответы и
данные пользователя. Вопросы и ответы собираем в два отдельных массива, а данные пользователя, если их немного, можно оставить как есть. В этом случае параметр `validate`
будет выглядеть так

```php
'validate' => 'phone:required,name:required,answers[*]:required,answers[7][]:checkbox:required,answers[3]:requiredIf=^answers[2]|Да^',
```

Вопросы по понятным причинам проверять нет смысла. Все ответы мы отметили как обязательные (`answers[*]:required`), кроме `answers[3]`,
его мы сделали обязательным только если на второй вопрос пользователь ответил *Да*. Также, обратите внимание, что отдельно мы прописали валидацию чекбоксов `answers[7][]:checkbox:required`. При этом если их несколько, валидацию нужно прописать для каждого.

## Обработка данных

Если вы передаёте данные в виде массива, то они будут преобразованы в JSON, это "костыль" связанный с тем, что FormIt передаёт в чанк письма не массив, а строку,
с которой проблематично работать. JSON в чанк передаётся невалидным, полагаю это связано с обработкой входящих данных с елью защиты от XSS атак, но его можно превести в
валидное состояние, используя модификаторы вывода. Ниже приведён пример чанка письма для формы с [демо-сайта](https://sendit.art-sites.ru/)

```fenom:line-numbers
{set $questions = $questions | replace: '&quot;' : '"' | fromJSON}
{set $answers = $answers | replace: '&quot;' : '"' | fromJSON}
{foreach $questions as $k => $v}
  <p><strong>{$v}</strong></p>
  <p><em>{$answers[$k]}</em></p><br>
{/foreach}
```

## Конфигурация JavaScript

::: details Конфигурация по умолчанию

```js:line-numbers{3-33}
export const ModulesConfig = {
  QuizForm: {
    className: 'QuizForm',
    pathToScripts: '../modules/quizform.js',
    formSelector: '[data-si-form]',
    rootKey: 'siForm',
    autoKey: 'qfAuto',
    rootSelector: '[data-qf-item]',
    itemKey: 'qfItem',
    itemCompleteSelector: '[data-qf-complete="1"]',
    itemCompleteKey: 'qfComplete',
    finishSelector: '[data-qf-finish]',
    itemCurrentSelector: '[data-qf-item="${currentIndex}"]',
    btnSelector: '[data-qf-btn]',
    btnKey: 'qfBtn',
    btnNextSelector: '[data-qf-btn="next"]',
    btnPrevSelector: '[data-qf-btn="prev"]',
    btnSendSelector: '[data-qf-btn="send"]',
    btnResetSelector: '[data-qf-btn="reset"]',
    nextIndexSelector: '[data-qf-next]',
    nextIndexKey: 'qfNext',
    progressSelector: '[data-qf-progress]',
    currentQuestionSelector: '[data-qf-page]',
    totalQuestionSelector: '[data-qf-total]',
    pagesSelector: '[data-qf-pages]',
    progressValueSelector: '[data-qf-progress-value]',
    activeClass: 'active',
    visabilityClass: 'v_hidden',
    disabledClass: 'disabled',
    sendEvent: 'si:send:finish',
    nosaveAttr: 'data-si-nosave'
  },
}
```

:::

|           Ключ            |               Описание               |                         Значение                          |
|:-------------------------:|:------------------------------------:|:---------------------------------------------------------:|
|      `pathToScripts`      |      **../modules/quizform.js**      | путь к модулю, указывается относительно файла *sendit.js* |
|      `formSelector`       |          **[data-si-form]**          |                      селектор формы                       |
|         `rootKey`         |              **siForm**              |          ключ свойства *dataset* с именем формы           |
|         `autoKey`         |              **qfAuto**              |     ключ свойства *dataset* атрибута автопереключения     |
|      `rootSelector`       |          **[data-qf-item]**          |               селектор элемента одного шага               |
|         `itemKey`         |              **qfItem**              |             ключ свойства *dataset* с ID шага             |
|  `itemCompleteSelector`   |      **[data-qf-complete="1"]**      |            селектор элемента завершенного шага            |
|     `itemCompleteKey`     |            **qfComplete**            |   ключ свойства *dataset* обозначающего наличие ответа    |
|     `finishSelector`      |         **[data-qf-finish]**         |                 селектор финального блока                 |
|   `itemCurrentSelector`   | **[data-qf-item="${currentIndex}"]** |              селектор текущего видимого шага              |
|       `btnSelector`       |          **[data-qf-btn]**           |                      селектор кнопки                      |
|         `btnKey`          |              **qfBtn**               |         ключ свойства *dataset* селектора кнопки          |
|     `btnNextSelector`     |       **[data-qf-btn="next"]**       |                селектор кнопки *"Вперед"*                 |
|     `btnPrevSelector`     |       **[data-qf-btn="prev"]**       |                 селектор кнопки *"Назад"*                 |
|     `btnSendSelector`     |       **[data-qf-btn="send"]**       |               селектор кнопки *"Отправить"*               |
|    `btnResetSelector`     |      **[data-qf-btn="reset"]**       |               селектор кнопки *"Сбросить"*                |
|    `nextIndexSelector`    |          **[data-qf-next]**          |                  селектор поля ветвления                  |
|      `nextIndexKey`       |              **qfNext**              |     ключ свойства *dataset* селектора поля ветвления      |
|    `progressSelector`     |        **[data-qf-progress]**        |            селектор блока-обёртки с прогрессом            |
| `currentQuestionSelector` |          **[data-qf-page]**          |         селектор блока с номером текущего вопроса         |
|  `totalQuestionSelector`  |         **[data-qf-total]**          |      селектор элемента с общим количеством вопросов       |
|      `pagesSelector`      |         **[data-qf-pages]**          |             селектор блока-обёртки пагинации              |
|  `progressValueSelector`  |     **[data-qf-progress-value]**     |           селектор блока отображения прогресса            |
|       `activeClass`       |              **active**              |    класс активного элемента (применяется к прогрессу)     |
|     `visabilityClass`     |             **v_hidden**             |                  класс скрытых элементов                  |
|      `disabledClass`      |             **disabled**             |           класс не активных элементов (кнопки)            |
|        `sendEvent`        |          **si:send:finish**          |                событие завершения отправки                |
|       `nosaveAttr`        |          **data-si-nosave**          |   атрибут для исключения полей из сохранения данных       |
