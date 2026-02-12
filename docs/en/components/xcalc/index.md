---
title: xCalc
description: Universal calculator constructor
logo: https://modstore.pro/assets/extras/xcalc/logo-lg.png
author: gvozdb
modstore: https://modstore.pro/packages/other/xcalc

items: [
  {
    text: 'Snippets',
    items: [
      { text: 'xCalc', link: 'snippets/xcalc' },
    ],
  },
  { text: 'Field types', link: 'field-types' },
  { text: 'jQuery events', link: 'jquery-events' },
  {
    text: 'Cases',
    items: [
      { text: 'Windowsill calculator', link: 'cases/calculator-sill' },
      { text: 'AjaxForm for results output', link: 'cases/ajaxform-results' },
    ],
  },
]
---
# xCalc

xCalc is a universal calculator constructor.

The goal was to build something flexible that could handle most calculator tasks (with customization, of course). I believe this was achieved.

## Features

- Component is built for flexibility and external customization.
- Each calculator uses its own snippet (PHP) for calculations.
- Any calculator can be styled however you want (HTML + CSS + Fenom).
- Fields are not tied to a specific calculator. One field can be used in multiple calculators.
- Fields can have output templates; when attached to a calculator the template can be overridden, same for default values.
- Any field can be marked as required.

## Target audience

Every calculator needs some setup. Each calculator uses its own snippet for calculations. So **the developer setting up a calculator should know some PHP** to describe field interactions in the snippet.
