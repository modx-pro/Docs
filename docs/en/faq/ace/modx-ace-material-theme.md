---
author: Ibochkarev
---
# MODX Ace Material Theme

To make the editor look like Material Theme, do the following:

Go to System settings > namespace `ace` and set:

- Font size: `13px`
- Editor height: `560`
- Invisible characters: `Yes`
- Soft tabs: `No`
- Tab size: `2`
- Editor theme: `tomorrow_night`

Create a plugin `AceMaterialTheme` on event `OnManagerPageBeforeRender`:

```php
<?php
switch ($modx->event->name) {
  case 'OnManagerPageBeforeRender':
    if ($modx->getOption('ace.theme') === 'tomorrow_night') {
      $modx->controller->addHtml("
        <style>
          .ace_editor { font-size: 13px; line-height: 1.5 !important; font-family: 'Menlo Regular', 'Consolas', 'source-code-pro', monospace !important }
          .ace_gutter { color: #666E79 !important }
          .ace_active-line, .ace_gutter-active-line { background-color: #2A2F38 !important }
          .ace_scroller, .ace_gutter { background-color: #272B33 !important }
          .ace_meta.ace_tag { color: #A6B2C0 !important }
          .ace_meta.ace_tag.ace_tag-name{ color: #DF6A73 !important }
          .ace_entity.ace_other.ace_attribute-name { color: #D2945D !important }
          .ace_string { color: #90C378 !important }
        </style>
      ");
    }
    break;
}
```
