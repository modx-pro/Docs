# Word forms

Word forms provide declension for words in SEO text.

## Purpose

Some languages require declension by case:

| Case | Example |
|-------|--------|
| Nominative | phone |
| Genitive | phone's |
| Dative | (to) phone |
| Accusative | phone |
| Instrumental | (with) phone |
| Prepositional | (about) phone |

## Word forms table

| Column | Description |
|---------|----------|
| **Word** | Nominative form |
| **Genitive** | Genitive form |
| **Dative** | Dative form |
| **Accusative** | Accusative form |
| **Instrumental** | Instrumental form |
| **Prepositional** | Prepositional form |
| **Plural** | Plural form |

## Creating a word form

### 1. Click "Create"

### 2. Fill in the forms

| Field | Example |
|------|--------|
| **Word** | phone |
| **Genitive** | phone's |
| **Dative** | phone |
| **Accusative** | phone |
| **Instrumental** | phone |
| **Prepositional** | phone |
| **Plural** | phones |

### 3. Save

## Use in SEO templates

### Case modifiers

| Modifier | Case | Example |
|-------------|-------|--------|
| `|nominative` | Nominative | `{$filters.vendor|nominative}` |
| `|genitive` | Genitive | `{$filters.vendor|genitive}` |
| `|dative` | Dative | `{$filters.vendor|dative}` |
| `|accusative` | Accusative | `{$filters.vendor|accusative}` |
| `|instrumental` | Instrumental | `{$filters.vendor|instrumental}` |
| `|prepositional` | Prepositional | `{$filters.vendor|prepositional}` |
| `|plural` | Plural | `{$filters.vendor|plural}` |

### Examples

**Title template:**

```
Buy {$filters.vendor|accusative}
```

**Result:**

- Input: `Samsung`
- Word form: accusative = Samsung
- Result: `Buy Samsung`

**Description template:**

```
Wide selection of {$filters.vendor|genitive}. Delivery.
```

## Auto declension

If a word form is not in the database, the system may:

1. Use the word unchanged
2. Apply basic language rules (if enabled)

## Programmatic access

```php
$mfilter = $modx->services->get('mfilter');
$wordForms = $mfilter->getWordFormsManager();

// Get form
$genitive = $wordForms->getForm('phone', 'genitive');
// 'phone\'s'

// Check existence
$exists = $wordForms->hasWord('phone');

// Add word form
$wordForms->add([
    'word' => 'laptop',
    'genitive' => 'laptop\'s',
    'dative' => 'laptop',
    'accusative' => 'laptop',
    'instrumental' => 'laptop',
    'prepositional' => 'laptop',
    'plural' => 'laptops'
]);
```

## Tips

1. **Add brands** — Samsung, Apple, Xiaomi often don't decline
2. **Add categories** — phone, tablet, laptop
3. **Check output** — review generated text
4. **Use import** — for large word lists

## Common cases

### Invariable words

For foreign brands, use the same form for all cases:

| Field | Value |
|------|----------|
| Word | Apple |
| Genitive | Apple |
| Dative | Apple |
| ... | Apple |

### Words with alternation

| Field | Value |
|------|----------|
| Word | day |
| Genitive | day's |
| Dative | day |
| Accusative | day |
| Instrumental | day |
| Prepositional | day |
| Plural | days |
