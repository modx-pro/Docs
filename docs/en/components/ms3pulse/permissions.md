---
title: Permissions
---
# Permissions

Access to ms3Pulse is controlled by MODX permissions and policies.

## Permissions

| Permission | Key | Description |
|-------|------|----------|
| View | `ms3pulse_view` | Access to dashboard and chart builder. Without it the "ms3Pulse" menu item and component pages are unavailable. |
| Save | `ms3pulse_save` | Reserved for save operations (for future use). |

## Policy

The component ships with policy **ms3PulseUserPolicy**, where you can assign these permissions.

## Assigning

1. **Manage → Access Control**.
2. Select or create a role (roles).
3. In policy **ms3PulseUserPolicy** enable **ms3pulse_view** (and **ms3pulse_save** if needed).
4. Assign the policy to the desired users or roles.

Users without `ms3pulse_view` do not see **Components → ms3Pulse** and cannot open dashboard or builder pages.
