export type Url = {
  originalURL: string
  shortURL: string
  user?: string
}

export type UrlFromDB = Url & {
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
}
