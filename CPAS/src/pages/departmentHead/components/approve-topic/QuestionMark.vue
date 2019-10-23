<template>
  <div class="text-center">
    <font-awesome-icon icon="check" v-if="mark" class="text-success" />
    <font-awesome-icon icon="times" v-if="!mark" class="text-danger" />
  </div>
</template>

<script>
export default {
  props: ['mark'],
  data() {
    return {};
  }
};
</script>

<style scoped></style>
