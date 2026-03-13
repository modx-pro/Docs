# Getting started

## Component purpose

The component is for faster markup integration and more flexible, convenient site content management.

## Minimum system requirements

- MigxPageConfigurator works with MODX 2 only.
- PHP 7.0 minimum
- Recommended stable: PHP 7.4
- PHP ^8.0: stability not guaranteed

## Dependencies

MigxPageConfigurator uses:

- pdoTools 2.#.# or higher
- pThumb 2.#.# or higher
- MIGX 2.#.# or higher
- AjaxFormItLogin 1.0.6 or higher

::: warning
If you did not install from the modstore repo, add the modstore repository to package providers before installing, otherwise **AjaxFormItLogin** will not be installed automatically.
:::

## Fenom template engine

::: warning Required
For correct operation you must use the [Fenom template engine](/en/components/pdotools/parser#shablonizator-fenom) from pdoTools for your site templates and chunks. Set system setting `pdotools_fenom_parser` to `Yes`.
:::

## Where to start

Start by reviewing available fields: open the Migx GUI in the admin and see which fields the existing configs use. They are meant to be generic; you can add your own. Also check the available placeholders.

## Basic usage algorithm

We'll use the site main page as an example.

- Copy all from `core/components/migxpageconfigurator/examples/pages/` to `core/elements/pages/`
- Copy all from `core/components/migxpageconfigurator/examples/templates/` to `core/elements/templates/`
- If you work locally in an IDE and the site is on a server, download `assets/components/migxpageconfigurator/css/mpc.css` so the IDE can show attribute hints.
- In `core/elements/templates/wrapper.tpl` add your scripts and styles (upload them first).
- Copy the unique main page markup into `core/elements/templates/index.tpl`
- At the very top of that file add template data and the default resource title for this template:

```html
<!--##{"templatename":"Main","pagetitle":"Main Page","icon":"icon-home"}##-->
```

The comment format `<!--## ##-->` must stay as is, because the content is parsed with regular expressions. The content must be valid JSON.

- Mark up the template. First set the section name with `data-mpc-name` and the section config with `data-mpc-section`.
- Then map the fields inside the section. For clarity we'll use the markup below — a slider with pagination and arrows:

```html
<div class="sppb-section">
  <div class="sppb-container-inner">
    <div class="sppb-row">
      <div class="sppb-col-md-12">
        <div id="column-id-1481002172" class="sppb-addon-container  sppb-wow fadeInLeftBig" data-sppb-wow-duration="300ms" data-sppb-wow-delay="300ms">
          <div id="sppb-addon-1506948405534" class="clearfix">
            <div id="sppb-carousel-1506948405534" data-interval="5000" class="sppb-carousel sppb-slide" data-sppb-ride="sppb-carousel">
              <ol class="sppb-carousel-indicators">
                <li data-sppb-target="#sppb-carousel-1506948405534" class="active" data-sppb-slide-to="0"></li>
                <li data-sppb-target="#sppb-carousel-1506948405534" data-sppb-slide-to="1"></li>
              </ol>
              <div class="sppb-carousel-inner sppb-text-left">
                <div class="sppb-item sppb-item-has-bg active">
                  <img src="assets/project_files/images2017/10/11/1b.png" alt="Accounting services">
                  <div class="sppb-carousel-item-inner">
                    <div class="sppb-carousel-caption">
                      <div class="sppb-carousel-pro-text">
                        <h2>Accounting services</h2>
                        <p>Full accounting support on any tax system — from 3500 rubles!</p>
                        <a href="services/accounting.html" id="btn-1506948405534" class="sppb-btn sppb-btn-default sppb-btn-rounded">
                          Learn more
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="sppb-item sppb-item-has-bg">
                  <img src="assets/project_files/2017/10/11/4b.png" alt="Legal support">
                  <div class="sppb-carousel-item-inner">
                    <div class="sppb-carousel-caption">
                      <div class="sppb-carousel-pro-text">
                        <h2>Legal support</h2>
                        <p>Legal support for your business — reliable backup from 5000 rubles per month</p>
                        <a href="services/legal.html" id="btn-1506948405535" class="sppb-btn sppb-btn-default sppb-btn-rounded">
                          Learn more
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a href="#sppb-carousel-1506948405534" class="sppb-carousel-arrow left sppb-carousel-control" data-slide="prev">
                <i class="fa fa-chevron-left"></i>
              </a>
              <a href="#sppb-carousel-1506948405534" class="sppb-carousel-arrow right sppb-carousel-control" data-slide="next">
                <i class="fa fa-chevron-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

One slide contains: image, title, text, link, and link text.

```html
<div class="sppb-item sppb-item-has-bg active">
  <img src="assets/project_files/images2017/10/11/1b.png" alt="Accounting services"> <!-- image -->
  <div class="sppb-carousel-item-inner">
    <div class="sppb-carousel-caption">
      <div class="sppb-carousel-pro-text">
        <h2>Accounting services</h2> <!-- title -->
        <p>Full accounting support on any tax system — from 3500 rubles!</p> <!-- text -->
        <a href="services/accounting.html" id="btn-1506948405534" class="sppb-btn sppb-btn-default sppb-btn-rounded"> <!-- link -->
          Learn more <!-- link text -->
        </a>
      </div>
    </div>
  </div>
</div>
```

The component ships with config `list_triple_img`; we can use it. Add `data-mpc-field="list_triple_img"` to the block `<div class="sppb-carousel-inner sppb-text-left">`.
Mark each slide as a list item with `data-mpc-item` (no value). Markup is taken only from the first item; content is filled in the admin from both slides.
Inside the slide, mark the fields that exist in config `list_triple_img`. Because this is the first nesting level, use index 1 on `data-mpc-field`: `data-mpc-field-1`. If a slide has a nested list you want to show in the admin as a Migx table, repeat the same pattern: another `data-mpc-field` and mark each list item with `data-mpc-item` with index 1; fields inside `data-mpc-item-1` get index 2, i.e. `data-mpc-field-2`. Remember to make the first slide active (e.g. class `active`).
The slider will look like this:

```fenom
<div class="sppb-carousel-inner sppb-text-left" data-mpc-field="list_triple_img">
  <div data-mpc-item class="sppb-item sppb-item-has-bg {if $i === 0}active{/if}">
    <img data-mpc-field-1="img" src="assets/project_files/images2017/10/11/1b.png" alt="{$item1.title}">
    <div class="sppb-carousel-item-inner">
      <div class="sppb-carousel-caption">
        <div class="sppb-carousel-pro-text">
          <h2 data-mpc-field-1="title">Accounting services</h2>
          <p data-mpc-field-1="subtitle">Full accounting support on any tax system — from 3500 rubles!</p>
          <a data-mpc-field-1="content" href="services/accounting.html" id="btn-1506948405534" class="sppb-btn sppb-btn-default sppb-btn-rounded">
            Learn more
          </a>
        </div>
      </div>
    </div>
  </div>
  <div data-mpc-item class="sppb-item sppb-item-has-bg">
    <img data-mpc-field-1="img" src="assets/project_files/2017/10/11/4b.png" alt="{$item1.title}">
    <div class="sppb-carousel-item-inner">
      <div class="sppb-carousel-caption">
        <div class="sppb-carousel-pro-text">
          <h2 data-mpc-field-1="title">Legal support</h2>
          <p data-mpc-field-1="subtitle">Legal support for your business — from 5000 rubles per month</p>
          <a data-mpc-field-1="content" href="services/legal.html" id="btn-1506948405535" class="sppb-btn sppb-btn-default sppb-btn-rounded">
            Learn more
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
```

You may have noticed the `$item1.title` placeholder in the image `alt`. It appears because `list_triple_img` is a migx-type field and is output in a loop. In the final section the slides are output like this:

```fenom
{foreach $list_triple_img as $item1 index=$i last=$l}
  <div class="sppb-item sppb-item-has-bg {if $i === 0}active{/if}">
    <img src="{$item1.img}" alt="{$item1.title}">
    <div class="sppb-carousel-item-inner">
      <div class="sppb-carousel-caption">
        <div class="sppb-carousel-pro-text">
          <h2>{$item1.title}</h2>
          <p>{$item1.subtitle}</p>
          <a href="{$item1.content}" id="btn-1506948405535" class="sppb-btn sppb-btn-default sppb-btn-rounded">
            Learn more
          </a>
        </div>
      </div>
    </div>
  </div>
{/foreach}
```

Slider pagination you add yourself; it's straightforward:

```fenom
<ol class="sppb-carousel-indicators">
  {foreach $list_triple_img as $item1 index=$i last=$l}
    <li data-sppb-target="#sppb-carousel-1506948405534" class="{if $i === 0}active{/if}" data-sppb-slide-to="{$i}"></li>
  {/foreach}
</ol>
```

When markup is done you should have code like this:

```fenom
<div data-mpc-section="big_slider" data-mpc-name="Big slider" id="{$id}" class="sppb-section">
  <div class="sppb-container-inner">
    <div class="sppb-row">
      <div class="sppb-col-md-12">
        <div id="column-id-1481002172" class="sppb-addon-container  sppb-wow fadeInLeftBig" data-sppb-wow-duration="300ms" data-sppb-wow-delay="300ms">
          <div id="sppb-addon-1506948405534" class="clearfix">
            <div id="sppb-carousel-{$id}" data-interval="5000" class="sppb-carousel sppb-slide" data-sppb-ride="sppb-carousel">
              <ol class="sppb-carousel-indicators">
                {foreach $list_triple_img as $item1 $i=index $l=last}
                <li data-sppb-target="#sppb-carousel-{$id}" class="{if $i === 0}active{/if}" data-sppb-slide-to="{$i}"></li>
                {/foreach}
              </ol>
              <div class="sppb-carousel-inner sppb-text-left" data-mpc-field="list_triple_img">
                <div data-mpc-item class="sppb-item sppb-item-has-bg {if $i === 0}active{/if}">
                  <img data-mpc-field-1="img" src="assets/project_files/images2017/10/11/1b.png" alt="{$item1.title}">
                  <div class="sppb-carousel-item-inner">
                    <div class="sppb-carousel-caption">
                      <div class="sppb-carousel-pro-text">
                        <h2 data-mpc-field-1="title">Accounting services</h2>
                        <p data-mpc-field-1="subtitle">Full accounting support on any tax system — from 3500 rubles!</p>
                        <a data-mpc-field-1="content" href="services/accounting.html" id="btn-1506948405534"
                            class="sppb-btn sppb-btn-default sppb-btn-rounded">
                          Learn more
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div data-mpc-item class="sppb-item sppb-item-has-bg">
                  <img data-mpc-field-1="img" src="assets/project_files/2017/10/11/4b.png" alt="{$item1.title}">
                  <div class="sppb-carousel-item-inner">
                    <div class="sppb-carousel-caption">
                      <div class="sppb-carousel-pro-text">
                        <h2 data-mpc-field-1="title">Legal support</h2>
                        <p data-mpc-field-1="subtitle">Legal support for your business — from 5000 rubles per month</p>
                        <a data-mpc-field-1="content" href="services/legal.html" id="btn-1506948405535"
                            class="sppb-btn sppb-btn-default sppb-btn-rounded">
                          Learn more
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a href="#sppb-carousel-{$id}" class="sppb-carousel-arrow left sppb-carousel-control" data-slide="prev">
                <i class="fa fa-chevron-left"></i>
              </a>
              <a href="#sppb-carousel-{$id}" class="sppb-carousel-arrow right sppb-carousel-control" data-slide="next">
                <i class="fa fa-chevron-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

To see the result, run in the terminal:

```sh
php -d display_errors -d error_reporting=E_ALL public_html/core/components/migxpageconfigurator/console/mgr_tpl.php web index.tpl 1
```

Breakdown: `php` — interpreter; `-d display_errors -d error_reporting=E_ALL` — show PHP errors; then path to the script; then space-separated: `web` — context, `index.tpl` — template file name, `1` — write content from the file to the manager. After the command, `core/elements/sections/` should contain a section file named after the section, e.g. `big_slider.tpl`. In the manager a resource is created with title "Main Page" and template "Main". If nothing appears and there are no terminal errors, check the MODX error log.

The package also includes `slice_tpl.php`. Unlike `mgr_tpl.php`, it does not create a template or resource in the manager; it only creates the section file. Use it to parse wrapper sections that contain head, header, footer and other site-wide elements.

**mgr_tpl.php** accepts 3 space-separated parameters: context, template file name, update content (1/0). The last one controls whether file content is written to the manager.
**slice_tpl.php** accepts 2 parameters: context, template file name.
