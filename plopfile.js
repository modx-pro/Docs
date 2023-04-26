export default function (plop) {
  /** @type {import('plop').NodePlopAPI} */
  plop.setGenerator('basics', {
    description: 'Создание документации компонента',
    prompts: [
      {
        type: 'list',
        name: 'lang',
        message: 'Выберите язык / Choose language',
        choices: [
          {
            name: 'Русский',
            value: 'ru',
          },
          {
            name: 'English',
            value: 'en',
          },
        ],
        default: 'ru',
      },
      {
        type: 'input',
        name: 'name',
        message: ({ lang }) => lang === 'en' ? 'Enter the component name' : 'Введите название компонента',
        validate: (value, { lang }) => {
          if (!value) {
            return lang === 'en' ? 'Please, enter the component name' : 'Пожалуйста, введите название компонента'
          }

          if (!value.match(/^[a-zA-Z0-9]*$/)) {
            return lang === 'en' ? 'Component name can only contain letters and numbers' : 'Имя компонента может содержать только буквы и цифры'
          }

          return true
        },
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: ({ lang }) => lang === 'en' ? 'Select the language versions of the documentation' : 'Выберите языковые версии документации',
        choices: ['ru', 'en'],
        default: ['ru'],
        validate: value => !value.length ? 'Пусто' : true,
      },
    ],
    actions: [
      {
        type: 'add',
        name: 'ru',
        path: 'docs/components/{{lowerCase name}}/index.md',
        templateFile: 'plop-templates/index.md',
        skip: ({ languages }) => !languages.includes('ru') && '',
        abortOnFail: false,
      },
      {
        type: 'add',
        name: 'en',
        path: 'docs/en/components/{{lowerCase name}}/index.md',
        templateFile: 'plop-templates/index.md',
        skip: ({ languages }) => !languages.includes('en') && '',
        abortOnFail: false,
      },
    ]
  })
}
