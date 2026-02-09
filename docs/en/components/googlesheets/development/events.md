# Events

The following events are available:

## Import

- **gsOnBeforeImportValues** - fetches data from the sheet before field formatting
  - `values` - array of values
- **gsOnImportValues** - fetches data from the sheet after field formatting
  - `values` - array of values

## Export

- **gsOnBeforeExportValues** - array of values for export before formatting
  - `values` - array of values
- **gsOnExportValues** - array of values for export after formatting
  - `values` - array of values

### Resources

- **gsOnBeforeGetResource** - fetches the list of resources
  - `query` - selection query
- **gsOnGetResource** - resulting list of resources
  - `resources` - array of resources

### Categories

- **gsOnBeforeGetCategories** - fetches the list of categories
  - `query` - selection query
- **gsOnGetCategories** - resulting list of categories
  - `categories` - array of categories

### Products

- **gsOnBeforeGetProducts** - fetches the list of products
  - `query` - selection query
- **gsOnGetProducts** - resulting list of products
  - `products` - array of products

### Orders

- **gsOnBeforeGetOrders** - fetches the list of orders (minishop2)
  - `query` - selection query
- **gsOnGetOrders** - resulting list of orders (minishop2)
  - `orders` - array of orders

### Vendors

- **gsOnBeforeGetVendors** - fetches the list of vendors (minishop2)
  - `query` - selection query
- **gsOnGetVendors** - resulting list of vendors (minishop2)
  - `vendors` - array of vendors

### Users

- **gsOnBeforeGetUsers** - fetches the list of users
  - `query` - selection query
- **gsOnGetUsers** - resulting list of users
  - `orders` - array of users

### Clients

- **gsOnBeforeGetClients** - fetches the list of clients (minishop2)
  - `query` - selection query
- **gsOnGetClients** - resulting list of clients
  - `users` - array of clients

### msOptionsPrice2

- **gsOnBeforeGetOptionsPrice2** - fetches the list of options
  - `query` - selection query
- **gsOnGetOptionsPrice2** - resulting list of options
  - `options` - array of options

### msProductRemains

- **gsOnBeforeGetRemains** - fetches the list of product stock
  - `query` - selection query
- **gsOnGetRemains** - resulting list of product stock
  - `remains` - array of stock

>All events also have a `range` parameter - the sheet name.
