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
                <template v-if="row.item.status === 6 || row.item.status === 8">
                  <b-button
                    variant="info"
                    size="sm"
                    @click="changeStatus(row.item.id, 7)"
                    >Unpublished</b-button
                  >
                </template>
                <template v-else-if="row.item.status === 7">
                  <b-button
                    variant="primary"
                    size="sm"
                    v-model="formData.status"
                    @click="changeStatus(row.item.id, 8)"
                    >Published
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
import moment from 'moment';
import CommonUtil from '../../common/utils/common-util';
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
      formData: {
        id: '',
        status: ''
      },
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
    changeStatus(id, status) {
      CommonUtil.addLoading();
      const convertedData = this.convertData(id, status);
      TopicService.postChangeStatus(
        convertedData,
        result => {
          CommonUtil.removeLoading();
          CommonUtil.showNotification(
            'Success',
            'Change successfull!',
            CommonConstant.NOTI_TYPE.SUCCESS,
            (this.items = []),
            this.getTopicData()
          );
        },
        () => {
          CommonUtil.removeLoading();
          CommonUtil.showNotification(
            'Error',
            'Change fail!',
            CommonConstant.NOTI_TYPE.ERROR
          );
        }
      );
    },
    convertData(id, status) {
      const tmp = JSON.parse(JSON.stringify(this.formData));
      tmp['id'] = id;
      tmp['status'] = status;
      console.log(tmp['id']);
      return tmp;
    },
    // get topic data
    getTopicData() {
      CommonUtil.addLoading();
      TopicService.getTopicByStatus(
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
