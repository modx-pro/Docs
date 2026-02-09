# Plugins and customization

## Plugins (adding fields)

easyComm lets you add extra fields to the ecMessage object when the default set is not enough.

The mechanism is the same as in miniShop2 (the one used in 2.2 and earlier).

::: tip
This mechanism is NOT implemented in the MODX 3 version of the component. You cannot add fields this way in MODX 3.
:::

To add fields **field1** and **field2**:

1. Create folder "myplugin" (any name) in two directories:
    - `/core/components/easycomm/plugins/myplugin/`
    - `/assets/components/easycomm/plugins/myplugin/`

2. In `/core/components/easycomm/plugins/myplugin/` create the PHP files:

    ::: code-group

    ```php [index.php]
    <?php

    return array(
      'xpdo_meta_map' => array(
        'ecMessage' => require_once dirname(__FILE__) .'/ecmessage.map.inc.php'
      )
      ,'manager' => array(
        'ecMessage' => MODX_ASSETS_URL . 'components/easycomm/plugins/myplugin/ecmessage.js'
      )
    );
    ```

    ```php [ecmessage.map.inc.php]
    <?php

    return array(
      'fields' => array(
        'field1' => NULL,
        'field2' => NULL,
      )
      ,'fieldMeta' => array(
        'field1' => array(
          'dbtype' => 'varchar'
          ,'precision' => '50'
          ,'phptype' => 'string'
          ,'null' => true
          ,'default' => NULL
        ),
        'field2' => array(
          'dbtype' => 'varchar'
          ,'precision' => '50'
          ,'phptype' => 'string'
          ,'null' => true
          ,'default' => NULL
        )
      )
      ,'indexes' => array(

      )
    );
    ```

    :::

3. In `/assets/components/easycomm/plugins/myplugin/` create the JS file:

    ::: code-group

    ```js [ecmessage.js]
    easyComm.plugin.myplugin = {
      getFields: function (config) {
        return {
          field1: { xtype: 'textfield', fieldLabel: _('ec_message_field1'), anchor: '99%' },
          field2: { xtype: 'textfield', fieldLabel: _('ec_message_field2'), anchor: '99%' },
        }
      }
      ,getColumns: function () {
        return {
          field1: { width:50, sortable:true, name: 'field1' },
          field2: { width:50, sortable:true, name: 'field2' }
        }
      }
    };
    ```

    :::

4. Add the columns to table `modx_ec_messages`.
5. Add lexicon entries `ec_message_field1` and `ec_message_field2` (namespace easycomm).
6. Add the new fields to system settings `ec_message_grid_fields` and `ec_message_window_layout` (see below).
7. Use the new fields on the site, e.g. in the form chunk.
    ::: warning
    Do not forget the ecForm parameter **allowedFields** — add the new fields there.
    :::

## Customizing appearance

System settings control how messages and threads are shown in the manager:

- **ec_message_grid_fields** — fields in the message table
- **ec_message_window_layout** — message edit window layout
- **ec_thread_grid_fields** — fields in the thread table
- **ec_thread_window_fields** — thread edit window fields

List settings are comma-separated, e.g. `thread, subject, date, user_name, user_email, user_contacts, rating, text, reply_author, reply_text, ip`.

**ec_message_window_layout** uses a JSON structure. Default:

```json
{
  "main": {
    "name": "main",
    "columns": {
      "column0": ["user_name", "user_email"],
      "column1": ["date","user_contacts"]
    },
    "fields": ["subject", "rating","text", "published" ]
  },
  "reply": {
    "name": "reply",
    "columns": { },
    "fields": ["reply_author", "reply_text", "notify", "notify_date"]
  },
  "settings": {
    "name": "settings",
    "columns": { },
    "fields": [ "thread",  "ip",  "extended"]
  }
}
```

Here there are three tabs (main, reply, settings); main has two columns. You can define multiple tabs and split fields into columns on a tab.

If you add a tab, add its title to the lexicons as **ec_message_tab_XXX**.
