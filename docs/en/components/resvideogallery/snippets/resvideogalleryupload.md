# ResVideoGalleryUpload

Snippet for adding video from the frontend.

**ResVideoGalleryUpload** outputs a form that lets users add video via Ajax.

## Parameters

| Parameter    | Default                          | Description |
|--------------|----------------------------------|-------------|
| **resource** | Current resource ID              | Resource ID to add video to. |
| **active**   | `1`                              | Video active after add. |
| **onlyAuth** | `1`                              | Show form only to logged-in users. |
| **usergroups** |                                | Comma-separated user groups that can see the form. |
| **multiple** | `1`                              | Allow adding multiple videos at once. |
| **tags**     |                                  | Comma-separated tags added to user-provided tags. |
| **allowTags**|                                  | HTML tags allowed in title/description (strip_tags). |
| **css**      | `{+assets_url}css/web/default.css` | Path to custom CSS, or empty to load manually. |
| **js**       | `{+assets_url}js/web/default.js` | Path to custom JS, or empty to load manually. |

[resVideoGallery frontend add video (old)](https://www.youtube.com/watch?v=9qOR7CXAgl0)
