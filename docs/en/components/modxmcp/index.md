---
title: MODX MCP
description: 'MCP server for secure AI agent interaction with MODX Revolution 3.x.'
repository: https://github.com/rumata-estor/modx3-mcp
author: rumata-estor
compatibility:
  - modx3
  - php81
---

# MODX MCP

**MODX MCP** is a component for connecting external AI agents to **MODX Revolution 3.x** through the **Model Context Protocol (MCP)**.

It provides agents with a specialized interface for working with resources, templates, chunks, snippets, TVs, system settings, and other MODX entities.

> [!WARNING]
> **MODX MCP is not a ready-made AI agent and does not add artificial intelligence to MODX by itself.**
>
> Installing the component does not add a chat interface to the MODX manager for assigning tasks. The AI agent and user interface are configured separately.

General workflow:

```text
User → AI agent → MODX MCP → MODX
```

## Features

The current version implements more than **180 operations** for reading, analyzing, and modifying MODX data.

Supported areas include:

- resources and site structure;
- templates, chunks, and snippets;
- plugins;
- TVs;
- system settings;
- users and groups;
- media sources;
- packages and extras;
- MIGX;
- miniShop2;
- VersionX;
- VirtualPage.

MODX MCP can also analyze relationships between site elements using a dependency graph.

Potentially dangerous capabilities can be restricted or disabled through the component settings.

## Installation

The recommended method is to install **MODX3MCP** as a regular MODX extra through the package manager from the **modstore.pro** repository.

The transport package can also be downloaded manually from the [project releases on GitHub](https://github.com/rumata-estor/modx3-mcp/releases).

For MODX Revolution 3.x, use:

```text
modx3mcp-1.1.0-pl.transport.zip
```

> [!WARNING]
> The `modxmcp-*.transport.zip` package is intended for MODX Revolution 2.8.x.

On first installation, the component automatically creates the `modxmcp.api_token` API token required to access MODX MCP.

## Compatibility

- MODX Revolution 3.2 or later;
- PHP 8.1 or later.

A separate transport package is available for MODX Revolution 2.8.x.

## Source code

The project is distributed free of charge under the **MIT License**.

Source code and releases:

[github.com/rumata-estor/modx3-mcp](https://github.com/rumata-estor/modx3-mcp)
