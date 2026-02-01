# Dictionary

The dictionary holds all words: collected when adding a field, tracked when adding products, or added manually.

Each entry has:

- **Query** - how the word is stored in the database,
- **Value** - what is substituted in texts; this value is declined.
- **Synonym** - used in URLs. Changing it regenerates all related links. New synonyms follow friendly URL system settings (translate, transliterate, or keep as is).
- **Field** - field the word is linked to. Cannot be changed after adding.

Query and Value usually match, but you can change *Value* without affecting behavior.

For manually added words or words in dependent fields you may see **Depends on**. Choose a word from the dropdown after selecting a field that depends on another. Options come from the "parent" field.

After saving, if declensions are enabled in settings, the Value is declined. With declensions off you can still enter custom declensions or other data for use in texts, including image paths.

Fields have tooltips on hover. You can force declension when editing (checkbox) or from the table (button). In the table you can select multiple words and decline them at once.
