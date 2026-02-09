# Extract templates

## Template definition

An extract template (extract tpl) is a JSON file that describes how Teleport builds a transport package. It has three main parts: `name`, package `attributes`, and a collection of one or more `vehicles`.

### Template name

The template `name` is used when generating the filename of the extracted transport package. For this reason, avoid using `-` or other special characters in the template `name`. Use `_` to separate words if needed.

### Package attributes

::: tip
Available in teleport >=1.2.0*
:::

The `attributes` section lets you set attributes of the transport package produced by the Extract command. For example, you can set package attributes used by the Package Manager when installing an extra, so you can use Teleport to create installable transport packages for any MODX site.

When creating packages for MODX extras, avoid using the transport vehicle classes used internally by Teleport. Do not use core xPDO vehicle classes (`xPDOObjectVehicle`, `xPDOFileVehicle`, `xPDOScriptVehicle`, or `xPDOTransportVehicle`) in your package definition.

Example `attributes` for an installable package (e.g. a MODX extra). This hypothetical `test` component in MODX `core/components/` declares a dependency on **collections** 3.x (for MODX 2.4 package dependencies) and includes the contents of the component's changelog.txt as the `changelog` attribute:

```php
"attributes": {
  "changelog": {
    "sourceType": "fileContent",
    "source": "{+properties.modx.core_path}components/test/changelog.txt"
  },
  "requires": {
    "collections": "~3.0"
  }
},
```

In this example, individual attributes can pull content from files available to the Extract command by setting the attribute value to an object with `sourceType` and `source`, where `sourceType` is `fileContent` and `source` is the full path to the file. Other `sourceType` values may be supported in the future.

### Transport vehicles (Vehicles)

The `vehicles` property describes the collection of xPDO transport vehicles to include in the package. Vehicles can be core xPDOVehicle subclasses, Teleport subclasses, or custom subclasses.

The simple example `settings.tpl.json` included with Teleport describes two xPDOObject vehicles that pack all System settings and context settings from the MODX site:

```php
"vehicles": [
  {
    "vehicle_class": "xPDOObjectVehicle",
    "object": {
      "class": "modSystemSetting",
      "criteria": [
        "1 = 1"
      ],
      "package": "modx"
    },
    "attributes": {
      "preserve_keys": true,
      "update_object": true
    }
  },
  {
    "vehicle_class": "xPDOObjectVehicle",
    "object": {
      "class": "modContextSetting",
      "criteria": [
        "1 = 1"
      ],
      "package": "modx"
    },
    "attributes": {
      "preserve_keys": true,
      "update_object": true
    }
  }
]
```

On [Inject][1], packed object vehicles keep their primary key values and update existing objects in the target site that match by primary key, as defined by the attributes of each vehicle in the collection.

Each vehicle consists of optional `vehicle_package`, `vehicle_class`, and `object` (defining the vehicle contents), and optional vehicle `attributes`. Omit `vehicle_package` when using core xPDOVehicle implementations. The `object` structure is specific to each `vehicle_class`.

#### xPDOFileVehicle

- `source`: absolute path to the file or directory to pack
- `target`: PHP expression evaluated at install time to determine where to unpack the file/directory

#### xPDOObjectVehicle

- `class`: the xPDOObject class to pack in this vehicle
- `criteria`: array or object describing the criteria used to select instances of `class`
- `graph`: object graph to use for related xPDOObjects
- `graphCriteria`: criteria to filter related xPDOObjects defined in `graph`
- `script`: optional script used to create vehicle(s) for this vehicle definition
- `package`: xPDO package name for `class`

#### xPDOScriptVehicle

- `source`: script to run when the vehicle is installed

[1]: https://github.com/modxcms/teleport/blob/master/doc/use/inject.md
