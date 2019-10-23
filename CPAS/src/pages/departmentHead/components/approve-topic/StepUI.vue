<template>
  <b-row class="m-0">
    <b-col cols="12" class="mt-2 p-3">
      <div class="text-center">
        <div class="step-item-container" :class="curStep >= 1 ? 'active' : ''">
          <div class="step-icon">1</div>
          <div class="step-detail">Choose Topic</div>
          <div class="step-line">
            <font-awesome-icon
              icon="angle-double-right"
              class="page-title-item"
            />
          </div>
        </div>
        <div class="step-item-container" :class="curStep >= 2 ? 'active' : ''">
          <div class="step-icon">2</div>
          <div class="step-detail">Choose Committee</div>
          <div class="step-line">
            <font-awesome-icon
              icon="angle-double-right"
              class="page-title-item"
            />
          </div>
        </div>
        <div class="step-item-container" :class="curStep === 3 ? 'active' : ''">
          <div class="step-icon">3</div>
          <div class="step-detail">Choose Time</div>
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: ['curStep'],
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.step-item-container {
  display: inline-block;
}
.step-item-container.active .step-icon {
  background: #4ba89c;
}
.step-item-container.active .step-detail,
.step-item-container.active .step-line {
  color: #4ba89c;
}
.step-item-container .step-icon {
  padding: 20px;
  width: 64px;
  border-radius: 100%;
  background: #c8c8c8;
  display: inline-block;
  color: white;
  margin-right: 5px;
  font-weight: 600;
}
.step-item-container .step-detail {
  color: #a3a3a3;
  display: inline-block;
  font-weight: 600;
}
.step-item-container .step-line {
  font-size: 1.5rem;
  transform: scaleY(1.8);
  margin: 0 30px 0 30px;
  color: #a3a3a3;
  display: inline-block;
}
</style>
