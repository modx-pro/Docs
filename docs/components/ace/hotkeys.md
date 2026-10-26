---
title: Горячие клавиши
---
# Горячие клавиши

Полный список команд Ace в менеджере: **Ctrl+Alt+H** (на Mac **Command+Option+H**) в фокусе редактора. Emmet добавляет свои пункты в ту же таблицу.

## Ace и пакет

| Сочетание | Действие |
| --- | --- |
| **Ctrl+Alt+H** | Таблица горячих клавиш |
| **Ctrl+Shift+B** | HTML-beautify для любого режима. Отдельного форматирования PHP или CSS нет |
| **Alt+Z** | Вкл/выкл перенос строк (`word_wrap`) |
| **Ctrl+F11** | Полноэкранный режим (Windows/Linux) |
| **Cmd+F12** | Полноэкранный режим (Mac) |
| **Ctrl+Space**, **Ctrl+Shift+Space**, **Alt+Space** | Автодополнение MODX / PHP. Cmd+Space нет |
| **Tab** | Развернуть Tab-сниппет (`ace.snippets`) или отступ |
| **Shift+Ctrl+A** | Emmet: wrap with abbreviation. То же сочетание на Mac |
| **Ctrl+S** / **Cmd+S** | Сохранение формы (в fullscreen с 1.9.10 скрытое поле остаётся в форме) |

## Набор Ace (базовый)

| Сочетание | Действие |
| --- | --- |
| Ctrl+F | Поиск |
| Ctrl+H | Замена |
| Ctrl+L | Перейти к строке. На Windows это окно пакета. На Mac переход к строке: **Command+Option+L** |
| Ctrl+/ | Комментировать |
| Ctrl+D | Удалить строку. На Mac то же делает **Command+D** |
| Ctrl+Alt+→ | Следующее вхождение (`selectMoreAfter`) |
| Ctrl+Alt+↑ / ↓ | Мультикурсор |

Ctrl+G переходом к строке не является. Ориентир: окно **Ctrl+Alt+H**.

## Fullscreen

Ace переносит редактор в `document.body`. У `.ace_maximized` z-index `12000`. Пока JavaScript не посчитал отступы, стоят `top: 60px` и `left: 70px`. Затем отступы берутся из шапки или бокового меню (`#modx-header`) и панели кнопок (`#modx-action-buttons`).

## Связанные разделы

- [Интеграция](integration)
- [Системные настройки](settings)
- [Решение проблем](troubleshooting)
