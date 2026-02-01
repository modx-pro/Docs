# Plugin events

Since version 1.6.3 the package has **plugin events** and records **server response codes** for URLs.

This is useful because:

- You can add custom logic to the parsing process,
- You can perform custom site actions based on parsed data,
- For example, if the server returns 301/302 redirect or 404 for a subtask URL, you can unpublish that resource,
- The possibilities are up to you.

_Event list is in execution order._

- [xParserOnFilterSourceItems](/en/components/xparser/events/xparseronfiltersourceitems)
- [xParserOnBeforeTaskParse](/en/components/xparser/events/xparseronbeforetaskparse)
- [xParserOnTaskItemParse](/en/components/xparser/events/xparserontaskitemparse)
- [xParserOnAfterPagesCollected](/en/components/xparser/events/xparseronafterpagescollected)
- [xParserOnBeforeTaskActions](/en/components/xparser/events/xparseronbeforetaskactions)
- [xParserOnTaskRowsPrepared](/en/components/xparser/events/xparserontaskrowsprepared)
- [xParserOnTaskParseDone](/en/components/xparser/events/xparserontaskparsedone)
- [Examples](/en/components/xparser/events/examples)
