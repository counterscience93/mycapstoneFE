import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// eslint-disable-next-line
const store = new Vuex.Store({
  state: {
    isLoading: false
  },
  getters: {
    isLoading: state => state.isLoading
  },
  mutations: {
    setLoading: (state, payload) => {
      state.isLoading = payload;
    }
  },
  actions: {
    setLoading({ commit }, payload) {
      commit('setLoading', payload);
    }
  }
});

export default store;
