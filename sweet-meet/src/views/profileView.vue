<template>
  <v-container>


    <!--                                       Profile info card for more information about profile -->
    <div class="TopSelection">

      <ProfileInfoCard profile-description="this is test" :user-admin="this.userAdmin" :first-name="this.userUrlName" second-name="test"/>


    </div>

    <v-col>
      <div class="profileinfo">
      </div>
    </v-col>


    <v-row class="BottomSite ">

      <!--                                 TODO:fix nameing id with site      Follow Suggestion system-->
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
import {auth, db, doc, getDoc} from "../../firebase.js";
import ProfileInfoCard from "@/components/ProfileInfoCardComponent.vue";
import FollowSugestionComponent from "@/components/FollowSugestionComponent.vue";

import {getAuth, onAuthStateChanged} from "firebase/auth";
import {collection, getDocs} from "firebase/firestore";


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
    userEmail: "",


    // User Information
    userAllInformation: null,
    userAdmin: false,


  }),

  async beforeMount() {
    this.getUserEmail()
  },

  async mounted() {
    await this.checkLoginStatus();
    this.getUserEmail()
    this.setUserUrlName();
    await this.setUserInformation();
    this.setUserEditProfileIfAdmin();
    this.chnageToUserAdminView();
  },


  methods:
      {

        getUserEmail() {      //TODO: Email wont save on time **LifeCycle Problem prob**

          this.userEmail = getAuth().currentUser.email

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

        chnageToUserAdminView()
        {

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
