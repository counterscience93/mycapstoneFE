<template>
  <b-container>
    <b-row>
      <b-col cols="12">
        <div class="card card-shadow">
          <div class="card-header custom">
            <b-row>
              <b-col cols="12">Create Topic Form</b-col>
            </b-row>
          </div>
          <div class="card-body">
            <label for="input-title">Title:</label>
            <b-form-input
              id="input-title"
              v-model="formData.title"
              placeholder="Enter your title"
              class="mb-3"
              trim
            />
            <label for="input-title">Abstraction:</label>
            <b-form-textarea
              id="textarea"
              v-model="formData.abstraction"
              placeholder="Enter something..."
              class="mb-3"
              rows="4"
            />
            <label for="input-title">Detail:</label>
            <b-form-textarea
              id="textarea"
              v-model="formData.detail"
              placeholder="Enter something..."
              rows="4"
            />
          </div>
          <div class="card-footer custom">
            <b-button variant="primary" size="sm" class="float-right"
              >Submit</b-button
            >
            <b-button variant="success" size="sm" class="float-right mr-3"
              >Save</b-button
            >
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        title: '',
        abstraction: '',
        detail: ''
      }
    };
  }
};
</script>

<style scoped></style>
