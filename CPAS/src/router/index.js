import Vue from 'vue';
import Router from 'vue-router';
import UrlConstant from '../common/constant/common-url';
import CommonUtil from '../common/utils/common-util';
import RouterGuard from './router-guard';
// Advisor
import AdvisorTopicMng from '../pages/advisor/TopicMng.vue';
import AdvisorCreateTopic from '../pages/advisor/CreateTopic.vue';
import AdvisorSearchTopic from '../pages/advisor/SearchTopic.vue';
import AdvisorTopicDetail from '../pages/advisor/TopicDetail.vue';
import AdvisorGetTopic from '../pages/advisor/AdvisorGetTopic.vue';
// Training Staff
import TrainningStaffPublishedTopic from '../pages/trainningStaff/ListingCapstone.vue';
import TrainningStaffStudentMng from '../pages/trainningStaff/StudentMng.vue';
import TrainingStaffImportStudent from '../pages/trainningStaff/ImportStudent.vue';
import trainningStaffGetGroup from '../pages/trainningStaff/GroupStudent.vue';
// Student
import StudentGetPublicTopic from '../pages/student/GetListPublicTopic.vue';
import StudentGetTopicDetail from '../pages/student/StudentGetTopicDetail.vue';
// department head
import DepartmentHeadGetListStudent from '../pages/departmentHead/GetListStudent.vue';
import DepartmentHeadApprovedTopic from '../pages/departmentHead/ApprovedTopic.vue';
import DepartmentHeadManageTopic from '../pages/departmentHead/ManageTopic.vue';
import DepartmentHeadQuestionTable from '../pages/departmentHead/components/approve-topic/QuestionTable.vue';
import DepartmentHeadTopicDetail from '../pages/departmentHead/TopicDetail.vue';
// committee
import CommitteeGetTopic from '../pages/committe/GetTopic.vue';
import CommitteGetTopicDetail from '../pages/committe/TopicDetail.vue';
// user
import Login from '../pages/user/Login.vue';
import WordDemo from '../pages/user/WordDemo.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: UrlConstant.page.DEFAULT,
      name: 'Default',
      component: Login
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
      path: UrlConstant.page.departmentHead.DH_QUESTION_TABLE,
      name: 'DhQuestionTable',
      component: DepartmentHeadQuestionTable
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
      path: UrlConstant.page.departmentHead.DH_TOPIC_DETAIL,
      name: 'Detail topic',
      component: DepartmentHeadTopicDetail
    },
    {
      path: UrlConstant.page.student.ST_GET_PUBLICTOPIC,
      name: 'StGetPublicTopic',
      component: StudentGetPublicTopic
    },
    {
      path: UrlConstant.page.student.ST_TOPIC_DETAIL,
      name: 'StGetTopicDetail',
      component: StudentGetTopicDetail
    },
    {
      path: UrlConstant.page.committe.CM_GETLIST_TOPIC,
      name: 'CmGetListTopic',
      component: CommitteeGetTopic
    },
    {
      path: UrlConstant.page.committe.CM_TOPIC_DETAIL,
      name: 'CmTopicDetail',
      component: CommitteGetTopicDetail
    },
    {
      path: UrlConstant.page.advisor.GET_TOPIC,
      name: 'AdvisorGetTopic',
      component: AdvisorGetTopic
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
    {
      path: UrlConstant.page.user.LOGIN,
      name: 'Log in',
      component: Login
    },
    {
      path: '/wordexport',
      name: 'Word',
      component: WordDemo
    },
    { path: '*', redirect: UrlConstant.page.DEFAULT }
  ],
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  const accessToken = CommonUtil.getCookies('access_token');
  if (
    to.path !== UrlConstant.page.user.LOGIN &&
    from.path !== UrlConstant.page.DEFAULT
  ) {
    const isLoginExpired = RouterGuard.isLoginExpired(accessToken);
    // Check expired
    if (isLoginExpired) {
      localStorage.removeItem('userInfo');
      const pathName = window.location.pathname;
      if (pathName !== UrlConstant.page.user.LOGIN) {
        next('/');
      }
    } else {
      handleValidLoginData(accessToken, to, next);
    }
  } else {
    handleValidLoginData(accessToken, to, next);
  }
});

const handleValidLoginData = (accessToken, to, next) => {
  const isValid = RouterGuard.initUserLogin(accessToken);
  // Handle local storage data
  if (isValid) {
    next();
  } else {
    CommonUtil.removeCookies('access_token');
    if (to.path === UrlConstant.page.user.LOGIN) {
      next();
    } else {
      next('/');
    }
  }
};

export default router;
