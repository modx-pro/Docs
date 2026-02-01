# Component settings

## Main settings

| Name                       | Default                    | Description                                                                    |
| ------------------------------ | ------------------------------- | --------------------------------------------------------------------------- |
| **cityfields_active**          | `Yes`                            | Enables the component                                                  |
| **cityfields_cityindomain**    | `No`                           | Enables city detection by full domain or subdomain                 |
| **cityfields_cityinsubfolder** | `No`                           | Enables city detection by subdirectories                                 |
| **cityfields_default_city**    | `1`                             | Default city ID                                                      |
| **cityfields_frontend_css**    | `[[+cssUrl]]web/cityfields.css` | Path to CSS file for the frontend                 |
| **cityfields_frontend_js**     | `[[+jsUrl]]web/cityfields.js`   | Path to JavaScript file for the frontend        |
| **cityfields_placeholders**    | `Yes`                            | Enables writing all data for the selected city to placeholders |
| **cityfields_prefix**          | `cf.`                           | This prefix is prepended to placeholder names            |

## Geolocation

| Name                       | Default                                               | Description                                                                    |
| ------------------------------ | ---------------------------------------------------------- | --------------------------------------------------------------------------- |
| **cityfields_gl_active**       | `Yes`                                                         | Enables city detection by IP and automatic redirect     |
| **cityfields_gl_exclude**      | `YandexBot, YandexAccessibilityBot, ...` | For these user agents, city detection by IP and automatic redirect are disabled. Enter agents on one line, comma-separated |
