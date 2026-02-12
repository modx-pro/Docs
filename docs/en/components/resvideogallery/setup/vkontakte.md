# VKontakte

1. Sign up and log in to VKontakte.
2. Open the [App Manager](https://vk.com/apps?act=manage).
3. Create an app in VK. Set a name and choose **Standalone** type.
4. Enable the app by changing the *State* select and save.
5. Go to settings and copy the app ID. Replace {APP_ID} in `https://oauth.vk.com/authorize?client_id={APP_ID}&scope=offline,video&redirect_uri=https://oauth.vk.com/blank.html&display=page&v=5.73&response_type=token` and open in browser.
6. Click Allow in the dialog.
7. You'll get a URL like `https://oauth.vk.com/blank.html#access_token=...&expires_in=0&user_id=...` — copy the access_token. If you see `{"error":"invalid_request","error_description":"Security Error"}`, log out of VK and log in again.
8. In MODX: System Settings → ResVideoGallery, paste the access_token into "Access Token for VKontakte".
