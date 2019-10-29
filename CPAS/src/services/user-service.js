import { unAuthServerAxios } from '../services/axios-provider';
import CommonUtil from '../common/utils/common-util';
import UrlConstant from '../common/constant/common-url';

export default {
  // Login
  login(authCode, callback, error) {
    CommonUtil.requestAxios(
      unAuthServerAxios.post(UrlConstant.api.user.LOGIN, authCode),
      callback,
      error
    );
  }
};
