import axios from 'axios';
import UrlConstant from '../common/constant/common-url';

const baseServerAxios = axios.create({
  baseURL: UrlConstant.api.ROOT,
  headers: {
    'Content-Type': 'application/json'
  }
});

export { baseServerAxios };
