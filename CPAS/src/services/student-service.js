import { baseServerAxios } from '../services/axios-provider';
import CommonUtil from '../common/utils/common-util';
import UrlConstant from '../common/constant/common-url';

export default {
  // import student
  createStudent(data, callback, errorCallback) {
    CommonUtil.requestAxios(
      baseServerAxios().post(
        UrlConstant.api.trainningStaff.CREATE_STUDENT,
        JSON.stringify(data)
      ),
      callback,
      errorCallback
    );
  },
  // get students
  getStudent(callback, errorCallback) {
    CommonUtil.requestAxios(
      baseServerAxios.get(UrlConstant.api.trainningStaff.GET_STUDENT),
      callback,
      errorCallback
    );
  }
};
