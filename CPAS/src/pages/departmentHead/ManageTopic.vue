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
            <div class="page-title-description-detail">
              Department Head can approve or reject a topic
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row class="m-0">
      <b-col cols="12" class="mt-2 p-3">
        <div class="card card-shadow">
          <div class="card-header custom">Manage Topic Table</div>
          <div class="card-body">
            <b-table
              hover
              :items="topics"
              :fields="fields"
              :current-page="tableOptions.currentPage"
              :per-page="tableOptions.perPage"
              @filtered="onFiltered"
              class="text-align-left"
            >
              <!-- customize column -->

              <template v-slot:cell(option)="row">
                <b-button
                  size="sm"
                  variant="outline-primary"
                  @click="redirectToViewDetailPage(row.item.id)"
                  >Detail</b-button
                >
              </template>
            </b-table>
            <b-pagination
              v-model="tableOptions.currentPage"
              :total-rows="tableOptions.totalRows"
              :per-page="tableOptions.perPage"
              size="sm"
            />
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import moment from 'moment';
import UrlConstant from '../../common/constant/common-url';
import CommonConstant from '../../common/constant/common-constant';
import CommonUtil from '../../common/utils/common-util';
import { TopicService } from '../../services/service-provider';
import TableSuperVisorDetail from './components/topic-detail/TableSuperVisorDetail';
import TopicDetailDisplayInfo from './components/topic-detail/TopicDetailDisplayInfo';

export default {
  components: {
    tableSuperDetail: TableSuperVisorDetail,
    topicDetailDisplayInfo: TopicDetailDisplayInfo
  },
  data() {
    return {
      topics: [],
      fields: [
        {
          key: 'name_En',
          label: 'Name'
        },
        {
          key: 'advisorName',
          label: 'Advisor'
        },
        {
          key: 'created_date',
          label: 'Created Time'
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
      detailData: {
        program: {
          name: ''
        }
      },
      channels: [],
      firstLoad: true,
      channel: null,
      messages: [],
      listeners: [],
      message: ''
      // selectTopic: null
    };
  },
  watch: {
    topics(val) {
      this.tableOptions.totalRows = val.length;
    }
  },
  mounted() {
    // Set the initial number of items
    this.tableOptions.totalRows = this.topics.length;
    this.loadTopics();
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
    loadTopics() {
      CommonUtil.addLoading();
      TopicService.getTopicByDepartmentHeadToReview(
        res => {
          CommonUtil.removeLoading();
          if (res && res.length > 0) {
            res.forEach(item => {
              this.topics.push({
                id: item.id,
                name_En: item.name_En,
                name_Vi: item.name_Vi,
                advisorName: item.advisorName,
                created_date: moment(item.createdDate).format(
                  CommonConstant.DEFAULT_TIME_FORMAT
                ),
                duplicatedTopics: item.duplicatedTopics,
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
    },
    redirectToViewDetailPage(id) {
      this.$router.push({
        path: UrlConstant.page.departmentHead.DH_TOPIC_DETAIL.replace(':id', id)
      });
    },
    formatTime(topic) {
      return moment(topic).format(CommonConstant.DEFAULT_DATE_FORMAT);
    },
    addCustomDuplicatedTopics() {
      if (this.topics !== []) {
        const topic = this.topics[0];
        topic.duplicatedTopics = [
          {
            id: 5,
            name_En: 'Chess Online Learning System',
            createdDate: 1571199962506,
            advisorName: 'Nguyễn Văn A',
            duplicatedTopics: []
          },
          {
            id: 6,
            name_En:
              'Counseling software support treating diseases on ornamental plants',
            createdDate: 1571200081075,
            advisorName: 'Nguyễn Văn A',
            duplicatedTopics: []
          }
        ];
      }
    }
  }
};
</script>

<style scoped>
.spinner {
  color: #4ba89c;
}
.topic-detail-container {
  width: 100%;
}
.topic-detail-container .header {
  background: #013972;
  font-weight: 600;
  color: white;
}
.topic-detail-container .body .detail-label {
  font-weight: 600;
}
.topic-detail-container .body .group-first-info {
  background: #f3f3f3;
  border-radius: 4px;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
