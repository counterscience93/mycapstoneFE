<template>
  <b-row class="m-0">
    <b-col cols="12 p-0 m-0">
      <div class="page-title-container">
        <div class="card card-shadow d-inline-block">
          <font-awesome-icon icon="plus" class="page-title-item" />
        </div>
        <div class="d-inline-block pl-2">
          <div class="page-title-description-header">
            Create topic
          </div>
          <div class="page-title-description-detail">
            Advisors can create topic.
          </div>
        </div>
      </div>
    </b-col>
    <b-col cols="12" class="mt-2">
      <div class="card card-shadow">
        <div class="card-header custom">
          <b-row>
            <b-col cols="12">Create Topic Form</b-col>
          </b-row>
        </div>
        <div class="card-body">
          <label for="input-title">English Name:</label>
          <b-form-input
            id="input-title"
            v-model="formData.nameEnglish"
            placeholder="Enter English Name"
            class="mb-3"
            trim
          />
          <label for="input-title">Vietnamese Name:</label>
          <b-form-input
            id="input-title"
            v-model="formData.nameVietnamese"
            placeholder="Enter Vietnamese Name"
            class="mb-3"
            trim
          />
          <label for="input-title">Short Name:</label>
          <b-form-input
            id="input-title"
            v-model="formData.shortName"
            placeholder="Enter Short Name"
            class="mb-3"
            trim
          />
          <!-- Sub Advisors -->
          <label for="input-title">Sub Advisors:</label>
          <multiselect
            class="mb-3"
            v-model="formData.subAdvisors"
            placeholder="Search a tag"
            label="text"
            track-by="value"
            :options="optionsData.subAdvisors"
            :multiple="true"
            :taggable="true"
          />
          <!-- Technique -->
          <label for="input-title">Technique:</label>
          <multiselect
            class="mb-3"
            v-model="formData.techniques"
            placeholder="Search a tag"
            label="text"
            track-by="value"
            :options="optionsData.techniques"
            :multiple="true"
            :taggable="true"
          />
          <!-- Program -->
          <label for="input-title">Program:</label>
          <b-form-select
            id="input-3"
            v-model="formData.programId"
            :options="optionsData.program"
            class="mb-3"
            required
          />
          <label for="input-title">Abstraction:</label>
          <div class="ckeditor mb-3">
            <ckeditor
              :editor="editor"
              :config="editorConfig"
              v-model="formData.abstraction"
            />
          </div>
          <label for="input-title">Theory And Practice:</label>
          <div class="ckeditor mb-3">
            <ckeditor
              :editor="editor"
              :config="editorConfig"
              v-model="formData.theory"
            />
          </div>
          <label for="input-title">Main Function:</label>
          <div class="ckeditor mb-3">
            <ckeditor
              :editor="editor"
              :config="editorConfig"
              v-model="formData.mainFunction"
            />
          </div>
          <label for="input-title">Other Products:</label>
          <div class="ckeditor mb-3">
            <ckeditor
              :editor="editor"
              :config="editorConfig"
              v-model="formData.otherProducts"
            />
          </div>
          <label for="input-title">Other Comments:</label>
          <div class="ckeditor mb-3">
            <ckeditor
              :editor="editor"
              :config="editorConfig"
              v-model="formData.otherComments"
            />
          </div>
        </div>
        <div class="card-footer custom">
          <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="submitForm(2)"
            >Submit</b-button
          >
          <b-button size="sm" class="float-right mr-3" @click="submitForm(1)"
            >Save Draft</b-button
          >
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import UrlConstant from '../../common/constant/common-url';
import CommonUtil from '../../common/utils/common-util';
import CommonConstant from '../../common/constant/common-constant';
import Multiselect from 'vue-multiselect';
import {
  AdvisorService,
  TechniqueService,
  ProgramService,
  TopicService,
  NotiService
} from '../../services/service-provider';
export default {
  components: {
    multiselect: Multiselect
  },
  mounted() {
    this.getProgram();
    this.getAdvisor();
  },
  data() {
    return {
      advisorData: undefined,
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the rich-text editor.
      },
      formData: {
        nameEnglish: '',
        nameVietnamese: '',
        shortName: '',
        programId: '',
        subAdvisors: [],
        techniques: [],
        supervisor: '',
        abstraction: '',
        theory: '',
        mainFunction: '',
        otherProducts: '',
        otherComments: ''
      },
      optionsData: {
        program: [],
        subAdvisors: [],
        techniques: []
      }
    };
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo'
    })
  },
  methods: {
    // Submit form
    submitForm(status) {
      CommonUtil.addLoading();
      const convertedData = this.convertData(status);
      if (convertedData.id) {
        TopicService.updateTopic(
          convertedData,
          result => {
            CommonUtil.showNotification(
              'Success',
              'Update topic successfull!',
              CommonConstant.NOTI_TYPE.SUCCESS
            );
            CommonUtil.removeLoading();
            this.createNoti(convertedData);
            // Redirect
            this.redirectToTopicMngPage();
          },
          () => {
            CommonUtil.removeLoading();
            CommonUtil.showNotification(
              'Error',
              'Update fail!',
              CommonConstant.NOTI_TYPE.ERROR
            );
          }
        );
      } else {
        TopicService.createTopic(
          convertedData,
          result => {
            CommonUtil.removeLoading();
            CommonUtil.showNotification(
              'Success',
              'Create topic successfull!',
              CommonConstant.NOTI_TYPE.SUCCESS
            );
            convertedData.id = result;
            console.log(convertedData);
            this.createNoti(convertedData);
            // Redirect
            this.redirectToTopicMngPage();
          },
          () => {
            CommonUtil.removeLoading();
            CommonUtil.showNotification(
              'Error',
              'Create topic fail!',
              CommonConstant.NOTI_TYPE.ERROR
            );
          }
        );
      }
    },
    loadFromData(data) {
      this.formData.techniques = CommonUtil.getSelectedData(
        data.techniques,
        this.optionsData.techniques,
        'value'
      );
      this.formData.subAdvisors = CommonUtil.getSelectedData(
        data.subAdvisors,
        this.optionsData.subAdvisors,
        'value'
      );
      this.formData.nameEnglish = data.name_En;
      this.formData.nameVietnamese = data.name_Vi;
      this.formData.shortName = data.shortName;
      this.formData.programId = data.program.id;
      this.formData.abstraction = data.abstractionHtml;
      this.formData.theory = data.theoryHtml;
      this.formData.mainFunction = data.mainFunctionHtml;
      this.formData.otherProducts = data.otherProductsHtml;
      this.formData.otherComments = data.otherCommentsHtml;
    },
    // Convert data before submit
    convertData(status) {
      const tmp = JSON.parse(JSON.stringify(this.formData));
      const techniques = this.formData.techniques.map(item => ({
        id: item.value
      }));
      const subAdvisors = this.formData.subAdvisors.map(item => ({
        id: item.value
      }));
      tmp['id'] = parseInt(this.$route.params.id);
      tmp['subAdvisors'] = subAdvisors;
      tmp['techniques'] = techniques;
      tmp['advisorId'] = this.advisorData[0].id;
      tmp['status'] = status;
      return tmp;
    },
    // Get topic by id
    getTopicById() {
      const topicId = this.$route.params.id;
      if (topicId && topicId !== 'undefined') {
        CommonUtil.addLoading();
        TopicService.getTopicById(
          topicId,
          result => {
            CommonUtil.removeLoading();
            this.loadFromData(result);
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
      } else {
        CommonUtil.removeLoading();
      }
    },
    // Get technique
    getTechnique() {
      CommonUtil.addLoading();
      TechniqueService.getTechnique(
        result => {
          this.optionsData.techniques = CommonUtil.convertToSelectBoxData(
            result,
            'name'
          );
          // Get topic by id
          this.getTopicById();
        },
        () => {
          CommonUtil.showNotification(
            'Error',
            'Server error!',
            CommonConstant.NOTI_TYPE.ERROR
          );
          // Get topic by id
          this.getTopicById();
        }
      );
    },
    // Get program
    getProgram() {
      CommonUtil.addLoading();
      ProgramService.getProgram(
        result => {
          this.optionsData.program = CommonUtil.convertToSelectBoxData(
            result,
            'name'
          );
          if (!CommonUtil.isEmptyArray(result)) {
            this.formData.programId = result[0].id;
          }
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
    // Create notification
    createNoti(topicData) {
      const data = {
        topicId: topicData.id,
        userId: this.advisorData[0].id,
        topicName: topicData.nameEnglish,
        topicStatus: topicData.status,
        userName: this.userInfo.fullName,
        isReading: false,
        createdDate: moment().valueOf()
      };
      CommonUtil.addFirebaseNotification();
      NotiService.createNotification(
        data,
        () => {},
        () => {
          CommonUtil.removeFirebaseNotification();
        }
      );
    },
    // Get Advisor
    getAdvisor() {
      CommonUtil.addLoading();
      AdvisorService.getAdvisor(
        result => {
          let tmp = CommonUtil.convertToSelectBoxData(result, 'fullName');
          tmp = tmp.filter(item => item.value !== 1);
          this.optionsData.subAdvisors = tmp;
          this.advisorData = result;
          // Get technique
          this.getTechnique();
        },
        () => {
          CommonUtil.showNotification(
            'Error',
            'Server error!',
            CommonConstant.NOTI_TYPE.ERROR
          );
          // Get technique
          this.getTechnique();
        }
      );
    },
    // Redirect to Topic Management page if success
    redirectToTopicMngPage() {
      this.$router.replace(UrlConstant.page.advisor.TOPIC_MNG);
    }
  }
};
</script>

<style scoped></style>
