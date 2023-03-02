Ordering snippet.

[![](https://file.modx.pro/files/4/b/b/4bb767c02e0e7b09ddae5e426b34c7e6s.jpg)](https://file.modx.pro/files/4/b/b/4bb767c02e0e7b09ddae5e426b34c7e6.png)

## Parameters

Parameter           | By default    | Description
--------------------|---------------|---------------------------------------------
**tpl**             | tpl.msOrder   | ordering chunk
**userFields**      |               | Associative array of matching order fields to user profile fields in the format "order field" => "profile field".
**showLog**         |               | To show additional information on snippet operation. For authorized in "mgr" context only.

*Another [pdoTools general parameters][1] may be also used*

## Ordering
Snippet counts on the work with  [chunk Fenom][1]. It transfers 5 variables there:
- **order** - order array from the user session
    - **delivery** - selected delivery method
    - **payment** - selected payment method
    - **cost** - total cost of the order
- **deliveries** - array of available order delivery options 
- **payments** - array of payment methods
- **form** - array with customer data. It may contain:
    - **email** - customer address
    - **receiver** - receiver name
    - **phone** - phone number
    - **index** - postcode
    - **region** - region
    - **city** - city
    - **street** - street
    - **building** - building number
    - **room** - room number
    - there may be another values, given by **&userFields** parameter
- **errors** - array of the form fields, containing mistakes

### Placeholders
When indicating empty chunk you will be able to see all available order placeholders:
```
<pre>[[!msOrder?tpl=``]]</pre>
```

[![](https://file.modx.pro/files/7/3/e/73ea6a3680166bb81a59b0dd55475614s.jpg)](https://file.modx.pro/files/7/3/e/73ea6a3680166bb81a59b0dd55475614.png)

## Order creation
It is recommended to call this snippet in junction with others on ordering page:
```
[[!msCart]] <!-- Cart view and change, hidden after order creation -->

[[!msOrder]] <!-- Ordering form, hidden after order creation  -->

[[!msGetOrder]] <!-- Order information display, showed after order creation -->
```

## Examples
To obtain name of authorized user not from`fullname`, but from `username`:
```
[[!msOrder?
    &userFields=`{"receiver":"username"}`
]]
```


[1]: /en/01_Components/01_pdoTools/03_Parser.md
