<template>
  <v-container v-if="true">

    <!--                                       Profile info card for more information about profile -->
    <div class="TopSelection">

      <ProfileInfoCard :profile-description="this.profileDescription"
                       :card-color="this.profileCardColor"
                       :user-admin="this.userAdmin"
                       :display-name="userUrlName"
                       :first-name="this.firstName"
                       :second-name="this.secondName"
                       :background-image="this.profileBackgroundPicture"
                       :profile-picture="this.profilePicture"
      />

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
      <v-col style="color: gray" class="ma-5" cols="2">
        <h1>Interests </h1>
        <div  v-for="item in interests">
          <v-chip class="d-inline-flex">{{ item }}</v-chip>
        </div>

           <h1>movies </h1>
        <div  v-for="item in interests">
          <v-chip class="d-inline-flex">{{ item }}</v-chip>
        </div>

           <h1>music </h1>
        <div  v-for="item in interests">
          <v-chip class="d-inline-flex">{{ item }}</v-chip>
        </div>


      </v-col>


    </v-row>
  </v-container>


</template>

<script>
import SweetCard from "@/components/SweetCard.vue";
import {auth, db, doc, getDoc, email} from "../../firebase.js";
import ProfileInfoCard from "@/components/ProfileInfoCardComponent.vue";
import FollowSugestionComponent from "@/components/FollowSugestionComponent.vue";

import {getStorage, ref} from "firebase/storage";

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
    //Profile User Data
    firstName: "",
    secondName: "",
    profileCardColor: "blue",
    profileDescription: "Loading..",
    profilePicture: "",
    profileBackgroundPicture: "",
    interests: null,
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
        this.getUserData();
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

        async getUserData() {
          const querySnapshot = await getDocs(collection(db, "Users", "UserNames", this.userUrlName));
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            this.firstName = doc.data()["FirstName"]
            this.secondName = doc.data()["SecondName"]
            this.interests = doc.data()["FavInterestType"]
          });

          const querySnapshot2 = await getDocs(collection(db, "Users", "UserNames", this.userUrlName, "Information", "Profile"));
          querySnapshot2.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            this.profileCardColor = doc.data()["ProfileCardColor"];
            this.profileDescription = doc.data()["ProfileDescription"];
            this.profilePicture = doc.data()["ProfilePictureUrl"];
            this.profileBackgroundPicture = doc.data()["ProfileBackgroundPicture"];

          });

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
