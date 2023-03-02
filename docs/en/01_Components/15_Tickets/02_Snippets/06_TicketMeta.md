Outputs the information about the present ticket and also allows to vote for a ticket on it's own page.
*Beginning with version 1.4.0 snippet can be used with any MODX resource*

## Parameters of the snippet call

Name		| By default		| Description
----------------|-------------------|----------------------------------------------------------------------
**&getSection**	| 1					| To make a request in DB for getting parent section?
**&getUser**	| 1					| To make a request in DB for getting author's profile?
**&tpl**		| tpl.Tickets.meta	| Design chunck of the information about a ticket. 

## Examples of the call

* Standard snippet call
```
[[!TicketMeta?]]
```

* In order to take a look at all the available standard placeholders
```
[[!TicketMeta? &tpl=``]]
```
