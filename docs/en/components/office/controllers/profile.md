# Profile

This controller is for editing user profile. Since users log in via email, they need to fill in their data, e.g. full name.

It also allows changing email with mandatory verification.

| Name               | Default                                       | Description |
|--------------------|-----------------------------------------------|-------------|
| **&tplProfile**    | `tpl.Office.profile.form`                     | Chunk for displaying and editing user profile. |
| **&tplActivate**   | `tpl.Office.profile.activate`                 | Chunk for activation email. |
| **&profileFields** | all main profile fields                       | Comma-separated list of editable user fields. Max length via colon, e.g. ``&profileFields=`username:25,fullname:50,email` ``. |
| **&requiredFields**| `username,email,fullname`                     | Required fields for update. Must be filled for successful update, e.g. ``&requiredFields=`username,fullname,email` ``. |
| **&HybridAuth**    | `1`                                           | Enable **HybridAuth** integration if installed. |
| **&providers**     |                                               | Comma-separated list of **HybridAuth** providers. Available in `{core_path}components/hybridauth/model/hybridauth/lib/Providers/`, e.g. ``&providers=`Google,Twitter,Facebook` ``. |
| **&providerTpl**   | `tpl.HybridAuth.provider`                     | Chunk for auth link or binding **HybridAuth** service to account. |
| **&activeProviderTpl** | `tpl.HybridAuth.provider.active`           | Chunk for icon of bound **HybridAuth** service. |
| **&avatarParams**  | `{"w":200,"h":200,"zc":0,"bg":"ffffff","f":"jpg"}` | JSON with phpThumb avatar conversion params. |
| **&avatarPath**    | `images/users/`                               | Directory for avatars inside `MODX_ASSETS_PATH`. |

*Default **&profileFields** value:*

```
username:50,email:50,fullname:50,phone:12,mobilephone:12,dob:10,gender,address,country,city,state,zip,fax,photo,comment,website,specifiedpassword,confirmpassword
```

This snippet has its own system setting with standard id, filled on first call.
If the user has no name and **office_profile_page_id** is set, the user is redirected to that page until they fill in their name.

So after first email login, the user is forced to fill the profile and cannot leave until all required fields are filled.

## Extended fields

The controller allows editing extended profile fields like `extended.some_field`. To do this:

1. Output them in the form

    ```modx
    <label for="extended.some_field">Some field</label>
    <input name="extended[some_field]" value="[[+extended.some_field]]" id="extended.some_field">
    ```

2. Allow them for input

    ```modx
    [[!OfficeProfile?
      &profileFields=`username:50,email:50,fullname:50,extended[some_field]`
    ]]
    ```

Note: `extended` is an array, so in form submit use `extended[some_field]`, in placeholders use `extended.some_field`.

## Filtering

Profile editing lets users save data to your site DB; this data is shown in the manager and possibly on the site. All such data is filtered.

Rules:

1. All HTML tags are stripped from all fields except `comment`.
2. All fields except `comment` are filtered by the regex in **office_sanitize_pcre**.
