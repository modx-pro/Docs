# Quiz forms

**SendIt** lets you build step-by-step forms — in other words, quizzes or surveys.

::: details Form example

```html:line-numbers
<form data-si-form="quizBig" data-si-preset="quiz">
  <div data-qf-progress>
    <div data-qf-progress-value>0%</div>
  </div>

  <!-- General questions -->
  <div data-qf-item="1">
    <p>Your company field or product name?</p>
    <input type="hidden" name="questions[1]" value="Your company field?">
    <label>
      <input type="text" name="answers[1]" placeholder="Plumbing">
      <p data-si-error="answers[1]"></p>
    </label>
  </div>
  <div data-qf-item="2" data-qf-auto="1">
    <p>Do you have an active website?</p>
    <input type="hidden" name="questions[2]" value="Do you have a website?">
    <div>
      <input type="radio" name="answers[2]" data-qf-next="" id="answer-2-1" value="Yes">
      <label for="answer-2-1">Yes</label>
    </div>
    <div>
      <input type="radio" name="answers[2]" data-qf-next="4" id="answer-2-2" value="No">
      <label for="answer-2-2">No</label>
    </div>
  </div>
  <div data-qf-item="3">
    <p>Link to your site and what you dislike?</p>
    <input type="hidden" name="questions[3]" value="What is wrong with your site?">
    <label class="mb-15">
      <textarea name="answers[3]" placeholder="Reasons for new site"></textarea>
      <p data-si-error="answers[3]"></p>
    </label>
  </div>
  <div data-qf-item="4">
    <p>2-3 sites you dislike and why?</p>
    <input type="hidden" name="questions[4]" value="Which sites do you dislike?">
    <label>
      <textarea name="answers[4]" placeholder="I dislike buttons on google.com"></textarea>
      <p data-si-error="answers[4]"></p>
    </label>
  </div>
  <div data-qf-item="5">
    <p>2-3 sites you like and why?</p>
    <input type="hidden" name="questions[5]" value="Which sites do you like?">
    <label class="mb-15">
      <textarea name="answers[5]" placeholder="I like dark/light theme toggle"></textarea>
      <p data-si-error="answers[5]"></p>
    </label>
  </div>

  <div data-qf-item="49">
    <p>Languages for site content?</p>
    <input type="hidden" name="questions[6]" value="Content languages?">
    <label>
      <input type="text" name="answers[6]" placeholder="English">
      <p data-si-error="answers[6]"></p>
    </label>
  </div>

  <!-- Inner pages -->
  <div data-qf-item="38">
    <p>Select inner pages?</p>
    <input type="hidden" name="questions[7]" value="Inner pages?">
    <div>
      <div>
        <input type="checkbox" name="answers[7][]" id="answer-34-1" value="About">
        <label for="answer-34-1">About</label>
      </div>
      <div>
        <input type="checkbox" name="answers[7][]" id="answer-34-2" value="Contacts">
        <label for="answer-34-2">Contacts</label>
      </div>
      <div>
        <input type="checkbox" name="answers[7][]" id="answer-34-3" value="Blog">
        <label for="answer-34-3">Blog</label>
      </div>
      <div>
        <input type="checkbox" name="answers[7][]" id="answer-34-4" value="Article">
        <label for="answer-34-4">Article</label>
      </div>
      <div>
        <input type="checkbox" name="answers[7][]" id="answer-34-5" value="News">
        <label for="answer-34-5">News</label>
      </div>
      <div>
        <input type="checkbox" name="answers[7][]" id="answer-34-6" value="News item">
        <label for="answer-34-6">News item</label>
      </div>
      <div>
        <input type="checkbox" name="answers[7][]" id="answer-34-7" value="Payment and shipping">
        <label for="answer-34-7">Payment and shipping</label>
      </div>
      <div>
        <input type="checkbox" name="answers[7][]" id="answer-34-8" value="Cases/portfolio/gallery">
        <label for="answer-34-8">Cases/portfolio/gallery</label>
      </div>
    </div>
    <p data-si-error="answers[7][]"></p>
  </div>

  <!-- Final blocks -->
  <div data-qf-item="47" data-qf-auto="1">
    <p>
      Almost done! One more step<br>
      and we'll prepare a quote.
    </p>
    <label>
      <input type="text" name="name" placeholder="Your name">
    </label>
    <label>
      <input type="tel" name="phone" placeholder="+7(">
    </label>
  </div>
  <div data-qf-finish>
    <p>
      Thanks for your time!<br>
      Your gift: 10% off first order!
    </p>
  </div>

  <!-- Control buttons and pagination -->
  <div>
    <button data-qf-btn="prev" type="button">Back</button>
    <p data-qf-pages>
      <span data-qf-page></span>/<span data-qf-total></span>
    </p>
    <button data-qf-btn="next" type="button">Next</button>
    <div data-qf-btn="reset">
      <button type="reset">Start over</button>
    </div>
    <button data-qf-btn="send" type="submit">Submit</button>
  </div>
</form>
```

:::

::: danger
For correct behavior you must define a **v_hidden** class in your styles for visually hidden elements, or specify an equivalent in the JavaScript module config.
:::

## Attribute reference

* **data-qf-progress** — selector for the progress indicator wrapper; the block itself may be omitted.
* **data-qf-progress-value** — selector for the progress value; no value required.
* **data-qf-item** — selector for a form step; value must be a number unique within the quiz.
* **data-qf-auto** — marks a step that should switch automatically when the user answers; must have value 1.
* **data-qf-next** — which step to go to next; use when you need to skip one or more steps; value is the **data-qf-item** of the target step.
* **data-qf-finish** — marks the final block; the block may be omitted.
* **data-qf-btn** — control button; values: **prev** (back), **next** (forward), **reset** (start over), **send** (submit).
* **data-qf-pages** — block that shows current position vs total questions; may be absent.
* **data-qf-page** — block that shows the current step number.
* **data-qf-total** — block that shows the total number of steps.

## Workflow

Inside the **form** with **data-si-form** and **data-si-preset**, create the needed number of step blocks with **data-qf-item** (use the step index as the value). Each step can contain any content and any number of fields. To send the user to a different step (skip steps) depending on the answer, add **data-qf-next** to the input; its value is the **data-qf-item** of the step to open.

::: info
Use **radio** for branching.
:::

::: danger
Avoid branching backward; may confuse user and break script.
:::

::: tip
In the example, step 2 has two answers: *Yes* and *No*. If the user chooses *Yes*, they go to step 3; if *No*, step 3 is skipped and they go to step 4.
:::

::: warning
With branching, the progress scale can be non-linear, but when the user has answered all questions it will show 100%.
:::

You can add **data-qf-auto** with value 1 to a step so it advances automatically after the user answers. If the form has a progress block, it fills as the user answers. If it has a pagination block, the user sees which question they are on and how many there are. Control uses up to four button types: Back, Next, Submit, Reset. All buttons need an explicit **type**: *button* for Back/Next, *submit* for Submit, *reset* for Reset. The **data-qf-finish** block, if present, is shown after successful submit; otherwise set `successMessage` in the preset.

## Validation

You can validate in two ways. First: define validators per field in the preset. Drawback: a lot of work when there are many questions. Second: keep questions, answers, and user data separate. Then use validation like:

```php
'validate' => 'phone:required,name:required,answers[*]:required,answers[7][]:checkbox:required,answers[3]:requiredIf=^answers[2]|Yes^',
```

There is no need to validate the question fields. We mark all answers as required (`answers[*]:required`), except `answers[3]`, which is required only when the user answered *Yes* to question 2. Checkboxes need their own rule: `answers[7][]:checkbox:required`; if you have several checkbox groups, add a rule for each.

## Data handling

When you pass data as arrays they are converted to JSON (a workaround because FormIt passes a string to the chunk, which is awkward to use). The JSON may be escaped in the chunk (e.g. for XSS protection); you can turn it back into valid JSON with output modifiers. Example mail chunk from the [demo site](https://sendit.art-sites.ru/):

```fenom:line-numbers
{set $questions = $questions | replace: '&quot;' : '"' | fromJSON}
{set $answers = $answers | replace: '&quot;' : '"' | fromJSON}
{foreach $questions as $k => $v}
  <p><strong>{$v}</strong></p>
  <p><em>{$answers[$k]}</em></p><br>
{/foreach}
```

## JavaScript config

::: details Default config

```js:line-numbers
export default function returnConfigs() {
  return {
    QuizForm: {
      pathToScripts: './modules/quizform.js',
      rootSelector: '[data-si-form]',
      rootKey: 'siForm',
      autoKey: 'qfAuto',
      itemSelector: '[data-qf-item]',
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
    },
  }
}
```

:::

| Key | Description | Value |
|:---:|:---:|:---:|
| `pathToScripts` | Path to module (relative to sendit.js) | ./modules/quizform.js |
| `rootSelector` | Form selector | [data-si-form] |
| `rootKey` | Form name dataset key | siForm |
| `autoKey` | Auto-switch dataset key | qfAuto |
| `itemSelector` | Step element | [data-qf-item] |
| `itemKey` | Step id dataset key | qfItem |
| `itemCompleteSelector` | Completed step | [data-qf-complete="1"] |
| `itemCompleteKey` | Completion dataset key | qfComplete |
| `finishSelector` | Final block | [data-qf-finish] |
| `itemCurrentSelector` | Current visible step | [data-qf-item="${currentIndex}"] |
| `btnSelector` | Button selector | [data-qf-btn] |
| `btnKey` | Button dataset key | qfBtn |
| `btnNextSelector` | Next button | [data-qf-btn="next"] |
| `btnPrevSelector` | Back button | [data-qf-btn="prev"] |
| `btnSendSelector` | Submit button | [data-qf-btn="send"] |
| `btnResetSelector` | Reset button | [data-qf-btn="reset"] |
| `nextIndexSelector` | Branching field | [data-qf-next] |
| `nextIndexKey` | Branching dataset key | qfNext |
| `progressSelector` | Progress wrapper | [data-qf-progress] |
| `currentQuestionSelector` | Current question display | [data-qf-page] |
| `totalQuestionSelector` | Total questions display | [data-qf-total] |
| `pagesSelector` | Pagination wrapper | [data-qf-pages] |
| `progressValueSelector` | Progress display | [data-qf-progress-value] |
| `activeClass` | Active element class | active |
| `visabilityClass` | Hidden class | v_hidden |
| `disabledClass` | Disabled class | disabled |
| `sendEvent` | Send complete event | si:send:finish |
