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
          <div class="card-header custom">Capstone Management Table</div>
          <div class="card-body">
            <b-table
              hover
              :items="items"
              :fields="fields"
              :current-page="tableOptions.currentPage"
              :per-page="tableOptions.perPage"
              @filtered="onFiltered"
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
              :total-rows="tableOptions.totalRows"
              :per-page="tableOptions.perPage"
              size="sm"
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
        totalRows: 1,
        currentPage: 1,
        perPage: 10
      }
    };
  },
  watch: {
    items(val) {
      this.tableOptions.totalRows = val.length;
    }
  },
  mounted() {
    // Set the initial number of items
    this.tableOptions.totalRows = this.items.length;
    // Get topic data
    this.getTopicData();
  },
  methods: {
    // Show note modal
    showNoteModal(data) {
      this.$refs['note-modal'].init(data);
    },
    // Trigger pagination to update the number of buttons/pages due to filtering
    onFiltered(filteredItems) {
      this.tableOptions.totalRows = filteredItems.length;
      this.tableOptions.currentPage = 1;
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
      CommonUtil.addLoading();
      TopicService.getTopic(
        result => {
          CommonUtil.removeLoading();
          if (result && result.length > 0) {
            result.forEach(item => {
              this.items.push({
                id: item.id,
                note: item.note,
                nameEng: item.name_En,
                nameVi: item.name_Vi,
                created_date: moment(item.createdDate).format(
                  CommonConstant.DEFAULT_TIME_FORMAT
                ),
                status: item.status
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
</style>
