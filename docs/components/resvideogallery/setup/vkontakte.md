# Вконтакте

- Регистрируемся в Вконтакте, авторизовываемся.
- Менеджер приложений находится [тут](https://vk.com/apps?act=manage), переходим.
- Создаем приложение в Вк.
- Указываем название, выбираем тип приложения **Standalone**.
- Включаем приложение, изменив селект *Состояние* и сохраняем изменения.
- Переходим в настройки и копируем ID приложения. Заменяем {ID приложения} в строке `https://oauth.vk.com/authorize?client_id={ID приложения}&scope=offline,video&redirect_uri=https://oauth.vk.com/blank.html&display=page&v=5.73&response_type=token` на наш ID приложения и вставляем в строку броузера.
- В появившемся окне нажимаем разрешить.
- Получаем строку следующего вида `https://oauth.vk.com/blank.html#access_token=349252841f7c58495dd5692d8b55ab6460ec23aa60dsfdsfdsfdsfdsfdsfdsfsdfsdfsddfsddfcx&expires_in=0&user_id=30314063` копируем access_token в блокнотик. Если  появляется ошибка вида  `{"error":"invalid_request»,»error_description":"Security Error"}` необходимо  выйти из  своего аккаунта  ВКонтакте и снова в нем авторизоваться.
- Теперь открываем наш сайт. Переходим в Системные настройки / ResVideoGallery и прописываем скопированное значение access_token в опцию "Access Token для Вконтакте".
