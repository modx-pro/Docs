# Working with snippets

## Presets

If you often build sites on MODX Revolution, you may reuse the same snippets with the same parameters. Presets are files that store parameter sets keyed by name. File name: snippet name in lowercase + `.inc.php`. Example: `pdoresources.inc.php`

```php
return [
  'services' => [
    'parents' => 10,
    'includeTVs' => 'img',
    'tvPrefix' => '',
    'limit' => 0,
    'tpl' => '@FILE chunks/pdoresources/services/item.tpl',
  ]
];
```

## Markup

Snippet markup uses these attributes:

- `data-mpc-snippet` — which snippet to call and how (cached or not); use `|` for the preset key.
- `data-mpc-symbol` — use when the snippet must run at pre-parse stage, not on frontend request; value `{` (add a space for IDE syntax highlighting).
- `data-mpc-chunk` — path to the chunk file (relative to `core/chunks`).

Simple example:

```fenom
<div data-mpc-chunk="pdoresources/services/item.tpl" class="col-md-4 sppb-col-md-4">
  <div id="sppb-addon-1507906826100" class="clearfix">
    <div class="sppb-addon sppb-addon-module ">
      <div class="sppb-addon-content">
        <div class="custom">
          <h3 class="sppb-feature-box-title">{$menutitle?:$pagetitle}</h3>
          <a href="{$uri}"><img src="{$img}" alt=""/></a>
          <p>{$introtext}</p>
          <a href="{$uri}" class="sppb-btn sppb-btn-default sppb-btn-rounded">More</a>
        </div>
      </div>
    </div>
  </div>
</div>
```

Placeholders inside the chunk you set yourself.

For nested chunks (e.g. `pdoMenu`), add `data-mpc-remove="1"` to nested chunk elements so the script removes them after processing. Example:

```fenom
<div data-mpc-unwrap="1" data-mpc-snippet="pdoMenu|main" data-mpc-symbol="{ ">
  <ul data-mpc-chunk="pdomenu/main/tplOuter.tpl" class="sp-megamenu-parent menu-slide-down hidden-sm hidden-xs">
    {$wrapper}
    <li class="sp-menu-item {$classnames}" data-mpc-remove="1" data-mpc-chunk="pdomenu/main/tpl.tpl">
      <a href="{$link}">{$link_attributes} {$menutitle}</a>
    </li>
    <li data-mpc-remove="1" data-mpc-chunk="pdomenu/main/tplParentRow.tpl" class="sp-menu-item sp-has-child {$classnames}">
      <a href="{$link}">{$link_attributes} {$menutitle}</a>
      <div class="sp-dropdown sp-dropdown-main sp-menu-right" style="width: 240px;">
        <div class="sp-dropdown-inner">
          {$wrapper}
          <ul data-mpc-remove="1" data-mpc-chunk="pdomenu/main/tplInner.tpl" class="sp-dropdown-items">
            {$wrapper}
          </ul>
        </div>
      </div>
    </li>
  </ul>
</div>
```
