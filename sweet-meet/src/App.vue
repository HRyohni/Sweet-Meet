<template>
  <v-app>
    <div class="topbar pa-2">
      <v-row>
        <v-col> 
          <p>test: {{userEmail}}</p>
        </v-col>
        <v-col style="text-align: center">
          <div>
            <v-text-field label="Search" hide-details="auto"></v-text-field>
          </div>
        </v-col>
        <v-col style="text-align: right; font-size: 3vh" class="pa-5">
          <v-btn
            v-if="userLoginStatus"
            @click="SignOut()"
            color="red"
            elevation="12"
            >Sign Out</v-btn
          >
          <v-btn v-if="!userLoginStatus" color="primary" 
          @click="LoginPage()"
          class="ma-2"
            >Log In</v-btn
          >
          
          <v-btn v-if="!userLoginStatus"  color="red" outlined 
          @click="RegisterPage()"
          >Sign in</v-btn
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
import { auth, getAuth, onAuthStateChanged,signOut,getStorage  } from "../firebase.js";

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
  }),
   async mounted()
  {
    console.log(auth.currentUser) 
     await onAuthStateChanged(auth, (user) => {
      if (user) {
        this.userLoginStatus = true; 
        this.userInfo = user;
        this.userEmail =user.email;
        // ...
      } else {
        this.userLoginStatus = false;
      }
    });
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
    LoginPage()
    {
      this.$router.push("/login");
    },
    RegisterPage()
    {
      this.$router.push("/register");
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
