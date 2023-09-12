<template>
  <v-card :color="this.cardColor">
    <v-img height="300px" cover :src="this.backgroundImage">


      <v-app-bar flat color="rgba(0, 0, 0, 0)">
        <v-spacer></v-spacer>
      </v-app-bar>

      <v-card-title class="white--text ">
        <v-avatar size="100" class="ml-10 mx-auto text-md-h3">
          <v-img class="elevation-10" alt="user" :src="this.profilePicture"></v-img>
        </v-avatar>

        <div class="ml-3  text-lg-h3  d-inline">{{ this.displayName }}</div>

        <v-card-text>
          <h3 class="ml-3    ">{{ this.firstName + " " + this.secondName }}</h3>
          <h3 class=" ml-3 d-inline">followers: {{ this.followersCount }} </h3>
          <h3 class=" ml-3 d-inline">following: {{ this.followingCount }}</h3>
          <h3 class=" ml-3 d-inline">Posts: {{ this.postCount }}</h3>

        </v-card-text>

      </v-card-title>



    </v-img>
    <!--    <v-btn v-if="userAdmin"  style="font-size:10px" class="align-center">edit profile picture</v-btn>-->
    <v-icon icon="mdi-information"></v-icon>
    <v-card-text>

      <div class="font-weight-bold ml-8 mb-2 white--text"><b>About Me:</b></div>
      <div>
        <h4 class="white--text">
          {{ profileDescription }}
        </h4>
        <v-btn v-if="userAdmin" class="d-inline  mt-5  font-weight-light pa-1  " @click="editInformationBtn()" style="font-size: 1em">Edit</v-btn>
        <!--         TODO: remove userAdmin !-->

          <follow-button-component class="d-inline ma-2"
              :user-to-follow="this.displayName"
          ></follow-button-component>

      </div>
    </v-card-text>
  </v-card>


</template>

<script>


import {collection, doc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import {auth, db} from "../../firebase";
import FollowButtonComponent from "@/components/FollowButtonComponent.vue";

export default {
  name: 'ProfileInfoCard',
  components: {FollowButtonComponent},

  data: () => ({

  }),

  props: {
    profileDescription: "",
    displayName: "",
    firstName: "",
    secondName: "",
    userAdmin: false,
    profilePicture: "",
    backgroundImage: "",
    cardColor: "",

    followersCount: 0,
    followingCount: 0,
    postCount: 0,


  },

   mounted() {

  },
  methods: {

    editInformationBtn()
    {
      this.$router.push("/edit")
    },
  }

}

</script>