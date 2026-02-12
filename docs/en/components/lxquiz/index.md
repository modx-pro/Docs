---
title: LxQuiz
description: Quick integration of quizzes for logged-in users
logo: https://modstore.pro/assets/extras/lxquiz/logo-lg.jpg
author: azernov
modstore: https://modstore.pro/packages/users/lxquiz

items: [
  { text: 'Snippet LxQuiz', link: 'snippets/lxquiz' },
  { text: 'Snippet LxQuizList', link: 'snippets/lxquizlist' },
]
---
# LxQuiz — overview and quick start

LxQuiz adds quizzes to your site for logged-in users, out of the box.

Questions can be single-answer (radio) or multiple-choice (checkboxes).

After passing a quiz you can send the user to any URL.

## Quick start

1. Install the component via the package manager
2. In **Packages → LxQuiz → All quizzes** create a new quiz
    - Set how many retake attempts the user has
    - Set how long the user must wait before retaking after using all attempts
    - Set the minimum score to pass
3. Add questions to the quiz
    - Choose answer type (single or multiple choice)
4. Add answer options
    - Set points for each option (negative for wrong answers)
5. Add this to a page (Fenom must be enabled):

```fenom
{'!LxQuiz' | snippet: [
  'quizId' => 1,
  'nextStepName' => 'Home page',
  'nextStepUrl' => $_modx->config.site_url,
  'closeUrl' => $_modx->config.site_url
]}
```
