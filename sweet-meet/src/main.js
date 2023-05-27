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




/* add icons to the library */
library.add(faMessage,faBell,faHeart,faComment)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')


Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBOmxGwmFyMuLzyg6gPY1d8_urrsa1rRUA",
  },
  installComponents: true,
});

const storage = getStorage(app);
export {storage}




