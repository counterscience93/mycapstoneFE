import Vue from 'vue';
import Router from 'vue-router';
import UrlConstant from '../common/constant/common-url';
// Advisor
import AdvisorTopicMng from '../pages/advisor/TopicMng.vue';
import AdvisorCreateTopic from '../pages/advisor/CreateTopic.vue';
import AdvisorSearchTopic from '../pages/advisor/SearchTopic.vue';
import AdvisorTopicDetail from '../pages/advisor/TopicDetail.vue';
// Training Staff
import TrainningStaffPublishedTopic from '../pages/trainningStaff/ListingCapstone.vue';
import TrainningStaffStudentMng from '../pages/trainningStaff/StudentMng.vue';
import TrainingStaffImportStudent from '../pages/trainningStaff/ImportStudent.vue';
import trainningStaffGetGroup from '../pages/trainningStaff/GroupStudent.vue';
// Student
import StudentGetPublicTopic from '../pages/student/GetListPublicTopic.vue';
// department head
import DepartmentHeadGetListStudent from '../pages/departmentHead/GetListStudent.vue';
import DepartmentHeadGetTopic from '../pages/departmentHead/GetTopic.vue';
import DepartmentHeadApprovedTopic from '../pages/departmentHead/ApprovedTopic.vue';
import DepartmentHeadManageTopic from '../pages/departmentHead/ManageTopic.vue';
// committee
import CommitteeGetTopic from '../pages/committe/GetTopic.vue';
import CommitteCheckValidate from '../pages/committe/ValidateTopic.vue';
import CommitteGetTopicDetail from '../pages/committe/TopicDetail.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: UrlConstant.page.DEFAULT,
      name: 'Default',
      component: TrainningStaffPublishedTopic
    },
    {
      path: UrlConstant.page.trainningStaff.TS_PUBLISHED_TOPIC,
      name: 'TsPublishedTopics',
      component: TrainningStaffPublishedTopic
    },
    {
      path: UrlConstant.page.trainningStaff.TS_IMPORT_STUDENT,
      name: 'TsImportStudent',
      component: TrainingStaffImportStudent
    },
    {
      path: UrlConstant.page.trainningStaff.TS_STUDENT_MNG,
      name: 'TsStudentMng',
      component: TrainningStaffStudentMng
    },
    {
      path: UrlConstant.page.trainningStaff.TS_GET_GROUP,
      name: 'TsGetGroup',
      component: trainningStaffGetGroup
    },
    {
      path: UrlConstant.page.departmentHead.DH_GET_STUDENT,
      name: 'DhGetStudent',
      component: DepartmentHeadGetListStudent
    },
    {
      path: UrlConstant.page.departmentHead.DH_GET_TOPIC,
      name: 'DhGetTopic',
      component: DepartmentHeadGetTopic
    },
    {
      path: UrlConstant.page.departmentHead.DH_APPROVED_TOPIC,
      name: 'DhApprovedTopic',
      component: DepartmentHeadApprovedTopic
    },
    {
      path: UrlConstant.page.departmentHead.DH_MNG_TOPIC,
      name: 'DhManageTopic',
      component: DepartmentHeadManageTopic
    },
    {
      path: UrlConstant.page.student.ST_GET_PUBLICTOPIC,
      name: 'StGetPublicTopic',
      component: StudentGetPublicTopic
    },
    {
      path: UrlConstant.page.committe.CM_GETLIST_TOPIC,
      name: 'CmGetListTopic',
      component: CommitteeGetTopic
    },
    {
      path: UrlConstant.page.committe.CM_CHECKVALIDATE_TOPIC,
      name: 'CmCheckValidate',
      component: CommitteCheckValidate
    },
    {
      path: UrlConstant.page.committe.CM_TOPIC_DETAIL,
      name: 'CmTopicDetail',
      component: CommitteGetTopicDetail
    },
    {
      path: UrlConstant.page.advisor.TOPIC_MNG,
      name: 'AdvisorTopicMng',
      component: AdvisorTopicMng
    },
    {
      path: UrlConstant.page.advisor.CREATE_TOPIC,
      name: 'AdvisorCreateTopic',
      component: AdvisorCreateTopic
    },
    {
      path: UrlConstant.page.advisor.SEARCH_TOPIC,
      name: 'AdvisorSearchTopic',
      component: AdvisorSearchTopic
    },
    {
      path: UrlConstant.page.advisor.TOPIC_DETAIL,
      name: 'AdvisorTopicDetail',
      component: AdvisorTopicDetail
    },
    { path: '*', redirect: UrlConstant.page.DEFAULT }
  ],
  mode: 'history'
});
