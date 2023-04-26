const lexicon = {
  label: 'Русский / English',
  choose: 'Выберите язык / Choose language',
  chooseDoc: 'Выберите языковые версии документации / Select the language versions of the documentation',
  name: {
    label: 'Введите название компонента / Enter the component name',
    error: {
      required: 'Пожалуйста, введите название компонента / Please, enter the component name',
      format: 'Имя компонента может содержать только буквы и цифры / Component name can only contain letters and numbers',
    },
  },
  error: {
    required: 'Вам необходимо выбрать хотя бы одну языковую версию / You must select at least one language version',
  },
  template: {
    landing: 'Одностраничная документация / Single-page documentation',
    multi: 'Многостраничная документация / Multi-page documentation',
  },
}

const placeholders = {
  ru: {
    quickStart: 'Быстрый старт',
    events: 'События',
    interface: 'Интерфейс',
    items: 'Элементы',
    categories: 'Категории',
    snippets: 'Сниппеты',
    pathPrefix: '',
  },
  en: {
    quickStart: 'Quick start',
    events: 'Events',
    interface: 'Interface',
    items: 'Items',
    categories: 'Categories',
    snippets: 'Snippets',
    pathPrefix: '/en',
  },
}

const langKeys = Object.keys(placeholders)

export default function (plop) {
  /** @type {import('plop').NodePlopAPI} */

  const prompts = [
    {
      type: 'input',
      name: 'name',
      message: lexicon.name.label,
      validate: value => {
        if (!value) {
          return lexicon.name.error.required
        }

        if (!value.match(/^[a-zA-Z0-9]*$/)) {
          return lexicon.name.error.format
        }

        return true
      },
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: lexicon.chooseDoc,
      choices: langKeys.map((value, index) => ({
        name: value,
        value,
        checked: index === 0,
      })),
      validate: value => !value.length ? lexicon.error.required : true,
      loop: true,
    },
  ]

  plop.setGenerator('multi', {
    description: lexicon.template.multi,
    prompts,
    actions: langKeys.map((lang, index) => ({
      type: 'addMany',
      templateFiles: '**/*.*',
      base: 'plop-templates/multi/',
      destination: `docs/${index > 0 ? lang + '/' : ''}components/{{lowerCase name}}/`,
      data: placeholders[lang],
      skip: ({ languages }) => !languages.includes(lang) && '',
      abortOnFail: false,
    })),
  })

  plop.setGenerator('landing', {
    description: lexicon.template.landing,
    prompts,
    actions: langKeys.map((lang, index) => ({
      type: 'add',
      path: `docs/${index > 0 ? lang + '/' : ''}components/{{lowerCase name}}.md`,
      templateFile: 'plop-templates/landing.md',
      skip: ({ languages }) => !languages.includes(lang) && '',
      abortOnFail: false,
    })),
  })
}
