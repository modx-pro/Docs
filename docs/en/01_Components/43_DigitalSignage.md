### Permissions

The following permissions are added on installation, make sure you add this permissions to the correct policy templates.

|Permission|Description|
|--- |--- |
|digitalsignage|With this policy you can manage slides, broadcasts and media players.|
|digitalsignage_settings|With this policy you can manage slides, broadcasts, media players and slide types.|

### System settings

The following system settings are added on installation.

|Setting|Description|
|--- |--- |
|digitalsignage.context|The key of the Digital Signage context.|
|digitalsignage.export_resource|The ID of `Home` resource within the Digital Signage context.|
|digitalsignage.request_resource|The ID of `Export` resource within the Digital Signage context.|
|digitalsignage.templates|Comma delimited list of Digital Signage templates.|
|digitalsignage.auto_create_sync|Automatically synchronize when no data is available.|
|digitalsignage.media_source|The media source that is used for media files.|
|digitalsignage.request_param_broadcast|GET-parameter to identify the broadcast.|
|digitalsignage.request_param_player|GET-parameter to identify the player.|

### Resources

You can find the following resources in the Digital Signage context.

|Resource|Output after installation|
|--- |--- |
|Home|{"status":400,"message":"No player found with the key ''."}|
|Export|{"slides":[]}|

### Assets

You can find the CSS and Javascript assets within the `digitalsignage` folder in the root.

### Creating your first broadcast

1. Create a player within the Digital Signage component. Example:

    1. **Name**: Hall

    2. **Description**: Screen in the hall

    3. **Resolution**: 1920x1080

    4. **Type**: Television (not mandatory and can be whatever you want)

2. Create slide(s) within in the `Slides` tab.

3. Create a broadcast within in the `Broadcasts` tab. Example:

    5. **Name**: General

    6. **Description**: General broadcast for every workday.

    7. **Template**: DigitalSignage

    8. **Ticker URL**: [https://modx.today/feed.xml](https://modx.today/feed.xml) (a RSS feed URL)

4. Connect slides to your broadcast by right clicking the broadcast in the `Broadcasts` tab.

5. Schedule your broadcast on the media player by right clicking the media player in the `Players` tab.

6. Right click the media player and press `View player` to retrieve the player URL.

