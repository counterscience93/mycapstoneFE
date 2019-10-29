<template>
  <div class="user-dropdown-container">
    <div class="user-dropdown-item" @click="signOut">
      <font-awesome-icon icon="sign-out-alt" class="logout-icon mr-2" />
      Sign out
    </div>
  </div>
</template>

<script>
import store from '../../store';
import CommonUtil from '../utils/common-util';
import CommonConstant from '../constant/common-constant';
import UrlConstant from '../constant/common-url';
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    signOut() {
      CommonUtil.addLoading();
      this.$gAuth
        .signOut()
        .then(() => {
          setTimeout(() => {
            // Remove cookies
            CommonUtil.removeCookies('access_token');
            // Remove local storage
            localStorage.removeItem('userInfo');
            // Remove loading
            CommonUtil.removeLoading();
            // Redirect to login page
            store.dispatch('user/setToken', '');
            store.dispatch('user/login', '');
            this.$router.replace(UrlConstant.page.user.LOGIN);
          });
        })
        .catch(err => {
          console.log(err);
          CommonUtil.showNotification(
            'Error',
            'Error occur when sign out! Please try again!',
            CommonConstant.NOTI_TYPE.ERROR
          );
          CommonUtil.removeLoading();
        });
    }
  }
};
</script>

<style scoped>
.user-dropdown-container {
  position: absolute;
  width: 200px;
  top: 56px;
  right: -15px;
  font-size: 0.9rem;
  color: black;
  z-index: 1000;
  background: #fff;
  border: 1px solid rgba(100, 100, 100, 0.4);
  border-radius: 0 0 2px 2px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
}
.user-dropdown-container .user-dropdown-item {
  padding: 8px 12px 6px;
  font-weight: 600;
}
.user-dropdown-container .user-dropdown-item:hover {
  background: #e0f3ff;
  cursor: pointer;
}
.user-dropdown-container .logout-icon {
  color: #dc3545;
}
</style>
