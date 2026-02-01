# Interface

## Add job — controller

Via the controller script:

[![](https://file.modx.pro/files/5/a/6/5a63ac91b0aec4774b2e863e175ba999s.jpg)](https://file.modx.pro/files/5/a/6/5a63ac91b0aec4774b2e863e175ba999.png)

## Add job — snippet

Create a snippet that will run automatically and attach it to a cron job:

[![](https://file.modx.pro/files/d/5/e/d5ecfe8fbc76872995c252d40ee6940fs.jpg)](https://file.modx.pro/files/d/5/e/d5ecfe8fbc76872995c252d40ee6940f.png)

### Snippet content

```php
<?php
echo "Test" . PHP_EOL;

return 0; # Error
return 1; # Success
```

For the job to complete successfully, the snippet must return `return 1;`; otherwise the cron job will be marked as failed.
