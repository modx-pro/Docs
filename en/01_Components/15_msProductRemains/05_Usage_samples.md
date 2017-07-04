The extra has many applications. Some of them will be added to this list.

### Displaying products with remains only
If it is necessary to display on the page only the products with remains in at least one combination of properties, call the msProducts snippet as follows:
```
[[!msProducts?
  &leftJoin=`{"Remains":{"class":"msprRemains","on":"msProduct.id = Remains.product_id AND Remains.remains > 0"}}`
  &groupby=`msProduct.id`
  &select=`{"msProduct":"*","Remains":"SUM(Remains.remains) as remains"}`
  &where=`{"Remains.remains:>":"0"}`
]]
```
Or the same code in Fenom:
```
{'!msProducts' | snippet : [
  'leftJoin' => [
    'Remains' => [
      'class' => 'msprRemains',
      'on' => 'msProduct.id = Remains.product_id AND Remains.remains > 0'
    ]
  ],
  'groupby' => 'msProduct.id',
  'select' => [
    'msProduct' => '*',
    'Remains' => 'SUM(Remains.remains) as remains'
  ],
  'where' => [
    'Remains.remains:>' => '0'
  ]
]}
```
In doing so the placeholder `[[+remains]]` will have a total amount of remaining product units recorded (the `getRemains` snippet called without any properties specified will display the same).
