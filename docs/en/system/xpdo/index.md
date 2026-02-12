# What is xPDO?

**xPDO** (open eXtensions to PDO) is a lightweight ORB (object-relational bridge) library for PHP 5 that lets you use modern PHP database standards via the PDO (PHP Data Objects) extension. **xPDO** implements a simple but effective Active Record–style data access pattern and a flexible domain model that lets you separate domain logic from database-specific logic when needed.

**xPDO** is more than a bare pattern implementation. It abstracts your application’s business logic from the actual SQL and prepared statements used to access the database, and makes it easy to define and run an object model on multiple database platforms.

**xPDO** aims to give you a solid foundation for a web application that you can extend into a full object model and optimize without being tied to a specific platform.

## Why use xPDO

**xPDO** offers several high-level features:

- An object-relational bridge (ORB) that maps relational database structures to OOP objects;
- Uses PDO, the standard database access layer for PHP 5.1+, for fast interaction with various relational databases;
- Provides a PDO implementation for PHP 4.3.x, 4.4.x and 5.0.x. Some 5.0.x setups may have native PDO via PECL; support for PHP 4 (with some limits on PDO’s full potential) was a major goal of the **xPDO** project;
- Very lightweight code that loads only what it needs, on demand, so it adds little overhead. This is done via shared methods and accessors and pure PHP (e.g. no XML config parsing or other serialization);
- Encourages platform optimization together with object abstraction;
- Supports any database with a PDO driver (currently MySQL, MSSQL Server and SQLite);
- Fast generation of classes and metadata maps from an **xPDO** model schema (the schema is defined in XML; see the [MODX schema][4] for an example);
- Fast generation of an **xPDO** schema from an existing database schema.

## Design patterns

**xPDO** was built using several patterns described in Martin Fowler’s [“Patterns of Enterprise Application Architecture”][2]. They include (among others):

- Domain Model
- Active Record
- Data Mapper
- Lazy Load
- Identity Field
- Single Table Inheritance
- Metadata Mapping
- Query Object

Before coding with **xPDO**, it helps to read about these patterns (and others in Fowler’s catalog); understanding them will help not only with **xPDO** but with many other programming concepts.

[1]: http://design-pattern.ru/patterns
[2]: http://www.martinfowler.com/eaaCatalog/
[3]: http://ru.wikipedia.org/wiki/ORM
[4]: https://github.com/modxcms/revolution/blob/develop/core/model/schema/modx.mysql.schema.xml
