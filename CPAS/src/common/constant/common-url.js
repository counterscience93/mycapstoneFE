export default {
  page: {
    DEFAULT: '/trainningStaff/published-topic',
    advisor: {
      TOPIC_MNG: '/advisor/topic-mng',
      CREATE_TOPIC: '/advisor/create-topic/:id',
      SEARCH_TOPIC: '/advisor/search-topic',
      TOPIC_DETAIL: '/advisor/topic-detail/:id'
    },
    committe: {
      CM_GETLIST_TOPIC: '/committee/get-topic',
      CM_CHECKVALIDATE_TOPIC: '/committee/check-validate',
      CM_TOPIC_DETAIL: '/committee/topic-detail/:id'
    },
    trainningStaff: {
      TS_PUBLISHED_TOPIC: '/trainningStaff/published-topic',
      TS_STUDENT_MNG: '/trainningStaff/student-mng',
      TS_IMPORT_STUDENT: '/trainningStaff/import-student',
      TS_GET_GROUP: '/trainningStaff/get-group'
    },
    student: {
      ST_GET_PUBLICTOPIC: '/student/student-getTopic'
    },
    departmentHead: {
      DH_GET_STUDENT: '/departmenHead/deparmentHead-getStudent',
      DH_GET_TOPIC: '/deparmentHead/deparmentHead-getTopic',
      DH_APPROVED_TOPIC: '/dh/approved-topic',
      DH_MNG_TOPIC: '/departmentHead/departmentHead-manageTopic'
    }
  },
  api: {
    ROOT: 'https://capstonepj.azurewebsites.net/api/',
    technique: {
      GET_TECHNIQUE: '/technique'
    },
    program: {
      GET_PROGRAM: '/program'
    },
    question: {
      GET_QUESTION: '/committee/question',
      POST_COMMENT: '/committee/question',
      GET_COMMITTE_COMMENT: '/comment/{topicId}'
    },
    semester: {
      GET_SEMESTER: '/semester'
    },
    advisor: {
      CREATE_TOPIC: '/topic',
      UPDATE_TOPIC: '/topic',
      GET_ADVISOR: '/advisor'
    },
    topic: {
      GET_TOPIC: '/topic',
      GET_TOPIC_BY_ID: '/topic/{id}',
      DH_GET_TOPIC: '/dh/topic',
      GET_TOPIC_BY_STATUS: '/ts/topic',
      POST_TOPIC_STATUS: '/topic/status',
      GET_DH_TOPIC_REVIEW: '/dh/topic/review',
      TS_POST_TOPIC_STATUS: '/ts/topic/status'
    },
    dh: {
      SEND_TOPIC_TO_COMMITTEE: '/dh/send-to-committee'
    },
    group: {
      GET_GROUP_STUDENT: '/group'
    },
    trainningStaff: {
      CREATE_STUDENT: '/student'
    },
    committee: {
      GET_TOPIC: '/committee/topic/'
    }
  }
};
