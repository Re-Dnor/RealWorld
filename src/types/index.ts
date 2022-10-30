export interface User {
  bio: string
  following: boolean
  image: string
  username: string
}

export interface Article {
  author: User
  body: string
  createdAt: string
  description: string
  favorited: boolean
  favoritesCount: number
  slug: string
  tagList: string[]
  title: string
  updatedAt: string
}

export interface currentArticle {
  [key: string] : string
}

export interface AuthorComments {
  username: string,
  image: string,
  bio: null,
  following: boolean,
}

export interface Comments {
  id: number,
  createdAt: Date,
  updatedAt: Date,
  body: string,
  author: AuthorComments
}

export interface commentsState {
  comments: Comments[];
  loading: boolean;
}

export type LoginData = {
  email: string,
  password: string
};

export type SignupData = {
  username: string;
  email: string;
  password: string;
};

export interface authState {
  login: string;
  email: string;
  token: string;
  image: string;
  authorization: boolean;
}

