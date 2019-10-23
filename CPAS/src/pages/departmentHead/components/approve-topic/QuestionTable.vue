<template>
  <div>
    <b-row class="m-0">
      <b-col cols="12" class="p-0">
        <div class="page-title-container">
          <div class="card card-shadow d-inline-block">
            <font-awesome-icon icon="table" class="page-title-item" />
          </div>
          <div class="d-inline-block pl-2">
            <div class="page-title-description-header">
              Committee Question Table
            </div>
            <div class="page-title-description-detail">
              Department Head can view committee's review.
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row class="m-0">
      <b-col cols="12">
        <div class="pt-3">
          <div class="card card-shadow">
            <div class="card-header custom">Capstone Management Table</div>
            <div class="card-body">
              <b-table
                v-if="isShowTable"
                hover
                :items="items"
                :fields="fields"
                :current-page="tableOptions.currentPage"
                :per-page="tableOptions.perPage"
              >
                <template v-slot:cell(1)="{ item }">
                  <question-mark :mark="item['1']" />
                </template>
                <template v-slot:cell(2)="{ item }">
                  <question-mark :mark="item['2']" />
                </template>
                <template v-slot:cell(3)="{ item }">
                  <question-mark :mark="item['3']" />
                </template>
                <template v-slot:cell(4)="{ item }">
                  <question-mark :mark="item['4']" />
                </template>
                <template v-slot:cell(5)="{ item }">
                  <question-mark :mark="item['5']" />
                </template>
                <template v-slot:cell(action)="{ item }">
                  <b-button variant="outline-info" size="sm" @click="showModal">
                    <font-awesome-icon icon="info" />
                  </b-button>
                  <topic-comment-modal
                    ref="topic-comment-modal"
                    :questions="item.questions"
                  />
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
  </div>
</template>

<script>
import CommonConstant from '../../../../common/constant/common-constant';
import CommonUtil from '../../../../common/utils/common-util';
import { DHService } from '../../../../services/service-provider';
import QuestionMark from './QuestionMark';
import TopicCommentModal from './TopicCommentModal';

export default {
  components: {
    QuestionMark,
    TopicCommentModal
  },
  data() {
    return {
      isShowTable: false,
      filedsIdArr: [],
      fields: [
        {
          key: 'committeeName',
          label: 'Committee'
        }
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
    this.getAllQuestionCommentByTopicId();
  },
  methods: {
    showModal() {
      this.$refs['topic-comment-modal'].showModal();
    },
    // Generate header table config
    generateHeader(data) {
      // Check data is empty
      if (!data || data.length === 0) return;
      const questionArr = data[0].questions;
      if (!questionArr || questionArr.length === 0) return;
      questionArr.forEach(item => {
        this.filedsIdArr.push(item.id + '');
        this.fields.push({
          key: item.id + '',
          label: item.question
        });
      });
      this.fields.push({
        key: 'action',
        label: 'Action'
      });
      this.isShowTable = true;
    },
    // Get all question comment by topic id
    getAllQuestionCommentByTopicId() {
      CommonUtil.addLoading();
      DHService.getAllQuestionCommentByTopicID(
        1,
        result => {
          CommonUtil.removeLoading();
          this.generateHeader(result);
          result.forEach(item => {
            const tmp = {
              committeeName: item.committeeName,
              questions: item.questions
            };
            const questionArr = item.questions;
            questionArr.forEach(questionItem => {
              tmp[questionItem['id']] = questionItem.isApproved;
            });
            this.items.push(tmp);
          });
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

<style scoped></style>
