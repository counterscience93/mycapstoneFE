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
              <!-- action column -->
              <template v-slot:cell(action)="row">
                <template v-if="row.item.status === 4">
                  <b-button
                    variant="primary"
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
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import UrlConstant from '../../common/constant/common-url';
import CommonUtil from '../../common/utils/common-util';
import { CommitteeService } from '../../services/service-provider';
import CommonConstant from '../../common/constant/common-constant';
import moment from 'moment';

export default {
  data() {
    return {
      fields: [
        { key: 'nameTopic', label: 'Capstone Topic' },
        { key: 'createdDate', label: 'Created Date' },
        { key: 'advisor', label: 'Advisor' },
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
    redirectToViewDetailPage(id) {
      this.$router.push({
        path: UrlConstant.page.committe.CM_TOPIC_DETAIL.replace(':id', id)
      });
    },
    // get topic data
    getTopicData() {
      CommonUtil.addLoading();
      CommitteeService.getTopic(
        result => {
          CommonUtil.removeLoading();
          if (result && result.length > 0) {
            result.forEach(item => {
              this.items.push({
                id: item.id,
                nameTopic: item.name_En,
                advisor: item.advisor.fullName,
                status: item.status,
                createdDate: moment(item.createdDate).format(
                  CommonConstant.DEFAULT_TIME_FORMAT
                )
              });
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
