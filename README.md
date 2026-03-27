<!-- markdownlint-disable MD041 MD033 -->

[![Contributors](https://img.shields.io/github/contributors/modx-pro/Docs.svg?style=flat-square)](https://github.com/modx-pro/Docs/graphs/contributors)
![Last Commit](https://img.shields.io/github/last-commit/modx-pro/Docs.svg?style=flat-square)
[![LICENSE](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](./license.txt)

# 📚 Документация MODX Revolution (open source)

Сообщество ведёт документацию по экосистеме **MODX Revolution**: ядро, дополнения и практические гайды.

| 🌐 Сайт | Ссылка |
| --- | --- |
| Русская версия | [docs.modx.pro](https://docs.modx.pro/) |
| English | [docs.modx.pro/en](https://docs.modx.pro/en/) |


## 📑 Содержание

- [Русский](#русский)
- [English](#english)
- [Структура репозитория](#repo-layout)
- [Локальная разработка](#local-dev)
- [Советы контрибьюторам](#contributor-tips)
- [Полезные ссылки](#useful-links)

# Русский

## 🎯 Цель

Любой может внести вклад **без** отдельной регистрации на стороннем сайте и без запроса прав: достаточно оформить **pull request** в этот репозиторий (удобнее всего через **fork** и ветку с изменениями).

Описываем сторонние дополнения и саму систему MODX на **русском** и **английском**. Если хотите вести документацию на другом языке — создайте [issue в репозитории][repository].

## 📝 Формат

- Исходники — [Markdown] на базе [VitePress] (Vue 3).
- Русские страницы: каталог [`docs/`](./docs/).
- Английские страницы: каталог [`docs/en/`](./docs/en/) — по возможности **поддерживайте паритет** с русской версией для одного и того же компонента.

Файлы можно читать на GitHub или собрать сайт у себя (см. [локальную разработку](#local-dev)).

## 🚀 Публикация

Содержимое репозитория **автоматически** отображается на [docs.modx.pro](https://docs.modx.pro/) после принятия изменений в основную ветку.

## 🤝 Для контрибьюторов

Пошаговые инструкции, оформление PR и работа с Git — в разделе [«Начало работы»](https://docs.modx.pro/guide/getting-started) на сайте документации.

---

# English

## 🎯 Purpose

Anyone can contribute **without** signing up elsewhere or asking for access: open a **pull request** (fork + feature branch is the usual workflow).

We document third-party extras and MODX itself in **Russian** and **English**. If you want to maintain docs in another language, please open an [issue][repository].

## 📝 Format

- Sources are [Markdown] built with [VitePress] (Vue 3).
- Russian content: [`docs/`](./docs/).
- English content: [`docs/en/`](./docs/en/) — when possible, **keep RU/EN in sync** for the same component.

You can read files on GitHub or run the site locally (see [Local development](#local-dev)).

## 🚀 Published site

The docs from this repo are published at [docs.modx.pro/en](https://docs.modx.pro/en/) automatically after merges to the default branch.

## 🤝 For contributors

See [Getting started](https://docs.modx.pro/en/guide/getting-started) on the documentation site.

<h1 id="repo-layout">📁 Структура репозитория / Repository layout</h1>

Краткая карта (главное для правок в текстах):

| Путь | Назначение |
| --- | --- |
| [`docs/components/`](./docs/components/) | Документация дополнений (RU) — основной объём материалов |
| [`docs/en/components/`](./docs/en/components/) | То же на английском |
| [`docs/system/`](./docs/system/) | Ядро MODX, xPDO и смежные темы (RU) |
| [`docs/en/system/`](./docs/en/system/) | Системная документация (EN), где есть перевод |
| [`docs/guide/`](./docs/guide/) | Гайды для авторов и обзор проекта (RU) |
| [`docs/en/guide/`](./docs/en/guide/) | Guides (EN) |
| [`docs/faq/`](./docs/faq/) | Вопросы и ответы |
| [`.vitepress/`](./.vitepress/) | Конфигурация VitePress, тема, сайдбары |
| [`plop-templates/`](./plop-templates/) | Шаблоны для генерации новых страниц |
| [`scripts/`](./scripts/) | Вспомогательные скрипты (например, OG-изображения при сборке) |

Новую документацию по компоненту удобно начать командой **`pnpm generate`** — интерактивный [Plop](https://plopjs.com/) предложит шаблон (одна или несколько страниц) и языки RU/EN.

<h1 id="local-dev">🔧 Локальная разработка / Local development</h1>

**Требования:** Node.js **18+**. В репозитории зафиксирован менеджер пакетов **pnpm** (см. `package.json` → `packageManager`).

```bash
pnpm install
pnpm dev
```

Сайт откроется в режиме разработки (точный URL — в выводе терминала, обычно `http://localhost:5173`).

| Команда | Назначение |
| --- | --- |
| `pnpm dev` | Локальный предпросмотр (VitePress dev, hot reload) |
| `pnpm build` | Продакшен-сборка (перед сборкой запускается генерация OG; для Node задан лимит памяти — см. скрипт в `package.json`) |
| `pnpm preview` | Просмотр уже собранного статического сайта |
| `pnpm lint` / `pnpm lint:fix` | Markdownlint по `**/*.md` |
| `pnpm spellcheck` | Проверка орфографии для `docs/**/*.md` **кроме** `docs/en/**` (отдельная проверка английского при необходимости — вручную или своими правилами) |
| `pnpm generate` | Мастер создания заготовок документации (Plop) |

<h1 id="contributor-tips">💡 Советы контрибьюторам / Contributor tips</h1>

- ✅ **Мелкие PR** проще и быстрее ревьюить: одна тема (один компонент, один раздел) вместо «всего сразу».
- ✅ Перед отправкой PR полезно прогнать **`pnpm lint`** (и при правках по-русски — **`pnpm spellcheck`**).
- ✅ Следуйте структуре соседних статей в том же каталоге: front matter, заголовки, внутренние ссылки VitePress.
- ✅ Скриншоты и схемы кладите в соответствующие папки рядом с документацией или в `docs/public/`, если так принято для вашего раздела — ориентируйтесь на существующие статьи.
- ✅ Не знаете, с чего начать? Откройте [Issues][repository-issues] — там можно обсудить идею до большого объёма правок.


<h1 id="useful-links">🔗 Полезные ссылки / Links</h1>

- [Репозиторий GitHub][repository]
- [Issues и обсуждения][repository-issues]
- [VitePress — документация](https://vitepress.dev)
- [Синтаксис Markdown (оригинал)](https://daringfireball.net/projects/markdown/syntax)
- [MODX](https://modx.com/) — официальный сайт CMS
- [MODX Pro / сообщество](https://modx.pro/) — экосистема дополнений и материалов

[repository]: https://github.com/modx-pro/Docs/
[repository-issues]: https://github.com/modx-pro/Docs/issues
[VitePress]: https://vitepress.dev
[Markdown]: https://daringfireball.net/projects/markdown/syntax

<p align="center">
  <a href="https://github.com/modx-pro/Docs/graphs/contributors"><img src="https://contrib.rocks/image?repo=modx-pro/Docs" alt="modx-pro/Docs contributors"></a>
</p>
