# User permissions setup

For all Tickets features to work, users must be in a group with the appropriate permissions.

## Creating a user group and setting access

Example: create a simple user group:

**Security** → **Access Control** → **New User Group**

- **Name** — *Member*
- **Backend policy** — *(no policy)*

![Creating a user group and setting access - 1](https://file.modx.pro/files/e/f/a/efae3aecf547d5505227980eeecc823a.png)

![Creating a user group and setting access - 2](https://file.modx.pro/files/b/f/8/bf8ec5dfbb088d67dd6ccd287b060c47.png)

Edit your new user group (Member)

![Creating a user group and setting access - 3](https://file.modx.pro/files/d/c/b/dcbda0ccbe5e89866564ed627ca8f566.png)

In the group edit form, open the **Context Access** tab and click **Add context**

- **Context** — *Web*
- **Minimum role** — *Member - 9999*
- **Access policy** — *TicketUserPolicy*

![Creating a user group and setting access - 4](https://file.modx.pro/files/6/d/f/6df88b9651f4131640e2626a27d5eac8.png)

![Creating a user group and setting access - 5](https://file.modx.pro/files/3/a/c/3ac5cdc2de1cdc06828336a4fe5b9330.png)

![Creating a user group and setting access - 6](https://file.modx.pro/files/4/c/1/4c19746ecf47a8cd9784cd3b42f1371f.png)

Access is set; add new users to this group as needed. You can use any auth component; we recommend [HybridAuth][1]

[1]: /en/components/hybridauth/snippets/hybridauth
