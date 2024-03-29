# Форма в модальном окне с предварительным выбором текстуры

Для модальных окон мы будем использовать [Magnific Popup](https://github.com/dimsemenov/Magnific-Popup). Если вам по душе, что-то иное, можете переписать решение под себя действуя по тому-же принципу, что здесь описан.

Для хранения текстур используется стандартная галерея miniShop2.

Предположим, что мы уже загрузили в товар необходимые изображения (текстуры).

## Шаг 1

В шапке сайта _или просто выше JS кода из шага 3_ прописываем подгрузку jQuery и скриптов Magnific Popup.

## Шаг 2

В чанке `msProduct.content` вызываем сниппет `msGallery` с новым шаблоном:

```fenom
{'!msGallery' | snippet : [
  'tpl' => 'tpl.msGallery.mswp',
]}
```

## Шаг 3

Чанк `tpl.msGallery.mswp` будет выглядеть примерно так:

```fenom
{if $files?}
  {foreach $files as $file first=$is_first}
    {* Формируем уникальный ID модального окна *}
    {var $modal_id = ('mswp-' ~ $file.product_id ~ '-' ~ $file.id)}

    {* Запоминаем первый ID модального окна *}
    {if $is_first}
      {var $modal_id_first = $modal_id}
    {/if}

    {* Радиобокс, при выборе которого менять
      * атрибут href у кнопки вызова модального окна *}
    <div>
      <label>
        <input type="radio" name="{'mswp-' ~ $file.product_id}" {$is_first ? 'checked' : ''}
            onchange="javascript:var mswpModalOpen = document.querySelector('.js-mswp-modal-open'); mswpModalOpen.href = '#{$modal_id}';">
        <img src="{$file.small}">
      </label>
    </div>

      {* Модальное окно *}
    <div id="{$modal_id}" class="mswp-modal mfp-hide">
      <div class="mswp-modal-content">

        {* Modal close button *}
        <div class="mswp-modal-close">
          <a class="mswp-modal-close-link [ js-mswp-modal-close ]" href="javascript:undefined;">
            <svg class="mswp-modal-close-svg" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M12 10.75L3.25 2 2 3.25 10.75 12 2 20.75 3.25 22 12 13.25 20.75 22 22 20.75 13.25 12 22 3.25 20.75 2z"/>
            </svg>
          </a>
        </div>

        {* Modal header *}
        <div class="mswp-modal-header">
          <h2 class="mswp-modal-header__title">
            Параметры обоев
            <small class="">
              Номер: {$file.name}
            </small>
          </h2>
          <div class="mswp-modal-header__text">
            Пожалуйста, введите размеры вашей стены, мы советуем добавить 4см к ширине и 4см к высоте. Вы можете подвигать рисунок внутри кадра и выбрать понравившийся фрагмент. Попробуйте дополнительные возможности (снизу), оставьте комментарий при необходимости.
          </div>
        </div>

        {* msWallpapers form *}
        {'!mswp.form' | snippet : [
          'id' => $_modx->resource.id,
          'image' => $file.url,
          'cart_id' => 7,
        ]}
      </div>
    </div>
  {/foreach}

  {* Выводим кнопку вызова модального окна *}
  <a class="btn btn-success [ js-mswp-modal-open ]" href="#{$modal_id_first}">Настроить и купить</a>

  <script>
    $(function () {
      // Код обработки вывода модальных окон
      $('.js-mswp-modal-open').magnificPopup({
        type: 'inline',
        preloader: false,
        modal: true,
        callbacks: {
          open: function () {
            var $wrap = this.wrap;
            if (!$wrap.length) {
              return;
            }

            // Класс для нормальной стилизации модальных окон
            $wrap.addClass('mswp-modal-w');

            var $form = $wrap.find('.js-mswp-form');
            var propkey = $form.data('mswp-propkey');

            // Сбрасываем форму для текущей текстуры
            msWallpapersCls[propkey].Form.reloadSizes();
          },
          close: function () {
            var $wrap = this.wrap;
            if ($wrap.length) {
              $wrap.removeClass('mswp-modal-w');
            }
          },
        },
      });

      // Обработка клика по кнопке "Закрыть"
      $(document).on('click', '.js-mswp-modal-close', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
      });
    });
  </script>

  <style>
    .mswp-modal-w {
      /* Если на странице есть фиксированные блоки
      z-index: 9999999999999 !important;
      -webkit-transform: translateZ(2px);
      -moz-transform: translateZ(2px);
      -o-transform: translateZ(2px);
      transform: translateZ(2px);
      */
    }
    .mswp-modal-w .mfp-container {
      display: flex;
      height: auto;
      min-height: 100%;
      padding: 0 !important;
    }
    .mswp-modal-w .mfp-content {
      width: 100%;
      min-height: 100%;
    }

    .mswp-modal {
      width: 100%;
      height: 100%;
      background-color: #fff;
    }
    .mswp-modal-content {
      width: 100%;
      max-width: 1200px;
      padding: 0 1rem;
      margin: 0 auto;
    }

    .mswp-modal-header {
      width: 100%;
      padding: 2rem 0 2rem;
    }
    .mswp-modal-header__title {
      padding: 2rem 0;
      margin: 0;
    }
    .mswp-modal-header__title small {
      color: #777;
      font-size: .6em;
      font-weight: 400;
      font-style: italic;
      line-height: 1.4em;
      white-space: nowrap;
    }

    .mswp-modal-close {
      position: absolute;
      top: 0;
      right: 0;
      padding: 1rem;
    }
    .mswp-modal-close-link,
    .mswp-modal-close-link:hover,
    .mswp-modal-close-link:active,
    .mswp-modal-close-link:focus {
      border: 0;
      color: #555;
      text-decoration: none;
    }
    .mswp-modal-close-svg {
      display: inline-block;
      width: 2em;
      height: 2em;
      margin-bottom: 1px;
      stroke-width: 0;
      stroke: currentColor;
      fill: currentColor;
      vertical-align: middle;
    }
  </style>
{/if}
```

Постарался откомментировать все важные действия в коде, поэтому тут повторяться не буду.

## Шаг 4

Настройка корзины описана в разделе [Установка и настройка][2].

[2]: /components/mswallpapers/setup
