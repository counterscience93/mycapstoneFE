<template>
  <div class="app-header-container">
    <b-row>
      <b-col cols="2">
        <div class="p-3">
          <div class="app-header-logo">CPAS</div>
        </div>
      </b-col>
      <b-col cols="10">
        <div class="app-header-content h-100">
          <b-row class="h-100">
            <b-col cols="6" />
            <b-col cols="6">
              <div class="p-2">
                <div class="d-inline-block float-right p-2">
                  {{ username }}
                </div>
                <div class="d-inline-block float-right lang-container pr-2">
                  <div class="lang-img-container">
                    <template v-if="messages.length > 0">
                      <div class="circle-notification">
                        {{ messages.length }}
                      </div>
                    </template>

                    <font-awesome-icon
                      icon="bell"
                      @click="isShowNoti = !isShowNoti"
                    />
                    <!-- Notification -->
                    <template v-if="isShowNoti">
                      <notification />
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
import { firebaseObj } from '../../config/firebaseConfig';
import Notification from './Notification';

export default {
  components: {
    Notification
  },
  data() {
    return {
      isShowNoti: false,
      username: 'Advisor Nguyen Quoc Bao',
      messageRef: firebaseObj.database().ref('messages'), // retrive /messages realtime firebase db
      messages: [], // list messages receive ( 20 rows)
      currentMessage: null
    };
  },
  mounted() {
    this.addMessagesListeners();
  },
  methods: {
    addMessagesListeners() {
      // send messages by chanelID (replace userID later)
      this.messageRef.child('1').on('child_added', snap => {
        const message = snap.val();
        console.log('newmessage: ', message);
        message.id = snap.key;
        this.messages.push(message);
        this.currentMessage = message;
      });
    },
    deleteMessage() {
      console.log(this.currentMessage.id);
      this.messageRef
        .child('1')
        .child(this.currentMessage.id)
        .remove();
      var index = this.messages.findIndex(x => x.id === this.currentMessage.id);
      this.messages.splice(index, 1);
    },
    updateMessage() {
      console.log(this.currentMessage.id);
      this.messageRef
        .child('1')
        .child(this.currentMessage.id)
        .update({
          isWatched: true
        });
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
  padding: 0.44rem;
  font-size: 1.2rem;
}
.app-header-content .lang-img-container svg:hover {
  cursor: pointer;
}
.circle-notification {
  position: absolute;
  top: 3px;
  left: 15px;
  background: red;
  width: 15px;
  height: 14px;
  font-size: 10px;
  text-align: center;
  border-radius: 100%;
}
</style>
