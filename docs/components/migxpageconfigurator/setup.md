# Начало работы

## Назначение компонента

Компонент предназначен для ускорения интеграции вёрстки, для более удобного и гибкого управления контентом сайта.

## Минимальные системные требования

- Компонент MigxPageConfigurator работает строго с MODX 2.
- Минимальная версия PHP 7.0
- Рекомендуемая стабильная версия PHP 7.4
- На версиях PHP ^8.0 стабильность работы не гарантируется

## Зависимости

MigxPageConfigurator использует в своей работе компоненты:

- pdoTools версии не ниже 2.#.#
- pThumb версии не ниже 2.#.#
- MIGX версии не ниже 2.#.#
- AjaxFormItLogin версии не ниже 1.0.6

::: warning
Если вы скачали компонент не из репозитория modstore, перед установкой добавьте репозиторий modstore в поставщики пакетов, в противном случае **AjaxFormItLogin** не будет скачан автоматически
:::

## Шаблонизатор Fenom

::: warning Oбязательно
Для корректной работы необходимо использовать в оформлении шаблонов и чанков вашего сайта [шаблонизатор fenom](/components/pdotools/parser#шаблонизатор-fenom), поставляемый в комплекте с компонентом pdoTools. Для этого установите значение системной настройки `pdotools_fenom_parser` значение `Да`.
:::

## С чего начать

Начать стоит с изучения доступных полей. Сделать это можно открыв в админке графический интерфейс компонента Migx и просмотрев из каких полей состоят имеющиеся там конфигурации. Я постарался сделать их максимально универсальными, однако если текущего набора полей вам мало, можете добавить свои. Так же рекомендую ознакомиться с доступными плейсхолдерами.

## Базовый алгоритм использования

Разберём базовые принципы работы с компонентом на примере главной страницы сайта.

- Скопировать всё содержимое папки `core/components/migxpageconfigurator/examples/pages/` в папку `core/elements/pages/`
- Скопировать всё содержимое папки `core/components/migxpageconfigurator/examples/templates/` в папку `core/elements/templates/`
- Если работаете локально в IDE, а сайт лежит на хостинге, то скачайте файл `assets/components/migxpageconfigurator/css/mpc.css`, чтобы появились подсказки по атрибутам.
- В файл `core/elements/templates/wrapper.tpl` добавляем код подключения Ваших скриптов и стилей, предварительно загрузив их на сервер.
- Копируем уникальное содержимое из вёрстки главной страницы в файл `core/elements/templates/index.tpl`
- Добавляем в самом верху этого файла данные шаблона и заголовок типового ресурса с этим шаблоном

```html
<!--##{"templatename":"Главная","pagetitle":"Главная Страница","icon":"icon-home"}##-->
```

Обратите внимание, формат комментария `<!--## ##-->` должен оставаться таким же, поскольку содержимое комментария будет разобрано с помощью регулярных выражений. Само содержимое должно быть валидным JSON.

- Приступаем к разметке шаблона. Первым делом указываем название секции с помощью атрибута `data-mpc-name` и указываем имя конфигурации для данной секции `data-mpc-section`.
- Затем смотрим какие поля есть внутри секции. Для наглядности будет использовать код ниже, который представляет собой вёрстку слайдера с пагинацией и стрелочками.

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
                  <img src="assets/project_files/images2017/10/11/1b.png" alt="Бухгалтерское обслуживание ">
                  <div class="sppb-carousel-item-inner">
                    <div class="sppb-carousel-caption">
                      <div class="sppb-carousel-pro-text">
                        <h2>Бухгалтерское обслуживание </h2>
                        <p>Все виды бухгалтерского обслуживания под ключ на любых системах налогооблажения -
                          профессиональное ведение от 3500 рублей!</p>
                        <a href="uslugi/buhgalterskoe-obslujivanie.html" id="btn-1506948405534" class="sppb-btn sppb-btn-default sppb-btn-rounded">
                          Узнать подробнее
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="sppb-item sppb-item-has-bg">
                  <img src="assets/project_files/2017/10/11/4b.png" alt="Юридическое сопровождение">
                  <div class="sppb-carousel-item-inner">
                    <div class="sppb-carousel-caption">
                      <div class="sppb-carousel-pro-text">
                        <h2>Юридическое сопровождение</h2>
                        <p>Юридическое сопровождение Вашего бизнеса под ключ - надежная поддержка и опора для
                          профессиональной деятельности всего от 5000 рублей в месяц</p>
                        <a href="uslugi/yuridicheskoe-obsluzhivanie.html" id="btn-1506948405535" class="sppb-btn sppb-btn-default sppb-btn-rounded">
                          Узнать подробнее
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a href="#sppb-carousel-1506948405534" class="sppb-carousel-arrow left sppb-carousel-control"
                data-slide="prev">
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

Мы видим, что один слайд содержит картинку, заголовок, текст, ссылку и текст ссылки.

```html
<div class="sppb-item sppb-item-has-bg active">
  <img src="assets/project_files/images2017/10/11/1b.png" alt="Бухгалтерское обслуживание "> <!-- картинка -->
  <div class="sppb-carousel-item-inner">
    <div class="sppb-carousel-caption">
      <div class="sppb-carousel-pro-text">
        <h2>Бухгалтерское обслуживание </h2> <!-- заголовок -->
        <p>Все виды бухгалтерского обслуживания под ключ на любых системах налогооблажения -
          профессиональное ведение от 3500 рублей!</p> <!-- текст -->
        <a href="uslugi/buhgalterskoe-obslujivanie.html" id="btn-1506948405534" class="sppb-btn sppb-btn-default sppb-btn-rounded"> <!-- ссылка -->
          Узнать подробнее <!-- текст ссылки -->
        </a>
      </div>
    </div>
  </div>
</div>
```

В комплекте с компонентом создаётся конфигурация `list_triple_img`, мы можем использовать её. Для этого добавим блоку `<div class="sppb-carousel-inner sppb-text-left">` атрибут `data-mpc-field` со значением `list_triple_img`.
Каждый слайд нужно обозначить как отдельный элемент списка, с помощью атрибута `data-mpc-item` без значения. При этом вёрстка будет взята только из первого элемента, в то время как контент будет добавлен в админку из обоих слайдов.
Внутри слайда, нам нужно так же разметить поля, которые доступны в конфигурации `list_triple_img`. Так как это первый уровень вложенности, атрибуту `data-mpc-field` нужно добавить индекс 1. Если внутри слайда будет список, который вы заходите отобразить в админке как таблицу Migx, то вам следует повторить то, что мы проделали для слайдера, только указать другое поле и каждый элемент списка будет обозначен атрибутом `data-mpc-item` с индексом 1, поля внутри  `data-mpc-item-1` будут иметь индекс 2, т.е. так `data-mpc-field-2`. Так же стоит не забыть о том, что первый слайд должен быть активным, в нашем случае это делается добавлением класса `active`.
В итоге слайдер будет выглядеть так

```fenom
<div class="sppb-carousel-inner sppb-text-left" data-mpc-field="list_triple_img">
  <div data-mpc-item class="sppb-item sppb-item-has-bg {if $i === 0}active{/if}">
    <img data-mpc-field-1="img" src="assets/project_files/images2017/10/11/1b.png" alt="{$item1.title}">
    <div class="sppb-carousel-item-inner">
      <div class="sppb-carousel-caption">
        <div class="sppb-carousel-pro-text">
          <h2 data-mpc-field-1="title">Бухгалтерское обслуживание </h2>
          <p data-mpc-field-1="subtitle">Все виды бухгалтерского обслуживания под ключ на любых системах налогооблажения -
            профессиональное ведение от 3500 рублей!</p>
          <a data-mpc-field-1="content" href="uslugi/buhgalterskoe-obslujivanie.html" id="btn-1506948405534" class="sppb-btn sppb-btn-default sppb-btn-rounded">
            Узнать подробнее
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
          <h2 data-mpc-field-1="title">Юридическое сопровождение</h2>
          <p data-mpc-field-1="subtitle">Юридическое сопровождение Вашего бизнеса под ключ - надежная поддержка и опора для
            профессиональной деятельности всего от 5000 рублей в месяц</p>
          <a data-mpc-field-1="content" href="uslugi/yuridicheskoe-obsluzhivanie.html" id="btn-1506948405535" class="sppb-btn sppb-btn-default sppb-btn-rounded">
            Узнать подробнее
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
```

Как вы, вероятно, заметили в атрибуте alt у картинок появился плейсхолдер `$item1.title`. Он появился потому, что `list_triple_img` это поле типа migx, а они выводятся в цикле. В итоговой секции слайды будут выведены так

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
            Узнать подробнее
          </a>
        </div>
      </div>
    </div>
  </div>
{/foreach}
```

Вывод пагинации к слайдеру нам придётся сделать самостоятельно, благо это несложно

```fenom
<ol class="sppb-carousel-indicators">
  {foreach $list_triple_img as $item1 index=$i last=$l}
    <li data-sppb-target="#sppb-carousel-1506948405534" class="{if $i === 0}active{/if}" data-sppb-slide-to="{$i}"></li>
  {/foreach}
</ol>
```

Когда закончите с разметкой должен получится вот такой код

```fenom
<div data-mpc-section="big_slider" data-mpc-name="Большой слайдер" id="{$id}" class="sppb-section">
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
                        <h2 data-mpc-field-1="title">Бухгалтерское обслуживание </h2>
                        <p data-mpc-field-1="subtitle">Все виды бухгалтерского обслуживания под ключ на любых системах налогооблажения -
                          профессиональное ведение от 3500 рублей!</p>
                        <a data-mpc-field-1="content" href="uslugi/buhgalterskoe-obslujivanie.html" id="btn-1506948405534"
                            class="sppb-btn sppb-btn-default sppb-btn-rounded">
                          Узнать подробнее
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
                        <h2 data-mpc-field-1="title">Юридическое сопровождение</h2>
                        <p data-mpc-field-1="subtitle">Юридическое сопровождение Вашего бизнеса под ключ - надежная поддержка и опора для
                          профессиональной деятельности всего от 5000 рублей в месяц</p>
                        <a data-mpc-field-1="content" href="uslugi/yuridicheskoe-obsluzhivanie.html" id="btn-1506948405535"
                            class="sppb-btn sppb-btn-default sppb-btn-rounded">
                          Узнать подробнее
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a href="#sppb-carousel-{$id}" class="sppb-carousel-arrow left sppb-carousel-control"
                  data-slide="prev">
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

Теперь пришла пора посмотреть что же у нас получилось, для этого нужно в терминале запустить команду:

```sh
php -d display_errors -d error_reporting=E_ALL public_html/core/components/migxpageconfigurator/console/mgr_tpl.php web index.tpl 1
```

Рассмотрим подробнее эту строку. В начале `php` указываем интерпретатор, затем включаем показ ошибок в PHP `-d display_errors -d error_reporting=E_ALL`, далее указываем путь к файлу, и в конце через пробел указываем параметры: `web` - контекст, `index.tpl` - имя файла шаблона, `1` - указывает на то, что нужно записать контент из файла в админку. После запуска команды в папке `core/elements/sections/` должен появиться файл с именем секции `big_slider.tpl`. В админке будет создан ресурс с заголовком `Главная Страница` и шаблон `Главная`. Если этого не произошло и в терминале нет ошибок, смотрите внутренний журнал ошибок modx на наличие ошибок.

В комплекте так же имеется скрипт `slice_tpl.php`, его отличие от `mgr_tpl.php` в том, что его запуск не приводит к созданию шаблона и ресурса в админке, а только к созданию файла секции. Я использую его для парсинга секции-обёртки, где есть head, header, footer и другие одинаковые для всего сайта элементы.

Скрипт `mgr_tpl.php` можно вызывать с 3-мя параметрами разделенными пробелами: контекст, имя файла шаблона, обновлять/не обновлять контент. Последний параметр отвечает за то, будут ли записаны данные из файла в админку.
Скрипт `slice_tpl.php` можно запускать с двумя параметрами: контекст, имя файла шаблона.
