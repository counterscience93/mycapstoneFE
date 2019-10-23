<template>
  <div>
    <div>
      <b-row class="m-0">
        <b-col cols="12" class="mt-2">
          <div class="card card-shadow">
            <div class="card-header custom">TOPIC MIGHT BE DUPLICATED</div>
            <div v-for="dupTopic in duplicatedTopics" :key="dupTopic.id">
              <duplicate-topic-detail :duplicateTopicId="dupTopic.id" />
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
    <div v-if="detailData != undefined">
      <b-row class="m-0">
        <b-col cols="12" class="mt-2">
          <div class="card card-shadow">
            <div class="card-header custom">TOPIC TARGET</div>
            <div class="topic-detail-container">
              <div
                class="header-container"
                @click="isShowTargetTopic = !isShowTargetTopic"
              >
                <div class="header text-center p-3 mb-2">
                  {{ detailData.name_En }}
                </div>
              </div>
              <div class="body-container p-3" v-show="isShowTargetTopic">
                <div class="body p-3">
                  <b-row class="group-first-info">
                    <b-col cols="6 mb-2">
                      <div class="detail-label d-inline-block">
                        Profession:
                      </div>
                      <div class="detail-info d-inline-block">
                        {{ detailData.program.shortName }}
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
                        {{ detailData.advisor.fullName }}
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
                <b-row class="m-0">
                  <b-col cols="6" class="mt-2 text-center">
                    <b-button
                      size="lg"
                      variant="outline-success"
                      @click="postTopicReview(true, '')"
                      >Approve</b-button
                    >
                  </b-col>
                  <b-col cols="6" class="mt-2 text-center">
                    <b-button
                      size="lg"
                      variant="outline-danger"
                      @click="showCommentModal"
                      >Reject</b-button
                    >
                  </b-col>
                </b-row>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
    <topic-detail-comment-modal
      ref="comment-modal"
      @submit="postTopicReview(false, $event)"
    />
  </div>
</template>

<script>
import TableSuperVisorDetail from './components/topic-detail/TableSuperVisorDetail';
import TopicDetailDisplayInfo from './components/topic-detail/TopicDetailDisplayInfo';
import TopicDetailCommentModal from './components/TopicDetailCommentModal';
import DuplicateTopicDetail from './components/DuplicateTopicDetail';
import UrlConstant from '../../common/constant/common-url';
import CommonConstant from '../../common/constant/common-constant';
import CommonUtil from '../../common/utils/common-util';
import { TopicService, DHService } from '../../services/service-provider';

export default {
  components: {
    tableSuperDetail: TableSuperVisorDetail,
    topicDetailDisplayInfo: TopicDetailDisplayInfo,
    duplicateTopicDetail: DuplicateTopicDetail,
    topicDetailCommentModal: TopicDetailCommentModal
  },
  data() {
    return {
      detailData: {
        name_En: '',
        program: {
          name: '',
          shortName: ''
        },
        advisor: {
          fullName: ''
        }
      },
      duplicatedTopics: [],
      isShowTargetTopic: true
    };
  },
  mounted() {
    this.getDetailData();
    this.getTopicReviewById();
  },
  methods: {
    showCommentModal() {
      this.$refs['comment-modal'].showModal();
    },
    // Redirect to topic management page when success
    redirectToTopicMngPage() {
      this.$router.push({
        path: UrlConstant.page.departmentHead.DH_MNG_TOPIC
      });
    },
    // Init supervisor table
    initSuperTable(data) {
      this.$refs['table-super'].init({
        advisor: data.advisor,
        subAdvisors: data.subAdvisors
      });
    },
    initSuperTableById(data, id) {
      this.$refs[`table-super-${id}`].init({
        advisor: data.advisor,
        subAdvisors: data.subAdvisors
      });
    },
    // Init topic detail
    initTopicDetail(data) {
      this.$refs['topic-detail-content'].clear();
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
      this.$refs['topic-detail-comment'].clear();
      this.$refs['topic-detail-comment'].init(data, 'Other comment', '', [
        'otherCommentsHtml'
      ]);
    },
    getDetailData() {
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
    },
    // Post topic review
    postTopicReview(isApproved, content) {
      const data = {
        id: this.$route.params.id,
        isApproved: isApproved,
        content: content
      };
      CommonUtil.addLoading();
      DHService.postTopicReview(
        data,
        () => {
          CommonUtil.removeLoading();
          CommonUtil.showNotification(
            'Success',
            'Topic approve successfully!',
            CommonConstant.NOTI_TYPE.SUCCESS
          );
          this.redirectToTopicMngPage();
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
    // Get Topic review by id
    getTopicReviewById() {
      CommonUtil.addLoading();
      DHService.getTopicReviewById(
        this.$route.params.id,
        res => {
          this.duplicatedTopics = res.duplicatedTopics;
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
.topic-detail-container .header:hover {
  background-color: #4ba89c;
}
.topic-detail-container .header:active {
  background-color: #4ba89c;
  transform: translateY(1px);
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
