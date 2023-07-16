<template>
  <v-card :color="this.cardColor" width="500px" >
    <v-img height="300px" cover :src="this.backgroundImage">


      <v-app-bar flat color="rgba(0, 0, 0, 0)">
        <v-spacer></v-spacer>
      </v-app-bar>

      <v-card-title class="white--text ">
        <v-avatar size="100" class="ml-10">
          <v-img alt="user" :src="this.profilePicture"></v-img>
        </v-avatar>

        <p class="ml-3 d-inline">{{ this.firstName }}</p>

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


export default {
  name: 'ProfileInfoCard',

  data: () => ({

  }),

  props: {
    profileDescription: "",
    firstName: "",
    userAdmin: false,
    profilePicture: "",
    backgroundImage: "",
    cardColor: "white",
  },

  methods: {}

}

</script>