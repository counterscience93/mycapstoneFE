import { baseServerAxios } from '../services/axios-provider';
import CommonUtil from '../common/utils/common-util';
import UrlConstant from '../common/constant/common-url';

export default {
  // Send topic to committee
  sendTopicToCommittee(data, callback, errorCallback) {
    CommonUtil.requestAxios(
      baseServerAxios.post(
        UrlConstant.api.dh.SEND_TOPIC_TO_COMMITTEE,
        JSON.stringify(data)
      ),
      callback,
      errorCallback
    );
  },
  // Send topic to trainning staff
  sendTopicToTrainningStaff(data, callback, errorCallback) {
    CommonUtil.requestAxios(
      baseServerAxios.post(
        UrlConstant.api.dh.SEND_TOPIC_TO_TRAINING_STAFF,
        JSON.stringify(data)
      ),
      callback,
      errorCallback
    );
  },
  // Department head get approved topic
  getApprovedTopic(callback, errorCallback) {
    CommonUtil.requestAxios(
      baseServerAxios.get(UrlConstant.api.dh.GET_DUPLICATE_APPROVED_TOPIC),
      callback,
      errorCallback
    );
  },
  // Department head get validation approved topic
  getValidationApprovedTopic(callback, errorCallback) {
    CommonUtil.requestAxios(
      baseServerAxios.get(UrlConstant.api.dh.GET_VALIDATION_APPROVED_TOPIC),
      callback,
      errorCallback
    );
  },
  // Get all question comment by topic id
  getAllQuestionCommentByTopicID(id, callback, errorCallback) {
    CommonUtil.requestAxios(
      baseServerAxios.get(
        UrlConstant.api.dh.GET_ALL_QUESTION_COMMENT_BY_TOPIC_ID.replace(
          '{id}',
          id
        )
      ),
      callback,
      errorCallback
    );
  },
  // Department head get topic review by Id
  getTopicReviewById(id, callback, errorCallback) {
    CommonUtil.requestAxios(
      baseServerAxios.get(
        UrlConstant.api.dh.GET_TOPIC_REVIEW_BY_ID.replace('{id}', id)
      ),
      callback,
      errorCallback
    );
  },
  // Post topic review
  postTopicReview(data, callback, errorCallback) {
    CommonUtil.requestAxios(
      baseServerAxios.post(
        UrlConstant.api.dh.POST_TOPIC_REVIEW_STATUS,
        JSON.stringify(data)
      ),
      callback,
      errorCallback
    );
  }
};
