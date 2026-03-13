# Submitting form data

## Setup

Ensure these system settings are set:

- **amoconnector.enabled** — integration is on
- **amoconnector.form_pipeline_id** — pipeline for forms (if empty, `amoconnector.default_pipeline_id` is used)
- **amoconnector.form_status_id** — status for new form leads

## amoConnectorHook hook

Add the `amoConnectorHook` hook to your FormIt or AjaxForm call:

```modx
[[!FormIt?
  &hooks=`email,amoConnectorHook`
  &amoFormName=`callback`
  &validate=`name:required,phone:required,email:email:required`
  &successMessage=`Thank you, your request has been sent!`
]]
```

## Hook parameters

| Parameter | Description |
|-----------|-------------|
| **&amoFormName** | Form name for identification in amoCRM. Used in lead name |
| **&amoLeadName** | Lead name template (overrides `amoconnector.form_lead_name_tpl`) |
| **&amoPipelineId** | Pipeline ID (overrides system setting) |
| **&amoTags** | Comma-separated tags (overrides system setting) |

## Field mapping

The component auto-recognizes common form fields:

- **email** — field name matches `email`
- **phone** — matches `phone`, `tel`, `mobile`
- **name** — matches `name`, `fullname`, `fio`

For custom fields configure mapping in CMP (Field mapping tab, context `form`).

## Behavior

- Hook always returns `true` — amoCRM errors do not block form submit
- If email or phone is present, contact deduplication is applied
- A note with all form fields is added to the lead
- If Scheduler is enabled, send is asynchronous
