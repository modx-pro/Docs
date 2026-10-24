---
title: MODX2MCP
description: 'MCP server for secure AI agent interaction with MODX Revolution 2.8.x.'
repository: https://github.com/rumata-estor/modx3-mcp
author: rumata-estor
compatibility:
  - modx2
---

# MODX2MCP

**MODX2MCP** connects external AI agents to **MODX Revolution 2.8.x** using the Model Context Protocol (MCP).

The PHP component provides the site's HTTP API, while a separate local Node.js client exposes the available tools to MCP-compatible applications over `stdio`.

> [!WARNING]
> **MODX2MCP is not a ready-to-use AI agent or an embedded MODX chat.** The component connects the website to an external agent; the agent and its user interface must be configured separately.

```text
User → AI agent / MCP client → MODX2MCP → MODX
```

## Features in version 1.2.4

The component offers **192 public MCP tools**: 81 read-only operations and 111 mutations. The server contract includes **193 actions** when the internal `get_capabilities` action is counted.

Supported areas include:

- resources, templates, chunks, snippets, plugins, TVs and categories;
- system settings, media sources, packages and namespaces;
- users, groups, roles, access policies and contexts;
- integration with ClientConfig, MIGX, miniShop2, VersionX and VirtualPage when installed;
- a dependency graph to inspect references, broken links and potentially unused code;
- stale-state protection (CAS, `STALE_STATE`) for supported write operations;
- a manager dashboard for endpoint details, token handling, settings and capability groups.

**Nine manager UI languages:** Russian (`ru`), English (`en`), Spanish (`es`), German (`de`), French (`fr`), Ukrainian (`uk`), Kazakh Cyrillic (`kk`), Dutch (`nl`) and Polish (`pl`). The manager dashboard and dependency graph are translated. See the [nine-language documentation index](https://github.com/rumata-estor/modx3-mcp/blob/main/docs/LANGUAGES.md).

## Installation

Install **modx2mcp-1.2.4-pl.transport.zip**, matching your MODX version:

- [modstore.pro — MODX2MCP](https://modstore.pro/packages/ai/modx2mcp) — install using the MODX package manager;
- [GitHub release 1.2.4](https://github.com/rumata-estor/modx3-mcp/releases/tag/v1.2.4) — download the transport archive for manual installation.

On a **fresh installation**, the component is disabled by default. Open **Extras / Components → MODX MCP**, review its security settings and enable `modxmcp.enabled`. The API token (`modxmcp.api_token`) is generated during installation; only appropriately authorized administrators can reveal it.

### Connect an MCP client

The machine running the AI application needs **Node.js 18+**. Example stdio MCP configuration (the exact format depends on the client application):

```json
{
  "mcpServers": {
    "modx": {
      "command": "npx",
      "args": ["-y", "github:rumata-estor/modx3-mcp#v1.2.4"],
      "env": {
        "MODX_MCP_SITE_URL": "https://example.com/assets/components/modxmcp/api.php",
        "MODX_MCP_TOKEN": "YOUR_SITE_PRIVATE_TOKEN"
      }
    }
  }
}
```

Use HTTPS and keep the token secret. Start with authenticated read-only operations after connecting.

## Upgrading

If a MODX 2 website still has an older package with the identity `modxmcp`, switching to `modx2mcp` is **not a normal in-place upgrade**. Back up the configuration and API token and follow the [migration guide](https://github.com/rumata-estor/modx3-mcp/blob/main/docs/INSTALL.md). Do not install both package identities side by side.

[Complete installation guide](https://github.com/rumata-estor/modx3-mcp/blob/main/docs/INSTALL.md) · [Security](https://github.com/rumata-estor/modx3-mcp/blob/main/docs/SECURITY.md) · [Tool catalog](https://github.com/rumata-estor/modx3-mcp/blob/main/docs/CAPABILITIES.md) · [Changelog](https://github.com/rumata-estor/modx3-mcp/blob/main/CHANGELOG.md).

## Compatibility

- MODX Revolution 2.8.x;
- PHP 8.1 or later;
- Node.js 18+ for the local MCP client.

## Source code and license

Free and open source under the **MIT License**. Author: Alexander Palochkin.

[GitHub: rumata-estor/modx3-mcp](https://github.com/rumata-estor/modx3-mcp) · [Releases](https://github.com/rumata-estor/modx3-mcp/releases/tag/v1.2.4) · [Documentation](https://github.com/rumata-estor/modx3-mcp/blob/main/docs/LANGUAGES.md)
