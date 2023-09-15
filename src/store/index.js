import Vue from 'vue'
import Vuex from 'vuex'

import {auth, db, doc, getDoc, email} from "../../firebase.js";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        phoneNumber: "",
    },
    getters: {

        getPhoneNumber(state) {
            return state.phoneNumber;
        },

    },
    mutations: {

        setPhoneNumber(state, payload) {
            state.phoneNumber = payload;
        },


    },
    actions: {
        async loadUser({commit}) {

            await commit("setUserEmail", auth.currentUser.email);

        }
    },
    modules: {}
})
