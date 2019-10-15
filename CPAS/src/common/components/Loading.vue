<template>
  <div v-if="isLoading" class="loading-container w-100 h-100">
    <div class="loading-modal" />
    <div class="loading-item">
      <circle4 class="loading-icon" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Circle4 } from 'vue-loading-spinner';

export default {
  components: {
    Circle4
  },
  computed: {
    ...mapGetters({ isLoading: 'isLoading' })
  },
  watch: {
    isLoading() {
      return this.isLoading;
    }
  }
};
</script>

<style scoped>
.loading-container {
  position: absolute;
  z-index: 9000;
}
.loading-container .loading-modal {
  opacity: 0.35;
  width: 100%;
  height: 100%;
  cursor: not-allowed;
  background: gray;
}

.loading-container .loading-item {
  position: fixed;
  top: 50%;
  left: 45%;
}
</style>
