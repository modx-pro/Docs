## NotFoundParamAlert

MODx Revolution plugin which generate alert on page not found with specified parameters in URL.  
Useful to catch wrong URLs on large context advertising projects with UTM or other URL parameters.

## Key features
* generate alert message on page not found with specified URL parameters on mail and/or log file
* set list of necessaries URL parameters with simple wildcards: ? — one any symbol, * — group of symbols
* send mail messages using PHP or MODX build-in tools

After installation use System settings notfoundparamalert namespace to set preferable settings values.

## Available system settings (namespace notfoundparamalert):

* parameters – list of URL parameters, separated by coma, which will generate alert. Available simple wildcards: ? — one any symbol, * — group of symbols.
* parameters_all – include in alert message all URL parameters or only matching parameters.
* alert_method – alert method. Available values: "mail" – send alert message on email, "log" – log alert message.
* alert_log_level – alert logging log level. Available values: "error", "warn", "info", "debug".
* mail_method – send mail method. Available values: "php" – native php mail() function, "modx" – MODX mailer.
* mail_from – valid email from which alert messages will be send.
* mail_to – valid email where alert messages will be send.

In Lexicon notfoundparamalert namespace it is possible to set up your own template for log/email message.

## Available placeholders used in message/mail text:

* alertName - component name.
* alertMethod - alert method.
* siteName - site name ('site_name').
* siteUrl - site url ('site_url').
* urlPath - page relative URL.
* urlFull - page absolute URL.
* requestParams - matched URL parameters.
* ipAddress - IP address the page was requested.