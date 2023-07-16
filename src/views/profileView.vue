<template>
  <v-container v-if="true">

    <!--                                       Profile info card for more information about profile -->
    <div class="TopSelection">

      <ProfileInfoCard profile-description="this is test" :user-admin="this.userAdmin" :first-name="this.userUrlName"
                       second-name="test"/>
      <div class="text-center">


        <v-overlay
            v-if="this.overlay"
            class="align-center justify-center"
        >
          <v-progress-circular
              color="primary"
              indeterminate
              size="64"
          ></v-progress-circular>
        </v-overlay>
      </div>


    </div>


    <v-col>
      <div class="profileinfo">
      </div>
    </v-col>


    <v-row class="BottomSite ">

      <!--                                 TODO: fix nameing id with site      Follow Suggestion system-->
      <v-col>
        <v-row justify="space-around" class="ma-12">
          <FollowSugestionComponent/>
        </v-row>
      </v-col>

      <!--                                   Sweet Card profile images-->
      <v-col>
        <v-card class="ma-5 pa-3">
          <sweet-card></sweet-card>
          <sweet-card></sweet-card>
          <sweet-card></sweet-card>
        </v-card>
      </v-col>

      <!--                                      Settings and other stuf-->
      <v-col style="color: gray" class="ma-10">

      </v-col>


    </v-row>
  </v-container>


</template>

<script>
import SweetCard from "@/components/SweetCard.vue";
import {auth, db, doc, getDoc, email} from "../../firebase.js";
import ProfileInfoCard from "@/components/ProfileInfoCardComponent.vue";
import FollowSugestionComponent from "@/components/FollowSugestionComponent.vue";


import {getAuth, onAuthStateChanged} from "firebase/auth";
import {collection, getDocs} from "firebase/firestore";

export default {

  // Mixin Classes


  components: {
    FollowSugestionComponent,
    ProfileInfoCard,
    SweetCard,
  },

  data: () => ({
    // Overley
    overlay: false,
    // User Id Site
    userUrlName: "",


    // Firebase Data
    auth: null,
    userLoginStatus: null,
    userEmail: null,


    // User Information
    userAllInformation: null,
    userAdmin: null,


  }),
  watch: {
    overlay(val) {
      val && setTimeout(() => {
        this.overlay = false
      }, 300)
    },
  },


  async mounted() {


    await onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(auth);
        this.userEmail = auth.currentUser.email;
        this.checkLoginStatus();
        this.setUserUrlName();
        this.setUserEditProfileIfAdmin();
        this.overlay = true;
      }
    });
  },

  methods:
      {

        async checkLoginStatus() {
          await onAuthStateChanged(auth, (user) => {
            if (user) {
              this.userLoginStatus = true;
              return user;
              // ...
            }

            this.$router.push("/login")

          });
        },


        setUserUrlName() {
          this.userUrlName = this.$route.params["id"];
        },


        async setUserEditProfileIfAdmin() {
          if (auth.currentUser.displayName === this.userUrlName)
            this.userAdmin = true;
          else
            this.userAdmin = false;
        },

        getUserData() {
        },


      }
};
</script>

<style>
.profileinfo {

}


.TopSelection {
  width: 100%;
  height: 250px;
  background-color: #000000;
}

.BottomSite {

  margin-top: 200px;

}
</style>
