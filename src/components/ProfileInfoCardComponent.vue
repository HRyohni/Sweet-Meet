<template>
  <div class="d-flex justify-center">


    <v-card width="100%" :color="this.cardColor">
      <v-img height="300px" cover :src="this.backgroundImage">


        <v-app-bar flat color="rgba(0, 0, 0, 0)">
          <v-spacer></v-spacer>
        </v-app-bar>

        <v-card-title class="white--text ">
          <v-avatar size="100" class="ml-10 mx-auto text-md-h3">
            <v-img class="elevation-10" alt="user" :src="this.profilePicture"></v-img>
          </v-avatar>


          <v-card-text v-if="!showCase">
            <h3 class="ml-3    ">{{ this.firstName + " " + this.secondName }}</h3>

          </v-card-text>

        </v-card-title>


      </v-img>
      <!--    <v-btn v-if="userAdmin"  style="font-size:10px" class="align-center">edit profile picture</v-btn>-->
      <v-icon icon="mdi-information"></v-icon>
      <v-card-text>
        <v-row>
          <v-col>
            <h1 style="font-size: 50px" class="white--text mb-2">
              <b>{{ this.displayName }}</b>
            </h1>
            <div class="d-flex mt-5" style="font-size: 12px;">
              <h3 class="pa-2 pl-0 ">followers: {{ this.followersCount }} </h3>
              <h3 class="pa-2 ">following: {{ this.followingCount }} </h3>
              <h3 class="pa-2 ">Posts: {{ this.postCount }} </h3>
            </div>
          </v-col>

          <v-col class="white--text">
            <h3>{{ this.profileDescription }}</h3>
          </v-col>


          <v-col class="d-flex mx-auto justify-end" style="text-align: right;">
            <div class="">
              <v-btn   v-if="userAdmin" class="d-flex mx-auto mb-2" @click="editInformationBtn()">Edit</v-btn>
              <follow-button-component v-if="!showCase" class="d-inline" :user-to-follow="this.displayName"></follow-button-component>
            </div>
          </v-col>

        </v-row>

      </v-card-text>
    </v-card>
  </div>


</template>

<script>


import {collection, doc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import {auth, db} from "../../firebase";
import FollowButtonComponent from "@/components/FollowButtonComponent.vue";

export default {
  name: 'ProfileInfoCard',
  components: {FollowButtonComponent},

  data: () => ({
    valueRules: [
      value => {
        if (value) return true
        return 'Cant be empty.'
      },
      value => {
        if (value?.length <= 10) return true

        return 'Name must be less than 10 characters.'
      },
    ],

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

    // for show
    showCase: false,


  },

  mounted() {

  },
  methods: {

    editInformationBtn() {
      this.$router.push("/edit")
    },
  }

}

</script>