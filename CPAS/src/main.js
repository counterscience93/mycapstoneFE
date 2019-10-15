// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/store';
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

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(CKEditor);
Vue.use(Notifications);
Vue.component('font-awesome-icon', FontAwesomeIcon);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
