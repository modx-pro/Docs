# msImportExport 2.0

Import/export component.

## Video overview

![Video overview](https://www.youtube.com/watch?v=Tx-NXId8vYI)

[RuTube](https://rutube.ru/video/97d50d3046d9d6f80293e602e3640cad/)

## Supported file formats

- CSV
- XLSX
- ODS
- XML (export only)

## Supported export types

- ModX documents
- Categories, products, links, gallery [MiniShop2;](https://modstore.pro/packages/ecommerce/minishop2)
- [msOptionsPrice2;](https://modstore.pro/packages/ecommerce/msoptionsprice2) data
- [msOptionsColor;](https://modstore.pro/packages/integration/msoptionscolor) data
- [msProductRemain;](https://modstore.pro/packages/ecommerce/msproductremains) data
- [msSalePrice;](https://modstore.pro/packages/discounts/mssaleprice) data
- [ms2Gallery;](https://modstore.pro/packages/photos-and-files/ms2gallery) data
- [SEO Pro;](https://modx.com/extras/package/seopro) data
- Yandex.Market feeds for [DBS model.](https://yandex.ru/support/marketplace/orders/dbs/index.html)

## Supported import types

- ModX documents
- Categories, products, links, gallery [MiniShop2;](https://modstore.pro/packages/ecommerce/minishop2)
- [msOptionsPrice2;](https://modstore.pro/packages/ecommerce/msoptionsprice2) data
- [msOptionsColor;](https://modstore.pro/packages/integration/msoptionscolor) data
- [msProductRemain;](https://modstore.pro/packages/ecommerce/msproductremains) data
- [msSalePrice;](https://modstore.pro/packages/discounts/mssaleprice) data
- [ms2Gallery;](https://modstore.pro/packages/photos-and-files/ms2gallery) data
- [SEO Pro;](https://modx.com/extras/package/seopro) data

## Add-ons extending base component

- [ieMs2](https://modstore.pro/packages/import-and-export/iems2) - MiniShop2 import/export services;
- [ieGallery](https://modstore.pro/packages/import-and-export/iegallery) - ms2Gallery and MiniShop2 gallery import/export services;
- [ieMsOptionsPrice2](https://modstore.pro/packages/import-and-export/iemsoptionsprice2) - msOptionsPrice2 import/export services;
- [ieMsOptionsColor](https://modstore.pro/packages/import-and-export/iemsoptionscolor) - msOptionsColor import/export services;
- [ieMsProductRemains](https://modstore.pro/packages/import-and-export/iemsproductremains) - msProductRemains import/export services;
- [ieMsSalePrice](https://modstore.pro/packages/import-and-export/iemssaleprice) - msSalePrice import/export services;
- [ieYandexMarket](https://modstore.pro/packages/import-and-export/ieyandexmarket) - Yandex.Market export service for DBS model.

## System events

**msieOnLoadServices** - load services list

Event parameters

| Name | Description                                         |
|------|-----------------------------------------------------|
| msie | Msie class instance                                 |
| mode | service type. Values: import; export                |

**msieOnManagerCustomCssJs** - load scripts

Event parameters

| Name       | Description                    |
|------------|--------------------------------|
| controller | controller class instance      |
| page       | page identifier                |

**msieOnGetServiceFields** - load fields list

Event parameters

| Name    | Description                                          |
|---------|------------------------------------------------------|
| msie    | Msie class instance                                  |
| mode    | service type. Values: import; export                 |
| service | MsIeService class instance                           |
| fields  | fields list                                          |

**msieOnExportStart** - export start

Event parameters

| Name      | Description                                                                |
|-----------|----------------------------------------------------------------------------|
| worker    | class instance                                                             |
| presetId  | preset ID                                                                  |
| skip      | cancel action. Values: true; false. Default false                          |
| cached    | whether export runs in cached mode                                         |

**msieOnExportBeforeFinish** - export completion

Event parameters

| Name      | Description                                                                |
|-----------|----------------------------------------------------------------------------|
| worker    | class instance                                                             |
| presetId  | preset ID                                                                  |
| skip      | cancel action. Values: true; false. Default false                          |
| cached    | whether export runs in cached mode                                         |
| file      | export file                                                                |

**msieOnExportBeforeArchive** - before archiving export data

Event parameters

| Name      | Description                                                                |
|-----------|----------------------------------------------------------------------------|
| worker    | class instance                                                             |
| presetId  | preset ID                                                                  |
| skip      | cancel action. Values: true; false. Default false                          |
| files     | files to archive                                                           |

**msieOnExportFinish** - export end

Event parameters

| Name      | Description                                                                |
|-----------|----------------------------------------------------------------------------|
| worker    | class instance                                                             |
| presetId  | preset ID                                                                  |
| skip      | cancel action. Values: true; false. Default false                          |
| cached    | whether export runs in cached mode                                         |
| file      | export file                                                                |

**msieOnExportPrepareQuery** - prepare export query

Event parameters

| Name      | Description                                                                |
|-----------|----------------------------------------------------------------------------|
| worker    | class instance                                                             |
| presetId  | preset ID                                                                  |
| skip      | cancel action. Values: true; false. Default false                          |
| config    | array with SQL query data                                                  |

**msieOnExportBeforePrepareRow
msieOnExportAfterPrepareRow** - prepare export row data

Event parameters

| Name      | Description                                                                |
|-----------|----------------------------------------------------------------------------|
| worker    | class instance                                                             |
| presetId  | preset ID                                                                  |
| skip      | cancel action. Values: true; false. Default false                          |
| dataType  | record type. Values: keys; fields; records.                                |
| data      | data array                                                                 |

**msieOnExportBeforeWriteRow
msieOnExportAfterWriteRow** - write data to file

Event parameters

| Name      | Description                                                                |
|-----------|----------------------------------------------------------------------------|
| worker    | class instance                                                             |
| presetId  | preset ID                                                                  |
| skip      | cancel action. Values: true; false. Default false                          |
| dataType  | record type. Values: keys; fields; records.                                |
| data      | data array                                                                 |
| options   | options array                                                              |

**msieOnImportStart** - import start

Event parameters

| Name      | Description                                                                |
|-----------|----------------------------------------------------------------------------|
| worker    | class instance                                                             |
| presetId  | preset ID                                                                  |
| skip      | cancel action. Values: true; false. Default false                          |
| files     | import files array                                                         |

**msieOnImportBeforePrepare** - prepare import data

Event parameters

| Name      | Description                                                                |
|-----------|----------------------------------------------------------------------------|
| worker    | class instance                                                             |
| presetId  | preset ID                                                                  |
| skip      | cancel action. Values: true; false. Default false                          |
| data      | import data array                                                          |

**msieOnImportAfterPrepare
msieOnImportBeforePrepare** - prepare import data

Event parameters

| Name      | Description                                                                |
|-----------|----------------------------------------------------------------------------|
| worker    | class instance                                                             |
| presetId  | preset ID                                                                  |
| skip      | cancel action. Values: true; false. Default false                          |
| data      | import data array                                                          |
| record    | prepared import data                                                       |
| action    | action. Values: create; update                                             |

**msieOnBeforeImport** - import data

Event parameters

| Name       | Description                                                                                    |
|------------|-----------------------------------------------------------------------------------------------|
| worker     | class instance                                                                                |
| presetId   | preset ID                                                                                     |
| skip       | cancel action. Values: true; false. Default false                                              |
| data       | import data array                                                                             |
| record     | prepared import data                                                                          |
| action     | action. Values: create; update                                                                |
| tvs        | TV fields array (only for quick update service)                                                |
| poolQuery  | quick update SQL queries array (only for quick update service)                                 |

**msieOnImport** - import data

Event parameters

| Name      | Description                                                                |
|-----------|----------------------------------------------------------------------------|
| worker    | class instance                                                             |
| presetId  | preset ID                                                                  |
| skip      | cancel action. Values: true; false. Default false                          |
| data      | import data array                                                          |
| record    | prepared import data                                                       |
| object    | import object data array                                                   |
| action    | action. Values: create; update                                             |

**msieOnImportNotUnique** - duplicate check

Event parameters

| Name       | Description                                                                |
|------------|----------------------------------------------------------------------------|
| worker     | class instance                                                             |
| presetId   | preset ID                                                                  |
| skip       | cancel action. Values: true; false. Default false                          |
| data       | import data array                                                          |
| record     | prepared import data                                                       |
| field      | check field name. Default "alias"                                          |
| duplicate  | duplicate resource ID                                                      |

**msieOnImportFinish** - import end

Event parameters

| Name      | Description                                                                                                                                          |
|-----------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| worker    | class instance                                                                                                                                      |
| presetId  | preset ID                                                                                                                                           |
| skip      | cancel action. Values: true; false. Default false                                                                                                    |
| ids       | array of object IDs created/updated during import. Present only for MODX resource import services.                                                   |

Note! Any service may add its own parameters to event lists. Check event parameters on add-on pages that add services.

## Migrating from version 1 to 2

Version 2 is not compatible with version 1; you cannot simply upgrade. Best used on new projects.

If you still want to install version 2 on a site with version 1, remove version 1 first and manually delete these version 1 tables from the database:

- msie_cron
- msie_head_alias
- msie_access_price
- msie_presets_fields
