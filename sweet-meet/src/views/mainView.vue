<template>
  <div class="mainbar">
    <v-container class="bg-surface-variant">
      <v-row no-gutters>
        <v-col class="d-block" cols="1">
          <p>Home</p>
          <font-awesome-icon icon="fa-regular fa-bell" class="d-block mt-4" />
          <font-awesome-icon icon="fa-regular fa-heart" class="d-block mt-4" />
          <font-awesome-icon
            icon="fa-regular fa-comment"
            class="d-block mt-4"
          />

          <v-icon large color="blue darken-2" class="d-block mt-4">
            mdi-message-text
          </v-icon>

          <v-btn class="mt-3" @click="addData" dark elevation="12">Test</v-btn>
        </v-col>

        <v-col class="d-block justify-center ml-2 mr-2" cols="1">
          <h2 class="d-inline">messages</h2>
          <div v-for="n in 5" :key="n" class="mt-5">
            <v-badge
              bordered
              bottom
              color="deep-purple green"
              large
              dot
              offset-x="10"
              offset-y="10"
            >
              <v-avatar size="40">
                <v-img
                  src="https://cdn.vuetifyjs.com/images/lists/2.jpg"
                ></v-img>
              </v-avatar>
            </v-badge>
          </div>
        </v-col>
        <v-col :cols="drag">
          <h1>Stories</h1>
          <div class="stories d-inline">
            <v-row>
              <v-col
                class="justify-left d-flex mt-4 pa-0"
                v-for="n in 4"
                :key="n"
              >
                <div class="d-inline">
                  <v-avatar size="3vw" class="ma-1">
                    <img
                      src="https://cdn.vuetifyjs.com/images/john.jpg"
                      alt="John"
                    />
                  </v-avatar>

                  <p class="d-flex justify-center">Leo m</p>
                </div>
              </v-col>
            </v-row>
            <h1>Posts</h1>
            <v-btn dark elevation-10 @click="DragPosts">test</v-btn>

            <v-card
              v-scroll.self="onScroll"
              class="overflow-y-auto"
              :max-height= widnowHeight
            >
              <span v-scroll.self="onScroll"></span>
              <sweet-card
                v-for="index in 10"
                :key="index"
                imeKorisnika="Markan"
              ></sweet-card>
            </v-card>
          </div>
        </v-col>
        <v-col style="text-align: center" cols="4">
          <h1>Feed</h1>
          <sweet-card imeKorisnika="Markan" class="ma-5"></sweet-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SweetCard from "@/components/SweetCard.vue";
import { doc, setDoc } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { auth, db } from "../../firebase.js";

//const authh = getAuth();

let post = {
  profileName: "Yohn",
  likes: 231,
};

export default {
  data() {
    return {
      test: "fuk",
      imeKorisnika: "markan",
      drag: 2,
      scrollInvoked: 0,
      widnowHeight: window.innerHeight,
    };
  },
  name: "main",
  components: {
    //components
    SweetCard,
  },

  methods: {
    DragPosts() {
      if (this.drag == 2) 
        this.drag = 4;
      else this.drag = 2;
      
    },
    onScroll() {
      this.scrollInvoked++;
    },
    async addData() {
      console.log(auth.currentUser);
      // Add a new document in collection "cities"
      await setDoc(
        doc(
          db,
          "Users",
          "UserNames",
          auth.currentUser.email,
          auth.currentUser.accessToken
        ),
        {
          name: "Los Angeles",
          state: "CA",
          country: "USA",
        }
      );
    },
  },
};
</script>

<style>

</style>
