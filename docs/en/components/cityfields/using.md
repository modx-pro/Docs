# Using domains, subdomains and subdirectories

When you use domains, subdomains or subdirectories for cities, do the following.

1. Add the current city URL to the `base` tag in the `head` block:

    ```modx
    <base href="[[!+cf.current_city.url]]" />
    ```

2. Use this placeholder for the site home link:

    ```modx
    [[!+cf.current_city.url]]
    ```

Then configure the site, hosting and domain DNS records.

## Using subdirectories

The simplest option. No extra hosting or DNS setup is needed. After adding cities with keys, enable **City in subfolders** `cityfields_cityinsubfolder` in the component system settings.

![Option](https://file.modx.pro/files/7/b/6/7b6886e81f7f5ea0df940651be4995d7.png)

## Using subdomains

Create the city list on the component page if you have not already. The key is the future subdomain for the city.

[![City list](https://file.modx.pro/files/d/3/a/d3a1e98fc34c534855ffd1b4a892c1be.png)](https://file.modx.pro/files/d/3/a/d3a1e98fc34c534855ffd1b4a892c1be.png)

Create the corresponding subdomains with your domain registrar and point them to the same IP as the main domain.

Then attach them to the site at the same path as the main site. If you use an SSL certificate, reissue it to include the new subdomains.

[![Domain list](https://file.modx.pro/files/0/5/0/05005e973324cd3d6daeab6041ff4778.png)](https://file.modx.pro/files/0/5/0/05005e973324cd3d6daeab6041ff4778.png)

Enable **City in domain** `cityfields_cityindomain` in the component system settings.

![Option](https://file.modx.pro/files/9/7/2/972ba2f56c3a2e89ed1ea839b36e387e.png)

## Using full domains

Setup is the same as for city subdomains, but use the full domain as the city key.

[![City list](https://file.modx.pro/files/8/b/1/8b18ec03b1ef2863913fd84fbe2c9aca.png)](https://file.modx.pro/files/8/b/1/8b18ec03b1ef2863913fd84fbe2c9aca.png)

## Using domains and subdirectories together

The component allows using both a full domain and a subdirectory for a city. Setup is the same as for full domains; also enable **City in subfolders** `cityfields_cityinsubfolder` in the component system settings.

Use the full domain and subdirectory as the city key when needed.

[![City list](https://file.modx.pro/files/d/d/1/dd126fc279f9ae9885bcc41f68b4fff7.png)](https://file.modx.pro/files/d/d/1/dd126fc279f9ae9885bcc41f68b4fff7.png)
