As you must know, the main point of pdoTools - is speed.

I developed first version of pdoTools during making of **Tickets**. It should be tickets system but at the end of development it was some kind of simple blog system with awesome ajax comments. And I really don't have enough speed with common MODX extras like getResources. So i developed my own library, without any snippets at the beginning.

It stands on two ideas:
1. The query to database is built with xPDO but executing via PDO. No objects to represent selected rows.
2. Fast chunk processing. No MODX parser calls if pdoTools can parse chunk yourself.