const lexicon = {
  ru: {
    label: 'Русский',
    choose: 'Выберите язык',
    chooseTemplate: 'Выберите шаблон документации',
    chooseDocLangs: 'Выберите языковые версии документации',
    name: {
      label: 'Введите название компонента',
      error: {
        required: 'Пожалуйста, введите название компонента',
        format: 'Имя компонента может содержать только буквы и цифры',
      },
    },
    error: {
      required: 'Вам необходимо выбрать хотя бы одну языковую версию',
    },
    template: {
      landing: 'Одностраничная документация',
      multi: 'Многостраничная документация',
    },

    placeholders: {
      quickStart: 'Быстрый старт',
      events: 'События',
      interface: 'Интерфейс',
      items: 'Элементы',
      categories: 'Категории',
      snippets: 'Сниппеты',
      pathPrefix: '',
    },
  },
  en: {
    label: 'English',
    choose: 'Choose language',
    chooseTemplate: 'Choose documentation template',
    chooseDocLangs: 'Select the language versions of the documentation',
    name: {
      label: 'Enter the component name',
      error: {
        required: 'Please, enter the component name',
        format: 'Component name can only contain letters and numbers',
      },
    },
    error: {
      required: 'You must select at least one language version',
    },
    template: {
      landing: 'Single-page documentation',
      multi: 'Multi-page documentation',
    },

    placeholders: {
      quickStart: 'Quick start',
      events: 'Events',
      interface: 'Interface',
      items: 'Items',
      categories: 'Categories',
      snippets: 'Snippets',
      pathPrefix: '/en',
    },
  },
}

const langKeys = Object.keys(lexicon)

export default function (plop) {
  /** @type {import('plop').NodePlopAPI} */

  plop.setGenerator('component', {
    prompts: [
      {
        name: 'language',
        type: 'list',
        message: langKeys.map(lang => lexicon[lang].choose).join(' / '),
        choices: langKeys.map(lang => ({ name: lexicon[lang].label, value: lang })),
      },
      {
        name: 'template',
        type: 'list',
        message: ({ language }) => lexicon[language].chooseTemplate,
        choices: ({ language }) => Object.entries(lexicon[language].template).map(([value, name]) => ({ name, value })),
      },
      {
        type: 'input',
        name: 'name',
        message: ({ language }) => lexicon[language].name.label,
        validate: (value, { language }) => {
          if (!value) {
            return lexicon[language].name.error.required
          }

          if (!value.match(/^[a-zA-Z0-9]*$/)) {
            return lexicon[language].name.error.format
          }

          return true
        },
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: ({ language }) => lexicon[language].chooseDocLangs,
        choices: langKeys.map((value, index) => ({
          name: lexicon[value].label,
          value,
          checked: index === 0,
        })),
        validate: (value, { language }) => !value.length ? lexicon[language].error.required : true,
        loop: true,
      },
    ],
    actions: ({ languages, template }) => {
      const actions = []

      languages.forEach(lang => {
        const prefix = lang !== 'ru' ? `${lang}/` : ''

        switch (template) {
          case 'landing':
            actions.push({
              type: 'add',
              path: `docs/${prefix}components/{{lowerCase name}}.md`,
              templateFile: 'plop-templates/landing.md',
              abortOnFail: false,
            })
            break
          case 'multi':
            actions.push({
              type: 'addMany',
              templateFiles: '**/*.*',
              base: 'plop-templates/multi/',
              destination: `docs/${prefix}components/{{lowerCase name}}/`,
              data: lexicon[lang].placeholders,
              abortOnFail: false,
            })
            break
        }
      })

      return actions
    },
  })
}
