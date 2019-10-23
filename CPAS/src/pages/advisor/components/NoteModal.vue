<template>
  <div>
    <b-modal
      centered
      ref="topic-modal"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      hide-footer
      title="Note"
    >
      <div style="width:450px">
        <div>{{ formdata.note }}</div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headerBgVariant: 'info',
      headerTextVariant: 'light',
      formdata: {
        note: ''
      }
    };
  },
  mounted() {},
  methods: {
    init(data) {
      this.formdata.note = data;
      this.showModal();
    },
    showModal() {
      this.$refs['topic-modal'].show();
    },
    hideModal() {
      this.$refs['topic-modal'].hide();
    }
  }
};
</script>

<style scoped>
.modal-div {
  width: 800px;
  height: 800px;
}
.modal-text {
  margin: 10px;
}
</style>
