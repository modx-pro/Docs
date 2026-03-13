---
title: System settings
---
# System settings

All settings use the prefix `modx3profilertoolbar.` and are in the **modx3profilertoolbar** namespace.

**Where to change:** **Manage → System settings** (in MODX 3: **Settings → System settings**) — filter by namespace `modx3profilertoolbar`.

## Settings table

| Setting | Description | Default | Notes |
|---------|-------------|---------|-------|
| `modx3profilertoolbar.enabled` | Enable or disable profiling | No | Enable on dev/staging; on production use sampling 1–5%. |
| `modx3profilertoolbar.sampling_rate` | Percent of requests to profile (1–100) | `100` | Dev: 100; production: 1–5. |
| `modx3profilertoolbar.frontend_toolbar` | Show Dev Toolbar on frontend (web context) | Yes | For developers only; disable on production. Toolbar visible only when logged into Manager. |
| `modx3profilertoolbar.slow_query_ms` | Threshold (ms) above which SQL is considered slow | `100` | Advisor marks such queries. |
| `modx3profilertoolbar.slow_snippet_ms` | Threshold (ms) for slow snippets | `50` | Advisor marks such snippets. |
| `modx3profilertoolbar.cli_enabled` | Profile CLI requests (cron) | No | Enable only when debugging CLI. |

## Security

The profiler exposes sensitive data: SQL, snippet and plugin names.

- Toolbar is shown only to users logged into the Manager. Restrict admin access.
- On production use sampling 1–5%.

## Environment

| Aspect | Development / Staging | Production |
|--------|------------------------|------------|
| **enabled** | Yes | As needed (with sampling) |
| **sampling_rate** | 100 | 1–5 |
| **frontend_toolbar** | Optional | No |
| **cli_enabled** | When debugging cron | No |
