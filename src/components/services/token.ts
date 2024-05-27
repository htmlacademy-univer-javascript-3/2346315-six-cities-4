const TOKEN_KEY = 'six-cities-token';

export type Token = string;

export const retrieveToken = (): Token => localStorage.getItem(TOKEN_KEY) || '';

export const saveToken = (token: Token): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};