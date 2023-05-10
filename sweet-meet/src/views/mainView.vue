<template>
  <div class="mainbar">
    <v-container class="bg-surface-variant">
      <v-row no-gutters>
        <v-col style="text-align: left; background-color: antiquewhite">
          <p>side Chicks</p>
          <v-btn @click="addData">kurac</v-btn>
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

          <v-avatar class="d-inline pa-2">
            <v-img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
            ></v-img>
          </v-avatar>
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
      await setDoc(doc(db, "Users", "UserNames",auth.currentUser.email,auth.currentUser.accessToken), {
        name: "Los Angeles",
        state: "CA",
        country: "USA",
      });
    },
  },
};
</script>

<style></style>
