import { baseServerAxios } from '../services/axios-provider';
import CommonUtil from '../common/utils/common-util';
import UrlConstant from '../common/constant/common-url';

export default {
  // Get advisor
  getAdvisor(callback, errorCallback) {
    CommonUtil.requestAxios(
      baseServerAxios().get(UrlConstant.api.advisor.GET_ADVISOR),
      callback,
      errorCallback
    );
  }
};
