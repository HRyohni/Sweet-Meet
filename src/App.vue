<template>
  <v-app>
    <div class="topbar pa-2" style="position: absolute; width: 100%" >
      <v-row >
        <v-col>
          <h4>sweet meet</h4>
        </v-col>
        <v-col style="text-align: center">
          <div>

          </div>
        </v-col>
        <v-col style="text-align: right; font-size: 3vh" class="pa-5">
          <v-btn
              class="ma-2"
              v-if="userLoginStatus"
              @click="addPost()"
              color="dark"
              elevation="12"
          >Add Post
          </v-btn>
          <v-btn
              v-if="!userLoginStatus"
              color="dark"

              outlined
              @click="RegisterPage()"
          <v-btn
              v-if="userLoginStatus"
              @click="SignOut()"
              color="red"
              elevation="12"
          >Sign Out
          </v-btn>
          <v-btn
              v-if="!userLoginStatus"
              color="primary"
              @click="LoginPage()"
              class="ma-2"
          >Log In
          </v-btn
          >

          <v-btn
              v-if="!userLoginStatus"
              color="red"

              outlined
              @click="RegisterPage()"
          >Sign in
          </v-btn
          >
        </v-col>
      </v-row>
    </div>

    <router-view></router-view>

    <div class="bottom"></div>
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

export default {
  name: "App",
  components: {
    //components
  },

  data: () => ({
    //
    userLoginStatus: false,
    userInfo: null,
    userEmail: null,
    displayName: null,
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

    LoginPage() {
      this.$router.push("/login");
    },
    RegisterPage() {
      this.$router.push("/register");
    },

    addPost() {
      this.$router.push("/addPost");
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
  },
};
</script>

<style scoped>
.topbar {
  widows: 100%;
  height: 5%;
}

.bottom {
  position: absolute;
  display: fixed;
  bottom: 0px;
  width: 100%;
  height: 50px;
}
</style>
