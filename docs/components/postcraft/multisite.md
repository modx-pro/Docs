# Несколько сайтов

Одна копия PostCraft может слать письма от имени нескольких доменов. Админка и база рассылок живут на одном сайте, это **hub**. Остальные домены работают как **edge**: принимают переходы из писем и пересылают их на hub.

## Как PostCraft выбирает сайт

Сайт письма определяется по домену ящика «От кого». Письмо от `news@shop.example.org` ведёт на `https://shop.example.org/mail/…`, `…/unsubscribe/…` и `…/t.php`. Получатель видит в ссылках тот же домен, что в адресе отправителя.

## Каталог сайтов

Сайты перечислены в системной настройке `postcraft_sites` (JSON). При установке PostCraft записывает туда текущий сайт под ключом `main`. Второй домен добавьте вручную:

```json
{
  "main": {
    "label": "example.com",
    "base": "https://example.com",
    "domains": ["example.com", "www.example.com"],
    "langs_source": "contexts"
  },
  "shop": {
    "label": "shop.example.org",
    "base": "https://shop.example.org",
    "domains": ["shop.example.org"],
    "langs": [
      {"key": "ru", "label": "Русский"},
      {"key": "en", "label": "English", "home": "https://shop.example.org/en/"}
    ]
  }
}
```

| Ключ | Значение |
|---|---|
| `label` | название в списках админки |
| `base` | адрес сайта для ссылок в письме |
| `domains` | домены email, которые относятся к этому сайту |
| `langs_source` | `contexts`: языки берутся из контекстов MODX этого сайта |
| `langs` | языки edge-сайта вручную: ключ, название и при необходимости адрес главной |

Затем добавьте ящик с адресом на этом домене. Страницы отписки для нового сайта появятся на вкладке «Страница отписки».

## Edge на MODX

Если второй домен тоже на MODX:

1. Установите на него пакет PostCraft.
2. В системных настройках edge укажите `postcraft_role` = `edge`, `postcraft_hub_url` = адрес hub, например `https://example.com`.
3. Скопируйте в `postcraft_edge_secret` значение этой же настройки с hub.

Плагин PostCraft на edge перехватит `/mail/…` и `/unsubscribe/…`, а `t.php` перешлёт трекинг на hub.

## Edge без MODX

Для сайта на другой CMS или статического сайта в пакете есть отдельный клиент `assets/components/postcraft/edge-standalone/`:

1. Скопируйте папку на второй сайт по тому же пути.
2. Создайте `config.php` из `config.sample.php`:

    ```php
    return array(
        'hub_url' => 'https://example.com',
        'site' => 'shop',
        'secret' => 'значение postcraft_edge_secret с hub',
    );
    ```

3. Добавьте правила из `htaccess.snippet` в корневой `.htaccess` сайта (Apache).

## Безопасность

Edge подписывает каждый запрос к hub через HMAC с общим секретом и меткой времени. Hub принимает запросы только с верной подписью, обработчик на hub: `assets/components/postcraft/edge.php`. Секрет PostCraft создаёт при установке. Если он утёк, задайте новый на hub и на всех edge.
