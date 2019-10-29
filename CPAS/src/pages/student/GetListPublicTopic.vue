<template>
  <b-row class="m-0">
    <b-col cols="12 p-0 m-0">
      <div class="page-title-container">
        <div class="card card-shadow d-inline-block">
          <font-awesome-icon icon="table" class="page-title-item" />
        </div>
        <div class="d-inline-block pl-2">
          <div class="page-title-description-header">Capstone Management</div>
          <div class="page-title-description-detail">Student can view public topics.</div>
        </div>
      </div>
      <div class="p-3">
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
                <template>
                  <b-button
                    @click="redirectToViewDetailPage(row.item.id)"
                    variant="primary"
                    size="sm"
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
import UrlConstant from '../../common/constant/common-url';
import CommonUtil from '../../common/utils/common-util';
import CommonConstant from '../../common/constant/common-constant';
import moment from 'moment';
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
  watch: {
    items(val) {
      this.tableOptions.totalRows = val.length;
    }
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
        path: UrlConstant.page.student.ST_TOPIC_DETAIL.replace(':id', id)
      });
    },
    // get topic data
    getTopicData() {
      CommonUtil.addLoading();
      TopicService.getTopic(
        {
          pageIndex: 1,
          pageSize: 10,
          sortSlect: true
        },
        result => {
          CommonUtil.removeLoading();
          if (result && result.result.length > 0) {
            result.result.forEach(item => {
              if (item.status === 8) {
                console.log('item', item)
                this.items.push({
                  id: item.id,
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
