<template>
  <v-container v-if="true">

    <!--                                       Profile info card for more information about profile -->
    <div class="TopSelection">

      <ProfileInfoCard profile-description="this is test" :user-admin="this.userAdmin" :first-name="this.userUrlName"
                       second-name="test"/>


    </div>

    <v-btn @click="test">test</v-btn>
    <v-col>
      <div class="profileinfo">
      </div>
    </v-col>


    <v-row class="BottomSite ">

      <!--                                 TODO: fix nameing id with site      Follow Suggestion system-->
      <v-col>
        <v-row justify="space-around" class="ma-12">
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
import {auth, db, doc, getDoc, email} from "../../firebase.js";
import ProfileInfoCard from "@/components/ProfileInfoCardComponent.vue";
import FollowSugestionComponent from "@/components/FollowSugestionComponent.vue";


import {getAuth, onAuthStateChanged} from "firebase/auth";
import {collection, getDocs} from "firebase/firestore";
import kuca from "@/class/User";


export default {

  components: {
    FollowSugestionComponent,
    ProfileInfoCard,
    SweetCard,
  },

  data: () => ({
    // User Id Site
    userUrlName: "",

    // Firebase Data
    auth: null,
    userLoginStatus: null,
    userEmail: null,


    // User Information
    userAllInformation: null,
    userAdmin: false,


  }),


  async mounted() {



    console.log(email);

    await this.checkLoginStatus();
    await this.getUserEmail();
    await this.setUserUrlName();
    await this.setUserInformation();
    await this.setUserEditProfileIfAdmin();
    await this.chnageToUserAdminView();


  },




  methods:
      {
        test() {


          this.getUserEmail();
        },

        async getUserEmail() {
          this.userEmail = getAuth().currentUser.email;
          console.log(getAuth().currentUser)

        },


        async checkLoginStatus() {
          await onAuthStateChanged(auth, (user) => {
            if (user) {
              this.userLoginStatus = true;
              return user;
              // ...
            }

            this.$router.push("/login")

          });
        },


        setUserUrlName() {
          this.userUrlName = this.$route.params["id"];


        },

        async setUserInformation() {

          await this.checkLoginStatus();
          const querySnapshot = await getDocs(collection(db, "Users", "UserNames", this.userEmail));
          this.userAllInformation = querySnapshot.docs[0].data();
        },

        setUserEditProfileIfAdmin() {
          if (this.userAllInformation["displayName"].toLowerCase() === this.userUrlName) {
            this.userAdmin = true;

          }
        },

        chnageToUserAdminView() {

        },


        getUserUploades() {

        },


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
