# Dependent filters

mFilter2 does not have built-in dependent filters; all data is loaded at once. You can simulate them with custom JavaScript.

Example: two TV parameters — car brand and model, where **model name includes the brand**.

Filter output:

```modx
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

*&suggestionsRadio is needed for select filters to work correctly.*

Now add a script that hides car model options whose name **does not start with the selected brand**:

```js
var modelFilter = {
  // Our selectors
  options: {
    marka: '#mse2_tv\\|marka',
    model: '#mse2_tv\\|model',
  },
  // Entry point
  initialize: function () {
    $this = this;
    // Get elements and store as object properties
    this.marka = $(this.options['marka']);
    this.model = $(this.options['model']);

    // Check URL params for selected brand
    var params = mSearch2.Hash.get();
    // If none — disable model filter
    if (params['marka'] == undefined) {
      $this.disableModel();
    }
    else {
      $this.enableModel();
    }

    // Listen for brand change
    this.marka.find('select').on('change', function () {
      if ($(this).val() != '') {
        // Set model to first "Select from list" option
        $this.model.find('option:first').attr('selected', true);
        $this.enableModel();
      }
      else {
        $this.disableModel();
      }
    })
  },

  // Disable model filter
  disableModel: function () {
    // Clear selection and disable all options with non-empty value
    $this.model.find('option[value!=""]').attr('selected', false).attr('disabled', true);
    $this.model.hide();
  },

  // Enable model filter
  enableModel: function () {
    var marka = this.marka.find(':selected').text().replace(/\(.*?\)$/, '').replace(/\s+$/, '');
    var re = new RegExp('^' + marka);
    // Walk options and check name
    $this.model.find('option').each(function() {
      var $this = $(this);
      // Name doesn't match — disable this option
      if (!$this.text().match(re) && $this.prop('value') != '') {
        $this.attr('disabled', true);
        $this.hide();
      }
      else {
        $this.attr('disabled', false);
        $this.show();
      }
    });
    $this.model.show();
  },
}

// Run after DOM ready
$(document).ready(function () {
  if ($('#mse2_mfilter').length > 0) {
    modelFilter.initialize();
  }
});
```

Include this script on the page yourself; it does not conflict with the default mSearch2 script.

Expected result (clickable GIF):

![Dependent filters](https://file.modx.pro/files/4/a/3/4a32ca06fe335d43de148c0faf640e04.gif)
