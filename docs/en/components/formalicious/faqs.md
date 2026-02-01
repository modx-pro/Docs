# FAQ

Common questions and answers.

## How do I display my form?

Make sure the form is marked as published, then add this where you want it (no spaces):

```modx
[[!renderForm? &form=`form_id`]]
```

You can also use a TV to select the form and pass it as the form parameter.

## I want to use validators for fields

Add the FormIt validators you need in the field settings in the Formalicious dashboard. The parameter accepts a comma-separated list of validators.

## I don't like how Formalicious emails look

You can change everything by editing chunks. Create copies of the default chunks (`emailFormTpl` or `fiarTpl`) under new names and edit them.

Then go to the form's **Advanced settings** and add the FormIt parameter **emailTpl** or **fiarTpl** with your chunk name.
