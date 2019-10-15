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
    <b-row class="m-0">
      <b-col cols="12" class="mt-2 p-3">
        <div class="text-center">
          <div
            class="step-item-container"
            :class="curStep >= 1 ? 'active' : ''"
          >
            <div class="step-icon">1</div>
            <div class="step-detail">Choose Topic</div>
            <div class="step-line">
              <font-awesome-icon
                icon="angle-double-right"
                class="page-title-item"
              />
            </div>
          </div>
          <div
            class="step-item-container"
            :class="curStep >= 2 ? 'active' : ''"
          >
            <div class="step-icon">2</div>
            <div class="step-detail">Choose Committee</div>
            <div class="step-line">
              <font-awesome-icon
                icon="angle-double-right"
                class="page-title-item"
              />
            </div>
          </div>
          <div
            class="step-item-container"
            :class="curStep === 3 ? 'active' : ''"
          >
            <div class="step-icon">3</div>
            <div class="step-detail">Choose Time</div>
          </div>
        </div>
      </b-col>
    </b-row>
    <!-- step 1 -->
    <template v-if="curStep === 1">
      <b-row class="m-0">
        <b-col cols="12" class="mt-2 p-3">
          <div class="card card-shadow">
            <div class="card-header custom" id="approved-topic-table-container">
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
        <b-col cols="12" class="mt-2 p-3">
          <div class="card card-shadow d-inline-block w-100 p-3">
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
        </b-col>
      </b-row>
    </template>
    <!-- step 3 -->
    <template v-if="curStep === 3">
      <b-row class="m-0">
        <b-col cols="12" class="mt-2 p-3">
          <div class="card card-shadow d-inline-block w-100 p-3">
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
        </b-col>
      </b-row>
    </template>
  </div>
</template>

<script>
import moment from 'moment';
import Multiselect from 'vue-multiselect';
import DatePicker from 'vue2-datepicker';
import {
  TopicService,
  AdvisorService,
  DHService
} from '../../services/service-provider';
import UrlConstant from '../../common/constant/common-url';
import CommonUtil from '../../common/utils/common-util';
import CommonConstant from '../../common/constant/common-constant';
import StepButton from './components/StepButton';

export default {
  components: {
    multiselect: Multiselect,
    stepButton: StepButton,
    DatePicker
  },
  data() {
    return {
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
      TopicService.dhGetApprovedTopic(
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
  top: 25px;
  left: 30px;
}
</style>
<style scoped>
.step-item-container {
  display: inline-block;
}
.step-item-container.active .step-icon {
  background: #91d73a;
}
.step-item-container.active .step-detail,
.step-item-container.active .step-line {
  color: #91d73a;
}
.step-item-container .step-icon {
  padding: 20px;
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
