# orderPrint

Each document can have 2 templates: the full document template and the product row template. The full document template is required; without it nothing works. The product row template is optional; without it there is simply no products table, which is not needed for every document.

Documents are built from standard MODX elements, so you can use system settings, snippets, output filters, other chunks, and so on in templates.

::: warning
The class used to convert HTML to PDF is limited compared to browser engines. Use the `style` attribute directly on tags, avoid HTML5/CSS3 where possible, and prefer table-based layout when preparing templates.
:::

## Placeholders available in the template by default

Full document template (MiniShop2)

| Placeholder                    | Value                                                                 |
|--------------------------------|-----------------------------------------------------------------------|
| `[[+id]]`                      | order id                                                              |
| `[[+num]]`                     | order number                                                          |
| `[[+createdon]]`               | creation date                                                          |
| `[[+status]]`                  | order status name (new, paid, etc.)                                    |
| `[[+weight]]`                  | total weight of order items                                           |
| `[[+comment]]`                 | order comment                                                          |
| `[[+delivery_cost]]`           | delivery cost                                                          |
| `[[+cart_cost]]`               | cost without delivery                                                 |
| `[[+payment_price]]`           | payment method fee                                                     |
| `[[+cost]]`                    | total cost with delivery                                              |
| `[[+delivery]]`                | delivery method name                                                   |
| `[[+payment]]`                 | payment method name                                                    |
| `[[+payment_description]]`     | payment method description                                             |
| `[[+cart]]`                    | pre-built HTML table of products                                       |
| `[[+manager]]`                 | full name of user printing the document                               |
| `[[+print_date]]`              | current date                                                           |
| `[[+properties.key]]`          | additional order options                                               |
| `[[+address]]`                 | address id                                                             |
| `[[+address.receiver]]`        | buyer name from checkout                                               |
| `[[+address.phone]]`           | buyer phone from checkout                                              |
| `[[+address.room]]`            | buyer apartment/office from checkout                                   |
| `[[+address.building]]`        | buyer building number from checkout                                    |
| `[[+address.street]]`          | buyer street from checkout                                             |
| `[[+address.metro]]`           | buyer metro station from checkout                                      |
| `[[+address.city]]`            | buyer city from checkout                                               |
| `[[+address.region]]`          | region from checkout                                                   |
| `[[+address.index]]`           | buyer postal code from checkout                                        |
| `[[+address.country]]`         | buyer country from checkout                                            |
| `[[+address.comment]]`         | comment from checkout                                                  |
| `[[+address.properties.key]]`  | additional options from checkout (properties)                          |
| `[[+user.id]]`                 | buyer id                                                               |
| `[[+user.fullname]]`           | buyer full name from profile                                           |
| `[[+user.username]]`           | buyer username from profile                                            |
| `[[+user.email]]`              | buyer email from profile                                               |
| `[[+user.phone]]`              | buyer phone from profile                                               |
| `[[+user.mobilephone]]`        | buyer mobile from profile                                              |
| `[[+user.fax]]`                | buyer fax from profile                                                 |
| `[[+user.gender]]`             | buyer gender from profile                                              |
| `[[+user.address]]`            | buyer address from profile                                             |
| `[[+user.zip]]`                | buyer zip from profile                                                 |
| `[[+user.state]]`              | buyer region from profile                                              |
| `[[+user.city]]`               | buyer city from profile                                                |
| `[[+user.country]]`            | buyer country from profile                                             |
| `[[+user.photo]]`              | buyer photo/avatar from profile                                        |
| `[[+user.comment]]`            | buyer account comment                                                  |
| `[[+user.website]]`            | buyer website from profile                                             |
| `[[+user.extended.key]]`       | custom profile fields                                                  |
| `[[+settings.key]]`            | component parameters from the "Parameters" tab                        |

Product row template (MiniShop2)

| Placeholder         | Value                                                |
|---------------------|------------------------------------------------------|
| `[[+id]]`           | product id                                           |
| `[[+price]]`        | product price                                        |
| `[[+count]]`        | quantity                                             |
| `[[+cost]]`         | line total                                           |
| `[[+weight]]`       | weight                                               |
| `[[+pagetitle]]`    | product resource title                               |
| `[[+thumb]]`        | product image thumbnail                              |
| `[[+article]]`      | SKU                                                  |
| `[[+options.key]]`  | product options (color, size, etc.)                  |

Full document template (Shopkeeper)

| Placeholder                  | Value                                                                 |
|-----------------------------|-----------------------------------------------------------------------|
| `[[+id]]`                   | order id                                                              |
| `[[+date]]`                 | creation date                                                         |
| `[[+sentdate]]`             | shipment date                                                         |
| `[[+status]]`               | order status name (new, paid, etc.)                                    |
| `[[+delivery_cost]]`        | delivery cost                                                         |
| `[[+price]]`                 | total with delivery                                                   |
| `[[+currency]]`              | currency                                                              |
| `[[+delivery]]`              | delivery method name                                                  |
| `[[+payment]]`               | payment method name                                                   |
| `[[+cart]]`                  | pre-built HTML table of products                                      |
| `[[+manager]]`               | full name of user printing the document                               |
| `[[+print_date]]`            | current date                                                          |
| `[[+email]]`                 | buyer email                                                           |
| `[[+phone]]`                 | buyer phone                                                           |
| `[[+note]]`                  | order comment                                                         |
| `[[+tracking_num]]`          | tracking number                                                       |
| `[[+contacts.fullname]]`     | buyer name from checkout                                              |
| `[[+contacts.zip]]`          | buyer zip from checkout                                               |
| `[[+contacts.phone]]`        | buyer phone from checkout                                             |
| `[[+contacts.email]]`        | buyer email from checkout                                             |
| `[[+contacts.room]]`         | apartment/office from checkout                                        |
| `[[+contacts.house]]`        | building number from checkout                                         |
| `[[+contacts.corpus]]`       | building block from checkout                                          |
| `[[+contacts.street]]`       | street from checkout                                                  |
| `[[+contacts.metro]]`        | metro station from checkout                                           |
| `[[+contacts.city]]`         | city from checkout                                                    |
| `[[+contacts.state]]`        | country from checkout                                                 |
| `[[+contacts.payment]]`      | payment method name                                                   |
| `[[+contacts.shk_delivery]]` | delivery method name                                                   |
| `[[+contacts.message]]`      | user comment on the order                                             |
| `[[+contacts.key]]`          | any data from contacts in the database                                |
| `[[+user.fullname]]`         | buyer full name from profile                                          |
| `[[+user.username]]`         | buyer username from profile                                           |
| `[[+user.email]]`            | buyer email from profile                                              |
| `[[+user.phone]]`            | buyer phone from profile                                              |
| `[[+user.mobilephone]]`      | buyer mobile from profile                                             |
| `[[+user.fax]]`              | buyer fax from profile                                                |
| `[[+user.gender]]`           | buyer gender from profile                                             |
| `[[+user.address]]`          | buyer address from profile                                            |
| `[[+user.zip]]`              | buyer zip from profile                                                |
| `[[+user.state]]`            | buyer region from profile                                             |
| `[[+user.city]]`             | buyer city from profile                                               |
| `[[+user.country]]`          | buyer country from profile                                            |
| `[[+user.photo]]`            | buyer photo/avatar from profile                                       |
| `[[+user.comment]]`          | buyer account comment                                                 |
| `[[+user.website]]`          | buyer website from profile                                            |
| `[[+user.extended.key]]`     | custom profile fields                                                 |
| `[[+settings.key]]`          | component parameters from the "Parameters" tab                         |

Product row template (ShopKeeper)

| Placeholder                    | Value                            |
|--------------------------------|----------------------------------|
| `[[+id]]`                      | product id                       |
| `[[+price]]` and `[[+tv.price]]` | product price                 |
| `[[+count]]`                   | quantity                         |
| `[[+cost]]`                    | line total                       |
| `[[+link]]`                    | link to product                  |
| `[[+name]]`                    | product resource title           |
| `[[+tv_add.TV_name]]`         | values of TVs attached to the resource |
