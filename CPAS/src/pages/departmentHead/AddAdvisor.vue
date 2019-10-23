<template>
  <b-row class="m-0">
    <b-col cols="12" class="mt-2">
      <div class="card card-shadow">
        <div class="card-header custom">
          <b-row>
            <b-col cols="12">Select Committee</b-col>
          </b-row>
        </div>
        <div class="card-body">
          <multiselect
            class="mb-3"
            v-model="formData.subAdvisors"
            placeholder="Search a tag"
            label="text"
            track-by="value"
            :options="optionsData.subAdvisors"
            :multiple="true"
            :taggable="true"
          />
        </div>
      </div>
    </b-col>
  </b-row>
</template>
<script>
import Multiselect from 'vue-multiselect';
import CommonUtil from '../../common/utils/common-util';
import { AdvisorService } from '../../services/service-provider';

export default {
  components: {
    multiselect: Multiselect
  },
  mounted() {
    this.getAdvisor();
  },
  watch: {
    items(val) {
      this.tableOptions.totalRows = val.length;
    }
  },
  data() {
    return {
      advisorData: undefined,
      optionsData: {},
      formData: {}
    };
  },
  getAdvisor() {
    CommonUtil.addLoading();
    AdvisorService.getAdvisor(
      result => {
        let tmp = CommonUtil.convertToSelectBoxData(result, 'fullName');
        tmp = tmp.filter(item => item.value !== 1);
        this.optionsData.subAdvisors = tmp;
        this.advisorData = result;
        CommonUtil.removeLoading();
      },
      () => {
        CommonUtil.removeLoading();
      }
    );
  }
};
</script>
