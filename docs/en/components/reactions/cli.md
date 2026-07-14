---
title: CLI
description: Reactions CLI — recount, cleanup, export, types, sets, bans, stats
---
# CLI

Run from the MODX site root (where `index.php` and `core/config/` live):

```bash
cd /var/www/site
php core/components/reactions/cli.php <command> [subcommand] [options]
```

The CLI boots the `mgr` context. It finds the site root from the call path (`$argv[0]` + cwd), so a symlink `core/components/reactions` → `Extras/Reactions/...` works too.

## Command overview

| Command | Subcommands | Purpose |
| --- | --- | --- |
| `recount` | — | Recalculate aggregates |
| `cleanup` | — | Clean orphans and expired bans |
| `export` | — | Export reactions to JSON |
| `type` | `create`, `list`, `remove` | Manage types |
| `set` | `create`, `list`, `attach`, `remove` | Manage sets |
| `ban` | `add`, `remove`, `list` | Ban IPs and users |
| `stats` | — | Print stats to the console |

---

## recount

Recalculates `ReactionAggregate` from raw rows.

```bash
# All objects with reactions or aggregates
php core/components/reactions/cli.php recount

# One object
php core/components/reactions/cli.php recount --class-key=modResource --object-id=5 --context=web
```

Options:

| Option | Description |
| --- | --- |
| `--class-key` | Object class as in the API (`modResource`, `msProduct`…). In the DB this is the `object_class` field |
| `--object-id` | Object ID |
| `--context` | Context, default `web` |

---

## cleanup

```bash
# Delete reactions with missing types + expired bans
php core/components/reactions/cli.php cleanup --orphans

# Expired bans only
php core/components/reactions/cli.php cleanup
```

| Option | Description |
| --- | --- |
| `--orphans` | Delete reactions whose `type_id` no longer exists |

---

## export

Export reactions to JSON.

```bash
# To a file
php core/components/reactions/cli.php export --file=/tmp/reactions.json

# To stdout with a filter
php core/components/reactions/cli.php export --class-key=modResource --object-id=5 --context=web
```

| Option | Description |
| --- | --- |
| `--class-key` | Filter by class |
| `--object-id` | Filter by ID |
| `--context` | Filter by context |
| `--file` | File path. Without it, output goes to stdout |

File format:

```json
{
  "exported_at": 1710000000,
  "count": 2,
  "items": [
    {
      "id": 1,
      "class_key": "modResource",
      "object_id": 5,
      "context": "web",
      "type_id": 1,
      "type": { "id": 1, "name": "like", "emoji": "👍" },
      "user_id": null,
      "fingerprint": "f:abc...",
      "created_at": 1709900000,
      "updated_at": 1709900000
    }
  ]
}
```

---

## type

### type create

```bash
php core/components/reactions/cli.php type create --name=favorite --emoji=⭐ --ordering=90
```

| Option | Description |
| --- | --- |
| `--name` | Unique name (required) |
| `--emoji` | Emoji |
| `--ordering` | Sort order |
| `--icon` | Icon (optional) |
| `--inactive` | Create as inactive |

### type list

```bash
php core/components/reactions/cli.php type list
```

### type remove

```bash
php core/components/reactions/cli.php type remove --name=favorite
php core/components/reactions/cli.php type remove --id=9
```

---

## set

### set create

```bash
php core/components/reactions/cli.php set create --key=social --title="Social" --types=like,love,funny
```

| Option | Description |
| --- | --- |
| `--key` | Unique key (required) |
| `--title` | Title |
| `--types` | Comma-separated type list |
| `--non-exclusive` | Allow multiple reactions |
| `--inactive` | Create as inactive |

By default the set is created `exclusive`.

### set list

```bash
php core/components/reactions/cli.php set list
```

### set attach

Bind types to an existing set.

```bash
php core/components/reactions/cli.php set attach --key=github --types=like,dislike,love --replace
```

| Option | Description |
| --- | --- |
| `--key` or `--id` | Set |
| `--types` | Comma-separated types (required) |
| `--replace` | Drop existing set links and write only `--types` |

Without `--replace`, types from `--types` are added to those already bound. To keep only the listed types: `--replace`.

### set remove

```bash
php core/components/reactions/cli.php set remove --key=social
php core/components/reactions/cli.php set remove --id=3
```

---

## ban

### ban add

```bash
php core/components/reactions/cli.php ban add --ip=203.0.113.10 --reason=spam --days=7
php core/components/reactions/cli.php ban add --user=42 --reason=abuse
php core/components/reactions/cli.php ban add --ip=1.2.3.4 --expires=1711000000
```

| Option | Description |
| --- | --- |
| `--ip` | IP address (hashed with SHA-256) |
| `--user` | MODX user ID |
| `--reason` | Reason |
| `--days` | Duration in days from now |
| `--expires` | Unix timestamp or a string for `strtotime()` |

You need `--ip` or `--user`.

### ban remove

```bash
php core/components/reactions/cli.php ban remove --id=1
php core/components/reactions/cli.php ban remove --ip=203.0.113.10
php core/components/reactions/cli.php ban remove --user=42
```

### ban list

```bash
php core/components/reactions/cli.php ban list
```

---

## stats

```bash
php core/components/reactions/cli.php stats
php core/components/reactions/cli.php stats --limit=20
```

Prints:

- Totals (reactions, aggregates, types, bans, today).
- Top by `likes`.
- Top by `total`.
- Top by `trending_score`.

---

## Scenario examples

### “Bar” set from existing types

Types `beer` and `fire` belong to the `full` preset. Create the set:

```bash
php core/components/reactions/cli.php set create --key=bar --title="Bar" --types=beer,fire --non-exclusive
```

Custom type (name must be unique):

```bash
php core/components/reactions/cli.php type create --name=cheers --emoji=🥂 --ordering=250
php core/components/reactions/cli.php set attach --key=bar --types=cheers
```

### Recount after import

```bash
php core/components/reactions/cli.php recount
php core/components/reactions/cli.php stats --limit=5
```

### Weekly maintenance (cron)

```bash
0 3 * * 0 cd /var/www/site && php core/components/reactions/cli.php cleanup --orphans
```
