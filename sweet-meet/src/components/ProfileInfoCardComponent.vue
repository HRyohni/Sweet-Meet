<template>
  <v-card width="100%">
    <v-img height="300px" src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg">


      <v-app-bar flat color="rgba(0, 0, 0, 0)">
        <v-spacer></v-spacer>
      </v-app-bar>

      <v-card-title class="white--text ">

        <v-avatar size="100" class="ml-10">
          <img alt="user" src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg"/>
        </v-avatar>

        <p class="ml-3 d-inline">{{ this.firstName }} {{ this.secondName }}</p>

      </v-card-title>

    </v-img>
    <v-btn v-if="userAdmin"  style="font-size:10px" class="align-center">edit profile picture</v-btn>
    <v-icon icon="mdi-information"></v-icon>
    <v-card-text>

      <div class="font-weight-bold ml-8 mb-2"><b>About Me:</b></div>
      <div>
        <h5>
          {{ profileDescription }}

        </h5>
        <v-btn v-if="userAdmin" class="d-inline  mt-5  font-weight-light pa-1 " style="font-size: 1em">Edit</v-btn>
      </div>

    </v-card-text>
  </v-card>


</template>
<script>
import { mdiAccount } from "@mdi/js";

export default {
  name: 'ProfileInfoCard',

  data: () => ({
    icons: {
      mdiAccount
    }
  }),

  props: {
    profileDescription: "",
    firstName: "",
    secondName: "",
    userAdmin: false,
  },

  methods: {}

}

</script>