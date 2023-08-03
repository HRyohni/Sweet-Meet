<template>
  <v-container class="mt-10">

    <!--                                       Profile info card for more information about profile -->
    <div v-if="userExists" >

      <ProfileInfoCard :profile-description="this.profileDescription"
                       :card-color="this.profileCardColor"
                       :user-admin="this.userAdmin"
                       :display-name="userUrlName"
                       :first-name="this.firstName"
                       :second-name="this.secondName"
                       :background-image="this.profileBackgroundPicture"
                       :profile-picture="this.profilePicture"
      />


      <div v-if="" class="text-center">


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
    <div v-if="!userExists">
      <h1 class="align-center d-md-flex">User Does not exsists</h1>
    </div>

    <v-row v-if="userExists && profilePrivate" class="BottomSite">

      <!--                                 TODO: fix nameing id with site      Follow Suggestion system-->
      <v-col cols="3">
        <FollowSugestionComponent/>
        <v-card elevation="12" class="pa-3 mt-3 white--text" :color="this.profileCardColor">
          <v-card-title class="white--text" >Information</v-card-title>
          <h3 class="d-inline">{{ this.firstName }} {{ this.secondName }}</h3>
          <h3 class="d-inline"> {{ this.age }}</h3>
          <v-row>
            <v-col>
              <h5>Sex:</h5>
              <h5>from:</h5>
              <h5>Sexual orientation:</h5>
            </v-col>
            <v-col>
              <h5>{{ this.gender }}</h5>
              <h5>{{ this.country }}</h5>
              <h5>{{ this.sexualOrientation }}</h5>
            </v-col>
          </v-row>
        </v-card>


      </v-col>

      <!--                                   Sweet Card profile images-->
      <v-col>
        <v-card class="ma-1 pa-3">
          <sweet-card></sweet-card>
          <sweet-card></sweet-card>
          <sweet-card></sweet-card>
        </v-card>
      </v-col>

      <!--                                      Settings and other stuf-->
      <v-col style="color: gray" class="ma-5" cols="2">
        <h1>Interests </h1>
        <div class="d-inline" v-for="item in interests">
          <v-chip color="primary" class=" ma-1 pa-2">{{ item }}</v-chip>
        </div>


        <h1>movies </h1>
        <div class="d-inline" v-for="item in movies">
          <v-chip color="red" class="ma-1 pa-2 ">{{ item }}</v-chip>
        </div>


        <h1>music </h1>
        <div class="d-inline" v-for="item in music">
          <v-chip color="green" class="ma-1 pa-2">{{ item }}</v-chip>
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
    country: "",
    sexualOrientation: "",
    age: "",
    gender: "",


    profileCardColor: "blue",
    profileDescription: "Loading..",
    profilePicture: "",
    profileBackgroundPicture: "",
    interests: null,
    music: null,
    movies: null,

    // Overly
    overlay: false,
    userExists: false,
    profilePrivate: true, // profile private TODO: make profile private system
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
       }, 1000)
     },
  },


  async mounted() {
    await onAuthStateChanged(auth, (user) => {

      if (user) {

        this.userEmail = auth.currentUser.email;
        this.checkUserExists();
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
        async checkUserExists() {

        },

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
            this.firstName = doc.data()["FirstName"];
            this.secondName = doc.data()["SecondName"];
            this.interests = doc.data()["FavInterestType"];
            this.movies = doc.data()["FavMovieType"];
            this.music = doc.data()["FavMusicType"];
            this.country = doc.data()["Country"];
            this.sexualOrientation = doc.data()["UserAttractedToGender"];
            this.age = doc.data()["age"];
            this.gender = doc.data()["UserGender"];
          });

          const querySnapshot2 = await getDocs(collection(db, "Users", "UserNames", this.userUrlName, "Information", "Profile"));
          querySnapshot2.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            this.profileCardColor = doc.data()["ProfileCardColor"];
            this.profileDescription = doc.data()["ProfileDescription"];
            this.profilePicture = doc.data()["ProfilePictureUrl"];
            this.profileBackgroundPicture = doc.data()["ProfileBackgroundPicture"];
            this.userExists = true;
          });

        },


      }
};
</script>

<style>
.profileinfo {

}



.BottomSite {

  margin-top: 200px;

}
</style>
