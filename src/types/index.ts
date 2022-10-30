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

export interface CurrentArticle {
  [key: string] : string
}

export interface Comment {
  id: number,
  createdAt: Date,
  updatedAt: Date,
  body: string,
  author: User
}

export interface CommentsState {
  comments: Comment[];
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

export interface AuthState {
  login: string;
  email: string;
  token: string;
  image: string;
  authorization: boolean;
}

