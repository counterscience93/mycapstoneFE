<template>
  <div>
    <b-row class="m-0">
      <b-col cols="12" class="p-0">
        <div class="page-title-container">
          <div class="card card-shadow d-inline-block">
            <font-awesome-icon icon="table" class="page-title-item" />
          </div>
          <div class="d-inline-block pl-2">
            <div class="page-title-description-header">
              Approved Topic
            </div>
            <div class="page-title-description-detail">
              Department Head can send their choosen topics to committee.
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
    <div class="mt-2 pl-3 pt-3 pr-3">
      <div class="tab-custom-container">
        <div
          class="d-inline-block tab-custom-item p-3"
          :class="isTabApproved ? 'active' : ''"
          @click="isTabApproved = true"
        >
          Send To Committee
        </div>
        <div
          class="d-inline-block tab-custom-item p-3"
          :class="isTabApproved ? '' : 'active'"
          @click="isTabApproved = false"
        >
          Send to Trainning Staff
        </div>
      </div>
    </div>
    <div v-if="isTabApproved">
      <!-- step 1 -->
      <template v-if="curStep === 1">
        <b-row class="m-0">
          <b-col cols="12">
            <div class="card card-shadow">
              <step-ui :curStep="curStep" />
              <div
                class="card-header custom"
                id="approved-topic-table-container"
              >
                <div id="select-all-checkbox">
                  <b-form-checkbox
                    v-model="isSelectAll"
                    name="checkbox-1"
                    value="all"
                    unchecked-value=""
                    @change="isCheckBoxClick = true"
                  />
                </div>

                <b-table
                  ref="selectableTable"
                  selectable
                  :select-mode="selectMode"
                  sticky-header
                  :fields="fields"
                  :items="items"
                  show-empty
                  head-variant="light"
                  @row-selected="onRowSelected"
                >
                  <template v-slot:empty="scope">
                    <div class="text-center">{{ scope.emptyText }}</div>
                  </template>
                  <!-- selected column -->
                  <template v-slot:cell(isActive)="{ rowSelected }">
                    <div v-if="rowSelected" class="selected-row-item">
                      <font-awesome-icon
                        icon="check"
                        class="selected-row-item-icon"
                      />
                    </div>
                    <div v-else class="selected-row-item"></div>
                  </template>
                  <!-- action column -->
                  <template v-slot:cell(action)="row">
                    <b-button
                      variant="outline-info"
                      size="sm"
                      @click="redirectToViewDetailPage(row.item.id)"
                    >
                      <font-awesome-icon icon="info" />
                    </b-button>
                  </template>
                </b-table>
                <step-button
                  :curStep.sync="curStep"
                  :selected.sync="selected"
                  @update-step="updateStep($event)"
                />
              </div>
            </div>
          </b-col>
        </b-row>
      </template>
      <!-- step 2 -->
      <template v-if="selected.length > 0 && curStep === 2">
        <b-row class="m-0">
          <b-col cols="12">
            <div class="card card-shadow">
              <step-ui :curStep="curStep" />
              <div class="d-inline-block w-100 p-3">
                <!-- Advisors -->
                <label for="input-title">Advisors:</label>
                <multiselect
                  class="mb-3"
                  v-model="formData.advisors"
                  placeholder="Search a tag"
                  label="text"
                  track-by="value"
                  :options="optionsData.advisors"
                  :multiple="true"
                  :taggable="true"
                />
                <step-button
                  :curStep.sync="curStep"
                  :selected.sync="selected"
                  :advisors.sync="formData.advisors"
                  @update-step="updateStep($event)"
                />
              </div>
            </div>
          </b-col>
        </b-row>
      </template>
      <!-- step 3 -->
      <template v-if="curStep === 3">
        <b-row class="m-0">
          <b-col cols="12">
            <div class="card card-shadow">
              <step-ui :curStep="curStep" />
              <div class="d-inline-block w-100 p-3">
                <date-picker
                  type="datetime"
                  v-model="dateRange"
                  lang="en"
                  format="MM-DD-YYYY HH:mm"
                  :time-picker-options="{
                    start: '00:00',
                    step: '00:30',
                    end: '23:30'
                  }"
                  confirm
                  class="w-100"
                />
                <step-button
                  :curStep.sync="curStep"
                  :selected.sync="selected"
                  :dateRange.sync="dateRange"
                  :advisors.sync="formData.advisors"
                  @update-step="updateStep($event)"
                  @submit="submitAction($event)"
                />
              </div>
            </div>
          </b-col>
        </b-row>
      </template>
    </div>
    <!-- Send to trainning staff -->
    <div v-if="!isTabApproved">
      <send-topic />
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import Multiselect from 'vue-multiselect';
import DatePicker from 'vue2-datepicker';
import { AdvisorService, DHService } from '../../services/service-provider';
import UrlConstant from '../../common/constant/common-url';
import CommonUtil from '../../common/utils/common-util';
import CommonConstant from '../../common/constant/common-constant';
import StepUI from './components/approve-topic/StepUI';
import StepButton from './components/approve-topic/StepButton';
import SendTopic from './components/approve-topic/SendToTrainningStaff';

export default {
  components: {
    multiselect: Multiselect,
    stepButton: StepButton,
    DatePicker,
    stepUi: StepUI,
    sendTopic: SendTopic
  },
  data() {
    return {
      isTabApproved: true,
      curStep: 1,
      isSelectAll: '',
      isCheckBoxClick: false,
      fields: [
        {
          key: 'isActive',
          label: ''
        },
        {
          key: 'nameEng',
          label: 'English Name'
        },
        {
          key: 'created_date',
          label: 'Created Date'
        },
        {
          key: 'advisor',
          label: 'Advisor'
        },
        {
          key: 'action',
          label: 'Action'
        }
      ],
      items: [],
      selectMode: 'multi',
      selected: [],
      formData: {
        advisors: []
      },
      optionsData: {
        advisors: []
      },
      dateRange: ''
    };
  },
  watch: {
    isSelectAll(val) {
      if (val === 'all') {
        if (this.isCheckBoxClick) this.selectAllRows();
      } else {
        if (this.isCheckBoxClick) this.clearSelected();
      }
    },
    selected(val) {
      if (val.length === 0 || val.length < this.items.length) {
        this.isSelectAll = '';
      } else {
        this.isSelectAll = 'all';
      }
    }
  },
  mounted() {
    this.getApprovedTopic();
    this.getAdvisors();
  },
  methods: {
    // Reload page when submit success
    reloadPage() {
      this.curStep = 1;
      this.isSelectAll = '';
      this.selected = [];
      this.formData.advisors = [];
      this.items = [];
      this.getApprovedTopic();
    },
    // Submit action
    submitAction(val) {
      CommonUtil.addLoading();
      DHService.sendTopicToCommittee(
        val,
        result => {
          CommonUtil.removeLoading();
          CommonUtil.showNotification(
            'Success',
            'Send topic success!',
            CommonConstant.NOTI_TYPE.SUCCESS
          );
          this.reloadPage();
        },
        () => {
          CommonUtil.removeLoading();
          CommonUtil.showNotification(
            'Error',
            'Server error!',
            CommonConstant.NOTI_TYPE.ERROR
          );
        }
      );
    },
    // Update new current step
    updateStep(val) {
      this.curStep = val;
    },
    // On row selected
    onRowSelected(items) {
      this.isCheckBoxClick = false;
      this.selected = items.map(o => {
        o.isActive = true;
        return o;
      });
    },
    // Select All rows
    selectAllRows() {
      this.$refs.selectableTable.selectAllRows();
    },
    clearSelected() {
      this.$refs.selectableTable.clearSelected();
    },
    // Redirect to View detail topic page
    redirectToViewDetailPage(id) {
      this.$router.push({
        path: UrlConstant.page.advisor.TOPIC_DETAIL.replace(':id', id)
      });
    },
    // Get approved topic
    getApprovedTopic() {
      CommonUtil.addLoading();
      DHService.getApprovedTopic(
        result => {
          CommonUtil.removeLoading();
          if (result && result.length > 0) {
            result.forEach(item => {
              this.items.push({
                id: item.id,
                isActive: false,
                nameEng: item.name_En,
                created_date: moment(item.createdDate).format(
                  CommonConstant.DEFAULT_TIME_FORMAT
                ),
                advisor: item.advisor.fullName
              });
            });
          }
        },
        () => {
          CommonUtil.removeLoading();
          CommonUtil.showNotification(
            'Error',
            'Server error!',
            CommonConstant.NOTI_TYPE.ERROR
          );
        }
      );
    },
    // Get advisors
    getAdvisors() {
      CommonUtil.addLoading();
      AdvisorService.getAdvisor(result => {
        CommonUtil.removeLoading();
        if (result && result.length > 0) {
          let tmp = CommonUtil.convertToSelectBoxData(result, 'fullName');
          this.optionsData.advisors = tmp;
        }
      });
    }
  }
};
</script>

<style>
#approved-topic-table-container .b-table-sticky-header {
  overflow-y: auto;
  max-height: 45vh;
}
#approved-topic-table-container
  .b-table-sticky-header
  > .table.b-table
  > thead
  > tr
  > th {
  position: sticky;
  top: 0;
  z-index: 2;
}
#approved-topic-table-container .table-primary,
#approved-topic-table-container .table-primary td {
  background: white;
}
</style>
<style scoped>
.selected-row-item {
  width: 50px;
  line-height: 1.8;
}
.selected-row-item .selected-row-item-icon {
  color: green;
}
#select-all-checkbox .custom-control.custom-checkbox {
  position: absolute;
  z-index: 3;
  top: 130px;
  left: 30px;
}
</style>
<style scoped>
.tab-custom-container {
  position: relative;
  top: 2px;
  z-index: 1;
}
.tab-custom-container .tab-custom-item {
  background: #f6f6f6;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.tab-custom-container .tab-custom-item:hover {
  cursor: pointer;
}
.tab-custom-container .tab-custom-item.active {
  border-bottom: 2px solid #3f6ad8;
  background: white;
  cursor: default;
}
</style>
