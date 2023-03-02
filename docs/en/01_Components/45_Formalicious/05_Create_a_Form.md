Creating a form is something you can do yourself, as a MODX website maintainer, but Formalicious enables content-manager to also create forms.

The process of setting up a Formalicious-form can be split into 3 steps. Each step has a Tab in the create-form dialog:
1. Form settings
2. Form fields
3. Advanced

### Form settings

General form-settings are modified here.

**Important:** When creating a form, you first have to finish the **Form settings** and save your form
before being able to continue to the **Form Fields** tab.

- Title: A recognisable name, for internal usage only. Won't be shown on the website itself.
- Email header text: This message will be displayed in the email sent to the email address specified in **Email to**.
- Email to: This email address will receive the submitted form entries.
- Subject: Subject of the email
- Redirect to: Resource ID where the visitor is sent to after the form is successfully submitted.
- Save submitted form: Check this to save the form into FormIt using the [FormItSaveForm hook][1];
a great way to have a backup of all your submitted forms.
- Published: Check this to make this form available throughout the manager.
- Send auto reply: Check this to enable auto replies for this mail.
The visitor who submits your form, will also receive a confirmation mail (auto reply).
This is a good way to inform your visitors that a form actually worked and action is taken.
**This will only work if you enter the fields below.**
- Select email field: Select the form-field where the auto-reply should be sent to.
This dropdown is automatically populated by all your fields.
This means you have to add your fields first and then you select an email field you wish to use as your auto-reply field.
- Email from: The sender of the auto-reply. Your website-visitor will se this in the From-field when reading the email.
- Subject: Subject of the auto-reply email.
- Content: Content of the auto-reply email. Feel free to use HTML here, but keep it limited to simple tags
like: `<b> <strong> <em> <br /> <br> <p></p> <a href="link-here"></a>`
- Attachment: (optional) If you want to attach a file to the confirmation email, you can do it here.
Bigger files mean a bigger chance of failure when sending an email.

### Form steps
You have to save the form settings before you can access this tab and add steps/fields.

Before adding a field, you need to add a **Step**. You can change the text of a **Step** by double clicking the text of the step.
It will allow you to change the text inline. Hit **Enter** to save the changes.

Steps will group your from fields on the frontend and next/previous buttons will be automatically added by Formalicious for your users.
The only thing you have to do is styling!

### Form fields
Every step can contain fields. Click 'Add field' and choose a field type in the dialog window. This will open the "Save field" dialog.
The title will be the label of the field, the placeholder is optional and works as a [HTML5 Placeholder attribute][2].

Every field has two extra options: **Required** will make a field mandatory.
**Published** allows you to disable a field (temporary).

### Advanced
In the Advanced tab you can add FormIt prehooks, posthooks and custom parameters.
More on that can be found on the [FormIt docs (hooks section)][3].

### Getting your form in a page
Now is the time to put a form on a page! This can be done by going to a page and select a template you assigned the
**formalicious** Template Variable to. From there, select the Formalicious form you wish to show on that page.

[![](https://file.modx.pro/files/a/c/f/acf07fb4530d2d22d78b28a1795eeeecs.jpg)](https://file.modx.pro/files/a/c/f/acf07fb4530d2d22d78b28a1795eeeec.png)

Alternatively, if you use [ContentBlocks][4], you can also create a **Formalicious Form Selector** field and insert that into your page.


[1]: https://docs.modx.com/extras/revo/formit/formit.hooks/formit.hooks.formitsaveform
[2]: https://www.w3.org/TR/html5/forms.html#the-placeholder-attribute
[3]: https://docs.modx.com/extras/revo/formit/formit.hooks
[4]: https://www.modmore.com/contentblocks/