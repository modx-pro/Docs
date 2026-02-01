---
title: ePochta
---
# ePochta

Component implements the ePochta API for sending SMS and validates mobile numbers via a code (optionally sent by email instead of SMS).

## Component setup

- **Redirect ID** — Used after successful SMS validation; if not 0, user is redirected to this resource.
- **Code length** — Length of the validation code in the SMS.
- **SMS code characters** — JSON array of allowed characters for the code.
- **SMS code TTL** — How long the code is valid before a new one is generated.
- **SMS send timeout** — Minimum time between two SMS sends.

## Main settings

In the [ePochta dashboard](http://my.epochta.ru/members/settings#sms) enable API 3.0. Choose the sending option; if it uses a sender name, set it in the component settings.

### In component settings

- **SMS sender** — Sender name. Avoid special characters.
- **Private key** — From the dashboard.
- **Public key** — From the dashboard.
- **SMS TTL** — Leave default.
- **Test mode** — When on, messages go to ePochta but are not delivered; set to NO for live SMS.
- **Service URL** — Leave default.

## How it works

To send an SMS:

```php
$ePochta->sendSMS_now($phone, $message, 0)
```

where `$phone` is the number in international format, `$message` is the text, `0` means send immediately.

### Sending SMS

```php
<?php
$message = 'Test';
$phone = 7922; // international format, e.g. 79657008900

$ePochta = $modx->getService('epochta', 'ePochta', $modx->getOption('epochta_core_path', null, $modx->getOption('core_path') . 'components/epochta/') . 'model/epochta/', $scriptProperties);
$ePochta->initialize();
if (!($ePochta instanceof ePochta)) exit('Could not initialize ePochta!');

if (!$ePochta->sendSMS_now($phone, $message, 0)) {
  echo "ERROR!";
}
```

On failure the function returns FALSE and logs details:

```php
[2014-03-11 22:36:53] (ERROR @ /index.php) [ePochta] Error send sms to [7922], text [Test] user_id [2]
...
```

## epValidate snippet

Parameters:

- **tplCheck** — Chunk for the phone validation form.
- **tplExists** — Chunk when the user already has a linked phone (Mobile Phone).

### How it works

Works with logged-in users. If the user has no mobilephone in their profile, the validation form is shown; otherwise `tplExists` is shown.

If there is no number, either the first part of the form (number input) or the second (code input) is shown, depending on the SMS send timeout. A countdown timer is shown for resending the code or changing the number.

The snippet uses processors, which fire:

- `OnBeforeCodeValidate` — before code validation
- `OnAfterCodeValidate` — after successful code validation
- `OnBeforePhoneCheck` — before number validation
- `OnAfterPhoneCheck` — after successful number entry

The default plugin checks phone uniqueness, sends the SMS, and on success updates the profile.
