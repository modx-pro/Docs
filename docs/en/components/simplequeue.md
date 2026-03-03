---
title: simpleQueue
description: Simple task queue for use in other components
logo: https://modstore.pro/assets/extras/simplequeue/logo-lg.png
author: biz87
modstore: https://modstore.pro/packages/utilities/simplequeue
---
# simpleQueue

A simple message queue for use in any third-party components.

A message queue is useful when you need to add a message about a new action in one process and handle it in another.

Example: sending emails. In the main process you add a message about a new outgoing email, and a separate script performs the actual send.

Can be used both at the object level and at the processor level.

## Connecting the service

Standard call:

```php
sq = $this->modx->getService(
    'simplequeue',
    'simpleQueue',
    $this->modx->getOption('simplequeue_core_path', null, $this->modx->getOption('core_path') . 'components/simplequeue/') . 'model/simplequeue/',
    array()
);
```

Short call:

```php
$sq = $modx->getService('simplequeue');
```

For the short call to work, run this once (e.g. in Console):

```php
$modx->addExtensionPackage('simplequeue', '[[++core_path]]components/simplequeue/model/');
```

## Objects

Class ``sqMessage``

| Field      | Purpose                                                                 | Auto-filled? |
| ---------- | ----------------------------------------------------------------------- | ------------ |
| id         | ID                                                                      | Yes          |
| service    | Arbitrary name of the service that added the message                   | No           |
| action     | Arbitrary name of the action to perform                                 | No           |
| subject    | Details for the action, e.g. ID of the object to process                | No           |
| createdon  | Creation time, filled automatically                                     | Yes          |
| createdby  | ID of the user who created the message                                 | Yes          |
| processed  | Completion flag (bool)                                                  | No           |
| status     | Status set by the service                                              | No           |
| properties | JSON array with arbitrary data                                          | No           |

Class ``sqLog``

| Field      | Purpose                                          | Auto-filled? |
| ---------- | ------------------------------------------------- | ------------ |
| id         | ID                                                | Yes          |
| message_id | ID of the modified message                        | Yes          |
| user_id    | ID of the user who modified the message           | Yes          |
| timestamp  | Change timestamp                                  | Yes          |
| operation  | Action performed                                  | Yes          |
| entry      | JSON array with changed fields and their values   | No           |

## Processors

The component includes message processors:

| Processor | Purpose     | Parameters                |
| --------- | ----------- | ------------------------- |
| create    | Create      | service, action, subject, properties |
| update    | Update      | id, status, properties   |
| close     | Close       | id                        |
| open      | Reopen      | id                        |
| get       | Get one     | id                        |
| getlist   | Get list    | ids                       |

Example processor call:

```php
$response = $modx->runProcessor(
    'message/update',
    array('id' => 1, 'status' => '5'),
    array('processors_path' => MODX_CORE_PATH . 'components/simplequeue/processors/');
);
```

When using processors, sqLog entries are created automatically and store message state after save.
