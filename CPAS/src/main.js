// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import CKEditor from '@ckeditor/ckeditor5-vue';
import Notifications from 'vue-notification';
import './common/utils/icons';
// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// Multiselect
import 'vue-multiselect/dist/vue-multiselect.min.css';
// Font awesome 5
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// common css
import './common/css/common-css.css';
import GAuth from 'vue-google-oauth2';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(CKEditor);
Vue.use(Notifications);
Vue.component('font-awesome-icon', FontAwesomeIcon);

const gauthOption = {
  clientId:
    '959966253264-227p3l5npnr3bp0mlnr7c2cbvag2a3q5.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
};
Vue.use(GAuth, gauthOption);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
