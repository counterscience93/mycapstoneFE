<template>
  <div class="notification-container">
    <div class="notification-header">Notification</div>
    <div class="notification-item">
      <strong>Kieu Trong Khanh</strong> send you topic <strong>CPAS</strong>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.notification-container {
  position: absolute;
  background: white;
  color: black;
  width: 300px;
  top: 48px;
  right: -221px;
  font-size: 0.9rem;
  z-index: 1000;
}
.notification-container > .notification-header {
  padding: 8px 12px 6px;
  font-weight: 600;
  background-color: #fff;
  border-bottom: solid 1px #dddfe2;
}
.notification-container > .notification-item {
  padding: 8px 12px 6px;
}
</style>
