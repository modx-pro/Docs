# Tag syntax

Tags are the main building blocks of MODX for site users.

By placing tags on a page, you can invoke a piece of HTML or PHP code, text from the lexicon, or document variables.

To simplify parser logic, improve performance and avoid confusion with composite tags, the syntax for different element types follows a single rule: all tags are declared in square brackets, and the tag type is determined by the character before the name.

## For elements and fields

::: v-pre
| Element              | In Evolution (Legacy) | In Revolution (New) | Example (for Revolution) |
|----------------------|------------------------|---------------------|--------------------------|
| Templates            | No                     | No                  |                          |
| Resource fields      | `[*field*]`            | `[[*field]]`        | `[[*pagetitle]]`         |
| TV fields            | `[*templatevar*]`      | `[[*templatevar]]`  | `[[*tags]]`              |
| Chunks               | `{{ chunk }}`          | `[[$chunk]]`        | `[[$header]]`            |
| Snippets             | `[[snippet]]`          | `[[snippet]]`       | `[[getResources]]`       |
| Plugins              | No                     | No                  |                          |
| Modules              | No                     | Revo has no modules |                          |
:::

## For content output

| Element        | In Evolution (Legacy) | In Revolution (New)       | Example (for Revolution)        |
|----------------|------------------------|---------------------------|--------------------------------|
| Placeholders   | `[+placeholder+]`      | `[[+placeholder]]`        | `[[+modx.user.id]]`            |
| Links          | `[~link~]`             | `[[~link]]`               | `[[~[[*id]]? &scheme=`full`]]` |
| System settings| `[(system_setting)]`   | `[[++system_setting]]`    | `[[++site_start]]`             |
| Language tags  | No                     | `[[%language_string_key]]`|                                |
| Comments       | No                     | `[[-this is a comment]]` |                                |

## For MODX parser system values

| Description                                        | Tag      |
|----------------------------------------------------|----------|
| Outputs time spent on database queries             | `[^qt^]` |
| Outputs number of database queries                 | `[^q^]`  |
| Outputs time spent on PHP script execution         | `[^p^]`  |
| Outputs total page generation time                 | `[^t^]`  |
| Outputs content source (database or cache)        | `[^s^]`  |

Adopting this simplified format allows the new parser to be fully recursive and independent of regular expressions.

Previously, each set of tags was analyzed separately in a fixed order, by nesting level, and inner tags were deferred to the next pass. Now tags are processed as they appear, regardless of element type, and inner tags are processed before the outer tag (i.e. complex tags are processed from the inside out), so you can write much more complex composite tags.

## Comments in tags

Forum discussions show that some users want comments. By default, when the parser finds a tag that refers to a non-existent element, it discards the entire tag. Using this behaviour, you can add comments to templates, chunks and resource fields, and the comment will not be shown on the frontend. However, if the tag is composite, all inner tags are processed before the parser discards the value.

In MODX Revolution 2.2, any tag starting with a hyphen (-) is ignored by the parser, and any tags inside such a comment are discarded. This allows inserting any composite tags in comments without affecting performance.

```modx
[[- This is a comment. It will be removed from the page output. ]]
```

## Tag structure

Each tag consists of several parts. Let's break the tag down:

```modx
[[ // open the tag
! // indicates the tag is uncached (optional)
elementType // element type $ - chunk, * - resource field or TV, + - placeholder, etc.
elementName // element name
@propertyset // property set for this element (optional)
f =`modifier` // one or more output filters (optional)
? // indicates that element parameters follow (optional if no parameters)
&propertyName=`propertyValue`  // any element parameter starting with `&`
&me2=`propertyValue2` // any number of parameters, all starting with `&`
]] // close the tag
```

Tags can be written on one line or split across several lines. Both forms are equivalent:

```modx
[[!getResources? &parents=`123` &limit=`5`]]

[[!getResources?
  &parents=`123`
  &limit=`5`
]]
```

## Parameters

All tags (not just snippets) can have parameters. For example, we have a chunk `Hello`:

```modx
Hello, [[+name]]!
```

The chunk contains a placeholder. We want to set a value for it. Previously you had to use a snippet to set it. Not anymore. Just specify the value in the chunk parameters:

```modx
[[$Hello? &name=`Sergei`]]
```

The output will be:

```
Hello, Sergei!
```

## Caching

To have a tag processed on every page request, place an exclamation mark right after the opening square brackets:

```modx
[[!snippet]]
[[!$chunk]]
[[!+placeholder]]
[[!*template_var]]
```

etc.

## Placeholders

If you need a snippet to set a placeholder on every page request, the placeholder must also be called uncached:

```modx
[[!Profile]]
Hello, [[!+username]].
```

## Syntax checking

For beginners the tag syntax may seem a bit complex, so you can use the SyntaxChecker plugin to verify tag syntax.

You can also use the **Ace** editor, which highlights MODX tag syntax well.
