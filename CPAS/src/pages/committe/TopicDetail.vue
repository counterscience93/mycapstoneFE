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
                  <topic-detail-display-info ref="topic-detail-comment" />
                </b-row>
              </div>
              <b-button variant="primary" v-b-modal.modal-1>Validate</b-button>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
    <div>
      <b-modal
        id="modal-1"
        :header-bg-variant="headerBgVariant"
        :header-text-variant="headerTextVariant"
        title="Tiêu chí đánh giá đồ án"
        centered: true
        @ok="submit(formData.topicId)"
      >
        <div>
          <div v-for="(item, index) in formData.questions" :key="index">
            <b-checkbox
              value="true"
              v-model="formData.questions[index].isApproved"
              >{{ item.content }}</b-checkbox
            >
            <b-form-input
              v-model="formData.questions[index].comment"
              placeholder="Enter a comment..."
            ></b-form-input>
          </div>
        </div>
      </b-modal>
    </div>
  </div>
</template>
<script>
import TableSuperVisorDetail from './components/TableSuperVisorDetail';
import TopicDetailDisplayInfo from './components/TopicDetailDisplayInfo';
import CommonConstant from '../../common/constant/common-constant';
import CommonUtil from '../../common/utils/common-util';
import {
  TopicService,
  CommitteeService
} from '../../services/service-provider';
import UrlConstant from '../../common/constant/common-url';

export default {
  components: {
    tableSuperDetail: TableSuperVisorDetail,
    topicDetailDisplayInfo: TopicDetailDisplayInfo
  },
  data() {
    return {
      headerBgVariant: 'info',
      headerTextVariant: 'light',
      detailData: {
        program: {
          name: ''
        }
      },
      formData: {
        topicId: '',
        questions: []
      }
    };
  },
  mounted() {
    this.getDetailDataById();
    this.getQuestion();
  },
  methods: {
    // redirect get topic page
    redirectGetTopic() {
      this.$route.push({
        path: UrlConstant.page.committe.CM_GETLIST_TOPIC
      });
    },
    // get question
    getQuestion() {
      CommonUtil.addLoading();
      CommitteeService.getComment(
        1,
        result => {
          CommonUtil.removeLoading();
          if (result && result.length > 0) {
            result.forEach(item => {
              this.formData.questions.push({
                id: item.id,
                content: item.question,
                isApproved: 'false',
                comment: ''
              });
            });
          }
        },
        () => {
          CommonUtil.removeLoading();
        }
      );
    },
    // submit validate
    submit(id) {
      CommonUtil.addLoading();
      const convertdata = this.convertData();
      console.log(convertdata);
      CommitteeService.postComment(
        convertdata,
        result => {
          CommonUtil.showNotification(
            'Success',
            'Update topic successfull!',
            CommonConstant.NOTI_TYPE.SUCCESS
          );
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
    },
    // convert data
    convertData() {
      const tmp = JSON.parse(JSON.stringify(this.formData));
      const questions = this.formData.questions.map(item => ({
        id: item.id,
        isApproved: item.isApproved,
        comment: item.comment
      }));
      tmp['questions'] = questions;
      return tmp;
    },
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
          this.formData.topicId = result.id;
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
.modal-div {
  width: 800px;
  height: 800px;
}
</style>
