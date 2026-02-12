# Create a new contact from a site request

Useful when a client leaves their contact on the site. Two cases:

1. Client filled a contact form — send the contact to RetailCRM
2. Client registered on the site — send user profile to CRM

## Contact from contact form

With FormIt, add a hook that receives form data and sends it to RetailCRM.

Create a snippet `contactToRetailCRM` like this:

```php
<?php
if (!$modRetailCrm = $modx->getService(
  'modretailcrm',
  'modRetailCrm',
  MODX_CORE_PATH . 'components/modretailcrm/model/modretailcrm/',
  array($modx)
)) {
  $modx->log(modX::LOG_LEVEL_ERROR, '[modRetailCrm] - Not found class modRetailCrm');
  return;
}

$contact = array();
$name = trim(filter_var($hook->getValue('firstName'), FILTER_SANITIZE_STRING));
$contact['firstName'] = $name;
$contact['phones'][0]['number'] = trim(filter_var($hook->getValue('phone'), FILTER_SANITIZE_STRING));
$contact['email'] = trim(filter_var($hook->getValue('email'), FILTER_VALIDATE_EMAIL));
$contact['externalId'] = md5($contact['phones'][0]['number'] . $contact['email']);

$response = $modRetailCrm->request->customersCreate($contact);
if ($response->isSuccessful()) {
  return true;
} else {
  $modx->log(1, '[modRetailCRM] contactToRetailCRM '.print_r($response, 1));
  return false;
}
```

Important: RetailCRM requires **externalId** (site customer ID). Usually the customer is already in your DB; here we don’t store them, so we generate externalId on the fly, e.g. md5 of phone+email:

```php
$contact['externalId'] = md5($contact['phones'][0]['number'] . $contact['email']);
```

Example form (ajaxForm with FormIt):

```fenom
{'!ajaxForm' | snippet: [
  'form' => '@INLINE
    <form>
      <div class="form-group">
        <label>First name</label>
        <input class="form-control" type="text" name="firstName" value="" placeholder="First name">
      </div>
      <div class="form-group">
        <label>Phone</label>
        <input class="form-control" type="text" name="phone" value="" placeholder="Phone">
      </div>
      <div class="form-group">
        <label>Email</label>
        <input class="form-control" type="text" name="email" value="" placeholder="Email">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  ',
  'hooks' => 'contactToRetailCRM',
]}
```

### Contact from user registration

This case is already handled by the bundled plugin.
