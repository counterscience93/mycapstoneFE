import { baseServerAxios } from '../services/axios-provider';
import CommonUtil from '../common/utils/common-util';
import UrlConstant from '../common/constant/common-url';

export default {
  // get question for committe
  getQuestion(callback, errorCallback) {
    CommonUtil.requestAxios(
      baseServerAxios.get(UrlConstant.api.question.GET_QUESTION),
      callback,
      errorCallback
    );
  },
  // get comment from dh
  getComment(id, callback, errorCallback) {
    CommonUtil.requestAxios(
      baseServerAxios.get(
        UrlConstant.api.question.GET_COMMITTE_COMMENT.replace('{topicId}', id)
      ),
      callback,
      errorCallback
    );
  },
  // post comment
  postComment(data, callback, errorCallback) {
    CommonUtil.requestAxios(
      baseServerAxios.post(
        UrlConstant.api.question.POST_COMMENT,
        JSON.stringify({
          id: data.topicId,
          questions: data.question
        })
      ),
      callback,
      errorCallback
    );
  },
  // get topic
  getTopic(callback, errorCallback) {
    CommonUtil.requestAxios(
      baseServerAxios.get(UrlConstant.api.committee.GET_TOPIC),
      callback,
      errorCallback
    );
  }
};
