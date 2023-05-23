<template>
  <div class="mainbar">
    <v-container class="bg-surface-variant">
      <v-row no-gutters>
        <v-col class="d-block">
          <p>Home</p>
          <p>other</p>
          <p>settings</p>
          <p>settings</p>
          <v-icon large color="blue darken-2"> mdi-message-text </v-icon>
          <div></div>
          <v-btn class="mt-3" @click="addData" dark elevation="12"
            >Test Button</v-btn
          >
        </v-col >
        
        <v-col class="d-block " cols="1" >
        <v-avatar  size="3vw" class="ma-4 d-block justify-center" v-for="n in 5" :key="n">
          <img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="John"
          />

        </v-avatar>
        
        

        </v-col>
        <v-col>
          <h1>Stories</h1>
          <div class="stories d-inline">
            <v-row>
              <v-col class="justify-center d-flex mt-4 pa-0">
                <div class="d-inline "  
            
                >
                  <v-avatar size="3vw" class="ma-1 ">
                    <img
                      src="https://cdn.vuetifyjs.com/images/john.jpg"
                      alt="John"
                    />
                  </v-avatar>
                  <p class="d-flex justify-center">Leo m</p>
                </div>
              </v-col>
              <v-col class="justify-center d-flex pa-0 mt-4">
                <div class="d-inline" 
            
                >
                  <v-avatar size="3vw" class="ma-1 ">
                    <img
                      src="https://cdn.vuetifyjs.com/images/john.jpg"
                      alt="John"
                    />
                  </v-avatar>
                  <p class="d-flex justify-center">Leo m</p>
                </div>
              </v-col>

              <v-col class="justify-center d-flex pa-0 mt-4">
                <div class="d-inline" 
            
                >
                  <v-avatar size="3vw" class="ma-1 ">
                    <img
                      src="https://cdn.vuetifyjs.com/images/john.jpg"
                      alt="John"
                    />
                  </v-avatar>
                  <p class="d-flex justify-center">Leo m</p>
                </div>
              </v-col>

              <v-col class="justify-center d-flex pa-0 mt-4">
                <div class="d-inline" 
            
                >
                  <v-avatar size="3vw" class="ma-1 ">
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
           <sweet-card
            imeKorisnika="Markan"
            v-for="index in 10"
            :key="index"
          ></sweet-card>
          </div>
        </v-col>
        <v-col style="text-align: center">
          <sweet-card
            imeKorisnika="Markan"
            v-for="index in 10"
            :key="index"
          ></sweet-card>
        </v-col>
        <v-col style="text-align: right">
          <p class="d-inline pa-2">Profile Account</p>
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
  name: "main",
  components: {
    //components
    SweetCard,
  },

  data: () => ({
    //
    elements: elements,
    test: "fuk",
    imeKorisnika: "markan",
  }),
  methods: {
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
