There is no dependent filter work in mFilter2, because all data are selected and shown at once. However, it can be imitated with help of a special javascript.

For example, you have 2 tv parameters: brand and model of a car, where **model name includes brand name**.

Filter output will be like this:
```
[[!mFilter2?
	&parents=`0`
	&filters=`
		tv|marka,
		tv|model
	`
	&aliases=`
		tv|model==model,
		tv|marka==marka,
	`
	&suggestionsRadio=`
		tv|marka,
		tv|model
	`
	&tplFilter.outer.model=`tpl.mFilter2.filter.select`
	&tplFilter.row.model=`tpl.mFilter2.filter.option`
	&tplFilter.outer.marka=`tpl.mFilter2.filter.select`
	&tplFilter.row.marka=`tpl.mFilter2.filter.option`
]]

```
We need *&suggestionsRadio for normal work of select filters*.

Now we write script that will hide car models the name of which **does not begin with the chosen brand**:
```
var modelFilter = {
	// Our selectors
	options: {
		marka: '#mse2_tv\\|marka',
		model: '#mse2_tv\\|model',
	},
	// Initializing the function
	initialize: function() {
		$this = this;
		// We get the elements we need and save them as object properties
		this.marka = $(this.options['marka']);
		this.model = $(this.options['model']);

		// We look into parameters of the address line in search of the chosen brand 
		var params = mSearch2.Hash.get();
		// If there is no such brand there - we turn off models 
		if (params['marka'] == undefined) {
			$this.disableModel();
		}
		// If there is such brand there - we turn on models 
		else {
			$this.enableModel();
		}

		// We add an operator for brand change 
		this.marka.find('select').on('change', function() {
			// If something is selected, we turn on models 
			if ($(this).val() != '') {
				// We switch model to the first point 'Select from the list' 
				$this.model.find('option:first').attr('selected', true);
				// Then we activate block 
				$this.enableModel();
			}
			// If nothing is selected, we turn off models 
			else {
				$this.disableModel();
			}
		})
	},

	// Turning off models function 
	disableModel: function() {
		// We look for all fields witn an unempty value
		$this.model.find('option[value!=""]').attr('selected', false).attr('disabled', true);
		// Then we hide the whole block 
		$this.model.hide();
	},

   // Turning on models function 
	enableModel: function() {
		// We get the car brand
		var marka = this.marka.find(':selected').text().replace(/\(.*?\)$/, '').replace(/\s+$/, '');
		var re = new RegExp('^' + marka);
		// Then we go through all models and check their names
		$this.model.find('option').each(function() {
			var $this = $(this);
			// If the name does not fit, model should be turned off 
			if (!$this.text().match(re) && $this.prop('value') != '') {
				$this.attr('disabled', true);
				$this.hide();
			}
			// If it doesm model should be turned on
			else {
				$this.attr('disabled', false);
				$this.show();
			}
		});
		// Then we show the whole block witn models 
		$this.model.show();
	},
	
}

// Script begins to work when the document is fully downloaded 
$(document).ready(function() {
	// And if on the page there are filters 
	if ($('#mse2_mfilter').length > 0) {
		modelFilter.initialize();
	}
});
```
This script is added to a page separately and does not anyhow prevent standard script mSearch2 from working normally.


That is what you should get as a result (you can click on the GIF):

[![](https://file.modx.pro/files/4/a/3/4a32ca06fe335d43de148c0faf640e04s.jpg)](https://file.modx.pro/files/4/a/3/4a32ca06fe335d43de148c0faf640e04.gif)
