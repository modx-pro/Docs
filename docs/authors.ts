import authors from './authors.json'

export interface Author {
  name: string
  github: string
  avatar: string
}

const authorsList: Record<string, Author> = {}

for (const [key, value] of Object.entries(authors)) {
  authorsList[key] = {
    name: value,
    github: `https://github.com/${key}`,
    avatar: `https://github.com/${key}.png`,
  }
}

export { authorsList as authors }
