<template>
  <div>
    <b-row class="m-0">
      <b-col cols="12" class="mt-2">
        <div class="card card-shadow">
          <div class="topic-detail-container">
            <div class="header-container">
              <div class="header text-center p-3 mb-2">
                CAPSTONE PROJECT APPROVAL SYSTEM OF FPTU
              </div>
            </div>
            <div class="body-container p-3">
              <div class="body p-3">
                <b-row class="group-first-info">
                  <b-col cols="6 mb-2">
                    <div class="detail-label d-inline-block">
                      Profession:
                    </div>
                    <div class="detail-info d-inline-block">
                      Software Engineer
                    </div>
                  </b-col>
                  <b-col cols="6 mb-2">
                    <div class="detail-label d-inline-block">
                      Specialty:
                    </div>
                    <div class="detail-info d-inline-block">
                      {{ detailData.program.name }}
                    </div>
                  </b-col>
                  <b-col cols="12 mb-2">
                    <div class="detail-label d-inline-block">
                      Kind of person make registers:
                    </div>
                    <div class="detail-info d-inline-block">
                      Advisor
                    </div>
                  </b-col>
                </b-row>
                <b-row>
                  <table-super-detail ref="table-super" />
                </b-row>
                <b-row>
                  <topic-detail-display-info ref="topic-detail-content" />
                </b-row>
                <b-row>
                  <topic-detail-display-info ref="topic-detail-comment" />
                </b-row>
              </div>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import TableSuperVisorDetail from './components/TableSuperVisorDetail';
import TableStudentDetail from './components/TableStudentDetail';
import TopicDetailDisplayInfo from './components/TopicDetailDisplayInfo';
import CommonConstant from '../../common/constant/common-constant';
import CommonUtil from '../../common/utils/common-util';
import { TopicService } from '../../services/service-provider';
export default {
  components: {
    tableSuperDetail: TableSuperVisorDetail,
    tableStudentDetail: TableStudentDetail,
    topicDetailDisplayInfo: TopicDetailDisplayInfo
  },
  data() {
    return {
      detailData: {
        program: {
          name: ''
        }
      }
    };
  },
  mounted() {
    this.getDetailDataById();
  },
  methods: {
    // Init supervisor table
    initSuperTable(data) {
      this.$refs['table-super'].init({
        advisor: data.advisor,
        subAdvisors: data.subAdvisors
      });
    },
    // Init topic detail
    initTopicDetail(data) {
      this.$refs['topic-detail-content'].init(
        data,
        'Register content of Capstone Project',
        'Capstone Project name',
        [
          'abstractionHtml',
          'theoryHtml',
          'mainFunctionHtml',
          'otherProductsHtml'
        ]
      );
      this.$refs['topic-detail-comment'].init(data, 'Other comment', '', [
        'otherCommentsHtml'
      ]);
    },
    // Get detail data by id
    getDetailDataById() {
      CommonUtil.addLoading();
      const topicId = this.$route.params.id;
      TopicService.getTopicById(
        topicId,
        result => {
          this.detailData = result;
          this.initSuperTable(result);
          this.initTopicDetail(result);
          CommonUtil.removeLoading();
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
