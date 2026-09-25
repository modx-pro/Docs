---
title: Привязки
description: Сниппеты cdekPayBindings и cdekPayBindingReturn для карты и счёта СБП
---

# Привязки карты и СБП

Пакет хранит привязки в таблице `msp3cdekpay_bindings`. Расписания списаний нет. Список и привязку показывает сниппет для вошедшего пользователя. Гость ничего не видит.

pdoTools 3.x нужен только если задан чанк вывода. Без чанка сниппет рисует простой список: вид привязки, состояние и маска карты.

## cdekPayBindings

| Параметр | Назначение |
| --- | --- |
| `user` | ID пользователя. По умолчанию текущий |
| `tpl` | Чанк pdoTools на строку |
| `action` или POST `cdekpay_action` | `link_card`, `unlink_card`, `link_sbp`, `unlink_sbp` |
| `successUrl`, `failUrl` | Обязательны для привязки карты |
| `request_id` | Снятие карты |
| `subscription_id` | Снятие СБП |

В чанке доступны поля строки: `kind` (`card` или `sbp`), `state`, `masked_pan`, `request_id`, `subscription_id`.

Привязка карты открывает страницу CDEK Pay. Привязка СБП открывает QR. Снятие деактивирует запись.

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

## Списание по сохранённой привязке

Вызовите из своего кода `BindingService::chargeCard($order, $requestId)` или `chargeSbp($order, $subscriptionId)`. После вызова сами запишите попытку оплаты через сервис платежей MiniShop3. Отдельного сниппета и задания по расписанию в пакете нет.
