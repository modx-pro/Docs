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

Add a script that hides model options whose name **does not start with the selected brand**:

```js
var modelFilter = {
  options: {
    marka: '#mse2_tv\\|marka',
    model: '#mse2_tv\\|model',
  },
  initialize: function () {
    $this = this;
    this.marka = $(this.options['marka']);
    this.model = $(this.options['model']);

    var params = mSearch2.Hash.get();
    if (params['marka'] == undefined) {
      $this.disableModel();
    }
    else {
      $this.enableModel();
    }

    this.marka.find('select').on('change', function () {
      if ($(this).val() != '') {
        $this.model.find('option:first').attr('selected', true);
        $this.enableModel();
      }
      else {
        $this.disableModel();
      }
    })
  },

  disableModel: function () {
    $this.model.find('option[value!=""]').attr('selected', false).attr('disabled', true);
    $this.model.hide();
  },

  enableModel: function () {
    var marka = this.marka.find(':selected').text().replace(/\(.*?\)$/, '').replace(/\s+$/, '');
    var re = new RegExp('^' + marka);
    $this.model.find('option').each(function() {
      var $this = $(this);
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

$(document).ready(function () {
  if ($('#mse2_mfilter').length > 0) {
    modelFilter.initialize();
  }
});
```

Include this script on the page; it does not conflict with the default mSearch2 script.

Result (clickable GIF):

![Dependent filters](https://file.modx.pro/files/4/a/3/4a32ca06fe335d43de148c0faf640e04.gif)
