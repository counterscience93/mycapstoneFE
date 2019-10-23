<template>
  <div class="mt-3">
    <template v-if="curStep > 1 && curStep <= 3">
      <b-button variant="primary" class="float-left" @click="prevStep">
        <font-awesome-icon icon="angle-left" class="mr-1" />
        Previous Step
      </b-button>
    </template>
    <template
      v-if="
        (curStep === 1 && selected.length > 0) ||
          (curStep === 2 && advisors.length > 2)
      "
    >
      <b-button variant="primary" class="float-right" @click="nextStep"
        >Next Step
        <font-awesome-icon icon="angle-right" class="ml-1" />
      </b-button>
    </template>
    <template v-if="curStep === 3 && dateRange !== ''">
      <b-button variant="success" class="float-right" @click="submit"
        >Submit
        <font-awesome-icon icon="angle-right" class="ml-1" />
      </b-button>
    </template>
  </div>
</template>

<script>
export default {
  props: ['curStep', 'selected', 'dateRange', 'advisors'],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    submit() {
      this.$emit('submit', {
        deadline: new Date(this.dateRange).getTime(),
        topics: this.selected.map(item => {
          return item.id;
        }),
        committees: this.advisors.map(item => {
          return item.value;
        })
      });
    },
    nextStep() {
      this.$emit('update-step', this.curStep + 1);
    },
    prevStep() {
      this.$emit('update-step', this.curStep - 1);
    }
  }
};
</script>

<style scoped></style>
