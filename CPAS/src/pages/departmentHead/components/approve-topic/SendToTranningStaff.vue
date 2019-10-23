<template>
  <b-row class="m-0">
    <b-col cols="12">
      <div class="card card-shadow">
        <div class="card-body custom" id="send-topic-table-container">
          <div id="select-all-checkbox">
            <b-form-checkbox
              v-model="isSelectAll"
              name="checkbox-1"
              value="all"
              unchecked-value=""
              @change="isCheckBoxClick = true"
            />
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
              <!-- status column -->
              <template v-slot:cell(status)="row">
                <b-badge
                  pill
                  v-if="row.item.status === 4"
                  variant="danger"
                  class="status-item"
                >
                  Rejected</b-badge
                >
                <b-badge
                  pill
                  v-if="row.item.status === 6"
                  variant="success"
                  class="status-item"
                >
                  Approved</b-badge
                >
              </template>
              <!-- action column -->
              <template v-slot:cell(action)="row">
                <b-button
                  variant="outline-info"
                  size="sm"
                  class="table-icon"
                  @click="redirectToViewDetailPage(row.item.id)"
                >
                  <font-awesome-icon icon="info" />
                </b-button>
                <b-button
                  variant="primary"
                  size="sm"
                  class="table-icon"
                  @click="redirectToQuestionTablePage(row.item.id)"
                >
                  <font-awesome-icon icon="file-alt" />
                </b-button>
              </template>
            </b-table>
            <template v-if="selected.length > 0">
              <b-button
                variant="success"
                class="float-right"
                @click="sendTopicToTrainningStaff"
                >Submit
                <font-awesome-icon icon="angle-right" class="ml-1" />
              </b-button>
            </template>
          </div>
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import moment from 'moment';
import UrlConstant from '../../../../common/constant/common-url';
import { DHService } from '../../../../services/service-provider';
import CommonUtil from '../../../../common/utils/common-util';
import CommonConstant from '../../../../common/constant/common-constant';

export default {
  props: [],
  data() {
    return {
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
          key: 'status',
          label: 'Status'
        },
        {
          key: 'action',
          label: 'Action'
        }
      ],
      items: [],
      selectMode: 'multi',
      selected: []
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
    this.getValidationApprovedTopic();
  },
  methods: {
    // Reload page when submit success
    reloadPage() {
      this.isSelectAll = '';
      this.selected = [];
      this.items = [];
      this.getValidationApprovedTopic();
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
    // Redirect to Create topic page
    redirectToQuestionTablePage(id) {
      this.$router.push({
        path: UrlConstant.page.departmentHead.DH_QUESTION_TABLE.replace(
          ':id',
          id
        )
      });
    },
    // Redirect to View detail topic page
    redirectToViewDetailPage(id) {
      this.$router.push({
        path: UrlConstant.page.advisor.TOPIC_DETAIL.replace(':id', id)
      });
    },
    // Get validation approved topic
    getValidationApprovedTopic() {
      CommonUtil.addLoading();
      DHService.getValidationApprovedTopic(result => {
        CommonUtil.removeLoading();
        if (result && result.length > 0) {
          result.forEach(item => {
            this.items.push({
              id: item.id,
              isActive: false,
              status: item.status,
              nameEng: item.name_En,
              created_date: moment(item.createdDate).format(
                CommonConstant.DEFAULT_TIME_FORMAT
              ),
              advisor: item.advisor.fullName
            });
          });
        }
      });
    },
    // Send topic to trainning staff
    sendTopicToTrainningStaff() {
      CommonUtil.addLoading();
      const data = {
        topics: this.selected.map(item => {
          return item.id;
        })
      };
      DHService.sendTopicToTrainningStaff(
        data,
        result => {
          CommonUtil.removeLoading();
          CommonUtil.showNotification(
            'Success',
            'Send topic to trainning staff success!',
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
    }
  }
};
</script>

<style>
#send-topic-table-container .b-table-sticky-header {
  overflow-y: auto;
  max-height: 45vh;
}
#send-topic-table-container
  .b-table-sticky-header
  > .table.b-table
  > thead
  > tr
  > th {
  position: sticky;
  top: 0;
  z-index: 2;
}
#send-topic-table-container .table-primary,
#send-topic-table-container .table-primary td {
  background: white;
}
</style>
<style scoped>
.card-body .table-icon {
  width: 32px;
  height: 32px;
}
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
  top: 33px;
  left: 30px;
}
</style>
<style scoped>
.status-item {
  width: 90px;
}
</style>
