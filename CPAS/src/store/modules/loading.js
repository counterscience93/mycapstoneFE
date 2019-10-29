const state = {
  isLoading: false
};

const mutations = {
  setLoading: (state, payload) => {
    state.isLoading = payload;
  }
};

const actions = {
  setLoading({ commit }, payload) {
    commit('setLoading', payload);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
