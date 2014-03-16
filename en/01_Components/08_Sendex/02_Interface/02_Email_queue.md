## Queue formatting
To format a distribution of user emails, it is necessary to add them in the queue:

* Go to **Компоненты** -> **Sendex**

[![](http://st.bezumkin.ru/files/3/f/0/3f0e673a7ed51e205d2e683d35914390s.jpg)](http://st.bezumkin.ru/files/3/f/0/3f0e673a7ed51e205d2e683d35914390.png)

* On inlay **Email queue** in the pop-up list choose the distribution, which requires to generate an email.

[![](http://st.bezumkin.ru/files/5/0/9/5099cea4f7eb982ef5ca4ee59faca458s.jpg)](http://st.bezumkin.ru/files/5/0/9/5099cea4f7eb982ef5ca4ee59faca458.png)

[![](http://st.bezumkin.ru/files/4/1/a/41ae797ee96de03bf8c634e72e722bc9s.jpg)](http://st.bezumkin.ru/files/4/1/a/41ae797ee96de03bf8c634e72e722bc9.png)

* Then you need to send the generated.

## Email distribution
There are some ways to distribute emails:

1. Manual. You need to enter **Компоненты** -> **Sendex**, and inlay  **Очередь писем**. Choose an email and send it through the context menu.
[![](http://st.bezumkin.ru/files/4/1/a/41ae797ee96de03bf8c634e72e722bc9s.jpg)](http://st.bezumkin.ru/files/4/1/a/41ae797ee96de03bf8c634e72e722bc9.png)

2. Automatic, through **cron**. As a unit with addition there is a file `core/components/sendex/cron/send.php`, which needs to be added it in cron.
Frequency of starts depends on quantity of your subscribers and hosting resources, script sends up to 100 emails at one time. An email is deleted from the queue after sending.

3. Through API.
```
$modx->addPackage('sendex', MODX_CORE_PATH . 'components/sendex/model/');

$q = $modx->newQuery('sxQueue');
$queue = $modx->getCollection('sxQueue');
/** @var sxQueue $email */
foreach ($queue as $email) {
	$email->send();
}
```
