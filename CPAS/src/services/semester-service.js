import { baseServerAxios } from '../services/axios-provider';
import CommonUtil from '../common/utils/common-util';
import UrlConstant from '../common/constant/common-url';

export default {
  getSemester(callback, errorCallback) {
    CommonUtil.requestAxios(
      baseServerAxios().get(UrlConstant.api.semester.GET_SEMESTER),
      callback,
      errorCallback
    );
  }
};
