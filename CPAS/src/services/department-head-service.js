import { baseServerAxios } from '../services/axios-provider';
import CommonUtil from '../common/utils/common-util';
import UrlConstant from '../common/constant/common-url';

export default {
  sendTopicToCommittee(data, callback, errorCallback) {
    CommonUtil.requestAxios(
      baseServerAxios.post(
        UrlConstant.api.dh.SEND_TOPIC_TO_COMMITTEE,
        JSON.stringify(data)
      ),
      callback,
      errorCallback
    );
  }
};
