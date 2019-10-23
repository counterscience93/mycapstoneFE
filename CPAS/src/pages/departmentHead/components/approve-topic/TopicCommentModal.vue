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
        <div v-for="(item, index) in formdata.questions" :key="index">
          <b-row>
            <b-col cols="1">
              <font-awesome-icon
                icon="check"
                v-if="item.isApproved"
                class="text-success"
              />
              <font-awesome-icon
                icon="times"
                v-if="!item.isApproved"
                class="text-danger"
              />
            </b-col>
            <b-col cols="11">
              <div class="font-weight-bold">
                {{ item.question }}
              </div>
              <div class="pl-3 pt-3 pb-3">
                <template v-if="item.comment">
                  {{ item.comment }}
                </template>
                <template v-else>
                  N/A
                </template>
              </div>
            </b-col>
          </b-row>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: ['questions'],
  data() {
    return {
      headerBgVariant: 'info',
      headerTextVariant: 'light',
      formdata: {
        questions: []
      }
    };
  },
  mounted() {
    this.formdata.questions = JSON.parse(JSON.stringify(this.questions));
  },
  methods: {
    showModal() {
      this.$refs['topic-comment-modal'].show();
    },
    hideModal() {
      this.$refs['topic-comment-modal'].hide();
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
