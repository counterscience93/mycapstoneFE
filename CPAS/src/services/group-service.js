import { baseServerAxios } from '../services/axios-provider';
import CommonUtil from '../common/utils/common-util';
import UrlConstant from '../common/constant/common-url';

export default {
  getGroup(callback, errorCallback) {
    CommonUtil.requestAxios(
      baseServerAxios().get(UrlConstant.api.group.GET_GROUP_STUDENT),
      callback,
      errorCallback
    );
  }
};
