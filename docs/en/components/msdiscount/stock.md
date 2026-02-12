# Promotions

msDiscount has two discount types: ongoing promotions and one-time coupons.

For promotions you can set:

- Start and end date
- Product groups the discount applies to (or excludes)
- User groups the discount applies to (or excludes)
- Each promotion can be linked to a MODX resource and have an image for xPDO listing

## Algorithm and validation

1. All active promotions are selected (enabled and within date range if set)
2. Then the given user's groups
3. And product groups
4. If no active promotions — check only group discounts and take the maximum
5. If promotions exist — check them in a loop
6. If a promotion **excludes** a group — it does not apply to the current user/product (skip)
7. If user and product are in the required groups — apply the promotion discount
8. Compare with group discounts; if either is higher it overrides the promotion
9. If a promotion has both absolute (currency) and percent discount — convert percent to amount and take the larger
10. Finally take the maximum of all applicable discounts

To test this, the component has a dedicated section:

[![](https://file.modx.pro/files/4/2/8/428ca7a0a4f98785d4ed50fc246ea68as.jpg)](https://file.modx.pro/files/4/2/8/428ca7a0a4f98785d4ed50fc246ea68a.png)

You can enter a product, user, and date to see the resulting discount.

## Outputting user discount

In this component a customer does not have “a discount” in general — only relative to a product and time.

If the user is in a group with a discount, you can output it with a snippet:

```php
<?php
// If &uid=`` is not set, use current user
if (empty($uid)) {$uid = $modx->user->id;}

$pdoFetch = $modx->getService('pdoFetch');
$group = $pdoFetch->getObject('msdUserGroup', array('modUser.id' => $uid), array(
  'loadModels' => 'msdiscount',
  'leftJoin' => array(
    'modUserGroupMember' => array('class' => 'modUserGroupMember', 'on' => 'modUserGroupMember.user_group = msdUserGroup.id'),
    'modUser' => array('class' => 'modUser', 'on' => 'modUser.id = modUserGroupMember.member AND modUser.id = '.$uid),
  ),
  'groupby' => 'msdUserGroup.id',
  'sortby' => 'CAST(`msdUserGroup`.`discount` AS DECIMAL(13,3))',
  'sortdir' => 'desc',
  'select' => 'discount',
));

if (isset($group['discount'])) {
  return $group['discount'];
}
```

The snippet returns the user group's maximum discount or empty.

**Requires pdoTools** (included with miniShop2).
