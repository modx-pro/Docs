---
title: orderPrint
description: Component for preparing and printing documents with order information
logo: https://modstore.pro/assets/extras/orderprint/logo-lg.jpg
modstore: https://modstore.pro/packages/integration/orderprint

items: [
  { text: 'Settings', link: 'setup' },
  { text: 'Templates', link: 'templates' },
]
---
# orderPrint

Component for preparing and outputting documents with order information in PDF format for printing. Useful for printing invoices, warehouse orders, or courier delivery slips. Users can configure document templates and set data available in all templates (e.g. company name, tax ID, or accountant name). OrderPrint **works with both MiniShop2 and Shopkeeper**. The store type can be switched in system settings (default is MiniShop2; when switching, standard document templates may need small changes for correct output).

## Main features

- Works with MiniShop2 and Shopkeeper
- Four common document types out of the box (invoice, bill, warehouse order, courier slip; MiniShop2-oriented; for ShopKeeper replace placeholders in templates)
- Add any number of document types
- Add custom parameters for documents (e.g. company name)
- Uses standard MODX chunks for document templating
- For each document you can set 2 chunks: full document template and order line template; you can also set page orientation (landscape/portrait) and margins
- Any document can be made available to site users for printing from the personal cabinet (or any page where the snippet is called)
- Users can print only their own orders. **Full access is only for "Administrators" group members**
- PDF generation uses [TCPDF](http://www.tcpdf.org/)
- Only basic fonts are included; for other fonts download the archive from [TCPDF](http://www.tcpdf.org/), extract it and copy font files to assets/components/orderprint/pdf/tcpdf/fonts/ on your site
