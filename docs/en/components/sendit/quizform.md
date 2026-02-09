# Quiz forms

**SendIt** supports step-by-step forms (quizzes, surveys).

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
Define **v_hidden** class for hidden elements, or set equivalent in JS config.
:::

## Attribute reference

* **data-qf-progress** - progress block wrapper; may be absent.
* **data-qf-progress-value** - progress value block; no value needed.
* **data-qf-item** - step element; unique number per quiz.
* **data-qf-auto** - auto-switch on answer; value must be 1.
* **data-qf-next** - target step id for branching; value = target *data-qf-item*.
* **data-qf-finish** - final block; may be absent.
* **data-qf-btn** - control button: **prev** (back), **next** (forward), **reset** (start over), **send** (submit).
* **data-qf-pages** - step counter block; may be absent.
* **data-qf-page** - current step display.
* **data-qf-total** - total steps display.

## Workflow

Create step blocks with **data-qf-item** inside form. Use **data-qf-next** on input for branching. With **data-qf-auto="1"**, step switches after answer. Progress bar fills as user answers. Pagination shows current/total.

::: info
Use **radio** for branching.
:::

::: danger
Avoid branching backward; may confuse user and break script.
:::

::: tip
In example, step 2: Yes → step 3; No → step 4 (skip 3).
:::

::: warning
With branching, progress may be non-linear, but reaches 100% when all answered.
:::

Buttons: **Next**, **Back**, **Submit**, **Reset**. Set **type** explicitly: *button* for Next/Back, *submit* for Submit, *reset* for Reset. **data-qf-finish** shows on success; else set `successMessage` in preset.

## Validation

Two options. First: list validators per field in preset. Drawback: tedious for many questions. Second: separate questions, answers, user data. Validate like:

```php
'validate' => 'phone:required,name:required,answers[*]:required,answers[7][]:checkbox:required,answers[3]:requiredIf=^answers[2]|Yes^',
```

Mark all answers required (`answers[*]:required`); make `answers[3]` required only if answer 2 is *Yes*. Add `answers[7][]:checkbox:required` for checkboxes; repeat for each checkbox group.

## Data handling

Arrays are converted to JSON (FormIt passes string to chunk). JSON may be escaped; restore with Fenom modifiers. Example chunk:

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
