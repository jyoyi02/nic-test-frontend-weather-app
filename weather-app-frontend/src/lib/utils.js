import Cookies from 'js-cookie';

export const getCookie = (key) => Cookies.get(key);

export const setCookie = (key, value, days=7) => Cookies.set(key, value, { expires: days, path: '/' });

export const deleteCookie = (key) => Cookies.remove(key, { path: '/' });

export const setLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key));