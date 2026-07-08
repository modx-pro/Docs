---
title: Сниппет PremiumAccessFile
description: Скачивание защищённого файла через token и download.php
---
<!-- TODO: translate from docs/components/premiumaccess/snippets/PremiumAccessFile.md -->

# Сниппет PremiumAccessFile

Кнопка **«Скачать»** для файла из защищённого каталога. Без доступа — закрытый блок вместо ссылки.

## Вызов

Путь — как в правиле «файл» в **Компоненты → PremiumAccess → Правила**:

::: code-group

```fenom
{'!PremiumAccessFile' | snippet : ['file' => 'courses/guide.pdf']}
```

```modx
[[!PremiumAccessFile? &file=`courses/guide.pdf`]]
```

:::

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `file` | — | Относительный путь в `premiumaccess.protected_path` |

## Примеры

### Несколько файлов на странице

::: code-group

```fenom
<ul>
  <li>{'!PremiumAccessFile' | snippet : ['file' => 'courses/lesson-1.pdf']}</li>
  <li>{'!PremiumAccessFile' | snippet : ['file' => 'courses/lesson-1.zip']}</li>
</ul>
```

```modx
<ul>
  <li>[[!PremiumAccessFile? &file=`courses/lesson-1.pdf`]]</li>
  <li>[[!PremiumAccessFile? &file=`courses/lesson-1.zip`]]</li>
</ul>
```

:::

### Путь из TV-поля

::: code-group

```fenom
{set $path = $_modx->resource.file_path}
{if $path}
  {'!PremiumAccessFile' | snippet : ['file' => $path]}
{/if}
```

```modx
[[!PremiumAccessFile? &file=`[[*file_path]]`]]
```

:::

### Файл + кнопка покупки, если нет доступа

Свой текст до покупки — проверка в Fenom. В MODX достаточно одного вызова: сниппет сам покажет скачивание или закрытый блок.

::: code-group

```fenom
{if 'courses/guide.pdf' | pa_access : ['target_type' => 'file', 'target_identifier' => 'courses/guide.pdf']}
  {'!PremiumAccessFile' | snippet : ['file' => 'courses/guide.pdf']}
{else}
  <p>Материал доступен после покупки.</p>
  {'!PremiumAccessBuy' | snippet : ['productId' => 1]}
{/if}
```

```modx
[[!PremiumAccessFile? &file=`courses/guide.pdf`]]
```

:::

Свой HTML закрытого файла — chunk **`paFileLocked`**.

## Перед вызовом

1. Файл в **`premiumaccess.protected_path`** (вне публичной папки сайта).
2. Правило «файл» с этим путём и тарифом.
3. У пользователя **активный доступ** к тарифу.

Пошагово: [Защищённые файлы](../frontend/protected-files).

## Что увидит пользователь

| Ситуация | Результат |
| --- | --- |
| Доступ есть | Кнопка `paFileDownload` → одноразовая ссылка |
| Доступа нет | Закрытый блок `paFileLocked` |

Token живёт **`premiumaccess.download_token_ttl`** сек (по умолчанию 300).

## См. также

- [PremiumAccessBuy](PremiumAccessBuy)
- [FAQ](../faq)
