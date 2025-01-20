# msImportExport 2.0

Компонент для импорта/экспорта.

## Видео-обзор

![Видео-обзор](https://www.youtube.com/watch?v=Tx-NXId8vYI)

[RuTube](https://rutube.ru/video/97d50d3046d9d6f80293e602e3640cad/)

## Поддерживаемые форматы файлов

- CSV
- XLSX
- ODS
- XML (только экспорт)

## Поддерживаемы типы экспорта

- документы Modx
- категории, товары, связи, галерея   [MiniShop2;](https://modstore.pro/packages/ecommerce/minishop2)
- данные [msOptionsPrice2;](https://modstore.pro/packages/ecommerce/msoptionsprice2)
- данные [msOptionsColor;](https://modstore.pro/packages/integration/msoptionscolor)
- данные [msProductRemain;](https://modstore.pro/packages/ecommerce/msproductremains)
- данные [msSalePrice;](https://modstore.pro/packages/discounts/mssaleprice)
- данные [ms2Gallery;](https://modstore.pro/packages/photos-and-files/ms2gallery)
- данные [SEO Pro;](https://modx.com/extras/package/seopro)
- фиды Yandex.Market для [DBS модели.](https://yandex.ru/support/marketplace/orders/dbs/index.html)

## Поддерживаемы типы импорта

- документы Modx
- категории, товары, связи, галерея [MiniShop2;](https://modstore.pro/packages/ecommerce/minishop2)
- данные [msOptionsPrice2;](https://modstore.pro/packages/ecommerce/msoptionsprice2)
- данные [msOptionsColor;](https://modstore.pro/packages/integration/msoptionscolor)
- данные [msProductRemain;](https://modstore.pro/packages/ecommerce/msproductremains)
- данные [msSalePrice;](https://modstore.pro/packages/discounts/mssaleprice)
- данные [ms2Gallery;](https://modstore.pro/packages/photos-and-files/ms2gallery)
- данные [SEO Pro;](https://modx.com/extras/package/seopro)

## Дополнения расширяющие базовый компонент

- [ieMs2](https://modstore.pro/packages/import-and-export/iems2) - сервисы импорта/экспорта MiniShop2;
- [ieGallery](https://modstore.pro/packages/import-and-export/iegallery)  - сервисы импорта/экспорта галерей ms2Gallery и MiniShop2;
- [ieMsOptionsPrice2](https://modstore.pro/packages/import-and-export/iemsoptionsprice2)  - сервисы импорта/экспорта msOptionsPrice2;
- [ieMsOptionsColor](https://modstore.pro/packages/import-and-export/iemsoptionscolor)  - сервисы импорта/экспорта msOptionsColor;
- [ieMsProductRemains](https://modstore.pro/packages/import-and-export/iemsproductremains)  - сервисы импорта/экспорта  msProductRemains;
- [ieMsSalePrice](https://modstore.pro/packages/import-and-export/iemssaleprice)  - сервисы импорта/экспорта msSalePrice;
- [ieYandexMarket](https://modstore.pro/packages/import-and-export/ieyandexmarket)  - сервис экспорта Yandex.Market для DBS модели.

## Системные события

**msieOnLoadServices** - загрузка списка сервисов

Параметры события

| Имя  | Описание                                         |
|------|--------------------------------------------------|
| msie | объект класса Msie                               |
| mode | типа сервиса. Допустимые значение: import;export |

**msieOnManagerCustomCssJs** - загрузка скриптов

Параметры события

| Имя        | Описание                    |
|------------|-----------------------------|
| controller | экземпляр класса контроллер |
| page       | идентификатор страницы      |

**msieOnGetServiceFields** - загрузка списка полей

Параметры события

| Имя     | Описание                                          |
|---------|---------------------------------------------------|
| msie    | объект класса Msie                                |
| mode    | типа сервиса. Допустимые значение: import; export |
| service | объект класса MsIeService                         |
| fields  | список полей                                      |

**msieOnExportStart** - старт экспорт

Параметры события

| Имя      | Описание                                                                |
|----------|-------------------------------------------------------------------------|
| worker   | объект класса                                                           |
| presetId | ID пресета                                                              |
| skip     | прервать действие. Допустимые значения: true; false. По умолчанию false |
| cached   | запущен ли экспорт в кэшированном режиме                                |

**msieOnExportBeforeFinish** - завершение экспорта

Параметры события

| Имя      | Описание                                                                |
|----------|-------------------------------------------------------------------------|
| worker   | объект класса                                                           |
| presetId | ID пресета                                                              |
| skip     | прервать действие. Допустимые значения: true; false. По умолчанию false |
| cached   | запущен ли экспорт в кэшированном режиме                                |
| file     | файл экспорта                                                           |

**msieOnExportBeforeArchive** - перед архивированием данных экспорта

Параметры события

| Имя      | Описание                                                                |
|----------|-------------------------------------------------------------------------|
| worker   | объект класса                                                           |
| presetId | ID пресета                                                              |
| skip     | прервать действие. Допустимые значения: true; false. По умолчанию false |
| files    | список файлов для архивации                                             |

**msieOnExportFinish** - конец экспорта

Параметры события

| Имя      | Описание                                                                |
|----------|-------------------------------------------------------------------------|
| worker   | объект класса                                                           |
| presetId | ID пресета                                                              |
| skip     | прервать действие. Допустимые значения: true; false. По умолчанию false |
| cached   | запущен ли экспорт в кэшированном режиме                                |
| file     | файл экспорта                                                           |

**msieOnExportPrepareQuery** - подготовка запроса экспорта

Параметры события

| Имя      | Описание                                                                |
|----------|-------------------------------------------------------------------------|
| worker   | объект класса                                                           |
| presetId | ID пресета                                                              |
| skip     | прервать действие. Допустимые значения: true; false. По умолчанию false |
| config   | массив с данными для формирования SQL запроса                           |

**msieOnExportBeforePrepareRow
msieOnExportAfterPrepareRow** - подготовка данных записи экспорта

Параметры события

| Имя      | Описание                                                                |
|----------|-------------------------------------------------------------------------|
| worker   | объект класса                                                           |
| presetId | ID пресета                                                              |
| skip     | прервать действие. Допустимые значения: true; false. По умолчанию false |
| dataType | тип записи. Допустимые значение:keys;fields;records.                    |
| data     | массив данных                                                           |

**msieOnExportBeforeWriteRow
msieOnExportAfterWriteRow** - запись данных в файл

Параметры события

| Имя      | Описание                                                                |
|----------|-------------------------------------------------------------------------|
| worker   | объект класса                                                           |
| presetId | ID пресета                                                              |
| skip     | прервать действие. Допустимые значения: true; false. По умолчанию false |
| dataType | тип записи. Допустимые значение:keys;fields;records.                    |
| data     | массив данных                                                           |
| options  | массив опций                                                            |

**msieOnImportStart** - старт импорта

Параметры события

| Имя      | Описание                                                                |
|----------|-------------------------------------------------------------------------|
| worker   | объект класса                                                           |
| presetId | ID пресета                                                              |
| skip     | прервать действие. Допустимые значения: true; false. По умолчанию false |
| files    | массив файлов импорта                                                   |

**msieOnImportBeforePrepare** - подготовка данных импорта

Параметры события

| Имя      | Описание                                                                |
|----------|-------------------------------------------------------------------------|
| worker   | объект класса                                                           |
| presetId | ID пресета                                                              |
| skip     | прервать действие. Допустимые значения: true; false. По умолчанию false |
| data     | массив данных импорта                                                   |

**msieOnImportAfterPrepare
msieOnImportBeforePrepare** -  подготовка данных импорта

Параметры события

| Имя      | Описание                                                                |
|----------|-------------------------------------------------------------------------|
| worker   | объект класса                                                           |
| presetId | ID пресета                                                              |
| skip     | прервать действие. Допустимые значения: true; false. По умолчанию false |
| data     | массив данных импорта                                                   |
| record   | подготовленные данные импорта                                           |
| action   | действие. Допустимые значение: create; update                           |

**msieOnBeforeImport** - импорт данных

Параметры события

| Имя       | Описание                                                                                    |
|-----------|---------------------------------------------------------------------------------------------|
| worker    | объект класса                                                                               |
| presetId  | ID пресета                                                                                  |
| skip      | прервать действие. Допустимые значения: true; false. По умолчанию false                     |
| data      | массив данных импорта                                                                       |
| record    | подготовленные данные импорта                                                               |
| action    | действие. Допустимые значение: create; update                                               |
| tvs       | массив tv полей (присутствует только у сервиса быстрого обновления)                         |
| poolQuery | массив SQL запросов быстрого обновления (присутствует только у сервиса быстрого обновления) |

**msieOnImport** - импорт данных

Параметры события

| Имя      | Описание                                                                |
|----------|-------------------------------------------------------------------------|
| worker   | объект класса                                                           |
| presetId | ID пресета                                                              |
| skip     | прервать действие. Допустимые значения: true; false. По умолчанию false |
| data     | массив данных импорта                                                   |
| record   | подготовленные данные импорта                                           |
| object   | массив данных объекта импорта                                           |
| action   | действие. Допустимые значение: create; update                           |

**msieOnImportNotUnique** - проверка на дублирование

Параметры события

| Имя       | Описание                                                                |
|-----------|-------------------------------------------------------------------------|
| worker    | объект класса                                                           |
| presetId  | ID пресета                                                              |
| skip      | прервать действие. Допустимые значения: true; false. По умолчанию false |
| data      | массив данных импорта                                                   |
| record    | подготовленные данные импорта                                           |
| field     | название проверочного поля. По умолчанию “alias”                        |
| duplicate | ID дублирующего ресурса                                                 |

**msieOnImportFinish** - конец импорта

Параметры события

| Имя      | Описание                                                                                                                                          |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| worker   | объект класса                                                                                                                                     |
| presetId | ID пресета                                                                                                                                        |
| skip     | прервать действие. Допустимые значения: true; false. По умолчанию false                                                                           |
| ids      | массив ID объектов которые были созданы/обновлены в процессе импорта. Параметр присутствует только для сервисов импорта каких либо ресурсов Modx. |

Примечание! Любой из сервисов также может к перечисленному списку параметров событий добавлять свои, поэтому также необходимо смотреть параметры событий на страницах конкретных дополнений которые добавляют свои сервисы.

## Переход с первой версии на вторую

Вторая версия компонента не совместима с первой, по этому просто так обновится не получится и лучше всего ее использовать на новых проектах.

Если все же вы решили установить вторую версию на сайт где уже установлена первая версия, то перед этим нужно удалить первую версию, а также в базе данных вручную удалить следующие таблицы от первой версии.

- msie_cron
- msie_head_alias
- msie_access_price
- msie_presets_fields
