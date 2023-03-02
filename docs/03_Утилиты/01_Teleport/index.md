Teleport является расширяемым скриптовым инструментом для работы с одной или несколькими локальными (не облачными) установками MODx Revolution.

Teleport в настоящее время функционирует приемущественно в качестве упаковочного инструмента который расширяет Транспортный API MODX'а и даёт команды для извлечения и инъекций кастомных Слепков сайтов на MODX. Но он может быть легко расширен для выполнения бесконечного множества действий, связанных с MODX.


## Требования

Для того, чтобы использовать телепорт, ваша рабочая среда должна, по крайней мере соответствовать следующим требованиям:

* PHP >= 5.4
* MODX Revolution >= 2.1 (MySQL)

Вы также должны иметь возможность запускать PHP с помощью CLI SAPI.

_ПРИМЕЧАНИЕ: В настоящее время, все варианты шаблонов извлечения Teleport поддерживают только MySQL инсталяции MODX Revolution._

Использование в среде Linux с расширением PHP POSIX может дать возможность использовать передовые функции переключения пользователелей.

Teleport стремится быть мультиплатформенным инструментом, и в настоящее время работает одинаково хорошо и в Linux и в OS X окружении. Поддержка на платформе Windows в настоящее время неизвестна - требуются разработчики в среде Windows.


## Установка

Есть несколько методов установки Teleport. Самый простой пууть начать - это установка PHAR дистрибутива Teleport.

_ВАЖНО: Используя любой из способов установки, убедитесь, что вы выполняете Teleport под тем же пользователем, под которым работает PHP когда исполняется веб-сервром. В противном случае может ваш MODx сайт может быть повреждён путем инъекии и/или кэширования файлов с некорректным владельцем файлов._

### Скачивание и установка Phar

Создайте рабочую директорию для Teleport'а и перейдите в неё:
```
mkdir ~/teleport/ && cd ~/teleport/
```
Скачайте последнюю версию [teleport.phar][1] дистрибутива Teleport в вашу рабочую директорию Teleport'а.

Создайте **Профиль** MODX сайта:
```
php teleport.phar --action=Profile --name="MyMODXSite" --code=mymodxsite --core_path=/path/to/mysite/modx/core/ --config_key=config
```
**Извлеките Слепок** MODX сайта который вы только что _профилировали_:
```
php teleport.phar --action=Extract --profile=profile/mymodxsite.profile.json --tpl=phar://teleport.phar/tpl/develop.tpl.json
```

### Другие методы установки

Как вариат, вы можете установить Teleport из исходников с использованием [Composer'а][9]. Изучите больше об использовании [git clone][7] или [release archive][8].

*ВАЖНО: Если вы хотите использовать Teleport HTTP Server вы не можете использовать дистрибутив Phar. Вам ПРИДЁТСЯ использовать один из других методов установки.*

### Teleport в вашем PATH

С любым типом установки вы можете создать исполнимую символьную ссылку и назвать её **teleport** указывающую на bin/teleport, или прямо на teleport.phar. Вы сможете просто писать `teleport` вместо `bin/teleport` или `php teleport.phar` для вызова приложения teleport.


## Базовое использование

Во всех случаях используйте teleport, в зависимости от того, как вы установили приложение. Например, если вы установили из исходников, пишите `bin/teleport` вместо `php teleport.phar`; если вы создали символьную ссылку на teleport.phar, пишите `teleport` вместо `php teleport.phar` во всех примерах команд. Последующие примеры предполагают, что вы установили дистрибутив teleport.phar.

*ПРИМЕЧАНИЕ: **Перед** использованием Teleport на сайте MODX, вам необходимо **создать Teleport Профиль** из существующего сайта.*

### Создание Профиля сайта MODX

Вы можете создать Teleport Профиль любого существующего сайта MODX с помощью следующей команды:
```
php teleport.phar --action=Profile --name="MySite" --code=mysite --core_path=/path/to/mysite/modx/core/ --config_key=config
```
Результирующий файл будет расположен в `profile/mysite.profile.json` и затем может быть использован для команды Извлечения или Инъекции в другой сайт, не тот который был использован для создания профиля.

Более подробно [Teleport Профили][2].

### Извлечение Слепка сайта MODX

Вы можете извлечь Teleport Слепок из сайта MODX используя следующую команду:
```
php teleport.phar --action=Extract --profile=profile/mysite.profile.json --tpl=phar://teleport.phar/tpl/develop.tpl.json
```
Слепок, в случае успешного создания, будет расположен в директории `workspace/`.

Вы также можете Извлечь Teleport Слепок и отправить в любой валидный поток назначения (push) используюя следующую команду:
```
php teleport.phar --action=Extract --profile=profile/mysite.profile.json --tpl=phar://teleport.phar/tpl/develop.tpl.json --target=s3://mybucket/snapshots/ --push
```
В любом случае, абсолютный путь к Слепку возвращается в процессе в качестве результата выполнения команды. Вы можете использовать этот путь в качестве источника для Инъекции.

*ПРИМЕЧАНИЕ: Копия workspace удаляется, после отправки в поток назначения (push) если только вы не укажете ключ `--preserveWorkspace` в качестве параметра CLI консольной команды.*

Читайте подробнее о действии [Teleport Извлечения][3].

### Инъекция Слепка в сайт MODX

Вы можете выполнить Инъекцию Teleport Слепка из любого валидного потокового источника в сайт MODX используя следующую команду:
```
php teleport.phar --action=Inject --profile=profile/mysite.profile.json --source=workspace/mysite_develop-120315.1106.30-2.2.1-dev.transport.zip
```
*ПРИМЕЧАНИЕ: Если Источник не находится в директории `workspace/` копия будет вытянута (pull) в неё  и затем удалена по окончанию операции инъекции если только вы не укажете ключ `--preserveWorkspace`.*

Читайте подробнее о действии [Teleport Инъекции][5].

### Создание Пользователя

Вы можете создать пользователя в профилированном сайте MODX используя следующую команду:
```
php teleport.phar --action=UserCreate --profile=profile/mysite.profile.json --username=superuser --password=password --sudo --active --fullname="Test User" --email=testuser@example.com
```
*ПРИМЕЧАНИЕ: Она использует процессор `security/user/create` сайта в указанном профиле для создания пользователя, и действие принимает все параметры, которые принимает данный процессор.*

Читайте подробнее о действии [Teleport Создание Пользователя][4].


## Как Начать

Как Начать использовать Teleport [читайте подробнее][6].

## Лицензия

Teleport is Copyright (c) MODX, LLC

Для полной информации об авторском праве и лицензии смотрите "LICENSE" файл, который распространяется с этим кодом.


[1]: http://modx.s3.amazonaws.com/releases/teleport/teleport.phar
[2]: https://github.com/modxcms/teleport/blob/master/doc/use/profile.md
[3]: https://github.com/modxcms/teleport/blob/master/doc/use/extract.md
[4]: https://github.com/modxcms/teleport/blob/master/doc/use/user-create.md
[5]: https://github.com/modxcms/teleport/blob/master/doc/use/inject.md
[6]: /ru/03_Утилиты/01_Teleport/01_Использование.md
[7]: https://github.com/modxcms/teleport/blob/master/doc/doc/install/git-clone.md
[8]: https://github.com/modxcms/teleport/blob/master/doc/doc/install/releases.md
[9]: http://getcomposer.org/