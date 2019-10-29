import { baseServerAxios } from '../services/axios-provider';
import CommonUtil from '../common/utils/common-util';
import UrlConstant from '../common/constant/common-url';

export default {
  getProgram(callback, errorCallback) {
    CommonUtil.requestAxios(
      baseServerAxios().get(UrlConstant.api.program.GET_PROGRAM),
      callback,
      errorCallback
    );
  }
};
