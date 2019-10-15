<template>
  <b-container>
    <b-row>
      <b-col cols="12">
        <div class="card card-shadow">
          <div class="card-header custom">List Capstone Topic</div>
          <div class="card-body">
            <b-table
              hover
              :items="items"
              :fields="fields"
              :current-page="tableOptions.currentPage"
              :per-page="tableOptions.perPage"
              @onfilteref="onFiltered"
            >
              <!-- status column -->
              <template v-slot:cell(status)="row">
                <b-badge
                  pill
                  v-if="row.item.status === 'public'"
                  variant="secondary"
                  class="status-item"
                >
                  {{ row.item.status }}</b-badge
                >
                <b-badge
                  pill
                  v-if="row.item.status === 'taken'"
                  variant="warning"
                  class="status-item"
                >
                  {{ row.item.status }}</b-badge
                >
              </template>
              <!-- action column -->
              <template v-slot:cell(action)="row">
                <template
                  v-if="row.item.status === 8 || row.item.status === 'taking'"
                >
                  <b-button variant="info" size="sm"
                    ><font-awesome-icon icon="info"
                  /></b-button>
                </template>
                <template
                  v-else-if="
                    row.item.status === 'approved' ||
                      row.item.status === 'rejected'
                  "
                >
                  <b-button
                    variant="primary"
                    size="sm"
                    @click="redirectToCreatePage(row.item.data)"
                  >
                    <font-awesome-icon icon="info" />
                  </b-button>
                </template>
                <template v-if="row.item.status === 'draft'">
                  <b-button variant="primary" size="sm">
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
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import UrlConstant from '../../common/constant/common-url';
import CommonUtil from '../../common/utils/common-util';
import moment from 'moment';
import CommonConstant from '../../common/constant/common-constant';
import { TopicService } from '../../services/service-provider';

export default {
  data() {
    return {
      fields: [
        { key: 'nameTopic', label: 'Capstone Topic' },
        { key: 'advisor', label: 'Advisor' },
        { key: 'createdDate', label: 'Created Date' },
        { key: 'action', label: 'Action' }
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
    // set the initial number of items
    this.tableOptions.totalRows = this.items.length;
    this.getTopicData();
  },
  methods: {
    // trigger pagnination to update the number of pages
    onFiltered(filteredItems) {
      this.tableOptions.totalRows = filteredItems.length;
      this.tableOptions.currentPage = 1;
    },
    redirectToCreatePage(id) {
      this.$router.push({
        path: UrlConstant.page.advisor.CREATE_TOPIC
      });
    },
    // get topic data
    getTopicData() {
      CommonUtil.addLoading();
      TopicService.getTopic(
        result => {
          CommonUtil.removeLoading();
          if (result && result.length > 0) {
            result.forEach(item => {
              if (item.status === 8) {
                this.items.push({
                  nameTopic: item.name_En,
                  advisor: item.advisor.fullName,
                  status: item.status,
                  createdDate: moment(item.createdDate).format(
                    CommonConstant.DEFAULT_TIME_FORMAT
                  )
                });
              }
            });
          }
        },
        () => {
          CommonUtil.removeLoading();
        }
      );
    }
  }
};
</script>
<style scoped>
.status-item {
  width: 80px;
}
</style>
