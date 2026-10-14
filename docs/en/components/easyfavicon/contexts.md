---
title: Contexts
description: A favicon of its own for every context and directories of profiles for different contexts
---

# Contexts

Language versions and subdomains can have a favicon of their own. The Contexts field in the profile form appears when the site has more than one context (the manager does not count).

![Contexts in the profile form](/components/easyfavicon/screenshots/dialog-edit.png)

- **No contexts ticked** — a general profile: output in every context that has no profile of its own.
- **Contexts ticked** — the profile is output only there and takes precedence over the general one.

One profile per context can be active. A profile switched on turns off the other active profiles of the same contexts: a general one turns off another general one, a context profile turns off profiles sharing a context with it. A general profile and a context profile do not get in each other's way.

In the profile list the active general profile shows the contexts where a profile of their own is output instead: "except English".

![A general and a context profile in the list](/components/easyfavicon/screenshots/list.png)

## Directories

RealFaviconGenerator uses the same file names for every set, so active profiles of different contexts need different directories: sets in one directory would overwrite each other. EasyFavicon will not switch a profile on into a directory already used by an active profile of another context — it names that profile and asks for a directory of its own, for example `/favicon-en/`.

Profiles of the same contexts can share a directory: only one of them is active at a time, and on switching it publishes its set again.

## Output

The plugin and the snippet take the profile of the current page's context. The `easyfavicon.auto_inject_profile` setting and the snippet's `profile` parameter pick the profile explicitly — the context is not taken into account then.
