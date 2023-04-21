# getTickets

## Parameters

<!-- FIXED TABLE -->
Name                | B   efau             | Description
--------------------|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------
**&depth**          | 10                   | h depth of the resources from every parent.
**&fastMod**        |                      | If activated - values from DB only will be fitted in the result chunk. All the unprocessed tags MODX, such as filters, snippet output and others - will be cut.
**&include nt**     |                      | Chooses the field «content» from resources.
**&includeTV**      |                      | he list of TV parameters for the selection, with a comma. For example: «action,time» will give the placeholders `[[+action]]` and `[[+time]]`.
**&limit**          |                      | of the result selection.
**&offset**         | 0                    | Result omission from the beginning of the selection.
**&outputSe**       |                      | Optional string for separation of the work result.
**&parents**        |                      | of the categories, with a comma, for search of the results.The selection is limited by the current parent by default. If 0 is set - the selection is not limited.
**&resources**      |                      | The list of the resources, with a comma, for the result output. If resource id begins with a minus, this resource is excluded from the selection.
**&showDelet**      |                      | Shows the deleted resources.
**&showHidden**     |                      | hows resources hidden in the menu.
**&showLog**        |                      | s extra information about snippet’s work. For authorized in the «mgr» context only.
**&showUnpub  she** |                      | Shows unpublished resources.
**&sortby**         | cr ate               | Sorting of selection.
**&sortd**          | DESC                 | Direction of sorting.
**&sortd**          |                      | If it is not empty, snippet will save all the data in placeholder with the very name instead of displaying on the screen.
**&tpl**            | tp     ke      t.row | Design chunk for every result.
**&tvPre**          |                      | Prefix  or TV placeholders, for example «tv.». The parameter is empty by default.
**&user**           |                      | ooses only the elements, created by the very user.
**&where**          |                      | The string coded in JSON with extra conditions of selection.

*\*The list can be extended by the common parameters [pdoTools][1], since Tickets works on this library.*

## Examples

```modx
[[!pdoPage?
  element=`getTickets`
]]

[[!+page.nav]]

```

[1]: /components/01_pdoTools/04_Common_parameters.md
