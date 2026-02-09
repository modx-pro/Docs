# Working with chunks

## Snippet chunks

You can mark any element inside a `data-mpc-snippet` element with `data-mpc-chunk`; its content will be extracted to a separate file. Value: path to the future file relative to the folder in system setting `mpc_path_to_chunks` (default `chunks/`).

```fenom
<div data-mpc-snippet="!Test|preset">
  <div data-mpc-chunk="common/chunk_1.tpl">
    <p>{$placeholder}</p>
  </div>
</div>
```

Processing produces file `chunks/common/chunk_1.tpl` with:

```fenom
<div data-mpc-chunk="common/chunk_1.tpl">
  <p>{$placeholder}</p>
</div>
```

## Include chunks

Chunks can be used not only with snippets but also via the `include` modifier. Add `data-mpc-include` to the element that has `data-mpc-chunk`.

```fenom
<div data-mpc-chunk="common/common_fields.tpl" data-mpc-include="">
  <input class="visually-hidden" type="hidden" name="formName" value="{$formName}">
  <input class="visually-hidden" type="text" name="secret" data-secret="{$secret}" style="position: absolute;opacity:0;z-index: -1;" autocomplete="off">
  <small class="text-danger error_secret"></small>
</div>
```

This adds shared form fields into a chunk. `data-mpc-include` can be used without a value.

## Parsed chunks

You can pass custom data into chunks (parse with your own placeholders). Add `data-mpc-parse` to the element with `data-mpc-chunk`; value: valid JSON or array.

```fenom
<div data-mpc-chunk="common/chunk_3.tpl" data-mpc-parse="['id' => 1]">
  <p>Parsed chunk content — {$id}</p>
</div>
```

When the chunk must be parsed on the frontend (not at pre-parse), use `data-mpc-symbol` with value `##`.
