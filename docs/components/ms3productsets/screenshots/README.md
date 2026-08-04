# Скриншоты ms3ProductSets

PNG для [docs.modx.pro](https://docs.modx.pro/components/ms3productsets/). Путь в markdown: `/components/ms3productsets/screenshots/имя.png`.

## Съёмка

```bash
cd /Users/ibochkarev/Sites/project/Extras/ms3ProductSets
npm install
npx playwright install chromium

MSPS_MANAGER_URL='https://project.test/manager/' \
MSPS_MODX_USER=root \
MSPS_MODX_PASSWORD='***' \
MSPS_DOCS_OUTPUT='/Users/ibochkarev/Desktop/Projects/Docs/docs/components/ms3productsets/screenshots' \
npm run docs:screenshots
```

Проверка: `npm run docs:screenshots:check`

URL админки: `?a=index&namespace=ms3productsets`

## Индекс

| Файл | Страницы | Сцена |
| --- | --- | --- |
| `page-overview.png` | admin, interface, flows | Заголовок, типы, таблица шаблонов |
| `types-section.png` | admin, interface | Справочник пяти типов |
| `template-list.png` | admin, interface | Таблица с действиями |
| `template-dialog-new.png` | admin, flows | Диалог «Новая подборка» |
| `template-dialog-edit.png` | admin, flows | Редактирование шаблона |
| `product-picker.png` | admin, flows | MultiSelect товаров |
| `apply-category.png` | admin, interface, flows | Применение к категории |
| `delete-confirm.png` | admin, flows | Подтверждение удаления |
| `settings-namespace.png` | settings, flows | Namespace ms3productsets |

Viewport: 1440×900.
