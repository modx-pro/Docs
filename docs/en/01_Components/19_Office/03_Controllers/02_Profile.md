This controller is meant for the user's profile editing.
Taking into account that your users enter the site through email, they will have to give some of their data, for example, their name and surname.

It also helps to change email, with an obligatory check.

Name              | By default                     | Description
------------------------|-----------------------------------|------------
**&tplProfile**			| tpl.Office.profile.form			| Chunk for output and editing of a user's profile. 
**&tplActivate**		| tpl.Office.profile.activate		| Chunk for activation letter. 
**&profileFields**		| все основные поля профиля			| List of fields that a user can edit, with commas. You can also indicate maximal length of values after a colon. For example, &profileFields=`username:25,fullname:50,email`.
**&requiredFields**		| username,email,fullname			| List of fields that are obligatory for editing. These fields shoud be filled in for successful profile update. For example, &requiredFields=`username,fullname,email`.
**&HybridAuth**			| 1									| Turn on integration with HybridAuth, if it is installed.
**&providers**			| 									| List of providers of HybridAuthauthorization, with commas. All accessible providers are here {core_path}components/hybridauth/model/hybridauth/lib/Providers/. For example, &providers=`Google,Twitter,Facebook`.
**&providerTpl**		| tpl.HybridAuth.provider			| Chunk for output of a link to authorization or adding the HybridAuth service to an account.
**&activeProviderTpl**	| tpl.HybridAuth.provider.active	| Chunk for output of the icon of the added HybridAuth service.
**&avatarParams**		| {"w":200,"h":200,"zc":0,"bg":"ffffff","f":"jpg"}| JSON line with parameters of avatar convertation with help of строка phpThumb. By default - "{"w":200,"h":200,"zc":0,"bg":"ffffff","f":"jpg"}".
**&avatarPath**			| images/users/						| Directory for saving avatars for users inside MODX_ASSETS_PATH. By default - "images/users/".

*Accurate value of parameter &profileFields by default:*
```
username:50,email:50,fullname:50,phone:12,mobilephone:12,dob:10,gender,address,country,city,state,zip,fax,photo,comment,website,specifiedpassword,confirmpassword
```

This snippet also has its own system setting with a standard id, which is filled in at the first call. 
If a user has no name and **office_profile_page_id** is not empty, this user will be redirected to this page unless they fill in their name. 

That is, after the first authorization through email the user will be sent to fill in their profile and will not be able to exit it until they fill all the gaps.
### Extended fields
Controller helps to edit extended fields of a user's profile, like `extended.some_field`. For this you have to:
1. Show them in the form
```
<label for="extended.some_field">Some field</label>
<input name="extended[some_field]" value="[[+extended.some_field]]" id="extended.some_field">
```
2. Allow input
```
[[!OfficeProfile?
	&profileFields=`username:50,email:50,fullname:50,extended[some_field]`
]]
```
Please notice that `extended` field is an array, and for this reason when sending the form it is indicated
as `extended[some_field]`, whereas when putting placeholders as `extended.some_field`.

### Filtration
As profile editing by the user helps them to save different data in your site's database, 
and their data will be then shown in the admin space and maybe even on the site itself, the data have to be filtrated.

The rules are the following:
1. All HTML tags in all fields, except for `comment`, are obligatorily cut.
2. All fields, except for `comment`, are filtrated by the regular expression that is indicated in system setting **office_sanitize_pcre**.
