# Templates

The template is the whole letter. PostCraft sends the chunk HTML as is, without the site header or footer.

## Chunks

Templates live in chunks named `PostCraft.Name`. After install there are two:

| Chunk | Content |
|---|---|
| `PostCraft.Blank` | greeting, text, links to the web version and unsubscribe |
| `PostCraft.Promo` | the same with a button |

Package upgrades do not overwrite these chunks, but for your own letters a copy is handier: Create copy and a name like `Offer`. PostCraft saves the chunk as `PostCraft.Offer`. A name may contain Latin letters, digits, dot, `_` and `-`.

## Editor

The editor follows the `which_editor` system setting:

| `which_editor` | Editor |
|---|---|
| CKEditor | CKEditor |
| TinyMCE RTE | TinyMCE |
| empty | HTML field |

The preview shows the letter in three widths: phone, tablet, desktop. Refresh preview redraws it after edits, Save template writes the chunk.

## Placeholders

| Placeholder | Value |
|---|---|
| `{{ mirror }}` | web version URL |
| `{{ unsubscribe }}` | unsubscribe page URL |

PostCraft fills them for each recipient. With click tracking on, the other letter links go through the `t.php` redirect.

## Layout tips

- Put styles into the `style` attribute. Mail apps often strip `<style>`.
- Keep the letter within 600–640 px.
- Use full image URLs with `https://`.
