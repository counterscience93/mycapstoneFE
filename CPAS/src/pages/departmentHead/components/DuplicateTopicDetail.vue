<template>
  <div class="topic-detail-container">
    <div class="header-container">
      <div
        class="header text-center p-3 mb-2"
        @click="isShowBody = !isShowBody"
      >
        {{ detailData.name_En }}
      </div>
    </div>
    <div class="body-container p-3" v-show="isShowBody">
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
    </div>
  </div>
</template>

<script>
import TableSuperVisorDetail from './topic-detail/TableSuperVisorDetail';
import TopicDetailDisplayInfo from './topic-detail/TopicDetailDisplayInfo';
import CommonConstant from '../../../common/constant/common-constant';
import CommonUtil from '../../../common/utils/common-util';
import { TopicService } from '../../../services/service-provider';
export default {
  components: {
    tableSuperDetail: TableSuperVisorDetail,
    topicDetailDisplayInfo: TopicDetailDisplayInfo
  },
  props: ['duplicateTopicId'],
  mounted() {
    this.getDetailData();
  },
  data() {
    return {
      isShowBody: false,
      detailData: {
        name_En: '',
        program: {
          name: '',
          shortName: ''
        },
        advisor: {
          fullName: ''
        }
      }
    };
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
      TopicService.getTopicById(
        this.duplicateTopicId,
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
.topic-detail-container .header:hover {
  background-color: #4ba89c;
}
.topic-detail-container .header:active {
  background-color: #4ba89c;
  transform: translateY(1px);
}
</style>
