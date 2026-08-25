# Component settings

MODX namespace: `fetchit`. Keys in the table below match the manager (without the area prefix).

## `fetchit.frontend.js`

- Default: `[[+assetsUrl]]js/fetchit.js`

Path to the script with the form handler class. The package also ships `js/fetchit.min.js`. Point the setting at the minified file if you prefer.

The plugin loads the script in `<head>` with `defer`.

## `fetchit.frontend.js.classname`

- Default: `FetchIt`

Name of the global class that creates instances. It lands in the inline `FetchIt.create({...})` call (or your name from the setting).

## `fetchit.frontend.input.invalid.class`

- Default: `is-invalid`

CSS class on `input` / `select` / `textarea` with an error. Several classes go space-separated. The field also gets `aria-invalid="true"`.

## `fetchit.frontend.custom.invalid.class`

- Default: empty

Class on elements with `[data-custom="field_name"]` (wrappers for Bootstrap, Bulma, and similar).

## `fetchit.frontend.default.notifier`

- Default: `false` (`No`)

When enabled, CSS and JS for [Notyf](https://carlosroso.com/notyf/) from `assets/components/fetchit/lib/` load before `fetchit.js`, and the first `create()` sets `FetchIt.Message` on top of Notyf (unless you already defined `Message`).

FetchIt core does not need jQuery. Notyf from the setting is optional and not required if you do not want toasts.
