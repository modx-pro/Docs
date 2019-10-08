Outputs the line of the tickets that were created and\\or commented last.

*\*Snippet is caused uncashed.*

## Parameters

Name			| By default				| Description
--------------------|---------------------------|----------------------------------------------------------------------
**&action**			| Comments					| Snippet's mode of work. Comments or Tickets are available.
**&cacheKey**		|  							| Name of the snippet cash. If it is empty - cashing the results will be deactivated.
**&cacheTime**		| 1800						| Cashing time.
**&depth**			| 10						| Search depth of resources from every parent.
**&fastMode**		| 0							| If activated - values from DB only will be fitted in the result chunk. All the unprocessed tags MODX, such as filters, snippet output and others - will be cut.
**&includeContent**	| 0							| Chooses the field «content» from resources.
**&includeTVs**		|  							| The list of TV parameters for the selection, with a comma. For example: «action,time» will give the placeholders `[[+action]]` and `[[+time]]`.
**&limit**			| 10						| Limit of the result selection.
**&offset**			| 0							| Result omission from the beginning of the selection.
**&outputSeparator**|  							| Optional string for separation of the work result.
**&parents**		|  							| List of the categories, with a comma, for search of the results.The selection is limited by the current parent by default. If 0 is set - the selection is not limited.
**&resources**		|  							| The list of the resources, with a comma, for the result output. If resource id begins with a minus, this resource is excluded from the selection.
**&showDeleted**	| 0							| Shows the deleted resources.
**&showHidden**		| 1							| Shows resources hidden in the menu.
**&showLog**		| 0							| Shows extra information about snippet’s work. For authorized in the «mgr» context only.
**&showUnpublished**| 0							| Shows unpublished resources.
**&sortby**			| createdon					| Shows unpublished resources.
**&sortdir**		| DESC						| Direction od selection. 
**&toPlaceholder**	|  							| If it is not empty, snippet will save all the data in placeholder with the very name instead of displaying on the screen.
**&tpl**			| tpl.Tickets.comment.latest| Design chunk for every result.
**&tvPrefix**		|  							| Prefix for TV placeholders, for example «tv.». The parameter is empty by default.
**&user**			|  							| Only chooses the elements, created by this user.
**&where**			|  							| The string coded in JSON with extra conditions of selection.

*\*The list can be extended by the common parameters [pdoTools][1], since Tickets works on this library.*

## Examples

* Output of the last tickets
```
[[!TicketLatest? &limit=`5` &fastMode=`1` &action=`tickets` &tpl=`tpl.Tickets.ticket.latest`]]
```

* Output of the last comments
```
[[!TicketLatest? &limit=`5` &fastMode=`1` &action=`comments` &tpl=`tpl.Tickets.comment.latest`]]
```

[1]: /en/01_Components/01_pdoTools/04_General_settings.md
