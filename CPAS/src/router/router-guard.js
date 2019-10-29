import store from '../store';

export default {
  // Check cookies
  isLoginExpired(accessToken) {
    let isExpired = true;
    // If access token is not expired
    if (accessToken) {
      isExpired = false;
    }
    return isExpired;
  },
  initUserLogin(accessToken) {
    let isValid = false;
    const info = localStorage.getItem('userInfo');
    if (accessToken && info) {
      isValid = true;
      store.dispatch('user/setToken', accessToken);
      store.dispatch('user/login', JSON.parse(info));
    } else {
      isValid = false;
    }
    return isValid;
  }
};
