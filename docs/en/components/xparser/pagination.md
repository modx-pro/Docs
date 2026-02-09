# Pagination

As of version 1.4.0, pagination on the source site is supported. You can fetch all records, including the oldest.

## Interface

The task window has a "Pagination" tab where you can set:

1. URL with the page parameter,
2. Page range to traverse,
3. Field with excluded pages (comma or space separated). *The package records the pages it has already processed here.*

![Interface](https://file.modx.pro/files/c/5/0/c5063e99805184729cdac698fff24049.png)

## Details

There are some specifics for the first three fields.

### URL with page parameter

You can use 2 parameters in this field:

1. `{$url}` or `[[+url]]` — main task URL,
2. `{$page}` or `[[+page]]` — page number.

### Page range

You can specify *low to high* or *high to low*, which tells the component which direction to traverse.
