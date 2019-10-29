<template>
  <b-row class="m-0">
    <b-col cols="12 p-0 m-0">
      <div class="page-title-container">
        <div class="card card-shadow d-inline-block">
          <font-awesome-icon icon="table" class="page-title-item" />
        </div>
        <div class="d-inline-block pl-2">
          <div class="page-title-description-header">
            Capstone Management
          </div>
          <div class="page-title-description-detail">
            Advisors can create, manage and save their topics.
          </div>
        </div>
        <b-button
          variant="primary"
          size="sm"
          class="float-right"
          @click="redirectToCreatePage()"
        >
          <font-awesome-icon icon="plus" class="mr-2" />Create</b-button
        >
      </div>
      <div class="p-3">
        <div class="card card-shadow">
          <div class="card-sort-custom">
            <label>Sort by </label>
            <b-form-select
              class="b-form-select"
              v-model="selected"
              :options="sortOption"
              @change="getTopicData()"
            ></b-form-select>
            <b-form-select
              class="b-form-select"
              v-model="selectedNum"
              :options="sortNum"
              @change="getTopicData()"
            ></b-form-select>
          </div>
          <div class="card-body">
            <b-table
              id="topic-table"
              responsive="sm"
              :items="items"
              :fields="fields"
              :current-page="tableOptions.currentPage"
              :per-page="0"
            >
              <!-- status column -->
              <template v-slot:cell(status)="row">
                <b-badge
                  pill
                  v-if="row.item.status === 1"
                  variant="secondary"
                  class="status-item"
                >
                  Draft</b-badge
                >
                <b-badge
                  pill
                  v-if="row.item.status === 2"
                  variant="warning"
                  class="status-item"
                >
                  Pending</b-badge
                >
                <b-badge
                  pill
                  v-if="row.item.status === 3"
                  variant="danger"
                  class="status-item"
                >
                  Duplicate Rejected</b-badge
                >
                <b-badge
                  pill
                  v-if="row.item.status === 4"
                  variant="success"
                  class="status-item"
                >
                  Duplicate Approved</b-badge
                >
                <b-badge
                  pill
                  v-if="row.item.status === 5"
                  variant="danger"
                  class="status-item"
                >
                  Validate Rejected</b-badge
                >
                <b-badge
                  pill
                  v-if="row.item.status === 6"
                  variant="success"
                  class="status-item"
                >
                  Validate Approved</b-badge
                >
                <b-badge
                  pill
                  v-if="row.item.status === 7"
                  variant="info"
                  class="status-item"
                >
                  Unpublic</b-badge
                >
                <b-badge
                  pill
                  v-if="row.item.status === 8"
                  variant="info"
                  class="status-item"
                >
                  Public</b-badge
                >
                <b-badge
                  pill
                  v-if="row.item.status === 9"
                  variant="info"
                  class="status-item"
                >
                  Taken</b-badge
                >
                <b-badge
                  pill
                  v-if="row.item.status === 10"
                  variant="success"
                  class="status-item"
                >
                  Pass</b-badge
                >
                <b-badge
                  pill
                  v-if="row.item.status === 11"
                  variant="danger"
                  class="status-item"
                >
                  Fail</b-badge
                >
                <b-badge
                  pill
                  v-if="row.item.status === 12"
                  variant="warning"
                  class="status-item"
                >
                  Validate Pending</b-badge
                >
                <b-badge
                  pill
                  v-if="row.item.status === 13"
                  variant="warning"
                  class="status-item"
                >
                  Publish Pending</b-badge
                >
              </template>
              <!-- action column -->
              <template v-slot:cell(action)="row">
                <template
                  v-if="
                    row.item.status === 'Passed' || row.item.status === 'Taken'
                  "
                >
                  <b-button variant="info" size="sm">Manage</b-button>
                </template>
                <template
                  v-else-if="row.item.status === 1 || row.item.status === 3"
                >
                  <b-button
                    variant="primary"
                    size="sm"
                    @click="redirectToCreatePage(row.item.id)"
                  >
                    <font-awesome-icon icon="pen" />
                  </b-button>
                </template>
                <template v-if="row.item.status !== 1">
                  <b-button
                    variant="outline-info"
                    size="sm"
                    @click="redirectToViewDetailPage(row.item.id)"
                  >
                    <font-awesome-icon icon="info" />
                  </b-button>
                </template>
                <template v-if="row.item.status === 3">
                  <b-button
                    variant="info"
                    size="sm"
                    @click="showNoteModal(row.item.note)"
                  >
                    <font-awesome-icon icon="sticky-note" />
                  </b-button>
                </template>
              </template>
            </b-table>
            <b-pagination
              v-model="tableOptions.currentPage"
              :total-rows="rows"
              :per-page="tableOptions.perPage"
              size="sm"
              aria-controls="topic-table"
              @input="getTopicData()"
            ></b-pagination>
          </div>
        </div>
      </div>
    </b-col>
    <note-modal ref="note-modal" />
  </b-row>
</template>

<script>
import moment from 'moment';
import UrlConstant from '../../common/constant/common-url';
import CommonConstant from '../../common/constant/common-constant';
import CommonUtil from '../../common/utils/common-util';
import NoteModal from './components/NoteModal';
import { TopicService } from '../../services/service-provider';

export default {
  components: {
    NoteModal
  },
  data() {
    return {
      fields: [
        {
          key: 'nameEng',
          label: 'English Name'
        },
        {
          key: 'created_date',
          label: 'Created Date'
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
      tableOptions: {
        totalRows: '',
        currentPage: 1,
        perPage: 10
      },
      selected: 'createdDate',
      sortOption: [
        { value: 'name_En', text: 'English Name' },
        { value: 'createdDate', text: 'Created Date' },
        { value: 'status', text: 'Status' }
      ],
      selectedNum: 'true',
      sortNum: [
        { value: 'false', text: 'Descending' },
        { value: 'true', text: 'Ascending' }
      ],
      optionData: {
        nameSelect: '',
        sortSlect: '',
        pageIndex: '',
        pageSize: ''
      }
    };
  },
  computed: {
    rows() {
      return this.tableOptions.totalRows;
    }
  },
  mounted() {
    // Get topic data
    this.getTopicData();
  },
  methods: {
    onfiltered() {
      this.getTopicData();
    },
    // Show note modal
    showNoteModal(data) {
      this.$refs['note-modal'].init(data);
    },
    // Redirect to Create topic page
    redirectToCreatePage(id) {
      this.$router.push({
        path: UrlConstant.page.advisor.CREATE_TOPIC.replace(':id', id)
      });
    },
    // Redirect to View detail topic page
    redirectToViewDetailPage(id) {
      this.$router.push({
        path: UrlConstant.page.advisor.TOPIC_DETAIL.replace(':id', id)
      });
    },
    // Get topic data
    getTopicData() {
      this.items = [];
      CommonUtil.addLoading();
      const convertData = this.convertData();
      TopicService.getTopic(
        convertData,
        result => {
          CommonUtil.removeLoading();
          result.result.forEach(item => {
            this.items.push({
              id: item.id,
              nameEng: item.name_En,
              name_Vi: item.name_Vi,
              advisorName: item.advisorName,
              created_date: moment(item.createdDate).format(
                CommonConstant.DEFAULT_TIME_FORMAT
              ),
              status: item.status
            });
          });
          this.tableOptions.totalRows = result.totalItems;
          console.log('item + ', this.items);
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
    // convert data
    convertData() {
      this.optionData.nameSelect = this.selected;
      this.optionData.sortSlect = this.selectedNum;
      this.optionData.pageIndex = this.tableOptions.currentPage;
      this.optionData.pageSize = this.tableOptions.perPage;
      return this.optionData;
    }
  }
};
</script>

<style scoped>
.status-item {
  width: 125px;
}
.card-body button {
  width: 32px;
  height: 32px;
}
.b-form-select {
  width: 150px;
  height: 35px;
  margin-left: 50px;
  margin-right: 50px;
}
.card-sort-custom {
  margin-left: 40px;
  margin-top: 20px;
}
</style>
