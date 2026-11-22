---
title: UTM and visibility
description: "A section renders only for a campaign tag from the query or the session. UTM registry and the Visibility dialog. Pro layer"
---

# UTM and visibility

Result: the block is in the HTML only when the UTM rule matches. The value comes from the query string, then from `$_SESSION['utm']`.

The snippet and the plugin write the session only when a PHP session is already open. Reading the tag from `$_GET` does not depend on the session.

The UTM registry requires PageBuilder Pro and capability `utm`. Rules that are already published still run in Free.

## Before you start

1. `pagebuilder_inspector_visibility_enabled` is on. While it is off, the inspector has no **Visibility** button.
2. The PageBuilder plugin runs on `OnHandleRequest` in the `web` context. If it does not, put `[[!PageBuilderUtmSession]]` above `[[!PageBuilder]]`.

## Steps

1. In the control panel open the **UTM** tab and add a parameter. The field placeholder is <code v-pre>{{utm:key}}</code>. <!-- markdownlint-disable-line MD033 -->
2. On the section open **Visibility** and set a `utm` rule. It checks `$_GET[parameter]` and `$_GET['utm_' . parameter]` first, then `$_SESSION['utm']`.
3. Open the page with the tag in the address, then without it. The section is left out of the HTML when the rule fails.
4. **Save** the resource.

The same dialog sets a list of MODX contexts. In Pro, with the `conditions` flag, `settings.conditions` covers guest, logged-in, MODX context, and GET. The Context type does not replace the separate section context list (`settings.contexts`).

## Example fields

On the **UTM** tab add parameter `campaign`. In section fields the placeholder is <code v-pre>{{utm:campaign}}</code>. <!-- markdownlint-disable-line MD033 -->

On a `cta` section set **Visibility** to a `utm` rule: parameter `campaign`, allowed value `spring`. Open `?campaign=spring`. The section is in the HTML. Open `?campaign=other`. The section is not in the HTML.

## What to check

With the tag, the block is in the page source. Without the tag, the block is absent, not hidden with `display: none`. Turning off the inspector button does not erase rules that are already stored.

## Rollback

Clear the rule in the dialog and save the resource.

## See also

- [Control panel → UTM](../cmp#utm)
- [Frontend output → Visibility](../frontend#section-visibility)
- [PageBuilderUtmSession](../snippets/PageBuilderUtmSession)
