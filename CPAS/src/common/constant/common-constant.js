export default {
  STATUS: {
    DRAFT: 'Draft',
    PENDING: 'Pending',
    PUBLIC: 'Published',
    UNPUBLISH: 'Unpublished'
  },
  STATUS_TO_ID: {
    DRAFT: 1,
    PENDING: 2,
    VALIDATEAPPROVED: 6,
    UNPUBLISH: 7,
    PUBLIC: 8
  },
  NOTI_TYPE: {
    SUCCESS: 'success',
    WARN: 'warn',
    ERROR: 'error',
    INFO: 'info'
  },
  DEFAULT_TIME_FORMAT: 'DD/MM/YYYY HH:mm:ss',
  DEFAULT_DATE_FORMAT: 'DD/MM/YYYY',
  ROLE: {
    '0': 'student',
    '1': 'trainning staff',
    '2': 'advisor',
    '3': 'committee',
    '4': 'department head'
  },
  DEFAULT_EXPIRED_TIME_COOKIE: 1800000 // 30 minutes
};
