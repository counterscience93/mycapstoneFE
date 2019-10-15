<template>
  <div>
    <b-row class="m-0">
      <b-col cols="12" class="p-0">
        <div class="page-title-container">
          <div class="card card-shadow d-inline-block">
            <font-awesome-icon icon="table" class="page-title-item" />
          </div>
          <div class="d-inline-block pl-2">
            <div class="page-title-description-header">Manage Topic</div>
            <div class="page-title-description-detail">Department Head can approve or reject a topic</div>
          </div>
        </div>
      </b-col>
    </b-row>
    <div
      v-if="isLoading"
      class="d-flex justify-content-center align-items-center"
      style="height: 60vh;"
    >
      <b-spinner style="width: 5rem; height: 5rem;" label="Large Spinner" class="spinner"></b-spinner>
    </div>
    <div v-else>
      <b-row class="m-0">
        <b-col cols="12" class="mt-2 p-3">
          <div class="card card-shadow">
            <b-table
              hover
              :items="topics"
              :fields="fields"
              :current-page="tableOptions.currentPage"
              :per-page="tableOptions.perPage"
              @filtered="onFiltered"
              class="text-center"
            >
              <!-- customize column -->
              <!-- <template v-slot:cell(advisor)="row">{{ row.value.fullName }}</template> -->
              <template v-slot:cell(duplicate)="row">
                <!-- <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Topics duplicated
                </b-button>-->

                <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
                <b-form-checkbox
                  v-model="row.detailsShowing"
                  @change="row.toggleDetails"
                  checked
                >Topics might same</b-form-checkbox>
              </template>

              <template v-slot:cell(option)="row">
                <b-button-group>
                  <b-button
                    size="sm"
                    variant="outline-primary"
                    @click="redirectToViewDetailPage(row.item.id)"
                  >Detail</b-button>
                  <b-button size="sm" variant="outline-success">Approve</b-button>
                  <b-button size="sm" variant="outline-danger">Reject</b-button>
                </b-button-group>
              </template>

              <template v-slot:row-details="row">
                <b-card title="Topics might be duplicated">
                  <b-row class="mb-2" v-for="dup in row.item.duplicatedTopics" v-bind:key="dup.id">
                    <b-col sm="5" class="text-sm-left">
                      <b>Capstone:</b>
                      {{ dup.name_En }}
                    </b-col>
                    <b-col sm="3" class="text-sm-left">
                      <b>Advisor:</b>
                      {{ dup.advisorName }}
                    </b-col>
                    <b-col sm="3" class="text-sm-left">
                      <b>Created:</b>
                      {{formatTime(dup.createdDate)}}
                    </b-col>
                    <b-col sm="1" class="text-sm-center">
                      <b-button
                        size="sm"
                        variant="outline-primary"
                        @click="redirectToViewDetailPage(dup.id)"
                      >Detail</b-button>
                    </b-col>
                  </b-row>
                </b-card>
              </template>
            </b-table>
          </div>
          <b-pagination
            v-model="tableOptions.currentPage"
            :total-rows="tableOptions.totalRows"
            :per-page="tableOptions.perPage"
            size="sm"
          ></b-pagination>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
import UrlConstant from '../../common/constant/common-url';
import CommonConstant from '../../common/constant/common-constant';
import CommonUtil from '../../common/utils/common-util';
import { TopicService } from '../../services/service-provider';

export default {
  created() {
    console.log('created called.');
    this.loadTopics();
  },
  data() {
    return {
      topics: [],
      fields: [
        {
          key: 'id',
          label: 'CapstoneId'
        },
        {
          key: 'name_En',
          label: 'Name'
        },
        {
          key: 'advisorName',
          label: 'Advisor'
        },
        {
          key: 'duplicate',
          label: 'Duplicate'
        },
        {
          key: 'option',
          label: 'Option'
        }
      ],
      tableOptions: {
        totalRows: 1,
        currentPage: 1,
        perPage: 10
      },
      isLoading: false
      // selectTopic: null
    };
  },
  mounted() {
    // Set the initial number of items
    this.tableOptions.totalRows = this.topics.length;
  },
  methods: {
    // Trigger pagination to update the number of buttons/pages due to filtering
    onFiltered(filteredItems) {
      this.tableOptions.totalRows = filteredItems.length;
      this.tableOptions.currentPage = 1;
    },
    showDetail(topic) {
      console.log(`TOpic: ${topic.name_En}`);
    },
    async loadTopics() {
      this.isLoading = true;
      TopicService.getTopicByDepartmentHeadToReview(
        res => {
          this.isLoading = false;
          if (res && res.length > 0) {
            res.forEach(item => {
              this.topics.push({
                id: item.id,
                name_En: item.name_En,
                name_Vi: item.name_Vi,
                advisorName: item.advisorName,
                created_date: moment(item.createdDate).format(
                  CommonConstant.DEFAULT_DATE_FORMAT
                ),
                duplicatedTopics: item.duplicatedTopics,
                status: item.status
              });
            });
          }
        },
        () => {
          this.isLoading = false;
          CommonUtil.showNotification(
            'Error',
            'Server error!',
            CommonConstant.NOTI_TYPE.ERROR
          );
        }
      );
    },
    redirectToViewDetailPage(id) {
      this.$router.push({
        path: UrlConstant.page.advisor.TOPIC_DETAIL.replace(':id', id)
      });
    },
    formatTime(topic) {
      return moment(topic).format(
        CommonConstant.DEFAULT_DATE_FORMAT
      );
    }
    // sendTopic(topic) {
    //   this.selectTopic = topic;
    // }
  }
};
</script>

<style scoped>
.spinner {
  color: #4ba89c;
}
</style>
