import Vue from 'vue'
import Vuex from 'vuex'

import {auth, db, doc, getDoc, email} from "../../firebase.js";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

      storeUserEmail: "default",
      checkDrop: "fuck off",
  },
  getters: {

    getEmail (state) {
      return state.storeUserEmail;
    },

    checkDrop(state) {
      return state.checkDrop;
    },

  },
  mutations: {

    setUserEmail(state, payload) {
      state.storeUserEmail = payload;
    },
  },
  actions: {
    async loadUser({ commit }) {

       await commit("setUserEmail", auth.currentUser.email);

    }
  },
  modules: {
  }
})
