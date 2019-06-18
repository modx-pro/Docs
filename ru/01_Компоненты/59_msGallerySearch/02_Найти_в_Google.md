Эта кнопка запускает окно для поиска изображений по google картинками и прямой закачики в галерею minishop2 или ms2Gallery

Поиск производить только после прописания API ключа и Индитификатора поисковой системы

Есть ограничение: **максимальное количество запросов в сутки 100 шт.**

*То есть раз в сутки можно отправить 100 запросов (1 запрос 10 изображений)*

У google есть платный тариф  <a target="_blank" href="https://developers.google.com/custom-search/v1/overview">5$ за 1000 запросов</a>, то есть 1000 запросов всего, а не как можно подумать что это на сутки и на целый месяц.

В действии (GIF)
<a rel="fancybox" href="https://file.modx.pro/files/b/9/0/b9084bbfa4b72c4ffce1ba5c47029112.gif"><img src="https://file.modx.pro/files/b/9/0/b9084bbfa4b72c4ffce1ba5c47029112s.jpg" class="fancybox thumbnail"></a>

**Внимание!!! Google кэширует изображения у себя на сервера, так что реальный результат может отличатся. Так же изображения могут быть уже удалены, изменены или вообще может быть не доступен сервер или отключен домен**

### Массовая загрузка

Для массовой загрузки необходимо использовать Shift или Ctrl, затем правой кнопкой мыши и скачать

<img src="https://file.modx.pro/files/c/5/d/c5d820c7ca62135b0b58c6b981cd8942.png" />

### Настройка и получение API ключа и Индитификатора системы

Для работы сервиса требуется получить API ключ и Индитификатор поиска.

Здесь можно <a href="https://developers.google.com/custom-search/v1/overview">получить ключ,</a> нажав на кнопку "GET API KEY": 

<img src="https://file.modx.pro/files/f/7/9/f799bc9b3d50526e8d25308dc7ebcac2.png" class="fancybox thumbnail">

### Инструкция по созданию поисковой системы

Заходим сюда <a target="_blank" href="https://cse.google.com/cse/all">https://cse.google.com/cse/all</a> и нажимаем добавить

<img src="https://file.modx.pro/files/e/5/6/e56bbf262943fd643ef7935bed4002c0.png" class="fancybox thumbnail">

Вводим имя сайта, выбираем язык и жмем **создать**.

<img src="https://file.modx.pro/files/1/5/4/154fd2f2d2394342c6dc71e77b1d151cs.jpg" class="fancybox thumbnail">

Жмем панель управления

<img src="https://file.modx.pro/files/b/6/0/b602bc9c5708ecd6a3b9b4f235061cads.jpg" class="fancybox thumbnail">

Здесь устанавливаем настройки

* Включаем поиск по изображениями
* Включаем поиск по всему интернету
* Удаляем сайты (если они там есть)
* Копируем идентификатор системы поиска

<img src="https://file.modx.pro/files/a/4/f/a4fd801f1003a2fc9c0f63d80b8217c3.png" class="fancybox thumbnail">

### Cистемные настройки

* **msgallerysearch_api_cs**  - Идентификатор поисковой системы
* **msgallerysearch_api_key** - Ключ API полученый на <a href="https://developers.google.com/custom-search/v1/overview">странице</a>

<img src="https://file.modx.pro/files/c/d/5/cd58a02124eb2e909d7dca612158002as.jpg" class="fancybox thumbnail">

Дополнительно сделано чтобы запросы кэшировались, чтобы при повторном обращении был тот же результат, для уменьшения количества используемых запросов.
