# Conditional output modifiers

## `if`, `input` {#if}

Passes arbitrary text as input to the next modifier.

```modx
[[*id:input=`[[+placeholder]]`:is=`1`:then=`Yes`:else=`No`]]
```

## `or`

Combines multiple modifiers with **OR**.

```modx
[[+numbooks:is=`5`:or:is=`6`:then=`There are 5 or 6 books`:else=`Not sure how many books`]]
```

## `and`

Combines multiple modifiers with **AND**.

```modx
[[+numbooks:gt=`5`:and:lt=`10`:then=`There are 5 to 10 books`:else=`Books are either less than 5 or more than 10`]]
```

## `isequalto`, `isequal`, `equalto`, `equals`, `is`, `eq` {#is}

Compares the passed value with the set value. If they match, outputs `then`; otherwise `else`.

```modx
[[+numbooks:isequalto=`5`:then=`There are 5 books`:else=`Not sure how many books`]]
```

## `notequalto`, `notequals`, `isnt`, `isnot`, `neq`, `ne` {#isnot}

Compares the passed value with the set value. If they do **not** match, outputs `then`; otherwise `else`.

```modx
[[+numbooks:notequalto=`5`:then=`Not sure how many books`:else=`There are 5 books`]]
```

## `greaterthanorequalto`, `equalorgreaterthen`, `ge`, `eg`, `isgte`, `gte` {#eq}

Same, but condition is "Greater than or equal".

```modx
[[+numbooks:gte=`5`:then=`There are 5 books or more`:else=`There are fewer than five books`]]
```

## `isgreaterthan`, `greaterthan`, `isgt`, `gt` {#gt}

Same, but condition is "Strictly greater than".

```modx
[[+numbooks:gt=`5`:then=`There are more than five books`:else=`There are 5 books or fewer`]]
```

## `equaltoorlessthan`, `lessthanorequalto`, `el`, `le`, `islte`, `lte` {#el}

Same, but condition is "Less than or equal".

```modx
[[+numbooks:lte=`5`:then=`There are 5 books or fewer`:else=`There are more than five books`]]
```

## `islowerthan`, `islessthan`, `lowerthan`, `lessthan`, `islt`, `lt` {#lt}

Same, but condition is "Strictly less than".

```modx
[[+numbooks:lte=`5`:then=`There are fewer than five books`:else=`There are 5 books or more`]]
```

## `hide`

Hides the element if the condition is true.

```modx
[[+numbooks:lt=`1`:hide]]
```

## `show`

Shows the element if the condition is true.

```modx
[[+numbooks:gt=`0`:show]]
```

## `then`

Used to build conditions.

```modx
[[+numbooks:gt=`0`:then=`Books in stock!`]]
```

## `else`

Used to build conditions (together with [then](#then)).

```modx
[[+numbooks:gt=`0`:then=`Books in stock!`:else=`Sorry, all sold out.`]]
```

## `memberof`, `ismember`, `mo` {#memberof}

Checks whether the user is a member of the specified user group.

```modx
[[!+modx.user.id:memberof=`Administrator`]]
```
