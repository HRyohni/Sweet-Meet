<template>
  <v-container class="mt-10">

    <!--                                       Profile info card for more information about profile -->
    <div v-if="userExists">


      <ProfileInfoCard
          v-if="userUrlName != null"
          :profile-description="this.profileDescription"
          :card-color="this.profileCardColor"
          :user-admin="this.userAdmin"
          :display-name="userUrlName"
          :first-name="this.firstName"
          :second-name="this.secondName"
          :background-image="this.profileBackgroundPicture"
          :profile-picture="this.profilePicture"
          :followers-count="this.followersCount"
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
          <v-card-title class="white--text">Information</v-card-title>
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
      <!--Sweet Card profile images-->
      <v-col cols="6">
        <sweet-card
            v-for="(data, index) in AllPostsIdNames"
            :key="index"
            :post-i-d="data"
            :user-name="userUrlName"
            :is-swipe-locked="true"
        ></sweet-card>
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
import logger from "@fortawesome/vue-fontawesome/src/logger";

export default {
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
    AllPostsIdNames: [],


    profileCardColor: "blue",
    profileDescription: "Loading..",
    profilePicture: "",
    profileBackgroundPicture: "",
    interests: null,
    music: null,
    movies: null,
    followersCount: 0,

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
    this.setUserUrlName();
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        this.userEmail = auth.currentUser.email;
        this.checkLoginStatus();
        this.setUserEditProfileIfAdmin();

        this.overlay = true; // TODO: should be True
      }
    });
    await this.getUserData();


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
          this.userAdmin = auth.currentUser.displayName === this.userUrlName;
        },

        async getUserData() {
          if (this.userUrlName == null) {
            console.log("error with user url name");
            return "error";
          }


          const querySnapshot2 = await getDocs(collection(db, "Users", "UserNames", this.userUrlName, "Information", "Profile"));
          querySnapshot2.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            this.profileCardColor = doc.data()["ProfileCardColor"];
            this.profileDescription = doc.data()["ProfileDescription"];
            this.profilePicture = doc.data()["ProfilePictureUrl"];
            this.profileBackgroundPicture = doc.data()["ProfileBackgroundPicture"];
            this.followersCount = doc.data()["Followers"];
            this.getPostIDs().then(r => this.userExists = true);

          });


          //const docRef = doc(db, "Users", "UserNames", this.userUrlName);

// Get a document, forcing the SDK to fetch from the offline cache.
          const docSnap = await getDoc(doc(db, "Users", "UserNames", this.userUrlName,"Information"));

          if (docSnap.exists()) {
            this.firstName = docSnap.data()["FirstName"];
            this.secondName = docSnap.data()["SecondName"];
            this.interests = docSnap.data()["FavInterestType"];
            this.movies = docSnap.data()["FavMovieType"];
            this.music = docSnap.data()["FavMusicType"];
            this.country = docSnap.data()["Country"];
            this.sexualOrientation = docSnap.data()["UserAttractedToGender"];
            this.age = docSnap.data()["age"];
            this.gender = docSnap.data()["UserGender"];
          } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
          }


          // const querySnapshot = await getDoc(collection(db, "Users", "UserNames", this.userUrlName));
          // querySnapshot.forEach((doc) => {
          //   // doc.data() is never undefined for query doc snapshots

          // });


          // to fetch post ids


        },


        async getPostIDs() {
          const collectionSnapshot = await getDocs(collection(db, "Users", "UserNames", this.userUrlName, "Posts", "UserPosts"));
          this.AllPostsIdNames = collectionSnapshot.docs.map(doc => doc.id);
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


