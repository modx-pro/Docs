---
title: Troubleshooting
---
# Troubleshooting

Common issues with Modx3ProfilerToolbar.

## Toolbar does not appear

**Check:**

1. **modx3profilertoolbar.enabled** and **modx3profilertoolbar.frontend_toolbar** are enabled.
2. You are in the **web** context (not in admin).
3. You are logged into the Manager (toolbar is only available with a session in `mgr` context).
4. The Modx3ProfilerToolbar plugin is enabled and bound to events (OnMODXInit, OnHandleRequest, OnLoadWebDocument, OnWebPagePrerender).
5. Browser console — no errors (e.g. toolbar.js blocked or missing `window.modx3profilertoolbarToolbarData`).

---

## FAQ

### How much overhead does the profiler add?

When profiling is on, each request is measured. Traces are **not stored** (no DB or file writes). Estimate: **under 5%** at 100% sampling. On production at 1–5% sampling impact is usually **under 0.5%**.

### Can it be used on production?

Yes, with limits:

1. Enable **sampling** 1–5%.
2. Toolbar is shown only when logged into Manager — restrict admin access.
3. Disable **modx3profilertoolbar.frontend_toolbar** for normal users or leave it only for developers.

100% profiling on high-load production is not recommended.

### Shared hosting: any limits?

Modx3ProfilerToolbar does not write traces to disk or use the DB for storage — it only injects current-request data into the HTML. Disk space and write permissions are not an issue.

### How to fully disable the profiler?

Set **modx3profilertoolbar.enabled** to **No**. The toolbar will disappear and data collection will stop.

### Does the profiler affect speed when enabled is off?

With **modx3profilertoolbar.enabled = false** the plugin does not start collection. Only a minimal settings check remains; impact is negligible.

### Compatibility with other extras (miniShop3, pdoTools, etc.)?

Yes. The profiler works at the MODX event and call-interception level. Compatible with miniShop3, pdoTools, Fenom and other extras.

### Do I need to change templates or chunks?

No. Install the package and enable the settings. The toolbar is injected automatically before `</body>`.
