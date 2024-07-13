export type UrlBody = {
  originalURL: string;
};

export type UrlFormatted = UrlBody & {
  shortURL: string;
  user?: string;
};
