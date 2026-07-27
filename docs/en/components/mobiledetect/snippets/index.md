---
title: Snippets
---
# Snippets

MobileDetect ships one snippet for conditional output without Fenom.

| Snippet | Purpose |
| --- | --- |
| [MobileDetect](mobiledetect) | Compare current device type with `&input` |

## When to use the snippet

| Situation | Recommendation |
| --- | --- |
| Templates via pdoTools/Fenom | Fenom modifier `\| mobiledetect` or `{mobile}` blocks |
| Regular MODX templates without Fenom | Snippet `[[!MobileDetect]]` |
| Cached page, simple markup | HTML tags `<standard>` / `<mobile>` |

Details: [Integration](../integration).
