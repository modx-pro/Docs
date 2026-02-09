# GoogleSheets authorization

## 1. [Create a project](https://console.developers.google.com/)

![](https://file.modx.pro/files/a/1/6/a16ee1bb99cab1dd757099e227c43a84.jpg)

## 2. Create API credentials

- Go to APIs & Services
- Click Credentials
- Go to the OAuth consent screen tab
- Enter an application name and save it

![](https://file.modx.pro/files/0/9/7/09752d28e9021f884bfc254baa42e7f9.jpg)

- Create credentials (in the dropdown choose "OAuth client ID"):

![](https://file.modx.pro/files/e/1/2/e129a80cadaf7262a215d5f391a8a246.jpg)

- Choose application type: "Other"

![](https://file.modx.pro/files/7/2/3/723ec5b465baab2d119ac843f04c0b47.jpg)

- Click Create
- You get **client_id** (Client ID) and **client_secret** (Client secret)

![](https://file.modx.pro/files/6/f/2/6f253887224cf09978ed16578cd56c64.jpg)

- Copy the values into system settings: **googlesheets_client_id** and **googlesheets_client_secret**
- Go to API Library and enable Google Sheets API

![](https://file.modx.pro/files/a/6/3/a6324668770949c65f8176c9de8c2e26.jpg)

## 3. Authorize

- Open the component menu: Apps -> GoogleSheets
- Click **Authorization** on the right
- A new tab opens to get the authorization code (if it doesn't open, allow pop-ups)
- Copy the authorization code into the **googlesheets_auth_code** system setting
- Click **Authorization** again
- If you don't see a success message, something went wrong or a step was missed.
