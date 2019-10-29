<template>
  <div class="app-header-container">
    <b-row>
      <b-col cols="2">
        <div class="p-3">
          <div class="app-header-logo">CPAF</div>
        </div>
      </b-col>
      <b-col cols="10">
        <div class="app-header-content h-100">
          <b-row class="h-100">
            <b-col cols="3" />
            <b-col cols="9">
              <div class="p-1">
                <button
                  class="d-inline-block float-right user-name-container p-2"
                  @blur="onBlurUserDropDownEvent"
                  @click="isShowUserDropdown = !isShowUserDropdown"
                >
                  <img :src="userInfo.icon" class="user-icon" />
                  <span>
                    {{
                      userInfo.fullName !== undefined ? userInfo.fullName : ''
                    }}
                    <font-awesome-icon icon="caret-down" class="ml-2" />
                  </span>
                </button>
                <!-- User dropdown -->
                <template v-if="isShowUserDropdown">
                  <user-drop-down />
                </template>
                <div class="d-inline-block float-right lang-container pr-2">
                  <div class="lang-img-container">
                    <div v-if="unReadingMessageCount > 0">
                      <div class="circle-notification" v-if="isHightLightNoti">
                        {{ unReadingMessageCount }}
                      </div>
                    </div>
                    <font-awesome-icon
                      icon="bell"
                      @blur="onBlurNotiEvent"
                      @click="
                        isShowNoti = !isShowNoti;
                        isHightLightNoti = false;
                      "
                    />
                    <!-- Notification -->
                    <template v-if="isShowNoti">
                      <notification
                        :messages.sync="messages"
                        @click="notificationClickEvt($event)"
                      />
                    </template>
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
import { firebaseObj } from '../../config/firebaseConfig';
import Notification from './Notification';
import UserDropDown from './UserDropDown';
import CommonUtil from '../utils/common-util';
import UrlConstant from '../constant/common-url';
import CommonConstant from '../constant/common-constant';

export default {
  components: {
    Notification,
    UserDropDown
  },
  data() {
    return {
      isLoadedNotification: false,
      isHightLightNoti: true,
      isShowNoti: false,
      isShowUserDropdown: false,
      unReadingMessageCount: 0,
      messageRef: firebaseObj.database().ref('messages'), // retrive /messages realtime firebase db
      messages: [], // list messages receive ( 20 rows)
      currentMessage: null
    };
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo',
      decodeToken: 'decodeToken'
    })
  },
  watch: {
    messages(newVal) {
      this.unReadingMessageCount = newVal.filter(
        item => item.isReading === false
      ).length;
    }
  },
  mounted() {
    this.addMessagesListeners();
    this.initHeader();
  },
  methods: {
    initHeader() {
      setTimeout(() => {
        this.isLoadedNotification = true;
      }, 5000);
    },
    // Notification click event
    notificationClickEvt(event) {
      if (!event.data['isReading']) {
        event.data['isReading'] = true;
        this.updateMessage(event.id, event.data);
      }
      this.redirectToViewDetailPage(event.data['topicId']);
    },
    // Redirect to View detail topic page
    redirectToViewDetailPage(id) {
      this.$router.push({
        path: UrlConstant.page.advisor.TOPIC_DETAIL.replace(':id', id)
      });
    },
    onBlurUserDropDownEvent() {
      setTimeout(() => {
        this.isShowUserDropdown = false;
      }, 200);
    },
    // On blur for notification button
    onBlurNotiEvent() {
      setTimeout(() => {
        this.isShowNoti = false;
      }, 200);
    },
    // Add message listener
    addMessagesListeners() {
      this.messageRef
        // .child(this.decodeToken.userId)
        .child('1')
        .limitToLast(5)
        .on('child_added', snap => {
          this.isHightLightNoti = true;
          const message = snap.val();
          message.id = snap.key;
          message.timeDisplay = moment(message.createdDate).format(
            CommonConstant.DEFAULT_TIME_FORMAT
          );
          this.messages.push(message);
          this.currentMessage = message;
          this.messages.sort((a, b) => b.createdDate - a.createdDate);
          if (this.isLoadedNotification) {
            CommonUtil.showNotification(
              'Notification',
              'You have new notification',
              CommonConstant.NOTI_TYPE.INFO
            );
            CommonUtil.removeFirebaseNotification();
          }
        });
    },
    deleteMessage() {
      this.messageRef
        .child('1')
        .child(this.currentMessage.id)
        .remove();
      var index = this.messages.findIndex(x => x.id === this.currentMessage.id);
      this.messages.splice(index, 1);
    },
    updateMessage(id, item) {
      this.messageRef
        .child('1')
        .child(id)
        .update(item);
    },
    detachListener() {
      this.messageRef.off();
    }
  },
  beforeDestroy() {
    this.detachListener();
  }
};
</script>

<style scoped>
.app-header-container {
  z-index: 10;
  position: fixed;
  width: 100%;
  color: white;
  background: #4ba89c;
}
.app-header .header-shadow {
  box-shadow: 0 0.46875rem 2.1875rem rgba(4, 9, 20, 0.03),
    0 0.9375rem 1.40625rem rgba(4, 9, 20, 0.03),
    0 0.25rem 0.53125rem rgba(4, 9, 20, 0.05),
    0 0.125rem 0.1875rem rgba(4, 9, 20, 0.03);
}
.app-header-content .user-img-container img {
  width: 2.5rem;
  height: 2.5rem;
}
.app-header-content .lang-container {
  border-right: 1px solid #dee2e6;
}
.app-header-content .lang-img-container {
  position: relative;
  padding-top: 11px;
  padding-bottom: 5px;
  font-size: 1.2rem;
  outline: none;
  border: none;
}
.app-header-content .lang-img-container svg:hover {
  cursor: pointer;
}
.app-header-content .user-name-container {
  color: white;
  background: #4ba89c;
  border: none;
  outline: none;
}
.app-header-content .user-name-container:hover {
  cursor: pointer;
}
.app-header-content .user-name-container > span {
  position: relative;
  top: 1px;
}
.circle-notification {
  position: absolute;
  top: 5px;
  right: -5px;
  background: red;
  width: 15px;
  height: 14px;
  font-size: 10px;
  text-align: center;
  border-radius: 100%;
}
.user-icon {
  width: 32px;
  border-radius: 100%;
}
</style>
