# Events

## System events

### Indexing events

#### ffOnGetIndexingQuery — fired when building the indexing query; you can modify the query

Parameters: **$configData** (config array), **$query** (xPDOQuery_mysql).

#### ffOnBeforeSetIndexValue — fired when building index data; you can change indexed values

Parameters: **$FlatFilters** (indexing class instance), **$key**, **$value**.

### Filtering events

#### ffOnGetFieldKeys — fired when getting field list for the config page; you can change the list

Parameters: **$type** (config params), **$FlatFilters** (filtering class instance).

#### ffOnBeforeFilter — fired before filtering and hash check; you can change filter values

Parameters: **$configData**, **$FlatFilters**.

#### ffOnAfterFilter — fired after filtering; you can change the list of result IDs

Parameters: **$configData**, **$rids**.

#### ffOnBeforeSetFilterConditions — fired when building the filter query; you can change conditions

Parameters: **$configData**, **$FlatFilters**, **$conditions**.

#### ffOnBeforeGetFilterValues — fired before building filter value list; you can change conditions

Parameters: **$configData**, **$FlatFilters**, **$conditions**.

#### ffOnAfterGetFilterValues — fired after building filter value list; you can change the list

Parameters: **$configData**, **$FlatFilters**, **$output**.

## JavaScript events

#### ff:init — component initialization

Fired after all modules from the JS config are loaded. No params. Subscribe to this event to use **FlatFilters** and its children.

#### ff:after:reset — all filters reset

Fired after all filters are reset. Params: **filters** (DOM collection of filter fields).

#### ff:before:remove — before removing a selected value

Can be cancelled. Params: **eventOptions.target**, **eventOptions.filter**, **eventOptions.type**.

#### ff:before:render — before showing a selected value

Can be cancelled. Params: **eventOptions.key**, **eventOptions.value**, **eventOptions.caption**.

#### ff:values:disabled — when setting disabled filter values

Cannot be cancelled. Params: **type**, **element**, **key**, **data**, **filters**.
