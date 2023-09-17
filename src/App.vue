<template>
  <v-app>
    <div class="topbar pa-2" style="position: absolute; width: 100%">
      <v-row>
        <v-col>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" color="red" elevation="5" icon @click="goToFeed"> <v-icon>{{homeIcon}}</v-icon></v-btn>
            </template>
            <span>Go to Home</span>
          </v-tooltip>

        </v-col>

        <v-col style="text-align: center">
          <div>
            <SearchUserComponent></SearchUserComponent>
          </div>
        </v-col>
        <v-col style="text-align: right; font-size: 3vh" class="pa-5">

        </v-col>
      </v-row>
    </div>

    <router-view></router-view>

  </v-app>
</template>

<script>
// imports
import {
  db,
  auth,
  getAuth,
  onAuthStateChanged,
  signOut,
  getStorage,
} from "../firebase.js";
import {doc, getDoc} from "firebase/firestore";
import SearchUserComponent from "@/components/SearchUserComponent.vue";
import {mdiHome} from "@mdi/js";

export default {
  name: "App",
  components: {
    SearchUserComponent
    //components
  },

  data: () => ({
    //
    userLoginStatus: false,
    userInfo: null,
    userEmail: null,
    displayName: null,
    //icons
    homeIcon: mdiHome,
  }),
  async mounted() {

    await onAuthStateChanged(auth, (user) => { // TODO: Rly bad method to check auth
      if (user) {
        this.userLoginStatus = true;
        this.userInfo = user;
        this.userEmail = user.email;
      } else {
        this.userLoginStatus = false;
      }
    });
    this.GetDisplayName(this.userLoginStatus);
  },

  methods: {

    SignOut() {
      const auth = getAuth();
      signOut(auth)
          .then(() => {
            this.$router.push("/login");
          })
          .catch((error) => {
            // An error happened.
            console.log(error);
          });
    },


    async GetDisplayName(LoginState) {
      if (!LoginState)
        return null;

      const docRef = doc(
          db,
          "Users",
          "UserNames",
          auth.currentUser.email,
          "Information"
      );

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        this.displayName = docSnap.data().displayName
      } else {
        // docSnap.data() will be undefined in this case
        console.log("DisplayName Error");
      }
    },
    goToFeed() {
      this.$router.push("/login")
    },


  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');
</style>
