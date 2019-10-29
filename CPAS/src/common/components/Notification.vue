<template>
  <div class="notification-container">
    <div class="notification-header">Notification</div>
    <div v-for="(item, index) in messages" :key="index">
      <div
        class="notification-item"
        :class="item.isReading === false ? 'active' : ''"
        @click="clickEvent(item.id, item)"
      >
        <strong>{{ item.userName }}</strong>
        <template v-if="item.topicStatus === 2">
          send
        </template>
        topic
        <strong>{{ item.topicName }}</strong>
        <div>
          <font-awesome-icon icon="pen" class="mr-3" />{{ item.timeDisplay }}
        </div>
      </div>
    </div>
    <template v-if="messages.length === 0">
      <div>
        <div class="empty-noti-logo-container p-3">
          <img src="../../assets/no-noti.svg" class="empty-noti-logo" />
        </div>
        <div class="empty-noti-detail">
          No notification
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: ['messages'],
  data() {
    return {};
  },
  methods: {
    clickEvent(id, item) {
      delete item['id'];
      this.$emit('click', { id: id, data: item });
    }
  }
};
</script>

<style scoped>
.notification-container {
  position: absolute;
  color: black;
  width: 300px;
  top: 48px;
  right: -60px;
  font-size: 0.9rem;
  z-index: 1000;
  background: #fff;
  border: 1px solid rgba(100, 100, 100, 0.4);
  border-radius: 0 0 2px 2px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
}
.notification-container > .notification-header {
  padding: 8px 12px 6px;
  font-weight: 600;
  background-color: #fff;
  border-bottom: solid 1px #dddfe2;
}
.notification-container .notification-item {
  padding: 8px 12px 6px;
  border-bottom: 1px solid #dddfe2;
}
.notification-container .notification-item:hover {
  cursor: pointer;
}
.notification-container .notification-item.active {
  background-color: #edf2fa;
}
.notification-container .empty-noti-logo-container {
  text-align: center;
}
.notification-container .empty-noti-logo-container .empty-noti-logo {
  width: 65px;
}
.notification-container .empty-noti-detail {
  font-weight: 600;
  color: #c3c3c3;
  font-size: 1.1rem;
  text-align: center;
}
</style>
