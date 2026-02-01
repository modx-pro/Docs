# Form in modal with texture pre-selection

We'll use [Magnific Popup](https://github.com/dimsemenov/Magnific-Popup) for modals. If you prefer something else, adapt the solution using the same approach.

The standard miniShop2 gallery stores textures.

Assume we've uploaded the needed images (textures) to the product.

## Step 1

In the site header _or above the JS from step 3_, include jQuery and Magnific Popup.

## Step 2

In chunk `msProduct.content` call snippet `msGallery` with a new template:

```fenom
{'!msGallery' | snippet: [
  'tpl' => 'tpl.msGallery.mswp',
]}
```

## Step 3

Chunk `tpl.msGallery.mswp`:

```fenom
{if $files?}
  {foreach $files as $file first=$is_first}
    {* Unique modal ID *}
    {var $modal_id = ('mswp-' ~ $file.product_id ~ '-' ~ $file.id)}

    {* Store first modal ID *}
    {if $is_first}
      {var $modal_id_first = $modal_id}
    {/if}

    {* Radio, on change updates the modal open button href *}
    <div>
      <label>
        <input type="radio" name="{'mswp-' ~ $file.product_id}" {$is_first ? 'checked' : ''}
            onchange="javascript:var mswpModalOpen = document.querySelector('.js-mswp-modal-open'); mswpModalOpen.href = '#{$modal_id}';">
        <img src="{$file.small}">
      </label>
    </div>

      {* Modal *}
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
            Wallpaper parameters
            <small class="">
              No.: {$file.name}
            </small>
          </h2>
          <div class="mswp-modal-header__text">
            Enter your wall dimensions. We recommend adding 4cm to width and 4cm to height. You can move the image inside the frame and select a fragment. Try the extra options below, add a comment if needed.
          </div>
        </div>

        {* msWallpapers form *}
        {'!mswp.form' | snippet: [
          'id' => $_modx->resource.id,
          'image' => $file.url,
          'cart_id' => 7,
        ]}
      </div>
    </div>
  {/foreach}

  {* Modal open button *}
  <a class="btn btn-success [ js-mswp-modal-open ]" href="#{$modal_id_first}">Configure and buy</a>

  <script>
    $(function () {
      // Modal handling
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

            $wrap.addClass('mswp-modal-w');

            var $form = $wrap.find('.js-mswp-form');
            var propkey = $form.data('mswp-propkey');

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

      $(document).on('click', '.js-mswp-modal-close', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
      });
    });
  </script>

  <style>
    .mswp-modal-w {
      /* If page has fixed blocks
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

Important actions are commented in the code.

## Step 4

Cart setup is described in [Installation and setup][2].

[2]: /en/components/mswallpapers/setup
