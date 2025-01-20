import { Auth } from '../component/auth';
import { Header, Payload } from '../component/token'

export const isValidToken = (): boolean => {
  if (getToken() !== null) {
    var expiration: string = new Date(getPayload().exp).getTime().toString().concat('000')
    return (new Date(Number(expiration)).getTime() > new Date().getTime())
  } else {
    return false
  }
}

export const decodeJwt = () => {
  if (getToken() !== null) {
    var base64Url = getToken().accessToken.split(".")[1];
    var base64 = decodeURIComponent(atob(base64Url).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
    return base64
  } else {
    return null
  }
}

export const getToken = (): Auth => {
  return JSON.parse(`${localStorage.getItem(`token`)}`);
}

export const setToken = (token: any): void => {
  localStorage.setItem(`token`, JSON.stringify(token));
}

export const removeToken = () => {
  localStorage.clear()
  window.location.reload()
}

export const getHeader = (): Header => {
  if (getToken() !== null) {
    var base64 = getToken().accessToken.split('.')[0].replace(/-/g, '+').replace(/_/g, '/');
    var header = decodeURIComponent(window.atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(header);
  } else {
    let error: Header = { alg: '', typ: '' }
    return error
  }
}

export const getPayload = (): Payload => {
  if (getToken() !== null) {
    var base64 = getToken().accessToken.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    var payload = decodeURIComponent(window.atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(payload);
  } else {
    let error: Payload = { jti: '', iss: '', iat: '', nbf: '', exp: '', sub: '', aud: '' }
    return error
  }
}