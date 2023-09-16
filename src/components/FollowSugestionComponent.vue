<template>
  <v-card :ripple="false" width="100%" @click="updateData()">
    <v-card-title> Who to follow.</v-card-title>
 <h3 class="align-center pa-2" v-if="followSuggestions.length <2">Sorry we cant find you friend at this time</h3>

    <v-card-text
        v-for="(user, index) in this.followSuggestions"
        :key="index"

    >

      <v-card v-if="user.username && index < 3 " class="pa-2 ma-2" elevation-10>
<div class="d-flex space-between">
  <v-avatar @click="goToProfileOnClick(user.username)">
    <img
        :src="user.userProfileAvatar"

    />
  </v-avatar>
  <v-card-title class="d-inline">{{ user.username }}</v-card-title>
  <v-spacer></v-spacer>
  <follow-button-component
      class="pa-1"
      :user-to-follow="user.username"
  ></follow-button-component>
</div>

      </v-card>






    </v-card-text>
  </v-card>
</template>
<script>
import {collection, doc, getDocs, query, updateDoc, where} from "firebase/firestore";
import {auth, db, getDoc} from "../../firebase";
import FollowButtonComponent from "@/components/FollowButtonComponent.vue";
import {onAuthStateChanged} from "firebase/auth";

export default {
  name: 'FollowSuggestionComponent',
  components: {FollowButtonComponent},
  data() {
    return {
      followSuggestions: [{}],
      allUsers: [],
      usersData: null,
      userFollowing: [],
    };
  },

  async mounted() {

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await this.reFetchAllData();
      }
    });

  },
  methods: {
    async fetchAllUsers() {
      const docSnap = await getDoc(doc(db, "Users", "UserNames"));

      if (docSnap.exists()) {
        this.allUsers = docSnap.data()["ListOfAllUsernames"];
      } else {
        // docSnap.data() will be undefined in this case
        console.log("cant find all users!");
      }
    },

    async fetchUsersData() {
      const userCollectionsRef = doc(db, "Users", "UserNames", auth.currentUser.displayName, "Information");
      const UserInformation = await getDoc(userCollectionsRef);
      this.usersData = UserInformation.data();

    },

    async findSimilarity() {
      await this.fetchUsersFollowing();

      let tempFollowSuggestion = [];
      let fountUsersCount = 0;
      try {
        // Iterate through all users in the allUsers list
        for (let otherUsers of this.allUsers) {

          if (fountUsersCount>3)
            break;

          if (otherUsers !== auth.currentUser.displayName && !this.userFollowing.includes(otherUsers)) {
            const userCollectionsRef = doc(db, "Users", "UserNames", otherUsers, "Information");
            const userInformation = await getDoc(userCollectionsRef);
            const otherUserData = userInformation.data();

            // Compare user data properties and find similarities
            const commonProperties = [];
            for (let documentDataKey in this.usersData) {
              if (otherUserData.hasOwnProperty(documentDataKey) && this.usersData[documentDataKey] === otherUserData[documentDataKey]) {

                commonProperties.push({[documentDataKey]: this.usersData[documentDataKey]});
              }
            }
            //console.log(`Common properties with user ${otherUsers}:`, commonProperties);
            if (commonProperties.length > 0) // TODO: make it better
            {
              tempFollowSuggestion.push({
                username: otherUsers,
                userProfileAvatar: await this.fetchProfileAvatar(otherUsers),
              });
              fountUsersCount+=1;
            }
          }
          this.followSuggestions = tempFollowSuggestion;
        }
      } catch (e) {
        // Handle errors
        console.error(e);
      }
    },

    async fetchProfileAvatar(user) {
      const reff = doc(db, "Users", "UserNames", user, "Information", "Profile", "Data",);
      const docSnap = await getDoc(reff);
      const postData = docSnap.data();
      return postData.ProfilePictureUrl;
    },

    async fetchUsersFollowing() {
      let querySnapshot = await getDocs(collection(db, "Users", "UserNames", auth.currentUser.displayName, "Information", "Followers"));
      querySnapshot.forEach((doc) => {
        this.userFollowing = doc.data()["Following"];
      });
    },

    async reFetchAllData() {
      await this.fetchAllUsers();
      await this.fetchUsersFollowing();
      await this.fetchUsersData();
      await this.findSimilarity();
    },

    updateData()
    {
      this.reFetchAllData();
    },
    goToProfileOnClick(username) {
      this.$router.push("/profile/" + username);
    },

  },

};
</script>

<style>



</style>