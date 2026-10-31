# Troubleshooting

## The snippet outputs nothing

Open the MODX error log and look for `[msCatalyst]` entries. Most often it is a typo in `&facets`, a reserved key or a TV with a different name.

## Selecting a filter reloads the whole page

Check that the call is uncached (`[[!msCatalyst]]`). In the developer tools, look at the response to the request with `mscatalyst=`: it should be JSON. If it is HTML, another snippet or plugin ends the output early.

## New products or new values do not show up

The products were added by an import that the plugin did not see. Clear the index on the "Index" tab or clear the site cache, see [Cache and index](settings#cache-and-index).

## Cards do not look like the theme

Set the theme grid class in `&rowsClass` and the card chunk in `&tpl`.

## A group did not appear

The group has fewer than two values and `&hideSingle` is on. Or the values are empty for every product in the category.

## Values disappear from a group

This is `&hideUnavailable`: values with no products under the current filters are hidden. With `` &hideUnavailable=`0` `` they stay greyed out at the bottom of the list.

## `jQuery is not defined` or `miniShop2 is not defined` in the console

These errors come from miniShop2's own scripts, which `msProducts` adds. msCatalyst does not use jQuery. Add jQuery to the template before those scripts, or turn off the miniShop2 frontend scripts if the page does not need a cart.

## The English version does not show all products

Localizator hides products without a translation into the current language. Add translations or set `` &langStrict=`0` `` to show such products with their original fields.

## A setting is missing on the "Settings" tab

It needs a package that the site does not have. Install the package and clear the site cache.

## Sync stopped and waits for confirmation

A safeguard fired: too many products to unpublish, a large price jump, or the source returned too few rows. Open the change plan, check it and confirm the run. If the source structure changed, approve the new schema version.
