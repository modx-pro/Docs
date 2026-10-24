---
title: MODX3MCP
description: 'MCP-сервер для безопасной работы ИИ-агентов с MODX Revolution 3.x.'
repository: https://github.com/rumata-estor/modx3-mcp
author: rumata-estor
compatibility:
  - modx3
  - php81
---

# MODX3MCP

**MODX3MCP** — компонент для подключения внешних ИИ-агентов к **MODX Revolution 3.x** через Model Context Protocol (MCP).

PHP-компонент предоставляет HTTP API сайта, а отдельный Node.js-клиент передаёт его инструменты в совместимое MCP-приложение через `stdio`.

> [!WARNING]
> **MODX3MCP — не готовый ИИ-агент и не чат внутри MODX.** Компонент подключает сайт к внешнему агенту; сам агент и его пользовательский интерфейс устанавливаются отдельно.

```text
Пользователь → ИИ-агент / MCP-клиент → MODX3MCP → MODX
```

## Возможности версии 1.2.4

Доступны **192 публичных MCP-инструмента**: 81 операция чтения и 111 изменяющих операций. Серверный контракт включает **193 действия** с учётом внутреннего `get_capabilities`.

Среди возможностей:

- управление ресурсами, шаблонами, чанками, сниппетами, плагинами, TV-полями и категориями;
- системные настройки, источники файлов, пакеты и пространства имён;
- пользователи, группы, роли, политики доступа и контексты;
- интеграции с ClientConfig, MIGX, miniShop2, VersionX и VirtualPage, если они установлены;
- граф зависимостей для анализа связей между элементами, сломанных ссылок и потенциально неиспользуемого кода;
- защита от записи по устаревшему состоянию (CAS, `STALE_STATE`) для поддерживаемых операций;
- административная панель с настройками подключения, управлением токеном и группами возможностей.

**Девять языков интерфейса:** русский (`ru`), английский (`en`), испанский (`es`), немецкий (`de`), французский (`fr`), украинский (`uk`), казахский на кириллице (`kk`), нидерландский (`nl`) и польский (`pl`). Переведены панель менеджера и граф зависимостей. [Документация на девяти языках](https://github.com/rumata-estor/modx3-mcp/blob/main/docs/LANGUAGES.md).

## Установка

Установите пакет **modx3mcp-1.2.4-pl.transport.zip**, соответствующий вашей версии MODX:

- [modstore.pro — MODX3MCP](https://modstore.pro/packages/ai/modx3mcp) — установка через менеджер пакетов MODX;
- [релиз 1.2.4 на GitHub](https://github.com/rumata-estor/modx3-mcp/releases/tag/v1.2.4) — транспортный архив для ручной установки.

После **новой установки** компонент выключен по умолчанию. Откройте **Компоненты → MODX MCP**, проверьте настройки безопасности и включите `modxmcp.enabled`. API-токен (`modxmcp.api_token`) генерируется при установке; его просмотр доступен только авторизованному администратору с необходимыми правами.

### Подключение MCP-клиента

На компьютере или сервере с ИИ-приложением необходим **Node.js 18+**. Общий пример конфигурации stdio MCP-клиента (точный формат зависит от приложения):

```json
{
  "mcpServers": {
    "modx": {
      "command": "npx",
      "args": ["-y", "github:rumata-estor/modx3-mcp#v1.2.4"],
      "env": {
        "MODX_MCP_SITE_URL": "https://example.com/assets/components/modxmcp/api.php",
        "MODX_MCP_TOKEN": "СЕКРЕТНЫЙ_ТОКЕН_САЙТА"
      }
    }
  }
}
```

Используйте HTTPS. Токен не следует публиковать или сохранять в репозитории. После подключения начните с операций чтения.

## Обновление

При обычном обновлении установленного пакета `modx3mcp` сохраняются существующие настройки и API-токен.

[Подробная установка и обновление](https://github.com/rumata-estor/modx3-mcp/blob/main/docs/INSTALL.ru.md) · [Безопасность](https://github.com/rumata-estor/modx3-mcp/blob/main/docs/SECURITY.ru.md) · [Все инструменты](https://github.com/rumata-estor/modx3-mcp/blob/main/docs/CAPABILITIES.ru.md) · [Журнал изменений](https://github.com/rumata-estor/modx3-mcp/blob/main/CHANGELOG.ru.md).

## Совместимость

- MODX Revolution 3.x (проверено на 3.2.4-pl);
- PHP 8.1 и новее;
- Node.js 18+ для локального MCP-клиента.

## Исходный код и лицензия

Проект бесплатный, лицензия **MIT**. Автор — Александр Палочкин.

[GitHub: rumata-estor/modx3-mcp](https://github.com/rumata-estor/modx3-mcp) · [Релизы](https://github.com/rumata-estor/modx3-mcp/releases/tag/v1.2.4) · [Документация](https://github.com/rumata-estor/modx3-mcp/blob/main/docs/LANGUAGES.md)
