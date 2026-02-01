# Events

Available events:

- **rvgOnBeforeVideoAdd**
  - `properties` - request params
- **rvgOnAfterVideoAdd** - video added
  - `video` - RvgVideos instance
  - `properties` - request params
- **rvgOnBeforeVideoUpdate**
- **rvgOnAfterVideoUpdate** - video updated
  - `video` - RvgVideos instance
  - `properties` - request params
- **rvgOnBeforeVideoRemove**
- **rvgOnAfterVideoRemove** - video removed
  - `video` - RvgVideos instance
- **rvgOnBeforeThumbUpdate**
- **rvgOnAfterThumbUpdate** - video thumbnail updated
  - `properties` - request params
  - `video` - RvgVideos instance
- **rvgOnGetVideoEmbed** - video embed code
  - `data` - video data array
