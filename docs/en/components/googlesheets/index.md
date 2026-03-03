---
title: GoogleSheets
description: Import and export products / resources / orders / users
logo: https://modstore.pro/assets/extras/googlesheets/logo-lg.jpg
author: boshnik
modstore: https://modstore.pro/packages/import-and-export/googlesheets

items: [
  { text: 'Authorization', link: 'auth' },
  {
    text: 'Import',
    link: 'import/',
    items: [
      { text: 'Resources', link: 'import/resources' },
      { text: 'Products', link: 'import/products' },
      { text: 'Categories', link: 'import/categories' },
      { text: 'Vendors', link: 'import/vendors' },
      { text: 'msOptionsPrice2', link: 'import/msoptionsprice2' },
      { text: 'msProductRemains', link: 'import/msproductremains' },
    ],
  },
  {
    text: 'Export',
    link: 'export/',
    items: [
      { text: 'Resources', link: 'export/resources' },
      { text: 'Categories', link: 'export/categories' },
      { text: 'Products', link: 'export/products' },
      { text: 'Orders', link: 'export/orders' },
      { text: 'Vendors', link: 'export/vendors' },
      { text: 'Users', link: 'export/users' },
      { text: 'Clients', link: 'export/customers' },
      { text: 'msOptionsPrice2', link: 'export/msoptionsprice2' },
      { text: 'msProductRemains', link: 'export/msproductremains' },
    ],
  },
  { text: 'MIGX', link: 'migx/' },
  {
    text: 'Snippets',
    items: [
      { text: 'GoogleSheets', link: 'snippets/googlesheets' },
      { text: 'GoogleSheetsSaveForm', link: 'snippets/googlesheetssaveform' },
      { text: 'GoogleSheetsFront', link: 'snippets/googlesheetsfront' },
    ],
  },
  {
    text: 'Development',
    link: 'development/',
    items: [
      { text: 'Events', link: 'development/events' },
    ],
  },
]
---
# GoogleSheets

Component for importing and exporting resources, minishop2 products, orders, users, and MIGX tables.
Data can be modified on the fly using events.
