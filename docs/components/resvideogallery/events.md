# События

Доступны следующие события:

- **rvgOnBeforeVideoAdd**
  - `properties` - параметры  запроса
- **rvgOnAfterVideoAdd** - добавление видео
  - `video` - экземпляр класса RvgVideos
  - `properties` - параметры  запроса
- **rvgOnBeforeVideoUpdate**
- **rvgOnAfterVideoUpdate** - обновление видео
  - `video` - экземпляр класса RvgVideos
  - `properties` - параметры  запроса
- **rvgOnBeforeVideoRemove**
- **rvgOnAfterVideoRemove** - удаление видео
  - `video` - экземпляр класса RvgVideos
- **rvgOnBeforeThumbUpdate**
- **rvgOnAfterThumbUpdate** - обновление превью для видео
  - `properties` - параметры  запроса
  - `video` - экземпляр класса RvgVideos
- **rvgOnGetVideoEmbed** - получения кода вставки видео
  - `data` - массив данных о видео
