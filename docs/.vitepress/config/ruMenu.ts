export default [
  {
    text: 'Компоненты',
    collapsed: false,
    items: [
      { text: 'ABTest', link: '/components/abtest' },
      { text: 'AjaxForm', link: '/components/ajaxform' },
      {
        text: 'AjaxFormItLogin',
        collapsed: true,
        items: [
          {
            text: 'Общие сведения',
            link: '/components/ajaxformItlogin/general-information/',
            collapsed: true,
            items: [
              { text: 'Системные настройки', link: '/components/ajaxformItlogin/general-information/system-settings' },
              { text: 'Скрипты и Стили', link: '/components/ajaxformItlogin/general-information/scripts-and-styles' },
              { text: 'Системные события', link: '/components/ajaxformItlogin/general-information/system-events' },
            ],
          },
          {
            text: 'Сниппеты',
            collapsed: true,
            items: [
              { text: 'aflActivateUser', link: '/components/ajaxformItlogin/snippets/ajaxformitlogin' },
              { text: 'AjaxFormitLogin', link: '/components/ajaxformItlogin/snippets/aflactivateuser' },
              { text: 'Кастомные сниппеты', link: '/components/ajaxformItlogin/snippets/custom-snippets' },
            ],
          },
          {
            text: 'Хуки',
            collapsed: true,
            items: [
              { text: 'AjaxIdentification', link: '/components/ajaxformItlogin/hooks/ajaxidentification' },
            ],
          },
          {
            text: 'Валидаторы',
            collapsed: true,
            items: [
              { text: 'aflCheckPassLength', link: '/components/ajaxformItlogin/validators/aflcheckpasslength' },
              { text: 'aflPasswordConfirm', link: '/components/ajaxformItlogin/validators/aflpasswordconfirm' },
              { text: 'aflRequiredIf', link: '/components/ajaxformItlogin/validators/aflrequiredif' },
              { text: 'aflUserExists', link: '/components/ajaxformItlogin/validators/afluserexists' },
              { text: 'aflUserNotExists', link: '/components/ajaxformItlogin/validators/aflusernotexists' },
            ],
          },
        ],
      },
      { text: 'AjaxSnippet', link: '/components/ajaxsnippet' },
      {
        text: 'amoCRM',
        collapsed: true,
        items: [
          {
            text: 'Возможности и быстрый старт',
            link: '/components/amocrm/fast-start',
          },
          {
            text: 'Установка и настройка',
            link: '/components/amocrm/basic-setup',
          },
          {
            text: 'Отправка данных из форм',
            link: '/components/amocrm/submitting-forms',
          },
          {
            text: 'Webhook',
            link: '/components/amocrm/webhook',
          },
          {
            text: 'События',
            link: '/components/amocrm/events',
          },
          {
            text: 'Распространенные ошибки',
            link: '/components/amocrm/common-mistakes',
          },
        ],
      },
      { text: 'autoRedirector', link: '/components/autoredirector' },
      {
        text: 'BannerY',
        link: '/components/bannery/',
        collapsed: true,
        items: [
          { text: 'Сниппет', link: '/components/bannery/' },
          {
            text: 'Интерфейс',
            collapsed: true,
            items: [
              { text: 'Баннеры', link: '/components/bannery/interface/banners' },
              { text: 'Позиции', link: '/components/bannery/interface/positions' },
            ],
          },
        ],
      },
      { text: 'CallBack', link: '/components/callback' },
      {
        text: 'cityFields',
        link: '/components/cityfields/',
        collapsed: true,
        items: [
          { text: 'Управление городами и данными', link: '/components/cityfields/data-management' },
          { text: 'Использование доменов, поддоменов и подкаталогов', link: '/components/cityfields/using' },
          { text: 'Управление ценами товаров', link: '/components/cityfields/price-management' },
          { text: 'Настройки компонента', link: '/components/cityfields/setup' },
          { text: 'Сниппет cfCities', link: '/components/cityfields/snippets/cfcities' },
          { text: 'Сниппет cfField', link: '/components/cityfields/snippets/cffield' },
        ],
      },
      { text: 'CitySelect', link: '/components/cityselect' },
      { text: 'ClickToCall', link: '/components/clicktocall' },
      {
        text: 'Comparison',
        collapsed: true,
        link: '/components/comparison/',
        items: [
          { text: 'addComparison', link: '/components/comparison/addcomparison' },
          { text: 'CompareList', link: '/components/comparison/comparelist' },
          { text: 'getComparison', link: '/components/comparison/getcomparison' },
        ],
      },
      { text: 'CurrencyRate', link: '/components/currencyrate' },
      { text: 'customExtra', link: '/components/customextra' },
      { text: 'DebugParser', link: '/components/debugparser' },
      { text: 'DigitalSignage', link: '/components/digitalsignage' },
      { text: 'ePochta', link: '/components/epochta' },
      { text: 'FileAttach', link: '/components/fileattach' },
      {
        text: 'Formalicious',
        link: '/components/formalicious/',
        collapsed: true,
        items: [
          { text: 'Установка', link: '/components/formalicious/setup' },
          { text: 'Источники медиа', link: '/components/formalicious/media-sources' },
          { text: 'Категории', link: '/components/formalicious/categories' },
          { text: 'Типы полей', link: '/components/formalicious/field-types' },
          { text: 'Создание формы', link: '/components/formalicious/creating-form' },
          { text: 'FAQs', link: '/components/formalicious/faqs' },
        ],
      },
      { text: 'FrontendEditor', link: '/components/frontendeditor' },
      { text: 'frontTabs', link: '/components/fronttabs' },
      {
        text: 'GoogleSheets',
        link: '/components/googlesheets/',
        collapsed: true,
        items: [
          { text: 'Авторизация', link: '/components/googlesheets/auth' },
          {
            text: 'Импорт',
            link: '/components/googlesheets/import/',
            collapsed: true,
            items: [
              { text: 'Ресурсы', link: '/components/googlesheets/import/resources' },
              { text: 'Товары', link: '/components/googlesheets/import/products' },
              { text: 'Категории', link: '/components/googlesheets/import/categories' },
              { text: 'Производители', link: '/components/googlesheets/import/vendors' },
              { text: 'msOptionsPrice2', link: '/components/googlesheets/import/msoptionsprice2' },
              { text: 'msProductRemains', link: '/components/googlesheets/import/msproductremains' },
            ],
          },
          {
            text: 'Экспорт',
            link: '/components/googlesheets/export/',
            collapsed: true,
            items: [
              { text: 'Ресурсы', link: '/components/googlesheets/export/resources' },
              { text: 'Категории', link: '/components/googlesheets/export/categories' },
              { text: 'Товары', link: '/components/googlesheets/export/products' },
              { text: 'Заказы', link: '/components/googlesheets/export/orders' },
              { text: 'Производители', link: '/components/googlesheets/export/vendors' },
              { text: 'Пользователи', link: '/components/googlesheets/export/users' },
              { text: 'Покупатели', link: '/components/googlesheets/export/customers' },
              { text: 'msOptionsPrice2', link: '/components/googlesheets/export/msoptionsprice2' },
              { text: 'msProductRemains', link: '/components/googlesheets/export/msproductremains' },
            ],
          },
          { text: 'MIGX', link: '/components/googlesheets/migx/' },
          {
            text: 'Сниппеты',
            collapsed: true,
            items: [
              { text: 'GoogleSheets', link: '/components/googlesheets/snippets/googlesheets' },
              { text: 'GoogleSheetsSaveForm', link: '/components/googlesheets/snippets/googlesheetssaveform' },
              { text: 'GoogleSheetsFront', link: '/components/googlesheets/snippets/googlesheetsfront' },
            ],
          },
          {
            text: 'Разработка',
            link: '/components/googlesheets/development/',
            collapsed: true,
            items: [
              { text: 'События', link: '/components/googlesheets/development/events' },
            ],
          },
        ],
      },
      {
        text: 'HybridAuth',
        collapsed: true,
        items: [
          {
            text: 'Сниппеты',
            collapsed: true,
            items: [
              { text: 'HybridAuth', link: '/components/hybridauth/snippets/hybridauth', },
              { text: 'haProfile', link: '/components/hybridauth/snippets/haprofile', },
            ],
          },
          {
            text: 'Провайдеры',
            collapsed: true,
            items: [
              { text: 'Disqus', link: '/components/hybridauth/providers/disqus', },
              { text: 'Facebook', link: '/components/hybridauth/providers/facebook', },
              { text: 'Foursquare', link: '/components/hybridauth/providers/foursquare', },
              { text: 'GitHub', link: '/components/hybridauth/providers/github', },
              { text: 'Goodreads', link: '/components/hybridauth/providers/goodreads', },
              { text: 'Google', link: '/components/hybridauth/providers/google', },
              { text: 'GitHub', link: '/components/hybridauth/providers/github', },
              { text: 'LastFM', link: '/components/hybridauth/providers/lastfm', },
              { text: 'Live', link: '/components/hybridauth/providers/live', },
              { text: 'Mailru', link: '/components/hybridauth/providers/mailru', },
              { text: 'Instagram', link: '/components/hybridauth/providers/instagram', },
              { text: 'Yandex', link: '/components/hybridauth/providers/yandex', },
              { text: 'Twitter', link: '/components/hybridauth/providers/twitter', },
              { text: 'Vkontakte', link: '/components/hybridauth/providers/vkontakte', },
              { text: 'Odnoklassniki', link: '/components/hybridauth/providers/odnoklassniki', },
            ],
          },
        ],
      },
      { text: 'Ideas', link: '/components/ideas' },
      {
        text: 'Localizator',
        link: '/components/localizator/',
        collapsed: true,
        items: [
          { text: 'Сниппет Localizator', link: '/components/localizator/snippet-localizator' },
          { text: 'Переключение языков', link: '/components/localizator/switch-languages' },
          { text: 'События', link: '/components/localizator/events' },
          { text: 'Формирование sitemap', link: '/components/localizator/sitemap-formation' },
          { text: 'Импорт в локализации', link: '/components/localizator/import-in-localization' },
          { text: 'seoTemplates', link: '/components/localizator/seotemplates' },
          { text: 'Атрибут hreflang', link: '/components/localizator/hreflang-attribute' },
        ],
      },
      {
        text: 'LxQuiz',
        link: '/components/lxquiz/',
        collapsed: true,
        items: [
          { text: 'Сниппет LxQuiz', link: '/components/lxquiz/snippets/lxquiz' },
          { text: 'Сниппет LxQuizList', link: '/components/lxquiz/snippets/lxquizlist' },
        ],
      },
      {
        text: 'MagicThemes',
        link: '/components/magicthemes/',
        collapsed: true,
        items: [
          {
            text: 'Темы',
            items: [
              {
                text: 'handyShop',
                link: '/components/magicthemes/themes/handyshop/',
                collapsed: true,
                items: [
                  { text: 'Настройка', link: '/components/magicthemes/themes/handyshop/setup' },
                  { text: 'Пример работы со Штуковинами', link: '/components/magicthemes/themes/handyshop/example-things' },
                ],
              },
            ],
          },
        ],
      },
      { text: 'mapex2', link: '/components/mapex2' },
      { text: 'mdDocs', link: '/components/mddocs' },
      {
        text: 'MigxPageConfigurator',
        link: '/components/migxpageconfigurator/',
        collapsed: true,
        items: [
          { text: 'Начало работы', link: '/components/migxpageconfigurator/setup' },
          { text: 'Работа с чанками', link: '/components/migxpageconfigurator/chunks' },
          { text: 'Работа со сниппетами', link: '/components/migxpageconfigurator/snippets' },
          { text: 'Работа с формами', link: '/components/migxpageconfigurator/forms' },
          { text: 'Работа с контактами', link: '/components/migxpageconfigurator/contacts' },
          { text: 'Работа с изображениями', link: '/components/migxpageconfigurator/images' },
          { text: 'Создание и обновление элементов', link: '/components/migxpageconfigurator/elements' },
          { text: 'Разная информация по регионам', link: '/components/migxpageconfigurator/regions' },
        ],
      },
      { text: 'MinifyX', link: '/components/minifyx' },
      {
        text: 'MiniShop2',
        collapsed: true,
        link: '/components/minishop2/',
        items: [
          { text: 'Быстрый старт', link: '/components/minishop2/fast-start' },
          { text: 'Системные требования и зависимости', link: '/components/minishop2/system-requirements-and-dependencies' },
          {
            text: 'Интерфейс',
            collapsed: true,
            items: [
              { text: 'Категория', link: '/components/minishop2/interface/category' },
              { text: 'Товар', link: '/components/minishop2/interface/product' },
              { text: 'Заказы', link: '/components/minishop2/interface/orders' },
              { text: 'Настройки', link: '/components/minishop2/interface/settings' },
              { text: 'Галерея', link: '/components/minishop2/interface/gallery' },
              { text: 'Менеджер задач', link: '/components/minishop2/interface/task-manager' },
            ],
          },
          {
            text: 'Сниппеты',
            link: '/components/minishop2/snippets/',
            collapsed: true,
            items: [
              { text: 'msProducts', link: '/components/minishop2/snippets/msproducts' },
              { text: 'msCart', link: '/components/minishop2/snippets/mscart' },
              { text: 'msOrder', link: '/components/minishop2/snippets/msorder' },
              { text: 'msMiniCart', link: '/components/minishop2/snippets/msminicart' },
              { text: 'msGetOrder', link: '/components/minishop2/snippets/msgetorder' },
              { text: 'msGallery', link: '/components/minishop2/snippets/msgallery' },
              { text: 'msOptions', link: '/components/minishop2/snippets/msoptions' },
              { text: 'msProductOptions', link: '/components/minishop2/snippets/msproductoptions' },
            ],
          },
          {
            text: 'Разработка',
            collapsed: true,
            items: [
              { text: 'Плагины товаров', link: '/components/minishop2/development/product-plugins' },
              { text: 'Скрипты и стили', link: '/components/minishop2/development/scripts-and-styles' },
              { text: 'События', link: '/components/minishop2/development/events' },
              {
                text: 'Службы',
                collapsed: true,
                items: [
                  { text: 'Корзина', link: '/components/minishop2/development/services/cart' },
                  { text: 'Заказ', link: '/components/minishop2/development/services/order' },
                  { text: 'Доставка', link: '/components/minishop2/development/services/delivery' },
                  { text: 'Оплата', link: '/components/minishop2/development/services/payment' },
                  { text: 'Подключение', link: '/components/minishop2/development/services/connection' },
                ],
              },
            ],
          },
          {
            text: 'Модули оплаты',
            collapsed: true,
            items: [
              { text: 'Яндекс.Деньги', link: '/components/minishop2/payment-modules/yandex-money' },
              { text: 'Platron', link: '/components/minishop2/payment-modules/platron' },
              { text: 'WebMoney', link: '/components/minishop2/payment-modules/webmoney' },
              { text: 'msMerchant', link: '/components/minishop2/payment-modules/msmerchant' },
              { text: 'mspUP', link: '/components/minishop2/payment-modules/mspup' },
              { text: 'mspWebPay', link: '/components/minishop2/payment-modules/mspwebpay' },
              { text: 'mspAssistBelarus', link: '/components/minishop2/payment-modules/mspassistbelarus' },
              { text: 'mspPayU', link: '/components/minishop2/payment-modules/msppayu' },
              { text: 'mspYaCassa', link: '/components/minishop2/payment-modules/mspyacassa' },
              { text: 'mspPayAnyWay', link: '/components/minishop2/payment-modules/msppayanyway' },
              { text: 'mspBePaid', link: '/components/minishop2/payment-modules/mspbepaid' },
              { text: 'mspPayPal', link: '/components/minishop2/payment-modules/msppaypal' },
              {
                text: 'RBK Money',
                link: '/components/minishop2/development/rbk-money/',
                collapsed: true,
                items: [
                  { text: 'Выбор способа оплаты на сайте', link: '/components/minishop2/development/rbk-money/choosing-a-payment-method-on-the-site' },
                ],
              },
            ],
          },
          {
            text: 'Модули оплаты',
            collapsed: true,
            items: [
              { text: 'ordersUnformed', link: '/components/minishop2/other-addons/ordersunformed' },
              { text: 'msAddLinked', link: '/components/minishop2/other-addons/msaddlinked' },
              { text: 'msEMS', link: '/components/minishop2/other-addons/msems' },
              { text: 'msBuyNow', link: '/components/minishop2/other-addons/msbuynow' },
              { text: 'msDaData', link: '/components/minishop2/other-addons/msdadata' },
              { text: 'msDellin', link: '/components/minishop2/other-addons/msdellin' },
              { text: 'mscDistance', link: '/components/minishop2/other-addons/mscdistance' },
              { text: 'ms2form', link: '/components/minishop2/other-addons/ms2form' },
              { text: 'msLiveInform', link: '/components/minishop2/other-addons/msliveinform' },
              { text: 'msManagerOrderMap', link: '/components/minishop2/other-addons/msmanagerordermap' },
              { text: 'msNewPrice', link: '/components/minishop2/other-addons/msnewprice' },
              { text: 'msSalePrice', link: '/components/minishop2/other-addons/mssaleprice' },
              { text: 'msSMS', link: '/components/minishop2/other-addons/mssms' },
              { text: 'msOneClick', link: '/components/minishop2/other-addons/msoneclick' },
              { text: 'msOptionsPrice', link: '/components/minishop2/other-addons/msoptionsprice' },
              { text: 'msQuickView', link: '/components/minishop2/other-addons/msquickview' },
              { text: 'msSetInCart', link: '/components/minishop2/other-addons/mssetincart' },
              { text: 'msMCD', link: '/components/minishop2/other-addons/msmcd' },
              { text: 'msYmarket', link: '/components/minishop2/other-addons/msymarket' },
              { text: 'mscZone', link: '/components/minishop2/other-addons/msczone' },
            ],
          },
        ],
      },
      {
        text: 'mSearch2',
        collapsed: true,
        link: '/components/msearch2/',
        items: [
          {
            text: 'Сниппеты',
            collapsed: true,
            items: [
              { text: 'mSearch2', link: '/components/msearch2/snippets/msearch2', },
              { text: 'mFilter2', link: '/components/msearch2/snippets/mfilter2', },
              { text: 'mSearchForm', link: '/components/msearch2/snippets/msearch2', },
            ],
          },
          {
            text: 'Администрирование',
            collapsed: true,
            items: [
              { text: 'Поиск', link: '/components/msearch2/administration/search', },
              { text: 'Индексация', link: '/components/msearch2/administration/ing', },
              { text: 'Запросы', link: '/components/msearch2/administration/requests', },
              { text: 'Синонимы', link: '/components/msearch2/administration/synonyms', },
              { text: 'Словари', link: '/components/msearch2/administration/dictionaries', },
            ],
          },
          {
            text: 'Расширение',
            collapsed: true,
            items: [
              { text: 'Методы фильтрации', link: '/components/msearch2/extension/filtering-methods', },
              { text: 'Пример фильтрации товаров', link: '/components/msearch2/extension/product-filtering-example', },
            ],
          },
          {
            text: 'Типовые решения',
            collapsed: true,
            items: [
              { text: 'Зависимые фильтры', link: '/components/msearch2/standard-solutions/dependent-filters', },
              { text: 'Фильтрация категорий', link: '/components/msearch2/standard-solutions/category-filtering', },
            ],
          },
        ],
      },
      { text: 'mixedImage', link: '/components/mixedimage' },
      { text: 'modDevTools', link: '/components/moddevtools' },
      { text: 'modTree', link: '/components/modtree' },
      { text: 'modVkMarket', link: '/components/modvkmarket' },
      {
        text: 'msFavorites',
        link: '/components/msfavorites/',
        collapsed: true,
        items: [
          { text: 'Обновление', link: '/components/msfavorites/update' },
          { text: 'Быстрый старт', link: '/components/msfavorites/fast-start' },
        ],
      },
      {
        text: 'msGallerySearch',
        link: '/components/msgallerysearch/',
        collapsed: true,
        items: [
          { text: 'Загрузить по ссылке', link: '/components/msgallerysearch/load-from-link' },
          { text: 'Найти в Google', link: '/components/msgallerysearch/find-in-google' },
          { text: 'Найти в изображениях', link: '/components/msgallerysearch/find-in-images' },
          { text: 'Системные настройки', link: '/components/msgallerysearch/settings' },
        ],
      },
      {
        text: 'msImportExport',
        collapsed: true,
        items: [
          { text: 'msImportExport 1.0', link: '/components/msimportexport/msimportexport-1.0' },
          { text: 'msImportExport 2.0', link: '/components/msimportexport/msimportexport-2.0' },
        ],
      },
      {
        text: 'msPre',
        link: '/components/mspre/',
        collapsed: true,
        items: [
          { text: 'Возможности', link: '/components/mspre/features' },
          {
            text: 'Интерфейс',
            link: '/components/mspre/interface/',
            collapsed: true,
            items: [
              { text: 'COMBO', link: '/components/mspre/interface/combo' },
              { text: 'Товар и Цены', link: '/components/mspre/interface/product-and-prices' },
              { text: 'Опции minishop2', link: '/components/mspre/interface/ms2-options' },
              { text: 'ТВ-параметры', link: '/components/mspre/interface/tv' },
              { text: 'Настройка полей в списке', link: '/components/mspre/interface/list-field-settings' },
              { text: 'Редактирование в списке', link: '/components/mspre/interface/list-editing' },
              { text: 'Транзакции', link: '/components/mspre/interface/transactions' },
            ],
          },
        ],
      },
      {
        text: 'multiLingual',
        link: '/components/multilingual/',
        collapsed: true,
        items: [
          { text: 'Принцип перевода выборок', link: '/components/multilingual/translation-principle' },
          { text: 'Решение проблем', link: '/components/multilingual/problem-solving' },
          {
            text: 'Интерфейс',
            collapsed: true,
            items: [
              { text: 'Добавление языковых версий', link: '/components/multilingual/interface/add-language' },
              { text: 'Добавление переводов к полям', link: '/components/multilingual/interface/add-language-field' },
            ],
          },
          {
            text: 'Сниппеты',
            collapsed: true,
            items: [
              { text: 'mlLanguagesLinks', link: '/components/multilingual/snippets/mllanguageslinks' },
            ],
          },
        ],
      },
      { text: 'NotFoundParamAlert', link: '/components/notfoundparamalert' },
      {
        text: 'orderPrint',
        collapsed: true,
        items: [
          { text: 'Параметры', link: '/components/orderprint/settings' },
          { text: 'Шаблоны', link: '/components/orderprint/templates' },
        ],
      },
      { text: 'OrphoMan', link: '/components/orphoman' },
      {
        text: 'PageBreaker',
        collapsed: true,
        link: '/components/pagebreaker/',
        items: [
          { text: 'Настройки', link: '/components/pagebreaker/settings' },
          { text: 'Поддержка TinyMCE', link: '/components/pagebreaker/tinymce-support' },
        ],
      },
      { text: 'PageSpeed', link: '/components/pagespeed' },
      {
        text: 'PdoTools',
        collapsed: true,
        items: [
          {
            text: 'Сниппеты',
            link: '/components/pdotools/general-information/',
            collapsed: true,
            items: [
              { text: 'pdoResources', link: '/components/pdotools/snippets/pdoresources' },
              { text: 'pdoMenu', link: '/components/pdotools/snippets/pdomenu' },
              { text: 'pdoPage', link: '/components/pdotools/snippets/pdopage' },
              { text: 'pdoCrumbs', link: '/components/pdotools/snippets/pdocrumbs' },
              { text: 'pdoUsers', link: '/components/pdotools/snippets/pdousers' },
              { text: 'pdoSitemap', link: '/components/pdotools/snippets/pdositemap' },
              { text: 'pdoNeighbors', link: '/components/pdotools/snippets/pdoneighbors' },
              { text: 'pdoField', link: '/components/pdotools/snippets/pdofield' },
              { text: 'pdotitle', link: '/components/pdotools/snippets/pdotitle' },
              { text: 'pdoArchive', link: '/components/pdotools/snippets/pdoarchive' },
            ],
          },
          {
            text: 'Классы',
            link: '/components/pdotools/classes/',
            collapsed: true,
            items: [
              { text: 'pdoResources', link: '/components/pdotools/classes/pdotools' },
              { text: 'pdoFetch', link: '/components/pdotools/classes/pdofetch' },
              { text: 'pdoParser', link: '/components/pdotools/classes/pdoparser' },
            ],
          },
          { text: 'Общие параметры', link: '/components/pdotools/general-parameters' },
          { text: 'Файловые элементы', link: '/components/pdotools/file-elements' },
          { text: 'Парсер', link: '/components/pdotools/parser' },
        ],
      },
      { text: 'PromoDs', link: '/components/promods' },
      {
        text: 'Quiz',
        link: '/components/quiz/',
        collapsed: true,
        items: [
          {
            text: 'Сниппеты',
            collapsed: true,
            items: [
              { text: 'Quiz', link: '/components/quiz/snippets/quiz' },
              { text: 'QuizData', link: '/components/quiz/snippets/quizdata' },
              { text: 'QuizSteps', link: '/components/quiz/snippets/quizsteps' },
              { text: 'QuizResult', link: '/components/quiz/snippets/quizresult' },
              { text: 'SeoImg', link: '/components/quiz/snippets/seoimg' },
            ],
          },
          { text: 'События', link: '/components/quiz/events' },
          { text: 'Методы', link: '/components/quiz/methods' },
          { text: 'Примеры', link: '/components/quiz/examples' },
        ],
      },
      {
        text: 'ResourceGrabber',
        link: '/components/resourcegrabber/',
        collapsed: true,
        items: [
          {
            text: 'Интерфейс',
            link: '/components/resourcegrabber/interface/',
            collapsed: true,
            items: [
              { text: 'Данные', link: '/components/resourcegrabber/interface/data' },
              { text: 'Сниппеты', link: '/components/resourcegrabber/interface/snippets' },
              { text: 'Настройка', link: '/components/resourcegrabber/interface/settings' },
            ],
          },
          {
            text: 'Разработка',
            collapsed: true,
            items: [
              {
                text: 'Службы',
                collapsed: true,
                items: [
                  { text: 'Геттер', link: '/components/resourcegrabber/development/services/getter' },
                  { text: 'Граббер', link: '/components/resourcegrabber/development/services/grabber' },
                  { text: 'Сеттер', link: '/components/resourcegrabber/development/services/setter' },
                ],
              },
              { text: 'События', link: '/components/resourcegrabber/development/events' },
            ],
          },
        ],
      },
      { text: 'ReachGoal', link: '/components/reachgoal' },
      { text: 'Save2Page', link: '/components/save2page' },
      { text: 'SEODomains', link: '/components/seodomains' },
      { text: 'SEO Suite', link: '/components/seosuite' },
      {
        text: 'SEOtabs',
        collapsed: true,
        items: [
          { text: 'Быстрый старт', link: '/components/seotabs/fast-start' },
          { text: 'Сниппет seoTabs', link: '/components/seotabs/snippet-seotabs' },
        ],
      },
      { text: 'simpleQueue', link: '/components/simplequeue' },
      {
        text: 'Scheduler',
        link: '/components/scheduler/',
        collapsed: true,
        items: [
          { text: 'Установка', link: '/components/scheduler/installation' },
          { text: 'Создание задания', link: '/components/scheduler/create-a-task' },
          { text: 'Планирование задания', link: '/components/scheduler/job-scheduling' },
          { text: 'Разработка заданий', link: '/components/scheduler/task-development' },
        ],
      },
      {
        text: 'Sendex',
        link: '/components/sendex/',
        collapsed: true,
        items: [
          { text: 'Сниппет', link: '/components/sendex/' },
          {
            text: 'Интерфейс',
            collapsed: true,
            items: [
              { text: 'Подписки', link: '/components/sendex/interface/subscriptions' },
              { text: 'Очередь писем', link: '/components/sendex/interface/queue' },
            ],
          },
        ],
      },
      { text: 'ShoppingCart', link: '/components/shoppingcart' },
      {
        text: 'textAdvs',
        collapsed: true,
        link: '/components/textadvs/',
        items: [
          { text: 'Как добавить тег', link: '/components/textadvs/how-to-add-a-tag' },
        ],
      },
      {
        text: 'UserAuthHash',
        link: '/components/userauthhash/',
        collapsed: true,
        items: [
          {
            text: 'Разработка',
            items: [
              { text: 'События', link: '/components/userauthhash/development/events' },
              { text: 'Расширения', link: '/components/userauthhash/development/extensions' },
            ],
          },
        ],
      },
      {
        text: 'UserLocation',
        link: '/components/userlocation/',
        collapsed: true,
        items: [
          {
            text: 'Разработка',
            items: [
              { text: 'События', link: '/components/userlocation/development/events' },
            ],
          },
        ],
      },
      { text: 'StaticSaver', link: '/components/staticsaver' },
      { text: 'ViewsOnline', link: '/components/viewsonline' },
      { text: 'VoteForms', link: '/components/voteforms' },
      { text: 'YandexMaps', link: '/components/ajaxsnippet' },
      { text: 'WebDAV', link: '/components/webdav' },
      { text: 'userMarker', link: '/components/usermarker' },
      { text: 'UsersOnline', link: '/components/usersonline' }
    ],
  },
  {
    text: 'Система',
    collapsed: false,
    items: [
      {
        text: 'Основы',
        collapsed: true,
        items: [
          {
            text: 'Синтаксис тегов',
            link: '/system/basics/tag-syntax',
          },
          {
            text: 'Фильтры Ввод и вывода',
            link: '/system/basics/input-and-output-filters',
          },
        ],
      },
      {
        text: 'xPDO',
        link: '/system/xpdo/',
        collapsed: true,
        items: [
          {
            text: 'Класс xPDO',
            link: '/system/xpdo/xpdo-class',
          },
        ],
      },
    ],
  },
  {
    text: 'Утилиты',
    collapsed: false,
    items: [
      {
        text: 'Teleport',
        link: '/utilities/teleport/',
        collapsed: true,
        items: [
          {
            text: 'Использование',
            link: '/utilities/teleport/usage',
          },
          {
            text: 'Расширение',
            items: [
              { text: 'Шаблоны Извлечения', link: '/utilities/teleport/extension/extract-templates' },
            ],
          },
        ],
      },
    ],
  },
]
