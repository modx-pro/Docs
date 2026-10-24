---
title: Contexts and languages
description: A separate banner per context, ready texts in 14 languages and picking the visitor's language
---

# Contexts and languages

## Contexts

Language versions and subdomains can each have their own banner. The "Contexts" field in the "Profile" card appears when the site has more than one context (the manager does not count).

- **No contexts ticked** — a general profile: shown in every context that has no profile of its own.
- **Contexts ticked** — the profile is shown only there and takes precedence over the general one.

One profile can be active per context. Switching a profile on switches off the other active profiles of the same contexts: a general one switches off another general one, a context profile switches off profiles sharing its contexts. A general and a context profile do not interfere with each other.

In the profile list the active general profile shows the contexts where their own profile is shown instead: "except English".

The plugin and the snippets take the profile of the current page's context. The `easycookies.auto_inject_profile` setting and the snippets' `profile` parameter set the profile explicitly — the context is not taken into account then.

::: tip
A privacy policy address given as a resource id is turned into a link in the `web` context. For a profile of another context, enter the page address as text.
:::

## Languages

Ready banner texts come in 14 languages: Russian, English, Ukrainian, Belarusian, Kazakh, Uzbek, Tajik, Armenian, Azerbaijani, German, French, Spanish, Italian, Polish.

Languages are added with the "Add a language…" list. It has two groups: languages with ready texts and the other languages MODX is translated into. Texts of the second group, as well as of a language added with "Another language by code…", start as a copy of the default language — translate them in the "Edit texts" window.

A simple banner usually has one language, the site's. Add more if the site is multilingual: language tabs appear above the text.

| Field | Description |
| --- | --- |
| Default language | Shown when the visitor's language is not in the profile |
| Language of the banner | Where the banner takes the visitor's language from: the page language (`<html lang>`), the browser language or always the default language |

The page gets texts only for the languages in the profile. For Arabic, Persian, Hebrew and Urdu the banner windows are mirrored right to left.

::: tip
The page language comes from the `lang` attribute of `<html>`. In a MODX template it is usually written as `<html lang="[[++cultureKey]]">`.
:::
