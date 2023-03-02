We're collecting the questions we get most often into a list of FAQs.

### How do I show my created form?
Make sure that you marked your form as Published, and then add the following snippet call where you want the form to appear (without the spaces):

````
[[!renderForm? &form=`FORM ID HERE`]]
````

You can also use a template variable to select the form, and to place the template variable value in the form property.

### I want to setup custom validation per field
This can be accomplished by going to the creating (or editing) a field-type in the admin-panel.
You can mention a comma-separated list of FormIt-validators in the **Validation** field in the dialog-window.

### I don't like the emails sent by Formalicious
Everything is customisable by using chunks or FormIt parameters. 
First, create a duplicate of the email-chunk (`emailFormTpl` or `fiarTpl`) you wish to change and rename it. 
Then go to the form which should use this new chunk.

Go to the **Advanced** section and click **Add parameter**.
Set the parameter-key to **emailTpl** or **fiarTpl** and set the value to the chunk you just made.
