<template>
  <div>
    <b-modal
      ref="topic-comment-modal"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      hide-footer
      title="Comments"
    >
      <div style="width:450px">
        <label for="input-title">Rejected reason:</label>
        <b-form-input
          id="input-title"
          v-model="formData.content"
          placeholder="Enter rejected reason"
          class="mb-3"
          trim
        />
        <b-button variant="success" class="float-right" @click="submit"
          >Submit</b-button
        >
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  mounted() {},
  data() {
    return {
      headerBgVariant: 'info',
      headerTextVariant: 'light',
      formData: { content: '' }
    };
  },
  methods: {
    showModal() {
      this.$refs['topic-comment-modal'].show();
    },
    hideModal() {
      this.$refs['topic-comment-modal'].hide();
    },
    submit() {
      this.$emit('submit', this.formData.content);
    }
  }
};
</script>

<style scoped></style>
