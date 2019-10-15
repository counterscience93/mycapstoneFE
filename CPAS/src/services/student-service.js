import { baseServerAxios } from '../services/axios-provider';
import CommonUtil from '../common/utils/common-util';
import UrlConstant from '../common/constant/common-url';

export default {
  createStudent(data, callback, errorCallback) {
    CommonUtil.requestAxios(
      baseServerAxios.post(
        UrlConstant.api.trainningStaff.CREATE_STUDENT,
        JSON.stringify({
          students: data.students
        })
      ),
      callback,
      errorCallback
    );
  }
};
