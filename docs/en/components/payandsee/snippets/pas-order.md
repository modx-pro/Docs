# pas.order

Order checkout snippet `pas.order`

![Order checkout snippet](https://file.modx.pro/files/6/e/3/6e3061d943b2f54fd99f5ee3d8e9e56b.png)

## Parameters

| Parameter       | Default     | Description                                                                                                             |
|-----------------|-------------|-------------------------------------------------------------------------------------------------------------------------|
| **tpl**         | `pas.order` | Order chunk                                                                                                             |
| **processRates**| `1`         | Process content cost                                                                                                    |
| **userFields**  |             | Associative array mapping order fields to user profile fields: `"order_field" => "profile_field"`                       |

::: tip
You can use other [pdoTools common parameters][0104]
:::

## Layout

The snippet expects a [Fenom chunk][010103]. It passes 5 variables:

- `order` — order array from user session
  - `delivery` — selected delivery method
  - `payment` — selected payment method
  - `cost` — total order cost
- `deliveries` — available delivery options
- `payments` — payment methods
- `form` — customer form data:
  - `email` — customer email
  - `receiver` — recipient name
  - `phone` — phone
  - `index` — postal code
  - `region` — region
  - `city` — city
  - `street` — street
  - `building` — building
  - `room` — room
  - other values from `&userFields`
- `errors` — form fields with validation errors

### Placeholders

To see all order placeholders, use an empty chunk:

```fenom
<pre>
  {'!pas.order' | snippet: [
    'tpl' => '',
  ]}
</pre>
```

## Creating order

Call this snippet together with others on the checkout page:

```fenom
{'!pas.order' | snippet} <!-- Order form, hidden after creation -->
{'!pas.get.order' | snippet} <!-- Order info, shown after creation -->
```

[0104]: /en/components/pdotools/general-properties
[010103]: /en/components/pdotools/parser
