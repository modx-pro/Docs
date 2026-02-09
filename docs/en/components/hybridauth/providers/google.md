# Google

Getting API keys for Google

## Register an application

- Go to the [Google API Console](https://console.cloud.google.com/apis/dashboard)
- In the top bar, open the project list and create a new project

[![](https://file.modx.pro/files/9/d/b/9db60ff3af0e41b740dcf6550e8218ecs.jpg)](https://file.modx.pro/files/9/d/b/9db60ff3af0e41b740dcf6550e8218ec.png)

- Click **New Project**

[![](https://file.modx.pro/files/2/4/9/249b592da7e7778faf0cb37f2d7bd3d4s.jpg)](https://file.modx.pro/files/2/4/9/249b592da7e7778faf0cb37f2d7bd3d4.png)

- Enter the project name

After creating the project, configure it:

Select **OAuth consent screen**

[![](https://file.modx.pro/files/0/9/d/09d432200aa64aa36d842b0740d07732s.jpg)](https://file.modx.pro/files/0/9/d/09d432200aa64aa36d842b0740d07732.png)

Complete the steps:

### Step 1

[![](https://file.modx.pro/files/9/1/a/91ad745e369a92749eea70026536aac2s.jpg)](https://file.modx.pro/files/9/1/a/91ad745e369a92749eea70026536aac2.png)

### Step 2

[![](https://file.modx.pro/files/9/d/b/9dbbc6a58085c8213dd1732e196ded07s.jpg)](https://file.modx.pro/files/9/d/b/9dbbc6a58085c8213dd1732e196ded07.png)
[![](https://file.modx.pro/files/1/5/6/156cd1d332ea222405099147d39720e7s.jpg)](https://file.modx.pro/files/1/5/6/156cd1d332ea222405099147d39720e7.png)

### Step 3

[![](https://file.modx.pro/files/3/1/5/315d7750d4c67a632f9dac140c1058e8s.jpg)](https://file.modx.pro/files/3/1/5/315d7750d4c67a632f9dac140c1058e8.png)

::: warning Important
The values you add must match the component's system settings. By default there are 2 scopes (enough for user name and email): `"scope":"https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"`
:::

[![](https://file.modx.pro/files/8/d/5/8d5fbbd35b52e9d65a28cb80ba8c8138s.jpg)](https://file.modx.pro/files/8/d/5/8d5fbbd35b52e9d65a28cb80ba8c8138.png)

After selecting the scopes, they appear in the list.

[![](https://file.modx.pro/files/e/e/5/ee5f51ff8f70df84164020f9e5a541d7s.jpg)](https://file.modx.pro/files/e/e/5/ee5f51ff8f70df84164020f9e5a541d7.png)

### Step 4

You can add several test users (email addresses) to test before verifying your project.

[![](https://file.modx.pro/files/d/0/a/d0a1bbf847a791cbfc4e38a856ffb742s.jpg)](https://file.modx.pro/files/d/0/a/d0a1bbf847a791cbfc4e38a856ffb742.png)

On the Summary step, review the data and finish this section.

Next, get the credentials:

Select **Credentials → Create Credentials → OAuth client ID**

[![](https://file.modx.pro/files/9/a/3/9a398e2819a6dbd8c17bfccc117909das.jpg)](https://file.modx.pro/files/9/a/3/9a398e2819a6dbd8c17bfccc117909da.png)

Choose **Web application** and set the redirect URL to `https://domain.com/?hauth.done=Google`

[![](https://file.modx.pro/files/5/2/5/525ce2eb65be6b9a6206074389e4249cs.jpg)](https://file.modx.pro/files/5/2/5/525ce2eb65be6b9a6206074389e4249c.png)

After clicking Create you get the client ID and secret.

[![](https://file.modx.pro/files/a/9/2/a927c716ac2f3e88ab6bd3ccd0b93e36s.jpg)](https://file.modx.pro/files/a/9/2/a927c716ac2f3e88ab6bd3ccd0b93e36.png)

**Enter these in your site's system settings.**

Service-side setup is done at this point.

You can submit the app for verification and publish it (until then, only test users can sign in; others will see an "app not verified" warning).

[![](https://file.modx.pro/files/7/7/f/77fe0def5e9eb76701ca46ea78fdf36bs.jpg)](https://file.modx.pro/files/7/7/f/77fe0def5e9eb76701ca46ea78fdf36b.png)

::: warning Important
To pass verification you must:

- Use the sign-in button style from the [Google Style Guide](https://developers.google.com/identity/branding-guidelines), even if it doesn't match your design
- Link to your privacy policy from every page (especially the homepage)
- Include text similar to this in your privacy policy:

***"By using Google services, you entrust us with your personal information. Google is used for sign-in. For more on Google's Privacy Policy and Terms of Service see [here](https://policies.google.com/privacy)."***
:::
