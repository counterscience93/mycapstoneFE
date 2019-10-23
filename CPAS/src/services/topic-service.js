import { baseServerAxios } from '../services/axios-provider';
import CommonUtil from '../common/utils/common-util';
import UrlConstant from '../common/constant/common-url';

export default {
  // Get Topic
  getTopic(callback, errorCallback) {
    CommonUtil.requestAxios(
      baseServerAxios.get(UrlConstant.api.topic.GET_TOPIC),
      callback,
      errorCallback
    );
  },
  // Get topic by id
  getTopicById(id, callback, errorCallback) {
    CommonUtil.requestAxios(
      baseServerAxios.get(
        UrlConstant.api.topic.GET_TOPIC_BY_ID.replace('{id}', id)
      ),
      callback,
      errorCallback
    );
  },
  // Create topic
  createTopic(data, callback, errorCallback) {
    CommonUtil.requestAxios(
      baseServerAxios.post(
        UrlConstant.api.advisor.CREATE_TOPIC,
        JSON.stringify({
          techniques: data.techniques,
          programId: data.programId,
          subAdvisors: data.subAdvisors,
          advisorId: data.advisorId,
          name_En: data.nameEnglish,
          name_Vi: data.nameVietnamese,
          shortName: data.shortName,
          status: data.status,
          abstraction: CommonUtil.convertTextHtmlToText(data.abstraction),
          theory: CommonUtil.convertTextHtmlToText(data.theory),
          mainFunction: CommonUtil.convertTextHtmlToText(data.mainFunction),
          otherProducts: CommonUtil.convertTextHtmlToText(data.otherProducts),
          otherComments: CommonUtil.convertTextHtmlToText(data.otherComments),
          abstractionHtml: data.abstraction,
          mainFunctionHtml: data.mainFunction,
          theoryHtml: data.theory,
          otherCommentsHtml: data.otherComments,
          otherProductsHtml: data.otherProducts
        })
      ),
      callback,
      errorCallback
    );
  },
  // Update topic
  updateTopic(data, callback, errorCallback) {
    CommonUtil.requestAxios(
      baseServerAxios.put(
        UrlConstant.api.advisor.UPDATE_TOPIC,
        JSON.stringify({
          id: data.id,
          techniques: data.techniques,
          programId: data.programId,
          subAdvisors: data.subAdvisors,
          advisorId: data.advisorId,
          name_En: data.nameEnglish,
          name_Vi: data.nameVietnamese,
          shortName: data.shortName,
          status: data.status,
          abstraction: CommonUtil.convertTextHtmlToText(data.abstraction),
          theory: CommonUtil.convertTextHtmlToText(data.theory),
          mainFunction: CommonUtil.convertTextHtmlToText(data.mainFunction),
          otherProducts: CommonUtil.convertTextHtmlToText(data.otherProducts),
          otherComments: CommonUtil.convertTextHtmlToText(data.otherComments),
          abstractionHtml: data.abstraction,
          mainFunctionHtml: data.mainFunction,
          theoryHtml: data.theory,
          otherCommentsHtml: data.otherComments,
          otherProductsHtml: data.otherProducts
        })
      ),
      callback,
      errorCallback
    );
  },
  // get topic by status
  getTopicByStatus(callback, errorCallback) {
    CommonUtil.requestAxios(
      baseServerAxios.get(UrlConstant.api.topic.GET_TOPIC_BY_STATUS),
      callback,
      errorCallback
    );
  },
  // change status of ts
  postChangeStatus(data, callback, errorCallback) {
    CommonUtil.requestAxios(
      baseServerAxios.post(
        UrlConstant.api.topic.TS_POST_TOPIC_STATUS,
        JSON.stringify({
          id: data.id,
          status: data.status
        })
      ),
      callback,
      errorCallback
    );
  },
  getTopicByDepartmentHeadToReview(callback, errorCallback) {
    CommonUtil.requestAxios(
      baseServerAxios.get(UrlConstant.api.topic.GET_DH_TOPIC_REVIEW),
      callback,
      errorCallback
    );
  }
};
