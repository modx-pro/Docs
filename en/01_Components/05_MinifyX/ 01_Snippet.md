Automate comprassion and chaching of scrips and styles on the site.

## Parameters
Name			| Description
--------------------|-------------------------------------------------------------------------------
**&cacheFolder**	| folder to keep ready files.
**&cssFilename**	| basic name of ready CSS file.
**&cssPlaceholder**	| name of CSS placeholder. It is used if **&registerCss=\`placeholder\`**
**&cssSources**		| list of CSS files for handling. «\*.css», «\*.less» и «\*.scss» can be indicated.
**&forceUpdate**	| disable the check of file updating and every time generate new scripts and styles.
**&jsFilename**		| basic name for ready JS file.
**&jsPlaceholder**	| name of placeholder javascript. It is used if **&registerJs=\`placeholder\`**
**&jsSources**		| list of JS files for handling. «\*.js» и «\*.coffee» can be indicated.
**&minifyCss**		| initiate CSS modification?
**&minifyJs**		| initiate JS modification?
**&registerCss**	| connection of css: can be saved in placeholder «placeholder» or activated in tag <head\> - «default».
**&registerJs**		| connection of javascript: can be saved in placeholder «placeholder», activated in tag <head\> - «startup» or place before closing <body\> - «default».

## Samples
Output of snippet with auto style registration before </head\> and scripts before </body\>:
```
[[MinifyX?
	&minifyCss=`1`
	&minifyJs=`1`
	&registerCss=`default`
	&registerJs=`default`
	&cssSources=`
		assets/templates/himyf/css/normalize.css,
		assets/templates/himyf/css/foundation.css,
		assets/templates/himyf/css/font-awesome.css,
		assets/templates/himyf/css/app.css
	`
	&jsSources=`
		assets/templates/himyf/js/foundation.js
	`
]]
```

Output of snippet work to placeholders **&cssPlaceholder** *on default* `[[+MinifyX.css]]` and **&jsPlaceholder** *on default* `[[+MinifyX.javascript]]`:
```
[[MinifyX? 
	&minifyCss=`1`
	&minifyJs=`1`
	&cssSources=`
		assets/templates/himyf/css/normalize.css,
		assets/templates/himyf/css/foundation.css,
		assets/templates/himyf/css/font-awesome.css,
		assets/templates/himyf/css/app.css
	`
	&jsSources=`
		assets/templates/himyf/js/foundation.js
	`
]]
[[+MinifyX.css]]
[[+MinifyX.javascript]]
```
