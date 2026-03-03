---
title: ViewsOnline
description: Number of online users on the page
logo: https://modstore.pro/assets/extras/viewsonline/logo-lg.png
author: bazmaster
modstore: https://modstore.pro/packages/users/viewsonline
---
# ViewsOnline

## ViewsOnline snippet

![ViewsOnline snippet](https://file.modx.pro/files/8/f/b/8fbfa1707d51a469803adaad32ef40d1.jpg)

The snippet outputs online user statistics for any site page and works on top of the view table from Tickets.
Can be used e.g. for a forum in the form:
> 17 users reading the topic: 15 guests, 2 users (user1, user5)

Requirements:

1. **pdoTools** installed
2. **Fenom** enabled in pdoTools settings
3. **Tickets** installed
4. **Guest view counting** enabled in Tickets settings

These extras are free and the **ViewsOnline** snippet runs on top of them.

## Snippet parameters

- `tpl` — chunk for output, Fenom features are used. Chunk placeholders: `total`, `guests`, `users`, `userlist`.
- `tplUserlist` — chunk for the user list, accepts 2 placeholders: `separator` and `user`.
- `tplUserlistOuter` — chunk for wrapping the user list, accepts placeholder: `wrapper`.
- `separator` — separator for the user list.
- `pid` — page id for statistics output. Default: current.
- `parents` — comma-separated section ids to aggregate stats for all pages; excludes `pid`.
- `min` — number of minutes within which a user is considered online. Default: `15`

All parameters are available on the snippet and can be seen by dragging the snippet onto a code field.

## Examples

Call the snippet uncached on the desired page:

```fenom
{'!ViewsOnline' | snippet}
```

Example for another page:

```fenom
{'!ViewsOnline' | snippet: [
  'pid' => 1,
]}
```

Example for an entire section, e.g. **forum** on the site:

```fenom
{'!ViewsOnline' | snippet: [
  'parents' => 10,
]}
```

Example for two sections, e.g. **Jobs (35)** and **Resumes (48)**, to combine them into a **Work** group:

```fenom
{'!ViewsOnline' | snippet: [
  'parents' => '35,48',
]}
```

## Links

- [Community article](https://modx.pro/solutions/9778-output-users-online-for-a-specific-page/)
- [Demo site](https://demo.bazstudio.com)
- [Download transport package](https://demo.bazstudio.com/assets/files/viewsonline-1.0.1-beta1.transport.zip)
- [Package on modstore.pro](https://modstore.pro/packages/users/viewsonline)
