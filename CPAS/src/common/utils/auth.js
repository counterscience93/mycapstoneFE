var jwtDecode = require('jwt-decode');

const TOKEN_KEY = 'access-token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  return localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken() {
  return localStorage.removeItem(TOKEN_KEY);
}

export function decodeToken(token) {
  return jwtDecode(token);
}
