<template>
  <div>
    <b-row class="m-0">
      <b-col cols="12" class="mt-2">
        <div class="card">
          <div class="topic-detail-container" id="content">
            <div class="header-container">
              <div class="header text-center p-3 mb-2">{{ this.nameEng }}</div>
            </div>
            <div class="body-container p-3">
              <div class="body p-3">
                <b-row class="group-first">
                  <b-col cols="6 mb-2">
                    <div class="detail-label d-inline-block">Profession:</div>
                    <div class="detail-info d-inline-block">
                      Software Engineer
                    </div>
                  </b-col>
                  <b-col cols="6 mb-2">
                    <div class="detail-label d-inline-block">Specialty:</div>
                    <div class="detail-info d-inline-block">
                      {{ detailData.program.name }}
                    </div>
                  </b-col>
                  <b-col cols="12 mb-2">
                    <div class="detail-label d-inline-block">
                      Kind of person make registers:
                    </div>
                    <div class="detail-info d-inline-block">Advisor</div>
                  </b-col>
                </b-row>
                <b-row>
                  <table-super-visor-detail ref="table-super" />
                </b-row>
                <b-row>
                  <topic-detail-display-info ref="topic-detail-content" />
                  <topic-detail-display-info ref="topic-detail-comment" />
                </b-row>
              </div>
              <b-button size="lg" variant="primary" v-b-modal.modal-1
                >Validate</b-button
              >
              <b-button size="lg" variant="primary" @click="exportTopic()"
                >Export to Doc</b-button
              >
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
        hide-footer
        title="Tiêu chí đánh giá đồ án"
      >
        <div style="width:450px">
          <div v-for="(item, index) in formData.questions" :key="index">
            <b-checkbox
              class="modal-text"
              value="true"
              v-model="formData.questions[index].isApproved"
              >{{ item.content }}</b-checkbox
            >
            <b-form-input
              class="modal-text"
              v-model="formData.questions[index].comment"
              placeholder="Enter a comment..."
            ></b-form-input>
          </div>
        </div>
        <b-button
          style="margin-top:5px; margin-right:10px"
          variant="outline-primary"
          size="sm"
          class="float-right"
          @click="submit(formData.topicId)"
          >Save</b-button
        >
      </b-modal>
    </div>
  </div>
</template>
<script>
import TableSuperVisorDetail from './component/TableSuperVisorDetail';
import TopicDetailDisplayInfo from './component/TopicDetailDisplayInfo';
import CommonConstant from '../../common/constant/common-constant';
import CommonUtil from '../../common/utils/common-util';
import {
  TopicService,
  CommitteeService
} from '../../services/service-provider';
import UrlConstant from '../../common/constant/common-url';
import * as docx from 'docx';
import * as fs from 'fs';

import { saveAs } from 'file-saver';
export default {
  components: {
    TableSuperVisorDetail,
    TopicDetailDisplayInfo
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
      nameEng: '',
      count: '',
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
      this.$router.push({
        path: UrlConstant.page.committe.CM_GETLIST_TOPIC
      });
    },
    // get question
    getQuestion() {
      CommonUtil.addLoading();
      const topicId = this.$route.params.id;
      CommitteeService.getComment(
        topicId,
        result => {
          CommonUtil.removeLoading();
          if (result && result.length > 0) {
            result.forEach(item => {
              if (this.count < 5) {
                this.formData.questions.push({
                  id: item.id,
                  content: item.question,
                  isApproved: item.isApproved,
                  comment: item.comment
                });
              }
              this.count++;
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
      CommitteeService.postComment(
        convertdata,
        result => {
          CommonUtil.showNotification(
            'Success',
            'Validate topic successfull!',
            CommonConstant.NOTI_TYPE.SUCCESS
          );
          CommonUtil.removeLoading();
          this.redirectGetTopic();
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
      console.log(tmp);
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
          this.nameEng = result.name_En;
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
    },
    exportTopic() {
      // Create document
      const doc = new docx.Document({
        creator: 'FPT University',
        title: 'Capstone Project',
        description: 'Capstone Project'
      });

      // Documents contain sections, you can have multiple sections per document, go here to learn more about sections
      // This simple example will only contain one section
      doc.addSection({
        properties: {},
        headers: {
          default: new docx.Header({
            children: [new docx.Paragraph('CAPSTONE PROJECT REGISTER')]
          })
        },
        footers: {
          default: new docx.Footer({
            children: [new docx.Paragraph('11.14-BM/DH/HDCV/FU 1/0')]
          })
        },
        children: [
          new docx.Paragraph({
            text: 'CAPSTONE PROJECT REGISTER',
            heading: docx.HeadingLevel.HEADING_2,
            alignment: docx.AlignmentType.CENTER,
            size: 30
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun('Hello World'),
              new docx.TextRun({
                text: 'Foo Bar',
                bold: true
              }),
              new docx.TextRun({
                text: 'Github is the best',
                bold: true
              }).tab()
            ]
          })
        ]
      });
      console.log(fs);

      // Used to export the file into a .docx file
      docx.Packer.toBlob(doc).then(blob => {
        console.log(blob);
        saveAs(blob, `${this.nameEng}.docx`);
        console.log('Document created successfully');
      });
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
.modal-text {
  margin: 10px;
}
</style>
