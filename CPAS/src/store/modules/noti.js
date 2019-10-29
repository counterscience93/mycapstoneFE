const state = {
  isShowingFirebase: false
};

const mutations = {
  setNotification: (state, payload) => {
    state.isShowingFirebase = payload;
  }
};

const actions = {
  setNotification({ commit }, payload) {
    commit('setNotification', payload);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
