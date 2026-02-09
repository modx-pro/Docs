# Setup

Formalicious requires **FormIt** to be installed. The installer will try to install it automatically if needed.

FormIt is also developed by **Sterc**, so the add-ons are fully compatible.

After installation, a new **Formalicious** item appears in the manager menu. A category and TV with the same name are created.

Assign the TV to all templates you will use for forms. The corresponding snippet must also be called in those templates.

## Step-by-step

1. Click the **formalicious** TV.
2. Click **Available for templates**.
3. Select the templates you need.
4. Save.
5. Edit each selected template.
6. In **Template code (HTML)**, add the snippet where the form should appear:

    ```modx
    [[!renderForm? &form=`[[*formalicious]]`]]
    ```

    We recommend placing the form right after the `[[*content]]` placeholder so content managers can add text above it.
7. Optionally create a chunk named **form** and put the snippet call there. Then content managers can use `[[$form]]` anywhere for more flexibility (e.g. between two paragraphs in the page content).
8. Save.

## Inserting a form via ContentBlocks

If you use [ContentBlocks](https://www.modmore.com/contentblocks/), Formalicious adds its own input type, so you don't need the TV.

Go to **Apps** > **ContentBlocks** and create a new field with the input type **Formalicious Form Selector**. Configure the output template if needed.
