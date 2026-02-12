# Windowsill calculator

Let's reproduce the [example from the demo site][1].
Go to the component page in the backend.

## Step 1

First create fields for the calculator. Go to the "Fields" tab and create them one by one.
**Note:** field values can only be set after adding the field. It must exist in the database to attach values.
**Also**, for `msProducts` fields, instead of values you configure `msProducts` snippet parameters as JSON.

### Width (mm)

- Type: `Number`
- Key: `width`
- Default: `1900`
- Required: `Yes`

### Length (mm)

- Type: `Number`
- Key: `length`
- Default: `500`
- Required: `Yes`

### Material

- Type: `msProducts`
- Key: `material`
- Required: `Yes`
- Values:
  - Parameters (JSON):

```json
{
  "parents": 5,
  "where": {},
  "sortby": {"parent":"ASC", "menuindex":"ASC"},
  "limit": 0
}
```

### Profile

- Type: `Radiobox`
- Key: `chamfer`
- Default: `1500`
- Required: `Yes`
- Values:
  - Profile Zx: `1500`
  - Profile V: `2200`
  - Profile H: `2500`
  - Profile F '3: `3000`
  - Profile E: `1800`
  - Profile B: `1950`
  - Profile A: `180`
  - Profile F: `3500`

### Windowsill mounting

- Type: `Checkbox`
- Key: `mounting`
- Values:
  - Windowsill mounting 200 mm: `1800`
  - Windowsill mounting 300 mm: `2000`
  - Windowsill mounting 400 mm: `2200`
  - Windowsill mounting 500 mm: `2300`
  - Windowsill mounting 600 mm: `2500`

#### Windowsill ear

- Type: `Checkbox`
- Key: `ear`
- Values:
  - Windowsill ear trimming: `300`

## Step 2

Create the calculator object and add fields. On the "Calculators" tab create:

- Title: `Windowsill calculator`
- Snippet: `xcc.results`

The snippet is the calculation results handler.
The component includes `xcc.results` snippet configured for this calculator. You don't need to edit it. If you do, the snippet is well documented.

Save.

## Step 3

Attach the fields to the calculator.
On the new calculator click "Edit", in the window go to the "Fields" tab.
Click "Add" and add the fields one by one. Drag fields to reorder them on the frontend form.

## Step 4

Output the calculator on the frontend:

```fenom
{'!xCalc' | snippet: [
  'id' => 1,
  'tplOuter' => 'tpl.xCalc.outer',
  'tplResults' => 'tpl.xCalc.results',
]}
```

Set `id` to the new calculator ID.
Set `tplResults` to the chunk for calculation results. The included `tpl.xCalc.results` chunk is configured for this calculator.

[1]: http://xcc.h1.gvozdb.ru/index.php?id=18
