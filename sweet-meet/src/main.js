import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

import * as VueGoogleMaps from "vue2-google-maps";

import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faBell, faMessage, faHeart,faComment } from '@fortawesome/free-regular-svg-icons'

import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';



import store from './store'
/* add icons to the library */

library.add(faMessage,faBell,faHeart,faComment)
/* add font awesome icon component */

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('vue-phone-number-input', VuePhoneNumberInput);

Vue.config.productionTip = false


new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.component('vue-phone-number-input', VuePhoneNumberInput);

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBOmxGwmFyMuLzyg6gPY1d8_urrsa1rRUA",
  },
  installComponents: true,
});
//import {getStorage,  } from "../firebase";
//const storage = getStorage(app);
//export {storage}




