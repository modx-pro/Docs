**Office** extra is a modular system in which there can be any number of parts (controllers). 
There are 4 of them in the standard set: 

* [Auth][0] - authorization through email 
* [Profile][1] - work with a user's profile 
* [miniShop2][2] - output of the user account MS2
* [RemoteAuth][3] - authorization on one site through another 

The component itself has snippet **Office**, which calls for the needed controller and sends all the indicated parameters to it. 
That is, all possible settings, chunks and other properties depend on the controller and are not written into the snippet. 
For example, here is a call for all 3 controllers at once on one page. 
```
[[!Office?&action=`Auth`]]
[[!Office?&action=`Profile`]]
[[!Office?&action=`miniShop2`]]
```
For standard controllers there are special snippets with parameters written into them for the sake of convenience. For work they still call for Office snippet. 

[![](https://file.modx.pro/files/7/a/6/7a691dcfa2bf7915716c61a3450e487cs.jpg)](https://file.modx.pro/files/7/a/6/7a691dcfa2bf7915716c61a3450e487c.png)

### Setting the controllers 

Everything you tell the snippet is sent to the controller. It makes decisions about what is useful for it itself.
All standard scripts and styles that are necessary for work are registered through system settings, like in [miniShop2][5].

[![](https://file.modx.pro/files/4/4/b/44b3499d03c306d34342bc1e9eb5808ds.jpg)](https://file.modx.pro/files/4/4/b/44b3499d03c306d34342bc1e9eb5808d.png)

For example, you can change the way the user account miniShop2 looks through system setting **office_extjs_css**

The old look (`[[++assets_url]]components/office/css/main/lib/xtheme-modx.old.css`)

[![](https://file.modx.pro/files/9/6/4/9640c1d8fe2742274dba1c0238491001s.jpg)](https://file.modx.pro/files/9/6/4/9640c1d8fe2742274dba1c0238491001.png)
[![](https://file.modx.pro/files/e/d/6/ed6b56bc39dffbb68c8c9425399e17aas.jpg)](https://file.modx.pro/files/e/d/6/ed6b56bc39dffbb68c8c9425399e17aa.png)

The new look (`[[++assets_url]]components/office/css/main/lib/xtheme-modx.new.css`)

[![](https://file.modx.pro/files/5/a/b/5ab2fdf1b80cac13a660e07e319b57ees.jpg)](https://file.modx.pro/files/5/a/b/5ab2fdf1b80cac13a660e07e319b57ee.png)
[![](https://file.modx.pro/files/e/c/4/ec40dca2f9e8e2d620cf2a47ea5a4befs.jpg)](https://file.modx.pro/files/e/c/4/ec40dca2f9e8e2d620cf2a47ea5a4bef.png)

By default the appearance is chosen due to what version of MODX is installed - 2.2 or older.


Generally speaking, controller is an ordinary php class, which inherits standard class from Office.
All classes are located in directory `/core/components/office/controllers/`. Due to the modular architecture you can easily change any one of them. 

You should just make a copy, rename it and call for it: 
```
[[!Office?
    &action=`AuthCopy`
]]
```

You can also register controllers from the addons you download in Office. 
### Extension by extra components 

Extra components can register their own controllers by adding their directory to system parameter **office_controllers_paths**.

To make this work easier it is better to use methods of Office::**addExtenstion**() и Office::**removeExtension**() - the principle is the same as when you register models of components in MODX. 

You can see an example in [a draft for addons design modExtra][6]:

Work with records modExtra in the admin space

[![](https://file.modx.pro/files/0/9/a/09acd54474eac1da1a18a45ef417b0c6s.jpg)](https://file.modx.pro/files/0/9/a/09acd54474eac1da1a18a45ef417b0c6.png)
[![](https://file.modx.pro/files/9/9/f/99f389219e64d198d80cf34de3bcc359s.jpg)](https://file.modx.pro/files/9/9/f/99f389219e64d198d80cf34de3bcc359.png)

Work with records modExtra from the outside

[![](https://file.modx.pro/files/d/6/c/d6c064323f14c85809a852decd09b8a9s.jpg)](https://file.modx.pro/files/d/6/c/d6c064323f14c85809a852decd09b8a9.png)
[![](https://file.modx.pro/files/8/5/5/855490e75c5c93d364af3756d8d2bb92s.jpg)](https://file.modx.pro/files/8/5/5/855490e75c5c93d364af3756d8d2bb92.png)

A registered controller is shown by its name. In this case it is:
```
[[!Office?&action=`modExtra`]]
```
*You do not have to use Ext JS, it is just an example of the opportunities you have.*

Here is everything you need for editing records modExtra on the site's frontend на фронтенде сайта, [by one commit][7].

After you register the way to a controller, Office will download it from the given directory for all actions that have to do with it.
You do not have to copy anything, you can just provide and update your vidget inside your package.
[Management of keys in modstore.pro][8] already works like this, as well as output [of the authors' sales statistics][9].

And if you are planning to use Ext JS in your vidgets, notice that by default there already are some new [improved Office components][10], like a table with an imbedded search - you can extend them as much as you want. 

As[modExtra][11] is suited for designing addons for MODX and already supports Office, I recommend that you use it as an example. 


[0]: /en/01_Components/19_Office/03_Controllers/01_Authorization.md
[1]: /en/01_Components/19_Office/03_Controllers/02_Profile.md
[2]: /en/01_Components/19_Office/03_Controllers/03_MS2_Orders_History.md
[3]: /en/01_Components/19_Office/03_Controllers/04_Remote_Authorization.md
[5]: /en/01_Components/02_miniShop2
[6]: https://github.com/bezumkin/modExtra/blob/7b238647746fdd3443941a78fccc96ca9e96d76c/_build/resolvers/resolve.office.php
[7]: https://github.com/bezumkin/modExtra/commit/7b238647746fdd3443941a78fccc96ca9e96d76c
[8]: https://modstore.pro/cabinet/keys/
[9]: https://modx.pro/store/5343-statistics-for-authors-supplements/
[10]: https://github.com/bezumkin/Office/tree/master/assets/components/office/js/main/extjs
[11]: https://github.com/bezumkin/modExtra/
