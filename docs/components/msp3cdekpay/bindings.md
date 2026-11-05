---
title: Привязки
description: Сниппеты cdekPayBindings и cdekPayBindingReturn для карты и счёта СБП
---

# Привязки карты и СБП

Пакет сохраняет привязки в таблице `msp3cdekpay_bindings`. Расписания списаний не предусмотрены. Список и привязку показывает сниппет для вошедшего пользователя. Гость ничего не видит.

Сниппет `cdekPayBindings` обращается к pdoTools только если задан чанк `tpl`. Без чанка сниппет выводит простой список: вид привязки, состояние и маска карты. Установщик pdoTools не требует.

## cdekPayBindings

<!-- MEDIA: screenshot-admin | must | Пример списка привязок в пользовательском кабинете: таблица с колонками «Вид», «Состояние», «Маска карты», кнопки «Удалить»/«Привязать» для карты и СБП | Тестовый стенд: пользователь входит в аккаунт, открывает страницу привязок, видит список -->

| Параметр | Назначение |
| --- | --- |
| `user` | ID пользователя. По умолчанию текущий |
| `tpl` | Чанк pdoTools на строку |
| `action` или POST `cdekpay_action` | `link_card`, `unlink_card`, `link_sbp`, `unlink_sbp` |
| `successUrl`, `failUrl` | Обязательны для привязки карты |
| `request_id` | Снятие карты |
| `subscription_id` | Снятие СБП |

В чанке доступны поля строки: `kind` (`card` или `sbp`), `state`, `masked_pan`, `request_id`, `subscription_id`.

Привязка карты открывает страницу CDEK Pay. Привязка СБП отображает QR‑код на 15 минут (время фиксировано). Настройка `msp3cdekpay_qr_life_time` при привязке СБП пакет **не** читает и не влияет на длительность QR‑кода.

::: code-group

```fenom
{'!cdekPayBindings' | snippet : [
  'tpl' => 'cdekpay.binding.row',
  'successUrl' => $_modx->makeUrl(12),
  'failUrl' => $_modx->makeUrl(13)
]}
```

```modx
[[!cdekPayBindings?
  &tpl=`cdekpay.binding.row`
  &successUrl=`[[~12]]`
  &failUrl=`[[~13]]`
]]
```

:::

Номера `12` и `13` замените на свои страницы возврата.

## cdekPayBindingReturn

Поставьте сниппет на страницы, куда CDEK Pay возвращает покупателя. Он обновляет карту по `request_id` или счёт СБП по `subscription_id`. Параметр можно передать в вызове или в адресе.

| Параметр | Назначение |
| --- | --- |
| `request_id` | Обновить карту |
| `subscription_id` | Обновить СБП |
| `successTpl` | Текст после обновления |
| `failureTpl` | Текст, если обновление не прошло |

`successTpl` и `failureTpl` сниппет выводит как есть. Чтобы показать чанк, вложите его вызов в параметр.

::: code-group

```fenom
{'!cdekPayBindingReturn' | snippet}
```

```modx
[[!cdekPayBindingReturn]]
```

:::

## Как списать по привязке

Вызовите из своего кода `BindingService::chargeCard($order, $requestId)` или `chargeSbp($order, $subscriptionId)`. После вызова сами запишите попытку оплаты через сервис платежей MiniShop3. Отдельного сниппета и задания по расписанию в пакете нет.
