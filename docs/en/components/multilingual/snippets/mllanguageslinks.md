# mlLanguagesLinks

Outputs a language switcher on the frontend.

## Parameters

- **&wrapperTpl** — wrapper template
- **&tpl** — main template
- **&mod** — style modifier passed to each link
- **&activeClass** — active class
- **&scheme** — URL scheme (same as `$scheme` in `$modx->makeUrl`)
- **&showActive** — whether to show the current language link

## Placeholders in wrapperTpl

- **&output** — content

## Placeholders in tpl

- **&culture_key** — language key for the link
- **&link** — link
- **&site_url** — site base URL
- **&classes** — link classes
- **&mod** — style modifier from parameter mod
