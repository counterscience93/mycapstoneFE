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
                  v-if="row.item.status === 4"
                  variant="success"
                  class="status-item"
                >
                  Duplicate Approved</b-badge
                >
                <b-badge
                  pill
                  v-if="row.item.status === 3"
                  variant="danger"
                  class="status-item"
                >
                  Duplicate Reject</b-badge
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
                  v-if="row.item.status === 'Taken'"
                  variant="primary"
                  class="status-item"
                >
                  {{ row.item.status }}</b-badge
                >
                <b-badge
                  pill
                  v-if="row.item.status === 'Passed'"
                  variant="info"
                  class="status-item"
                >
                  {{ row.item.status }}</b-badge
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
                  v-else-if="
                    row.item.status === 1 || row.item.status === 'Rejected'
                  "
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
  </b-row>
</template>

<script>
import moment from 'moment';
import UrlConstant from '../../common/constant/common-url';
import CommonConstant from '../../common/constant/common-constant';
import CommonUtil from '../../common/utils/common-util';
import { TopicService } from '../../services/service-provider';

export default {
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
  mounted() {
    // Set the initial number of items
    this.tableOptions.totalRows = this.items.length;
    // Get topic data
    this.getTopicData();
  },
  methods: {
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
