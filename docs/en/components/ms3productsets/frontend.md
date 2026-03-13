---
title: Frontend integration
---
# Frontend integration

For step-by-step setup see [Site integration](/en/components/ms3productsets/integration).

Quick minimum:

1. Include `mspsLexiconScript`, `productsets.css`, `productsets.js`.
2. Output the block via `ms3ProductSets` or `window.ms3ProductSets.render(...)`.
3. For empty sets control behavior with `hideIfEmpty` and `emptyTpl`.
4. For VIP blocks set `ms3productsets.vip_set_1` and use `type=vip`.
