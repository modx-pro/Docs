import type { DefaultTheme } from 'vitepress/theme'

export default<DefaultTheme.Sidebar> [
  {
    text: 'Компоненты',
    collapsed: false,
    items: [
      { text: 'ABTest', link: '/components/abtest' },
      { text: 'AjaxForm', link: '/components/ajaxform' },
      {
        text: 'AjaxFormItLogin',
        link: '/components/ajaxformitlogin/',
        collapsed: true,
        items: [
          { text: 'Системные настройки', link: '/components/ajaxformitlogin/system-settings' },
          { text: 'Скрипты и Стили', link: '/components/ajaxformitlogin/scripts-and-styles' },
          { text: 'Системные события', link: '/components/ajaxformitlogin/system-events' },
          {
            text: 'Сниппеты',
            collapsed: true,
            items: [
              { text: 'AjaxFormitLogin', link: '/components/ajaxformitlogin/snippets/ajaxformitlogin' },
              { text: 'aflActivateUser', link: '/components/ajaxformitlogin/snippets/aflactivateuser' },
              { text: 'Кастомные сниппеты', link: '/components/ajaxformitlogin/snippets/custom-snippets' },
            ],
          },
          {
            text: 'Хуки',
            collapsed: true,
            items: [
              { text: 'AjaxIdentification', link: '/components/ajaxformitlogin/hooks/ajaxidentification' },
            ],
          },
          {
            text: 'Валидаторы',
            collapsed: true,
            items: [
              { text: 'aflCheckPassLength', link: '/components/ajaxformitlogin/validators/aflcheckpasslength' },
              { text: 'aflPasswordConfirm', link: '/components/ajaxformitlogin/validators/aflpasswordconfirm' },
              { text: 'aflRequiredIf', link: '/components/ajaxformitlogin/validators/aflrequiredif' },
              { text: 'aflUserExists', link: '/components/ajaxformitlogin/validators/afluserexists' },
              { text: 'aflUserNotExists', link: '/components/ajaxformitlogin/validators/aflusernotexists' },
            ],
          },
        ],
      },
      { text: 'AjaxSnippet', link: '/components/ajaxsnippet' },
      {
        text: 'amoCRM',
        link: '/components/amocrm/',
        collapsed: true,
        items: [
          { text: 'Установка и настройка', link: '/components/amocrm/setup' },
          { text: 'Отправка данных из форм', link: '/components/amocrm/submitting-forms' },
          { text: 'Webhook', link: '/components/amocrm/webhook' },
          { text: 'События', link: '/components/amocrm/events' },
          { text: 'Распространенные ошибки', link: '/components/amocrm/common-mistakes' },
        ],
      },
      { text: 'autoRedirector', link: '/components/autoredirector' },
      {
        text: 'BannerY',
        link: '/components/bannery/',
        collapsed: true,
        items: [
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
      {
        text: 'easyComm',
        link: '/components/easycomm/',
        collapsed: true,
        items: [
          { text: 'Описание', link: '/components/easycomm/description' },
          { text: 'Интерфейс', link: '/components/easycomm/interface' },
          { text: 'Настройки', link: '/components/easycomm/settings' },
          { text: 'Сниппеты', link: '/components/easycomm/snippets' },
          { text: 'Плагины и кастомизация', link: '/components/easycomm/plugins-and-customization' },
          { text: 'Несколько полей с рейтингом', link: '/components/easycomm/multiple-rating-fields' },
          { text: 'Рейтинг в сниппетах pdoResources, msProducts', link: '/components/easycomm/rating-in-pdoresources-and-msproducts' },
          { text: 'Типовые решения и частые вопросы', link: '/components/easycomm/solutions' },
        ],
      },
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
          { text: 'Быстрый старт', link: '/components/minishop2/quick-start' },
          { text: 'Системные требования и зависимости', link: '/components/minishop2/requirements-and-dependencies' },
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
          { text: 'Модули оплаты', link: '/components/minishop2/payments' },
          { text: 'Другие дополнения', link: '/components/minishop2/modules'},
          {
            text: 'Полезные выборки',
            collapsed: true,
            items: [
              { text: 'Вывод количества товаров в категории', link: '/components/minishop2/useful-queries/count-category-products' },
              { text: 'Вывод производителей товаров MS2', link: '/components/minishop2/useful-queries/get-vendors' },
              { text: 'Получение id товаров по опции MS2', link: '/components/minishop2/useful-queries/get-product-id-by-option' },
              { text: 'Дерево ресурсов', link: '/components/minishop2/useful-queries/get-resource-tree' },
              { text: 'Вывод всех категорий товара', link: '/components/minishop2/useful-queries/get-categories' },
              { text: 'Выбор товаров по опциям', link: '/components/minishop2/useful-queries/get-products-by-options' },
              { text: 'Вывод ссылок на дополнительные категории товара', link: '/components/minishop2/useful-queries/get-categories-links' },
            ],
          },
        ],
      },
      { text: 'Яндекс.Деньги', link: '/components/minishop2/payment/yandex-money' },
      { text: 'Platron', link: '/components/minishop2/payment/platron' },
      { text: 'WebMoney', link: '/components/minishop2/payment/webmoney' },
      { text: 'msMerchant', link: '/components/minishop2/payment/msmerchant' },
      { text: 'mspUP', link: '/components/minishop2/payment/mspup' },
      { text: 'mspWebPay', link: '/components/minishop2/payment/mspwebpay' },
      { text: 'mspAssistBelarus', link: '/components/minishop2/payment/mspassistbelarus' },
      { text: 'mspPayU', link: '/components/minishop2/payment/msppayu' },
      { text: 'mspYaCassa', link: '/components/minishop2/payment/mspyacassa' },
      { text: 'mspPayAnyWay', link: '/components/minishop2/payment/msppayanyway' },
      { text: 'mspBePaid', link: '/components/minishop2/payment/mspbepaid' },
      { text: 'mspPayPal', link: '/components/minishop2/payment/msppaypal' },
      {
        text: 'RBK Money',
        link: '/components/minishop2/payment/rbk-money/',
        collapsed: true,
        items: [
          { text: 'Выбор способа оплаты на сайте', link: '/components/minishop2/payment/rbk-money/choosing-payment-method' },
        ],
      },
      {
        text: 'allGifts',
        link: '/components/minishop2/other-addons/allgifts/',
        collapsed: true,
        items: [
          { text: 'Быстрый старт', link: '/components/minishop2/other-addons/allgifts/quick-start' },
          { text: 'Решение проблем', link: '/components/minishop2/other-addons/allgifts/problem-solving' },
        ],
      },
      { text: 'ordersUnformed', link: '/components/minishop2/other-addons/ordersunformed' },
      { text: 'msAddLinked', link: '/components/minishop2/other-addons/msaddlinked' },
      { text: 'msBuyNow', link: '/components/minishop2/other-addons/msbuynow' },
      { text: 'msCategoryOptions', link: '/components/minishop2/other-addons/mscategoryoptions' },
      { text: 'msDaData', link: '/components/minishop2/other-addons/msdadata' },
      { text: 'msDellin', link: '/components/minishop2/other-addons/msdellin' },
      {
        text: 'msDiscount',
        link: '/components/minishop2/other-addons/msdiscount/',
        collapsed: true,
        items: [
          { text: 'Акции', link: '/components/minishop2/other-addons/msdiscount/stock' },
          { text: 'Скидки', link: '/components/minishop2/other-addons/msdiscount/discounts' },
          { text: 'Купоны', link: '/components/minishop2/other-addons/msdiscount/coupons' },
          {
            text: 'Сниппеты',
            items: [
              { text: 'msdBuyNow', link: '/components/minishop2/other-addons/msdiscount/snippets/msdbuynow' },
              { text: 'msdGetDiscount', link: '/components/minishop2/other-addons/msdiscount/snippets/msdgetdiscount' },
            ],
          },
        ],
      },
      { text: 'msEMS', link: '/components/minishop2/other-addons/msems' },
      { text: 'mscDistance', link: '/components/minishop2/other-addons/mscdistance' },
      { text: 'ms2form', link: '/components/minishop2/other-addons/ms2form' },
      { text: 'msLiveInform', link: '/components/minishop2/other-addons/msliveinform' },
      { text: 'msManagerOrderMap', link: '/components/minishop2/other-addons/msmanagerordermap' },
      { text: 'msNewPrice', link: '/components/minishop2/other-addons/msnewprice' },
      { text: 'msMCD', link: '/components/minishop2/other-addons/msmcd' },
      { text: 'msSalePrice', link: '/components/minishop2/other-addons/mssaleprice' },
      { text: 'msSMS', link: '/components/minishop2/other-addons/mssms' },
      { text: 'msOneClick', link: '/components/minishop2/other-addons/msoneclick' },
      { text: 'msOptionsPrice', link: '/components/minishop2/other-addons/msoptionsprice' },
      {
        text: 'msProfile',
        collapsed: true,
        items: [
          { text: 'Интерфейс', link: '/components/minishop2/other-addons/msprofile/interface' },
          {
            text: 'Сниппеты',
            collapsed: true,
            items: [
              { text: 'msProfile', link: '/components/minishop2/other-addons/msprofile/snippets/msprofile' },
              { text: 'msProfileCharge', link: '/components/minishop2/other-addons/msprofile/snippets/msprofilecharge' },
            ],
          },
          { text: 'Плагин', link: '/components/minishop2/other-addons/msprofile/plugin' },
        ],
      },
      {
        text: 'msPointsIssue',
        collapsed: true,
        link: '/components/minishop2/other-addons/mspointsissue/',
        items: [
          {
            text: 'Сниппеты',
            link: '/components/minishop2/other-addons/mspointsissue/snippets/',
            collapsed: true,
            items: [
              { text: 'msPointsIssue.Order', link: '/components/minishop2/other-addons/mspointsissue/snippets/mspointsissue-order' },
            ],
          },
          {
            text: 'Интерфейс',
            link: '/components/minishop2/other-addons/mspointsissue/interface/',
            collapsed: true,
            items: [
              { text: 'Заказы', link: '/components/minishop2/other-addons/mspointsissue/interface/orders' },
              { text: 'Настройка', link: '/components/minishop2/other-addons/mspointsissue/interface/settings' },
            ],
          },
        ],
      },
      {
        text: 'msProductRemains',
        link: '/components/minishop2/other-addons/msproductremains/',
        collapsed: true,
        items: [
          { text: 'Настройки компонента', link: '/components/minishop2/other-addons/msproductremains/settings' },
          { text: 'Вкладка остатков', link: '/components/minishop2/other-addons/msproductremains/remains-tab' },
          { text: 'Страница остатков', link: '/components/minishop2/other-addons/msproductremains/remains-page' },
          { text: 'Сниппет getRemains', link: '/components/minishop2/other-addons/msproductremains/getremains' },
          { text: 'Примеры', link: '/components/minishop2/other-addons/msproductremains/examples' },
        ],
      },
      { text: 'msQuickView', link: '/components/minishop2/other-addons/msquickview' },
      {
        text: 'msBonus2',
        link: '/components/minishop2/other-addons/msbonus2/',
        collapsed: true,
        items: [
          { text: 'Быстрый старт', link: '/components/minishop2/other-addons/msbonus2/quick-start' },
          {
            text: 'Сниппеты',
            collapsed: true,
            items: [
              { text: 'msBonus2Form', link: '/components/minishop2/other-addons/msbonus2/snippets/msbonus2form' },
              { text: 'msBonus2Logs', link: '/components/minishop2/other-addons/msbonus2/snippets/msbonus2logs' },
              { text: 'msBonus2ProductBonus', link: '/components/minishop2/other-addons/msbonus2/snippets/msbonus2productbonus' },
            ],
          },
          { text: 'События jQuery', link: '/components/minishop2/other-addons/msbonus2/jquery-events' },
          {
            text: 'События плагинов',
            collapsed: true,
            items: [
              { text: 'msb2OnBeforeSetBonus', link: '/components/minishop2/other-addons/msbonus2/events/msb2onbeforesetbonus' },
              { text: 'msb2OnSetBonus', link: '/components/minishop2/other-addons/msbonus2/events/msb2onsetbonus' },
              { text: 'msb2OnUnsetBonus', link: '/components/minishop2/other-addons/msbonus2/events/msb2onunsetbonus' },
              { text: 'Примеры', link: '/components/minishop2/other-addons/msbonus2/events/examples' },
            ],
          },
          { text: 'Программное API', link: '/components/minishop2/other-addons/msbonus2/api' },
          {
            text: 'Кейсы',
            collapsed: true,
            items: [
              { text: 'Вывод информации в письме о списанных бонусах за заказ', link: '/components/minishop2/other-addons/msbonus2/cases/email-inform' },
              { text: 'Дополнительные бонусы за первый заказ на сайте', link: '/components/minishop2/other-addons/msbonus2/cases/additional-bonuses' },
              { text: 'Применять либо промокод msPromoCode2, либо бонусы msBonus2', link: '/components/minishop2/other-addons/msbonus2/cases/mspromocode2-or-msbonus2' },
            ],
          },
        ],
      },
      { text: 'msSetInCart', link: '/components/minishop2/other-addons/mssetincart' },
      { text: 'msYmarket', link: '/components/minishop2/other-addons/msymarket' },
      {
        text: 'msPromoCode',
        link: '/components/minishop2/other-addons/mspromocode/',
        collapsed: true,
        items: [
          {
            text: 'Функционал',
            collapsed: true,
            items: [
              { text: 'Акции', link: '/components/minishop2/other-addons/mspromocode/functionality/stocks' },
              { text: 'Условия применения', link: '/components/minishop2/other-addons/mspromocode/functionality/conditions' },
              { text: 'Реферальные промо-коды', link: '/components/minishop2/other-addons/mspromocode/functionality/referral-promo-codes' },
              { text: 'Фиксированная скидка на всю корзину', link: '/components/minishop2/other-addons/mspromocode/functionality/fixed-cart-discount' },
            ],
          },
          { text: 'Установка и настройка', link: '/components/minishop2/other-addons/mspromocode/setup' },
          {
            text: 'Сниппеты',
            collapsed: true,
            items: [
              { text: 'mspcForm', link: '/components/minishop2/other-addons/mspromocode/snippets/mspcform' },
              { text: 'mspcRefCoupon', link: '/components/minishop2/other-addons/mspromocode/snippets/mspcrefcoupon' },
            ],
          },
          { text: 'jQuery события', link: '/components/minishop2/other-addons/mspromocode/jquery-events' },
          {
            text: 'События плагинов',
            link: '/components/minishop2/other-addons/mspromocode/events/',
            collapsed: true,
            items: [
              { text: 'mspcOnBeforeSetCoupon', link: '/components/minishop2/other-addons/mspromocode/events/mspconbeforesetcoupon' },
              { text: 'mspcOnSetCoupon', link: '/components/minishop2/other-addons/mspromocode/events/mspconsetcoupon' },
              { text: 'mspcOnBeforeSetProductDiscount', link: '/components/minishop2/other-addons/mspromocode/events/mspconbeforesetproductdiscount' },
              { text: 'mspcOnSetProductDiscount', link: '/components/minishop2/other-addons/mspromocode/events/mspconsetproductdiscount' },
              { text: 'mspcOnBindCouponToOrder', link: '/components/minishop2/other-addons/mspromocode/events/mspconbindcoupontoorder' },
            ],
          },
          {
            text: 'Кейсы',
            link: '/components/minishop2/other-addons/mspromocode/cases/',
            collapsed: true,
            items: [
              { text: 'Вывод информации по промо-коду в письме', link: '/components/minishop2/other-addons/mspromocode/cases/email-inform' },
              { text: 'Именные промокоды для пользователя', link: '/components/minishop2/other-addons/mspromocode/cases/personalized-promo-codes' },
              { text: 'Отменить промо-код при наличии в корзине запрещённых товаров', link: '/components/minishop2/other-addons/mspromocode/cases/cancel-promo-code' },
            ],
          },
        ],
      },
      {
        text: 'msPromoCode2',
        link: '/components/minishop2/other-addons/mspromocode2/',
        collapsed: true,
        items: [
          { text: 'Быстрый старт', link: '/components/minishop2/other-addons/mspromocode2/quick-start' },
          {
            text: 'Сниппеты',
            collapsed: true,
            items: [
              { text: 'msPromoCode2', link: '/components/minishop2/other-addons/mspromocode2/snippets/mspromocode2' },
              { text: 'mspc2Generate', link: '/components/minishop2/other-addons/mspromocode2/snippets/mspc2generate' },
              { text: 'mspc2CartKey', link: '/components/minishop2/other-addons/mspromocode2/snippets/mspc2cartkey' },
            ],
          },
          { text: 'События jQuery', link: '/components/minishop2/other-addons/mspromocode2/jquery-events' },
          {
            text: 'События плагинов',
            link: '/components/minishop2/other-addons/mspromocode2/events/',
            collapsed: true,
            items: [
              { text: 'mspc2OnBeforeGetCoupon', link: '/components/minishop2/other-addons/mspromocode2/events/mspc2onbeforegetcoupon' },
              { text: 'mspc2OnGetCoupon', link: '/components/minishop2/other-addons/mspromocode2/events/mspc2ongetcoupon' },
              { text: 'mspc2OnBeforeSetCoupon', link: '/components/minishop2/other-addons/mspromocode2/events/mspc2onbeforesetcoupon' },
              { text: 'mspc2OnSetCoupon', link: '/components/minishop2/other-addons/mspromocode2/events/mspc2onsetcoupon' },
              { text: 'mspc2OnUnsetCoupon', link: '/components/minishop2/other-addons/mspromocode2/events/mspc2onunsetcoupon' },
              { text: 'mspc2OnSetProductDiscountPrice', link: '/components/minishop2/other-addons/mspromocode2/events/mspc2onsetproductdiscountprice' },
              { text: 'Примеры', link: '/components/minishop2/other-addons/mspromocode2/events/examples' },
            ],
          },
          { text: 'Программное API', link: '/components/minishop2/other-addons/mspromocode2/api' },
          {
            text: 'Кейсы',
            link: '/components/minishop2/other-addons/mspromocode2/cases/',
            collapsed: true,
            items: [
              { text: 'Вывод информации по промо-коду в письме', link: '/components/minishop2/other-addons/mspromocode2/cases/email-inform' },
              { text: 'Установка промо-кода программно при входе на сайт', link: '/components/minishop2/other-addons/mspromocode2/cases/set-promocode' },
              { text: 'Генерация промо-кода в письме на следующий заказ', link: '/components/minishop2/other-addons/mspromocode2/cases/generate-promocode' },
              { text: 'Применять либо промокод msPromoCode2, либо бонусы msBonus2', link: '/components/minishop2/other-addons/mspromocode2/cases/mspromocode2-or-msbonus2' },
            ],
          },
        ],
      },
      { text: 'mscZone', link: '/components/minishop2/other-addons/msczone' },
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
      {
        text: 'msExtraFields',
        link: '/components/msextrafields/',
        collapsed: true,
        items: [
          { text: 'Возможности', link: '/components/msextrafields/features' },
          { text: 'Установка', link: '/components/msextrafields/setup' },
          { text: 'Интерфейс', link: '/components/msextrafields/interface' },
          { text: 'Настройки', link: '/components/msextrafields/settings' },
          { text: 'Сниппеты', link: '/components/msextrafields/snippets' },
          { text: 'Плагины', link: '/components/msextrafields/plugins' },
        ],
      },
      { text: 'mixedImage', link: '/components/mixedimage' },
      { text: 'modDevTools', link: '/components/moddevtools' },
      {
        text: 'modRetailCRM',
        link: '/components/modretailcrm/',
        collapsed: true,
        items: [
          {
            text: 'Предварительная настройка',
            collapsed: true,
            items: [
              { text: 'Выгрузка товаров', link: '/components/modretailcrm/presetup/upload-products' },
              { text: 'Выгрузка пользователей', link: '/components/modretailcrm/presetup/upload-users' },
              { text: 'Выгрузка заказов', link: '/components/modretailcrm/presetup/upload-orders' },
            ],
          },
          {
            text: 'Примеры работы с API',
            collapsed: true,
            items: [
              { text: 'Создать новый контакт', link: '/components/modretailcrm/examples-api/create-new-contact' },
              { text: 'Быстрый заказ товара', link: '/components/modretailcrm/examples-api/quick-order-product' },
              { text: 'Поиск заказа в RetailCRM', link: '/components/modretailcrm/examples-api/search-order-retailcrm' },
              { text: 'Поиск товара в RetailCRM', link: '/components/modretailcrm/examples-api/search-product-retailcrm' },
            ],
          },
          {
            text: 'Триггеры',
            collapsed: true,
            items: [
              { text: 'Создать новый контакт', link: '/components/modretailcrm/triggers/order-status-change' },
            ],
          },
          {
            text: 'Модули и расширение классов',
            collapsed: true,
            items: [
              { text: 'Пример расширения класса', link: '/components/modretailcrm/modules/example-class-extend' },
            ],
          },
        ],
      },
      { text: 'modTree', link: '/components/modtree' },
      { text: 'modVkMarket', link: '/components/modvkmarket' },
      {
        text: 'ms2Gallery',
        collapsed: true,
        items: [
          {
            text: 'Сниппеты',
            collapsed: true,
            items: [
              { text: 'ms2Gallery', link: '/components/ms2gallery/snippets/ms2gallery' },
              { text: 'ms2GalleryResources', link: '/components/ms2gallery/snippets/ms2galleryresources' },
            ],
          },
          { text: 'Генерация превью', link: '/components/ms2gallery/preview-generation' },
          { text: 'Интеграция', link: '/components/ms2gallery/integration' },
          { text: 'Картинки на странице', link: '/components/ms2gallery/output' },
          {
            text: 'Примеры',
            collapsed: true,
            items: [
              { text: 'Консольный импорт', link: '/components/ms2gallery/examples/console-import' },
              { text: 'Слайдер Bootstrap3', link: '/components/ms2gallery/examples/bootstrap3-slider' },
            ],
          },
        ],
      },
      {
        text: 'msFavorites',
        link: '/components/msfavorites/',
        collapsed: true,
        items: [
          { text: 'Обновление', link: '/components/msfavorites/update' },
          { text: 'Быстрый старт', link: '/components/msfavorites/quick-start' },
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
        text: 'mSocial',
        link: '/components/msocial/',
        collapsed: true,
        items: [
          { text: 'mSocialVK', link: '/components/msocial/msocialvk' },
          { text: 'mSocialFB', link: '/components/msocial/msocialfb' },
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
        text: 'msWallpapers',
        link: '/components/mswallpapers/',
        collapsed: true,
        items: [
          { text: 'Установка и настройка', link: '/components/mswallpapers/setup' },
          {
            text: 'Сниппеты',
            collapsed: true,
            items: [
              { text: 'mswp.form', link: '/components/mswallpapers/snippets/mswp-form' },
            ],
          },
          {
            text: 'События плагинов',
            link: '/components/mswallpapers/events/',
            collapsed: true,
            items: [
              { text: 'mswpOnGetProductPrice', link: '/components/mswallpapers/events/mswpongetproductprice' },
              { text: 'mswpOnGetProductCost', link: '/components/mswallpapers/events/mswpongetproductcost' },
              { text: 'Примеры', link: '/components/mswallpapers/events/examples' },
            ],
          },
          {
            text: 'Кейсы',
            collapsed: true,
            items: [
              { text: 'Форма в модальном окне с предварительным выбором текстуры', link: '/components/mswallpapers/cases/modal-form' },
            ],
          },
        ],
      },
      {
        text: 'mSync',
        link: '/components/msync/',
        collapsed: true,
        items: [
          { text: 'Установка', link: '/components/msync/setup' },
          { text: 'Интерфейс', link: '/components/msync/interface' },
          { text: 'Настройки', link: '/components/msync/settings' },
          { text: 'События и плагины', link: '/components/msync/events-and-plugins' },
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
        text: 'Office',
        link: '/components/office/',
        collapsed: true,
        items: [
          { text: 'Быстрый старт', link: '/components/office/quick-start' },
          { text: 'Логика работы', link: '/components/office/logic' },
          { text: 'Дополнительный функционал', link: '/components/office/additional-functionality' },
          {
            text: 'Контроллеры',
            collapsed: true,
            items: [
              { text: 'Авторизация', link: '/components/office/controllers/auth' },
              { text: 'Профиль', link: '/components/office/controllers/profile' },
              { text: 'История заказов MS2', link: '/components/office/controllers/orders-history-minishop2' },
              { text: 'Удаленная авторизация', link: '/components/office/controllers/auth-remote' },
            ],
          },
        ],
      },
      {
        text: 'orderPrint',
        link: '/components/orderprint/',
        collapsed: true,
        items: [
          { text: 'Настройка', link: '/components/orderprint/setup' },
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
        text: 'PayAndSee',
        link: '/components/payandsee/',
        collapsed: true,
        items: [
          {
            text: 'Интерфейс',
            link: '/components/payandsee/interface/',
            collapsed: true,
            items: [
              { text: 'Ресурс', link: '/components/payandsee/interface/resource' },
              { text: 'Заказы', link: '/components/payandsee/interface/orders' },
              { text: 'Контент', link: '/components/payandsee/interface/content' },
              { text: 'Тарифы', link: '/components/payandsee/interface/rates' },
              { text: 'Клиенты', link: '/components/payandsee/interface/clients' },
              { text: 'Подписки', link: '/components/payandsee/interface/subscriptions' },
              { text: 'Статусы', link: '/components/payandsee/interface/statuses' },
              { text: 'Оповещения', link: '/components/payandsee/interface/notifications' },
              { text: 'Настройки', link: '/components/payandsee/interface/settings' },
            ],
          },
          {
            text: 'Сниппеты',
            link: '/components/payandsee/snippets/',
            collapsed: true,
            items: [
              { text: 'pas.content', link: '/components/payandsee/snippets/pas-content' },
              { text: 'pas.order', link: '/components/payandsee/snippets/pas-order' },
              { text: 'pas.get.order', link: '/components/payandsee/snippets/pas-get-order' },
              { text: 'pas.subscription', link: '/components/payandsee/snippets/pas-subscription' },
            ],
          },
          {
            text: 'Разработка',
            collapsed: true,
            items: [
              { text: 'Скрипты и стили', link: '/components/payandsee/development/scripts-and-styles' },
              { text: 'События', link: '/components/payandsee/development/events' },
              { text: 'Расширения', link: '/components/payandsee/development/extensions' },
              {
                text: 'Службы',
                collapsed: true,
                items: [
                  { text: 'Корзина', link: '/components/payandsee/development/services/cart' },
                  { text: 'Заказ', link: '/components/payandsee/development/services/order' },
                  { text: 'Доставка', link: '/components/payandsee/development/services/delivery' },
                  { text: 'Оплата', link: '/components/payandsee/development/services/payment' },
                ],
              },
            ],
          },
          {
            text: 'Другие дополнения',
            collapsed: true,
            items: [
              { text: 'msDiscount', link: '/components/payandsee/integrations/msdiscount' },
              { text: 'msPromoCode', link: '/components/payandsee/integrations/mspromocode' },
            ],
          },
        ],
      },
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
      {
        text: 'ResVideoGallery',
        link: '/components/resvideogallery/',
        collapsed: true,
        items: [
          {
            text: 'Сниппеты',
            collapsed: true,
            items: [
              { text: 'ResVideoGallery', link: '/components/resvideogallery/snippets/resvideogallery' },
              { text: 'ResVideoGalleryTags', link: '/components/resvideogallery/snippets/resvideogallerytags' },
              { text: 'ResVideoGalleryUpload', link: '/components/resvideogallery/snippets/resvideogalleryupload' },
            ],
          },
          { text: 'Добавление своего видео парсера', link: '/components/resvideogallery/adding-custom-video-parser' },
          { text: 'События', link: '/components/resvideogallery/events' },
          {
            text: 'Настройка',
            collapsed: true,
            items: [
              { text: 'Вконтакте', link: '/components/resvideogallery/setup/vkontakte' },
            ],
          },
        ],
      },
      { text: 'ReachGoal', link: '/components/reachgoal' },
      { text: 'Save2Page', link: '/components/save2page' },
      { text: 'SEODomains', link: '/components/seodomains' },
      {
        text: 'SeoFilter',
        link: '/components/seofilter/',
        collapsed: true,
        items: [
          { text: 'Быстрый старт с mFilter2', link: '/components/seofilter/quick-start-mfilter2' },
          { text: 'Быстрый старт без mFilter2 и miniShop2', link: '/components/seofilter/quick-start-without-mfilter2-and-minishop2' },
          { text: 'Дополнительные возможности', link: '/components/seofilter/additional-features' },
          {
            text: 'Сниппеты',
            link: '/components/seofilter/snippets/',
            collapsed: true,
            items: [
              { text: 'sfWord', link: '/components/seofilter/snippets/sfword' },
              { text: 'sfLink', link: '/components/seofilter/snippets/sflink' },
              { text: 'sfMenu', link: '/components/seofilter/snippets/sfmenu' },
              { text: 'sfSitemap', link: '/components/seofilter/snippets/sfsitemap' },
            ],
          },
          { text: 'Замены в SEO текстах', link: '/components/seofilter/substitutions-in-seo' },
          {
            text: 'Объекты компонента',
            collapsed: true,
            items: [
              { text: 'Поле', link: '/components/seofilter/objects/field' },
              { text: 'Правило', link: '/components/seofilter/objects/rule' },
              { text: 'Словарь', link: '/components/seofilter/objects/dictionary' },
              { text: 'Таблица URL', link: '/components/seofilter/objects/url-table' },
            ],
          },
        ],
      },
      { text: 'SEO Suite', link: '/components/seosuite' },
      {
        text: 'SEOtabs',
        collapsed: true,
        items: [
          { text: 'Быстрый старт', link: '/components/seotabs/quick-start' },
          { text: 'Сниппет seoTabs', link: '/components/seotabs/snippet-seotabs' },
        ],
      },
      { text: 'simpleQueue', link: '/components/simplequeue' },
      {
        text: 'SocialTools',
        link: '/components/socialtools/',
        collapsed: true,
        items: [
          {
            text: 'Сниппеты',
            collapsed: true,
            items: [
              { text: 'socDialogForm', link: '/components/socialtools/snippets/socdialogform' },
              { text: 'socDialogList', link: '/components/socialtools/snippets/socdialoglist' },
              { text: 'socDialogReceive', link: '/components/socialtools/snippets/socdialogreceive' },
            ],
          },
        ],
      },
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
        text: 'Tickets',
        collapsed: true,
        items: [
          {
            text: 'Интерфейс',
            collapsed: true,
            items: [
              { text: 'Создание раздела с Тикетами', link: '/components/tickets/interface/create-ticket-section' },
              { text: 'Создание тикета', link: '/components/tickets/interface/create-ticket' },
              { text: 'Настройка прав пользователей', link: '/components/tickets/interface/setup-permissions' },
            ],
          },
          {
            text: 'Сниппеты',
            collapsed: true,
            items: [
              { text: 'getTickets', link: '/components/tickets/snippets/gettickets' },
              { text: 'getTicketsSections', link: '/components/tickets/snippets/getticketssections' },
              { text: 'TicketComments', link: '/components/tickets/snippets/ticketcomments' },
              { text: 'TicketForm', link: '/components/tickets/snippets/ticketform' },
              { text: 'TicketLatest', link: '/components/tickets/snippets/ticketlatest' },
              { text: 'TicketMeta', link: '/components/tickets/snippets/ticketmeta' },
              { text: 'subscribeAuthor', link: '/components/tickets/snippets/subscribeauthor' },
            ],
          },
          { text: 'TicketFormit', link: '/components/tickets/ticketformit' },
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
        text: 'UserEvents',
        link: '/components/userevents/',
        collapsed: true,
        items: [
          {
            text: 'Интерфейс',
            link: '/components/userevents/interface/',
            collapsed: true,
            items: [
              { text: 'Заказы', link: '/components/userevents/interface/orders' },
              { text: 'События', link: '/components/userevents/interface/events' },
              { text: 'Статусы', link: '/components/userevents/interface/statuses' },
              { text: 'Оповещения', link: '/components/userevents/interface/notifications' },
              { text: 'Настройки', link: '/components/userevents/interface/settings' },
            ],
          },
          {
            text: 'Сниппеты',
            link: '/components/userevents/snippets/',
            collapsed: true,
            items: [
              { text: 'ue.order', link: '/components/userevents/snippets/ue-order' },
              { text: 'ue.get.order', link: '/components/userevents/snippets/ue-get-order' },
            ],
          },
          {
            text: 'Разработка',
            collapsed: true,
            items: [
              { text: 'Скрипты и стили', link: '/components/userevents/development/scripts-and-styles' },
              { text: 'События', link: '/components/userevents/development/events' },
              { text: 'Расширения', link: '/components/userevents/development/extensions' },
              {
                text: 'Службы',
                collapsed: true,
                items: [
                  { text: 'Заказ', link: '/components/userevents/development/services/order' },
                  { text: 'Доставка', link: '/components/userevents/development/services/delivery' },
                  { text: 'Оплата', link: '/components/userevents/development/services/payment' },
                ],
              }
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
      {
        text: 'xCalc',
        link: '/components/xcalc/',
        collapsed: true,
        items: [
          {
            text: 'Сниппеты',
            collapsed: true,
            items: [
              { text: 'xCalc', link: '/components/xcalc/snippets/xcalc' },
            ],
          },
          { text: 'Типы полей', link: '/components/xcalc/field-types' },
          { text: 'jQuery события', link: '/components/xcalc/jquery-events' },
          {
            text: 'Кейсы',
            collapsed: true,
            items: [
              { text: 'Калькулятор подоконников', link: '/components/xcalc/cases/calculator-sill' },
              { text: 'AjaxForm при выводе результатов', link: '/components/xcalc/cases/ajaxform-results' },
            ],
          },
        ],
      },
      {
        text: 'xParser',
        link: '/components/xparser/',
        collapsed: true,
        items: [
          { text: 'Парсер RSS лент', link: '/components/xparser/parser-rss' },
          { text: 'Парсер HTML контента + Совмещенные задания', link: '/components/xparser/parser-html' },
          { text: 'Работа с miniShop2 товарами', link: '/components/xparser/minishop2' },
          { text: 'Работа с галереями', link: '/components/xparser/gallery' },
          { text: 'Пагинация', link: '/components/xparser/pagination' },
          { text: 'Регулярные выражения', link: '/components/xparser/regex' },
          {
            text: 'События плагинов',
            link: '/components/xparser/events/',
            collapsed: true,
            items: [
              { text: 'xParserOnFilterSourceItems', link: '/components/xparser/events/xparseronfiltersourceitems' },
              { text: 'xParserOnBeforeTaskParse', link: '/components/xparser/events/xparseronbeforetaskparse' },
              { text: 'xParserOnTaskItemParse', link: '/components/xparser/events/xparserontaskitemparse' },
              { text: 'xParserOnBeforeTaskActions', link: '/components/xparser/events/xparseronbeforetaskactions' },
              { text: 'xParserOnTaskParseDone', link: '/components/xparser/events/xparserontaskparsedone' },
              { text: 'Примеры', link: '/components/xparser/events/examples' },
            ],
          },
          { text: 'Скрипт запуска заданий из Cron', link: '/components/xparser/cron' },
          { text: 'Node JS демон', link: '/components/xparser/nodejs-demon' },
        ],
      },
      { text: 'YandexMaps', link: '/components/yandexmaps' },
      {
        text: 'YandexMaps2',
        link: '/components/yandexmaps2/',
        collapsed: true,
        items: [
          {
            text: 'Сниппеты',
            collapsed: true,
            items: [
              { text: 'YandexMaps2', link: '/components/yandexmaps2/snippets/yandexmaps2' },
            ],
          },
          { text: 'Быстрый старт', link: '/components/yandexmaps2/quick-start' },
          { text: 'Работа с mFilter2', link: '/components/yandexmaps2/mfilter2-integration' },
          { text: 'jQuery события', link: '/components/yandexmaps2/jquery-events' },
          { text: 'Конструктор карт', link: '/components/yandexmaps2/map-constructor' },
          {
            text: 'События плагинов',
            link: '/components/yandexmaps2/events/',
            collapsed: true,
            items: [
              { text: 'ymOnLoadObjects', link: '/components/yandexmaps2/events/ymonloadobjects' },
              { text: 'Примеры', link: '/components/yandexmaps2/events/examples' },
            ],
          },
          {
            text: 'Кейсы',
            collapsed: true,
            items: [
              { text: 'Точки из MIGX с кастомными иконками на фронт-энде', link: '/components/yandexmaps2/cases/migx-integration' },
              { text: 'Отключаем все элементы управления на карте', link: '/components/yandexmaps2/cases/disable-elements' },
              { text: 'Выводим данные родительского ресурса в балунах', link: '/components/yandexmaps2/cases/parent-data-in-baloons' },
            ],
          },
        ],
      },
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
