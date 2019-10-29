import axios from 'axios';
import UrlConstant from '../common/constant/common-url';
import CommonUtil from '../common/utils/common-util';

const baseServerAxios = () =>
  axios.create({
    baseURL: UrlConstant.api.ROOT,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${CommonUtil.getCookies('access_token')}`
    }
  });

const unAuthServerAxios = axios.create({
  baseURL: UrlConstant.api.ROOT,
  headers: {
    'Content-Type': 'application/json'
  }
});

export { baseServerAxios, unAuthServerAxios };
