<template>
  <v-row>
    <v-col>
      <div class="profileinfo">
        <v-row justify="space-around">
          <v-card width="400">
            <v-img
              height="200px"
              src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
            >
              <v-app-bar flat color="rgba(0, 0, 0, 0)">
                <v-spacer></v-spacer>
              </v-app-bar>

              <v-card-title class="white--text mt-8">
                <v-avatar size="56">
                  <img
                    alt="user"
                    src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg"
                  />
                </v-avatar>
                <p class="ml-3">John Doe</p>
              </v-card-title>
            </v-img>

            <v-card-text>
              <div class="font-weight-bold ml-8 mb-2">About you:</div>
              <div>
                <h5>love hicking</h5>

                <h5>
                  Eu ullamco dolore eu reprehenderit ea magna proident eu ex
                  pariatur exercitation ullamco ullamco excepteur. Nostrud dolor
                  Lorem culpa magna officia. Ipsum qui sint irure excepteur do
                  ipsum voluptate aute anim anim magna cupidatat. Do mollit sint
                  cupidatat eu reprehenderit excepteur et aute eu incididunt
                  aute. Dolore eu et do incididunt excepteur fugiat. Nisi
                  pariatur pariatur incididunt sint.
                </h5>
              </div>
            </v-card-text>
          </v-card>
        </v-row>

        <v-row justify="space-around" class="ma-12">
          <v-card width="400">
            <v-card-title> Who to follow. </v-card-title>

            <v-card-text>
              <v-card class="pa-2 ma-2" elevation-10>
                <v-avatar>
                  <img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                    alt="John"
                  />
                </v-avatar>
                <v-card-title class="d-inline">John Hohnny</v-card-title>
                <v-btn color="primary">follow</v-btn>
              </v-card>
              <v-card class="pa-2 ma-2" elevation-10>
                <v-avatar>
                  <img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                    alt="John"
                  />
                </v-avatar>
                <v-card-title class="d-inline">John Hohnny</v-card-title>
                <v-btn color="primary">follow</v-btn>
              </v-card>
              <v-card class="pa-2 ma-2" elevation-10>
                <v-avatar>
                  <img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                    alt="John"
                  />
                </v-avatar>

                <v-card-title class="d-inline">John Hohnny</v-card-title>
                <v-btn color="primary">follow</v-btn>
              </v-card>
            </v-card-text>
          </v-card>
        </v-row>
      </div>
    </v-col>

    <v-col>
      <v-card class="ma-10">
        <sweet-card></sweet-card>
        <sweet-card></sweet-card>
        <sweet-card></sweet-card>
      </v-card>
    </v-col>
    <v-col style="color: gray" class="ma-10">
      <h3>Settings</h3>
      <h3>privacy polici</h3>
      <h3>polici</h3>
      <h3>stuff</h3>
      <h3>Fabolusx x</h3>
    </v-col>
  </v-row>
</template>

<script>
import SweetCard from "@/components/SweetCard.vue";
import { auth, db,doc, getDoc } from "../../firebase.js";
export default {
  name: "test",
  components: {
    //components
    SweetCard,
  },

  mounted() {
      console.log(auth.currentUser.email);
      const docRef = doc(db, "UserNames", auth.currentUser.email,"Information","lat");
      const docSnap =  getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    },
  data: () => ({
    //
    
   
  }),
 
  methods:
  {
   
  }
};
</script>

<style>
.profileinfo {
  margin-top: 50px;
}
</style>
