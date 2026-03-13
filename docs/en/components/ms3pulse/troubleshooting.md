---
title: Troubleshooting
---
# Troubleshooting

Common issues and how to fix them.

## Charts not showing

**Symptom:** Overview, Dynamics, Products tabs are empty or show an error instead of charts.

**Check:**

1. Is **[VueTools](/en/components/vuetools/)** installed (Vue 3 and PrimeVue for the UI).
2. Does the user have **ms3pulse_view** permission.
3. Open browser console (F12): any 404s (scripts/styles), JavaScript or network errors when calling the connector.

If the connector returns HTML instead of JSON (e.g. login page), check the connector URL in settings and that you are logged into the MODX manager.

## CSV export error

**Symptom:** Clicking "CSV" shows an error or empty/corrupt file.

**Check:**

- Console (F12) and server response: connector may be returning an error or HTML.
- Ensure period and statuses are set and there is data for the period.
- MODX settings and write permissions for temp directories (if the processor writes to disk before sending).

## Custom charts or tables missing

Custom charts (builder) and table set on the Tops/Flops tab are stored in the browser **localStorage**.

They are lost when:

- switching browser or device;
- using incognito (after session close);
- clearing site data in browser settings.

They cannot be restored — add them again.

## Scheduled report not arriving by email

**Check:**

1. Is **ms3pulse_scheduled_export_enabled** on and **ms3pulse_scheduled_export_email** set.
2. Is a task created in [Scheduler](/en/components/scheduler/) with processor `Dashboard/SendScheduledReport` and correct schedule.
3. Is cron (or MODX built-in scheduler) running so Scheduler tasks execute.
4. MODX mail settings (**mail_***): sending from the system works at all (test with another component or a test email).
5. Recipient spam folder and server/mail module logs.

## Presets or filters not responding

- Hard refresh (Ctrl+Shift+R).
- Check console (F12) for JavaScript errors.
- Temporarily disable browser extensions (ad/script blockers).
- Ensure the latest component JS bundle is loaded (check file version and browser cache).
