---
title: MODX2MCP
description: 'MCP server for secure AI agent interaction with MODX Revolution 2.8.x.'
repository: https://github.com/rumata-estor/modx3-mcp
author: rumata-estor
compatibility:
  - modx2
---

# MODX2MCP

**MODX2MCP** is a component for connecting external AI agents to **MODX Revolution 2.8.x** through the **Model Context Protocol (MCP)**.

It provides agents with a specialized interface for working with resources, templates, chunks, snippets, TVs, system settings, and other MODX entities.

> [!WARNING]
> **MODX2MCP is not a ready-made AI agent and does not add artificial intelligence to MODX by itself.**
>
> Installing the component does not add a chat interface to the MODX manager for assigning tasks. The AI agent and user interface are configured separately.

General workflow:

```text
User → AI agent → MODX2MCP → MODX
```

## Features

Version **1.2.0** provides **192 operations**: 81 read operations and 111 write operations.

Supported areas include:

- resources and site structure;
- templates, chunks, and snippets;
- plugins;
- TVs;
- system settings;
- users and groups;
- access policies and policy templates;
- resource groups and their members;
- media sources;
- packages and extras;
- ClientConfig settings;
- MIGX;
- miniShop2;
- VersionX;
- VirtualPage.

MODX2MCP can also analyze relationships between site elements using a dependency graph.

Version 1.2.0 adds protection against writes based on stale site state. An agent can read the current project revision, and before a change MODX2MCP verifies that the state has not changed. If another agent or process has already modified the site, the operation is rejected with `STALE_STATE` instead of overwriting newer changes.

Potentially dangerous capabilities can be restricted or disabled through the component settings.

## Installation

The transport package can be downloaded from the [project releases on GitHub](https://github.com/rumata-estor/modx3-mcp/releases/tag/modx2-v1.2.0).

For MODX Revolution 2.8.x, use:

```text
modx2mcp-1.2.0-pl.transport.zip
```

Install the package in the usual way through the MODX package manager.

On first installation, the component automatically creates the `modxmcp.api_token` API token required to access MODX2MCP.

## Compatibility

- MODX Revolution 2.8.x.

## Source code

The project is distributed free of charge under the **MIT License**.

Source code and releases:

[github.com/rumata-estor/modx3-mcp](https://github.com/rumata-estor/modx3-mcp)
