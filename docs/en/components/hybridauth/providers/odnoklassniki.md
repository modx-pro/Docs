# Odnoklassniki

## Getting API keys in Odnoklassniki

- [Register on Odnoklassniki.][1]
- [Register as developer.][2]
- [Register an application.][3]
- Fill in **Name**, **Short name (Latin)**.
- Set **Application type: External** (External application).
- Set **Application URL**.
- Save.

You will receive by email:

- Application ID: `123456789`.
- Application public key: `ABCDEFGHIJKLMNOPQ`.
- Application secret key: `ABCDEFGHIJKLMNOPQ1234A12`.

Enter them in system settings under **ha.keys.Odnoklassniki**

```json
{"keys":
  {
    "id": "123456789",
    "key": "ABCDEFGHIJKLMNOPQ",
    "secret": "ABCDEFGHIJKLMNOPQ1234A12"
  },
  "scope": "VALUABLE_ACCESS;LONG_ACCESS_TOKEN"
}
```

[1]: https://ok.ru/dk?st.cmd=anonymMain&st.registration=on
[2]: https://ok.ru/devaccess
[3]: https://ok.ru/dk?st.cmd=appEditBasic
