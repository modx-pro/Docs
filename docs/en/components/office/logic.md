# How it works

**Office** is a modular system with any number of parts (controllers).
The default set includes 4:

- [Auth][0] — login via email
- [Profile][1] — user profile
- [miniShop2][2] — miniShop2 cabinet
- [RemoteAuth][3] — login on one site via another

The component has a snippet **Office** that calls the chosen controller and passes it all parameters you set.
So settings, chunks and other options depend on the controller and are not hardcoded in the snippet.

Example: all 3 controllers on one page:

```modx
[[!Office? &action=`Auth`]]
[[!Office? &action=`Profile`]]
[[!Office? &action=`miniShop2`]]
```

Standard controllers also have dedicated snippets with preset parameters for convenience. They all call the Office snippet internally.

[![](https://file.modx.pro/files/7/a/6/7a691dcfa2bf7915716c61a3450e487cs.jpg)](https://file.modx.pro/files/7/a/6/7a691dcfa2bf7915716c61a3450e487c.png)

## Controller settings

Everything you pass to the snippet is passed to the controller; the controller decides what it needs.
All standard scripts and styles are registered via system settings, like in miniShop2.

[![](https://file.modx.pro/files/4/4/b/44b3499d03c306d34342bc1e9eb5808ds.jpg)](https://file.modx.pro/files/4/4/b/44b3499d03c306d34342bc1e9eb5808d.png)

For example, the **office_extjs_css** system setting changes the miniShop2 cabinet look.

Old theme (`[[++assets_url]]components/office/css/main/lib/xtheme-modx.old.css`)

[![](https://file.modx.pro/files/9/6/4/9640c1d8fe2742274dba1c0238491001s.jpg)](https://file.modx.pro/files/9/6/4/9640c1d8fe2742274dba1c0238491001.png)

[![](https://file.modx.pro/files/e/d/6/ed6b56bc39dffbb68c8c9425399e17aas.jpg)](https://file.modx.pro/files/e/d/6/ed6b56bc39dffbb68c8c9425399e17aa.png)

New theme (`[[++assets_url]]components/office/css/main/lib/xtheme-modx.new.css`)

[![](https://file.modx.pro/files/5/a/b/5ab2fdf1b80cac13a660e07e319b57ees.jpg)](https://file.modx.pro/files/5/a/b/5ab2fdf1b80cac13a660e07e319b57ee.png)

[![](https://file.modx.pro/files/e/c/4/ec40dca2f9e8e2d620cf2a47ea5a4befs.jpg)](https://file.modx.pro/files/e/c/4/ec40dca2f9e8e2d620cf2a47ea5a4bef.png)

The default theme is chosen by MODX version — 2.2 or higher.

A controller is a PHP class that extends the base Office class.
Classes live in `/core/components/office/controllers/`; you can change any of them by copying, renaming and calling:

```modx
[[!Office?
  &action=`AuthCopy`
]]
```

Office can also register controllers from installed extras.

### Extending with other components

Other extras can register controllers by adding their path to the **office_controllers_paths** system setting.

Use Office::**addExtension**() and Office::**removeExtension**() — same idea as registering component models in MODX.

Example: [modExtra template][6]:

modExtra records in the manager

[![](https://file.modx.pro/files/0/9/a/09acd54474eac1da1a18a45ef417b0c6s.jpg)](https://file.modx.pro/files/0/9/a/09acd54474eac1da1a18a45ef417b0c6.png)

[![](https://file.modx.pro/files/9/9/f/99f389219e64d198d80cf34de3bcc359s.jpg)](https://file.modx.pro/files/9/9/f/99f389219e64d198d80cf34de3bcc359.png)

modExtra records on the frontend

[![](https://file.modx.pro/files/d/6/c/d6c064323f14c85809a852decd09b8a9s.jpg)](https://file.modx.pro/files/d/6/c/d6c064323f14c85809a852decd09b8a9.png)

[![](https://file.modx.pro/files/8/5/5/855490e75c5c93d364af3756d8d2bb92s.jpg)](https://file.modx.pro/files/8/5/5/855490e75c5c93d364af3756d8d2bb92.png)

The registered controller is called by its name, e.g.:

```modx
[[!Office? &action=`modExtra`]]
```

*You don't have to use Ext JS; this is just an example.*

Everything needed to edit modExtra records on the frontend is in [one commit][7].

After registering the controller path, Office loads it from that directory for all related actions.
You don't need to copy anything; you can ship and update your widget inside your package.
This is how [modstore.pro key management][8] and [author sales stats][9] work.

If you use Ext JS in your widgets, note that some [Office UI components][10] (e.g. table with search) are loaded by default and can be extended.

[modExtra][11] is for building MODX extras and already supports Office — a good reference.

[0]: /en/components/office/controllers/auth
[1]: /en/components/office/controllers/profile
[2]: /en/components/office/controllers/orders-history-minishop2
[3]: /en/components/office/controllers/auth-remote
[6]: https://github.com/bezumkin/modExtra/blob/7b238647746fdd3443941a78fccc96ca9e96d76c/_build/resolvers/resolve.office.php
[7]: https://github.com/bezumkin/modExtra/commit/7b238647746fdd3443941a78fccc96ca9e96d76c
[8]: https://modstore.pro/cabinet/keys/
[9]: https://modx.pro/store/5343-statistics-for-authors-supplements/
[10]: https://github.com/bezumkin/Office/tree/master/assets/components/office/js/main/extjs
[11]: https://github.com/bezumkin/modExtra/
