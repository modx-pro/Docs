---
title: UTM and visibility
description: "A section renders only when the session has the campaign tag. UTM registry and the Visibility dialog. Pro layer"
---

# UTM and visibility

Result: the block is in the HTML only when the session has the tag you set. The UTM registry requires PageBuilder Pro and capability `utm`. Rules that are already published still run in Free.

## Before you start

1. `pagebuilder_inspector_visibility_enabled` is on. While it is off, the inspector has no **Visibility** button.
2. The PageBuilder plugin runs on `OnHandleRequest` in the `web` context. If it does not, put `[[!PageBuilderUtmSession]]` above `[[!PageBuilder]]`.

## Steps

1. In the control panel open the **UTM** tab and add a parameter. The field placeholder is <code v-pre>{{utm:key}}</code>. <!-- markdownlint-disable-line MD033 -->
2. On the section open **Visibility** and set a `utm` rule. It reads `$_SESSION['utm']`.
3. Open the page with the tag in the address, then without it. The section is left out of the HTML when the rule fails.
4. **Save** the resource.

The same dialog sets a list of MODX contexts. In Pro, with the `conditions` flag, `settings.conditions` covers guest, logged-in, and GET checks.

## Example fields

On the **UTM** tab add parameter `campaign`. In section fields the placeholder is <code v-pre>{{utm:campaign}}</code>. <!-- markdownlint-disable-line MD033 -->

On a `cta` section set **Visibility** to a `utm` rule: parameter `campaign`, allowed value `spring`. Open `?campaign=spring`. The section is in the HTML. Open `?campaign=other`. The section is not in the HTML.

## What to check

With the tag, the block is in the page source. Without the tag, the block is absent, not hidden with `display: none`. Turning off the inspector button does not erase rules that are already stored.

## Rollback

Clear the rule in the dialog and save the resource. Turning off the inspector button does not stop rules that are already stored.

## See also

- [Control panel → UTM](../cmp#utm)
- [Frontend output → Visibility](../frontend#section-visibility)
- [PageBuilderUtmSession](../snippets/PageBuilderUtmSession)
