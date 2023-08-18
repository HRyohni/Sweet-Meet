<template>

  <div class="pa-10 align-center align-content-center">
    <h1>Welcome to Sweet Meet</h1>
    <v-btn
        color="primary"
        @click="loginPage"
    >
      Sweet Meet
    </v-btn>


    <v-card
        class="pa-9 ma-11"
        width="400px"
    >
      <v-card-title>naslov</v-card-title>
      <v-card-subtitle>ovo je podnaslov</v-card-subtitle>
    </v-card>
    <v-text-field v-model="user"></v-text-field>
    <v-text-field v-model="friend"></v-text-field>


    <MessageSystemComponent
        :user="this.user"
        :friend="this.friend"
    ></MessageSystemComponent>

  </div>

</template>
<script>
import MessageSystemComponent from "@/components/MessageSystemComponent.vue";

export default {
  name: "landingPage",
  components: {MessageSystemComponent},
  data() {
    return {
      user: '',
      friend: '',

    };
  },
  methods:
      {
        loginPage() {
          this.$router.push("/login")
        }

      }
}


</script>

<style>

</style>

