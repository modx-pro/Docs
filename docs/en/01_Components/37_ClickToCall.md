## ClickToCall

The call widget for mobile devices.

## Features
* Widget show only for mobile device users (use mobile-detect.js to detect mobile).
* Flexible configuration of the widget display time for each day.
* You may to turn off using mobile-detect library in system settings.
* You can use your own JS/CSS files.
## Component settings
[![](https://file.modx.pro/files/2/9/b/29b961716d1558107c1685bbff6feedf.png)](https://file.modx.pro/files/2/9/b/29b961716d1558107c1685bbff6feedf.png)
## ClickToCall snippet parameter
| Name              | Default                                   | Description                                                                 |
| --------------------- | ------------------------------------------------- | ------------------------------------------------------------------------- |
| **&force**         | 0     | Forced widget call   |
| **&phone** | | Phone number for widget, if not specified system setting *clicktocall_phone* will be used|
| **&tpl**     | ClickToCall.tpl   | Widget's chunk |  
| **&useCustomCss** | 0 | Turn off default CSS.  |
| **&useCustomJs**| 0 | Turn off default JS. |

Note: If you turn off default CSS and JS you need manually write your own JS and CSS for widget 
### System settings:
| Name                     | Default                      | Description                                                                         |
| ---------------------------- | ----------------------------------- | -------------------------------------------------------------------------------- |
| **clicktocall_mobiledetect**    | Yes                                | Use mobile-detect.js?. If you are already use mobile-detect.js on your site, turn it off. |
| **clicktocall_phone**    |                                 | Default phone for widget |

NOTE: Snippet must be called non-cached!

### Examples:

For forced widget's call use *&force* parameter:

```
[[!ClickToCall? &force=`1`]]
```
In this case snippet will ignore time frames.

If you want to show different phones one your pages you can use:
```
[[!ClickToCall? &phone=`+79991234567`]]
```

### Result
[![](https://file.modx.pro/files/6/c/1/6c145fac108b67a90d7e604fbe076ba8.png)](https://file.modx.pro/files/6/c/1/6c145fac108b67a90d7e604fbe076ba8.png)