# UserInfo modifier

Direct access to data from the *modx_user_attributes* table in the database via output modifiers instead of snippets can be achieved by using the UserInfo modifier.
Select the column you need from the table and specify it as the modifier property:

| Profile field       | Example                                                        |
|---------------------|----------------------------------------------------------------|
| Internal key        | ```[[!+modx.user.id:userinfo=`internalKey`]]```               |
| Username            | ```[[!+modx.user.id:userinfo=`username`]]```                  |
| Full name           | ```[[!+modx.user.id:userinfo=`fullname`]]```                  |
| Role                | ```[[!+modx.user.id:userinfo=`role`]]```                      |
| E-mail              | ```[[!+modx.user.id:userinfo=`email`]]```                    |
| Phone               | ```[[!+modx.user.id:userinfo=`phone`]]```                    |
| Mobile phone        | ```[[!+modx.user.id:userinfo=`mobilephone`]]```              |
| Fax                 | ```[[!+modx.user.id:userinfo=`fax`]]```                      |
| Date of birth       | ```[[!+modx.user.id:userinfo=`dob`:date=`%Y-%m-%d`]]```      |
| Gender              | ```[[!+modx.user.id:userinfo=`gender`]]```                   |
| Country             | ```[[!+modx.user.id:userinfo=`country`]]```                  |
| State               | ```[[!+modx.user.id:userinfo=`state`]]```                   |
| Zip code            | ```[[!+modx.user.id:userinfo=`zip`]]```                      |
| Photo               | ```[[!+modx.user.id:userinfo=`photo`]]```                    |
| Comment             | ```[[!+modx.user.id:userinfo=`comment`]]```                  |
| Password            | ```[[!+modx.user.id:userinfo=`password`]]```                 |
| Temporary password  | ```[[!+modx.user.id:userinfo=`cachepwd`]]```                 |
| Last login          | ```[[!+modx.user.id:userinfo=`lastlogin`:date=`%Y-%m-%d`]]``` |
| This login date     | ```[[!+modx.user.id:userinfo=`thislogin`:date=`%Y-%m-%d`]]``` |
| Login count         | ```[[!+modx.user.id:userinfo=`logincount`]]```                |

`[[!+modx.user.id]]` returns the ID of the logged-in user.

You can replace it with `[[*createdby]]` or another resource field, or even a placeholder that returns the numeric user ID.

Note that the **current** user's profile is already available in MODX by default, so you do not need the UserInfo modifier for it:

- `[[!+modx.user.id]]` - Outputs the user ID
- `[[!+modx.user.username]]` - Outputs the username
- `[[!+modx.user.fullname]]` - Full name
- `[[!+modx.user.dob]]` - Date of birth

::: warning
The **userinfo** filter must be called uncached, otherwise users may see cached data of other users.
:::
