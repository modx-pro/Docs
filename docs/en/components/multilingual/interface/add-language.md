# Adding languages

## Language versions editing interface

![Language editing interface](https://file.modx.pro/files/0/4/f/04ff112b9debbe2a7721ea639087082d.png)

When creating a new language, the template URL (site_url) syntax allows several options:

1. **URL path only**

    For the English version you can set `/eng/` — then all resource URLs in English will look like `http://mydomain.com/eng/resource/full/url.html`

2. **Full URL**

    E.g. `http://mydomain.com/` — you are tied to that address. Different languages can be on different domains, e.g. Russian on `http://mydomainrussia.ru/`, English on `http://mydomainusa.com/`

3. **Placeholders `[[+schema]]` and `[[+base_domain]]`**

    E.g. `[[+schema]]eng.[[+base_domain]]/`, `[[+schema]]english.[[+base_domain]]/`

    This is convenient when languages use subdomains, e.g. `http://mybasedomain.ru/` and `http://eng.mybasedomain.ru/`
