import { baseServerAxios } from '../services/axios-provider';
import CommonUtil from '../common/utils/common-util';
import UrlConstant from '../common/constant/common-url';

export default {
  createNotification(data, callback, errorCallback) {
    CommonUtil.requestAxios(
      baseServerAxios().post(
        UrlConstant.api.notification.CREATE_NOTI,
        JSON.stringify(data)
      ),
      callback,
      errorCallback
    );
  }
};
