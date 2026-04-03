# Screenshots for “Manager guide” (ms3ProductSets)

Add PNG/WebP files and reference them from `../admin.md` instead of the “Screenshot placeholder” blockquotes.

You can store binaries next to the Russian docs (same filenames) in `docs/components/ms3productsets/images/` so both locales share assets, or duplicate the folder here.

| Suggested filename | What to capture |
|--------------------|-----------------|
| `admin-menu.png` | MODX manager: **Components → Product sets** |
| `admin-page-overview.png` | Full page: template list + form / category tree |
| `admin-template-list.png` | Template table: ID, name, type, related products |
| `admin-template-form-create.png` | **Create** template form (empty or with hints) |
| `admin-template-form-edit.png` | **Edit** form with sample `name`, `type`, products |
| `admin-product-picker.png` | Product picker / ID field if it is a separate step |
| `admin-apply-category.png` | **Apply to category**: template, tree, “Replace…” checkbox, **Apply** |
| `admin-unbind.png` | **Unbind** template from category |

Recommended width **1200–1600 px**; blur sensitive data if needed.

When the file exists, use:

```markdown
![Short caption](images/admin-menu.png)
```

(Adjust the path if your images live only under `docs/components/ms3productsets/images/`.)
