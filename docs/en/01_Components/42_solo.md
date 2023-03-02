## About
SOLO is a SOLO is a responsive, flexible and beautiful theme. Perfect to showcase your work & services in a stylish, modern way.
It includes: easy to sort and edit sections, image gallery, contact form, color options, and easy to edit and update content

- [Official Documentation][1] 
- [Issue tracker][2]
- [Bugs and Feature Requests][3]


## Installation
The steps to install a MPThemes theme for MODX Revolution are easy!

1. in the main menu select `Extras` > `Installer`
3. on Package Management page click on the little arrow next to `Download Extras` and choose `Upload a package`
4. the theme should now be listed on the Package Management page Click on the `Install` button under the package
5. (for MODX 2.4.0 and up only) Install all the needed dependencies.
6. follow the steps of the install.
7. after the installation is finished click `OK` Finally go to `Manage` > `Clear Cache` (for MODX 2.2 and lower `Site` > `Clear Cache`)

Your theme for MODX Revolution is installed and ready to go! To view the site click on `Content` > `Preview Site`

*Using a MODX version lower then 2.4.0?*
Then you will need to install the following packages before installing SOLO theme:
- ace-1.6.3 or higher
- clientconfig-1.3.1 or higher
- csssweet-2.0.0 or higher
- formit-2.2.7 or higher
- getresources-1.6.1 or higher
- migx-2.9.4 or higher
- pthumb-2.3.3 or higher
- tinymce-4.3.3 or higher
- wayfinder-2.3.3 or higher


## Initial setup
These steps are needed to get started with your theme the right way.

**Active** FriendlyURL's. We should change the ht.access file in your site root to .htaccess to support Friendly URL's.
   - duplicate or download a backup of the ht.access file in your site root (in the Files tab)
   - rename the file to .htaccess
   - clear the site cache, go to `Manage` > `Clear Cache` (for MODX 2.2 and lower `Site` > `Clear Cache`)

Next got to the site system setting to activate FriendlyURL's
   - Hover over 'cog icon' on the top right 
   - Click on 'System Settings'
   - Click on 'Filter by Area' and select 'Friendly URL'
   - Select 'Yes' for 'Use Friendly URLs'
   - Select 'Yes' for 'Use Friendly Alias Path'

**Configure** your site style and update general settings under: `Extras` > `Configuration`.

There are many settings here including: colors, social media, footer content and more.


## Updating your theme
To update your MPThemes MODX theme, simply upload the updated theme zip file to the `/core/packages/` folder of your site and repeat the installation steps.
Make sure you do not install the demo content!


[1]: http://mpthemes.com
[2]: https://bitbucket.org/DESIGNfromWITHIN/solo/issues
[3]: https://bitbucket.org/DESIGNfromWITHIN/solo/issues