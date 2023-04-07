# Настройки компонента

## Основные настройки

| Название                       | По умолчанию                    | Описание                                                                    |
| ------------------------------ | ------------------------------- | --------------------------------------------------------------------------- |
| **cityfields_active**          | `Да`                            | Включает работу компонента                                                  |
| **cityfields_cityindomain**    | `Нет`                           | Включает определение города по полному домену или поддомену                 |
| **cityfields_cityinsubfolder** | `Нет`                           | Включает определение города по подкаталогам                                 |
| **cityfields_default_city**    | `1`                             | ID города по умолчанию                                                      |
| **cityfields_frontend_css**    | `[[+cssUrl]]web/cityfields.css` | Путь к файлу со стилями CSS для подключения на фронте сайта                 |
| **cityfields_frontend_js**     | `[[+jsUrl]]web/cityfields.js`   | Путь к файлу со скриптами Javascript для подключения на фронте сайта        |
| **cityfields_placeholders**    | `Да`                            | Включает запись в плейсхолдеры всех данных, доступных для выбранного города |
| **cityfields_prefix**          | `cf.`                           | Указанный префикс добавляется в начало наименования плейсхолдера            |

## Геолокация

| Название                       | По умолчанию                                               | Описание                                                                    |
| ------------------------------ | ---------------------------------------------------------- | --------------------------------------------------------------------------- |
| **cityfields_gl_active**       | `Да`                                                         | Включает определение города по IP-адресу и автоматическую переадресацию     |
| **cityfields_gl_exclude**      | `YandexBot, YandexAccessibilityBot, YandexMobileBot, YandexDirectDyn, YandexScreenshotBot, YandexImages, YandexVideo, YandexVideoParser, YandexMedia, YandexBlogs, YandexFavicons, YandexWebmaster, YandexPagechecker, YandexImageResizer, YandexAdNet, YandexDirect, YaDirectFetcher, YandexCalendar, YandexSitelinks, YandexMetrika, YandexNews, YandexNewslinks, YandexCatalog, YandexAntivirus, YandexMarket, YandexVertis, YandexForDomain, YandexSpravBot, YandexSearchShop, YandexMedianaBot, YandexOntoDB, YandexOntoDBAPI, YandexTurbo, Googlebot, Googlebot-Image, Mediapartners-Google, AdsBot-Google, Mail.RU_Bot, Rambler, bingbot, Accoona, ia_archiver, Ask Jeeves, OmniExplorer_Bot, W3C_Validator, WebAlta, YahooFeedSeeker, Yahoo!, Ezooms, Tourlentabot, MJ12bot, AhrefsBot, SearchBot, SiteStatus, Nigma.ru, Baiduspider, Statsbot, SISTRIX, AcoonBot, findlinks, proximic, OpenindexSpider, statdom.ru, Exabot, Spider, SeznamBot, oBot, C-T bot, Updownerbot, Snoopy, heritrix, Yeti, DomainVader, DCPbot, PaperLiBot` | Для этого списка агентов определение города по IP-адресу и автоматическая переадресация будет отключена. Агенты вводятся в одну строчку через запятую |
