For proper functioning of all the options of the Tickets component, the users must be in the common group with the special rights. 

## Creating user group and setting of the access rights 

The example of creating of simple user group:

**Security** -> **Access control** -> **New user group**

* **Name** - *Member*
* **Backend policy** - *(no policy)*

[![](https://file.modx.pro/files/e/f/a/efae3aecf547d5505227980eeecc823as.jpg)](https://file.modx.pro/files/e/f/a/efae3aecf547d5505227980eeecc823a.png)
[![](https://file.modx.pro/files/b/f/8/bf8ec5dfbb088d67dd6ccd287b060c47s.jpg)](https://file.modx.pro/files/b/f/8/bf8ec5dfbb088d67dd6ccd287b060c47.png)

Edit your new user group (Member)

[![](https://file.modx.pro/files/d/c/b/dcbda0ccbe5e89866564ed627ca8f566s.jpg)](https://file.modx.pro/files/d/c/b/dcbda0ccbe5e89866564ed627ca8f566.png)

Go to the tab **Access to contexts** in the editable group and click **Add context**

* **Context** - *Web*
* *Minimal role** - *Member - 9999*
* **Access policy** - *TicketUserPolicy*

[![](https://file.modx.pro/files/6/d/f/6df88b9651f4131640e2626a27d5eac8s.jpg)](https://file.modx.pro/files/6/d/f/6df88b9651f4131640e2626a27d5eac8.png)
[![](https://file.modx.pro/files/3/a/c/3ac5cdc2de1cdc06828336a4fe5b9330s.jpg)](https://file.modx.pro/files/3/a/c/3ac5cdc2de1cdc06828336a4fe5b9330.png)
[![](https://file.modx.pro/files/4/c/1/4c19746ecf47a8cd9784cd3b42f1371fs.jpg)](https://file.modx.pro/files/4/c/1/4c19746ecf47a8cd9784cd3b42f1371f.png)

Access rights have been set, the only thing left is to add new users in the group. You can use any of the authorization components, but we recommend [HybridAuth][1]

[1]: /en/01_Components/04_HybridAuth/01_Snippets/01_HybridAuth.md
