import { baseServerAxios } from '../services/axios-provider';
import CommonUtil from '../common/utils/common-util';
import UrlConstant from '../common/constant/common-url';

export default {
  getTechnique(callback, errorCallback) {
    CommonUtil.requestAxios(
      baseServerAxios.get(UrlConstant.api.technique.GET_TECHNIQUE),
      callback,
      errorCallback
    );
  }
};
