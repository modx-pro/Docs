# RSS feed parser

## RSS task setup

When adding feed fields to parse, instead of field name (`title` or `enclosure[url]`) you can use `@INLINE` chunk processed by Fenom. This allows custom logic, including creating sections on the fly.

### Adding task

Go to component page, click "Add RSS feed". On "Main" tab fill in:

![Add task - 1](https://file.modx.pro/files/1/f/b/1fbad9610792d107ba73dd1a010a5391.png)

Switch to "Configuration" tab where you can set:

- Template for created resources
- Context
- Parent container in selected context
- Media download settings
- Feed base tag and record base tag if needed

![Add task - 2](https://file.modx.pro/files/c/5/5/c559bca846330c43cd8302bcf257ec2a.png)

*Media extensions and per-extension folders are set in JSON.*

Click "Save". Task added!

### Adding parse fields

Right-click the new task and choose "Task fields":

![Add parse fields](https://file.modx.pro/files/c/b/8/cb8a296c983e6493dea5135190c52de6.png)

The fields list opens, initially empty.

You can also view "Feed values array" - printed array from the first feed record:

![Add parse fields - 2](https://file.modx.pro/files/9/a/f/9aff05a6e244235dacaf3d32820f86d9.png)

Remember the field names to parse and click "Add field". A window opens where you can set:

1. **System field**. Dropdown of resource system fields and TV fields.
2. **Source field**. Text field for RSS feed tag name. You can use `@INLINE` chunk processed by Fenom from pdoTools. The chunk has placeholders for all RSS fields in *item* tags (also in `$_pls`) and task settings `$_task`. With Fenom you can e.g. get *category* value, find matching category id on your site, create if missing. *enclosure* and similar tags: use chunk `@INLINE {$enclosure['url']}` or CSS selector `enclosure[url]`. If empty, *System field* gets value from *Default value*.
3. **Default value**. Value written to *System field*. E.g. for *class_key* write `Ticket` and leave *Source field* empty to create Tickets. Same for *published* with `1` to publish immediately.

![Add parse fields - 3](https://file.modx.pro/files/f/d/1/fd116e47bcd797829f2b53265c64fa9a.png)

Besides data fields, add a field xParser uses to detect existing records. This field is **Unique**.
Add a new field:

- **System field** - leave empty
- **Source field** = `guid` *because it changes least*

![Add parse fields - 4](https://file.modx.pro/files/d/5/7/d577be78ffa9c8276aff8025c93b1639.png)

Save! In the fields list, set **Unique field** (star button on the left):

![Add parse fields - 5](https://file.modx.pro/files/d/7/c/d7cb4daae42d1a8e0d5236782179305f.png)

Ready for parsing - one-off or cron (component has [cron script][1]).

[1]: /en/components/xparser/cron
