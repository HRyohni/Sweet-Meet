<template>
  <v-container>


    <!--                                       Profile info card for more information about profile -->
    <div class="TopSelection">

      <ProfileInfoCard/>
    </div>

    <v-col>
      <div class="profileinfo">
      </div>
    </v-col>


    <v-row class="BottomSite ">

      <!--                                 TODO:fix nameing id with site      Follow Suggestion system-->
      <v-col>
        <v-row justify="space-around" class="ma-12">
          <h1>UserName: {{ this.testName }} <-</h1>
          <FollowSugestionComponent/>
        </v-row>
      </v-col>

      <!--                                   Sweet Card profile images-->
      <v-col>
        <v-card class="ma-5 pa-3">
          <sweet-card></sweet-card>
          <sweet-card></sweet-card>
          <sweet-card></sweet-card>
        </v-card>
      </v-col>

      <!--                                      Settings and other stuf-->
      <v-col style="color: gray" class="ma-10">

      </v-col>


    </v-row>
  </v-container>


</template>

<script>
import SweetCard from "@/components/SweetCard.vue";
import {auth, db, doc, getDoc} from "../../firebase.js";
import ProfileInfoCard from "@/components/ProfileInfoCardComponent.vue";
import FollowSugestionComponent from "@/components/FollowSugestionComponent.vue";


export default {
  name: "test",

  components: {
    FollowSugestionComponent,
    ProfileInfoCard,
    SweetCard,
  },

  mounted() {
    console.log(auth.currentUser.email);
    const docRef = doc(db, "UserNames", auth.currentUser.email, "Information", "lat");
    const docSnap = getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  },
  data: () => ({
    userName: this.$route.params["id"],
    testName: "test",
  }),

  methods:
      {

      }
};
</script>

<style>
.profileinfo {

}


.TopSelection {
  width: 100%;
  height: 250px;
  background-color: #000000;
}

.BottomSite {

  margin-top: 200px;

}
</style>
