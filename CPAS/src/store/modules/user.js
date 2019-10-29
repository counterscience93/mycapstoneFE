import { removeToken, decodeToken } from '@/common/utils/auth';
import CommonConstant from '../../common/constant/common-constant';

const state = {
  token: undefined,
  decodeToken: '',
  userId: '',
  username: '',
  fullName: '',
  role: '',
  userInfo: ''
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_DECODE_TOKEN: (state, payload) => {
    state.decodeToken = payload;
  },
  SET_USERID: (state, userId) => {
    state.userId = userId;
  },
  SET_USERNAME: (state, username) => {
    state.username = username;
  },
  SET_FULLNAME: (state, fullName) => {
    state.fullName = fullName;
  },
  SET_ROLES: (state, roles) => {
    state.role = roles;
  },
  SET_USER_INFO: (state, payload) => {
    state.userInfo = payload;
  }
};

const actions = {
  login({ commit }, payload) {
    commit('SET_USER_INFO', payload);
  },

  setToken({ commit }, payload) {
    commit('SET_TOKEN', payload);
    if (payload) {
      commit('SET_DECODE_TOKEN', decodeToken(payload));
    } else {
      commit('SET_DECODE_TOKEN', payload);
    }
  },

  getInfo({ commit, state }) {
    const decoded = decodeToken(state.token);
    commit('SET_USERID', decoded.access_token);
    commit('SET_FULLNAME', decoded.fullname);
    commit('SET_USERNAME', decoded.username);
    commit('SET_ROLES', [CommonConstant.ROLE[decoded.role]]);
  },

  logout({ commit }) {
    commit('SET_TOKEN', '');
    commit('SET_USERID', '');
    commit('SET_FULLNAME', '');
    commit('SET_USERNAME', '');
    commit('SET_ROLES', []);
    removeToken();
    // resetRouter();
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
