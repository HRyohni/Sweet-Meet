<template>
  <div>
    <v-btn v-if="!isUserFollowed" @click="follow()" class="d-inline  mt-5 red  font-weight-light pa-1"
           style="font-size: 1em">Follow
    </v-btn>
    <v-btn v-if="isUserFollowed" @click="unFollow()" class="d-inline  mt-5 blue  font-weight-light pa-1"
           style="font-size: 1em">Un Follow
    </v-btn>
  </div>
</template>

<script>
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import {collection, doc, getDocs, updateDoc} from "firebase/firestore";
import {auth, db} from "../../firebase";

export default {

  components: {},

  data() {
    return {
      // user who we want to follow
      userToFollowFollowers: [],
      userToFollowFollowing: [],

      // user logged in
      userFollowing: [],
      currentUser: "",

      isUserFollowed: true,
    };
  },
  props:
      {
        userToFollow: "",
      },
  async mounted() {
    this.currentUser = auth.currentUser.displayName;
    await this.fetchUserToFollowData();
    await this.fetchUsersFollowing();
    await this.checkUserFollowed();
  },
  methods:
      {
        async fetchUserToFollowData() {

          let querySnapshot = await getDocs(collection(db, "Users", "UserNames", this.userToFollow, "Information", "Followers"));
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            this.userToFollowFollowers = doc.data()["Followers"];
            this.userToFollowFollowing = doc.data()["Following"];
          });

          console.log(this.userToFollowFollowers);
          console.log(this.userToFollowFollowing);
        },

        async fetchUsersFollowing() {
          let querySnapshot = await getDocs(collection(db, "Users", "UserNames", this.currentUser, "Information", "Followers"));
          querySnapshot.forEach((doc) => {
            this.userFollowing = doc.data()["Following"];
          });
          console.log("we follow");
          console.log(this.userFollowing);
        },

        async checkUserFollowed() {
          this.isUserFollowed = this.userToFollowFollowers.includes(this.currentUser);
        },

        async follow() {
// Check if the user is already following
          await this.fetchUsersFollowing();
          await this.fetchUserToFollowData();

          if (!this.userToFollowFollowers.includes(this.currentUser)) {
            await updateDoc(doc(db, "Users", "UserNames", this.userToFollow, "Information", "Followers", "Following"), {
              Followers: [...this.userToFollowFollowers, this.currentUser],
            });

            await updateDoc(doc(db, "Users", "UserNames", this.currentUser, "Information", "Followers", "Following"), {
              Following: [...this.userFollowing, this.userToFollow],
            });
          }
          // Fetch updated following and followers
          await this.fetchUserToFollowData();
          await this.checkUserFollowed();
        },

        async unFollow() {
          await this.fetchUserToFollowData();
          await this.checkUserFollowed();


          if (this.checkUserFollowed()) {

            let updatedFollowing = [];
            for (let userFollowingElement of this.userFollowing)
              if (userFollowingElement !== this.userToFollow)
                updatedFollowing.push(userFollowingElement)

            // Remove the followed user from the current user's following list
            console.log(updatedFollowing);
            await updateDoc(
                doc(db, "Users", "UserNames", this.currentUser, "Information", "Followers", "Following"),
                {Following: updatedFollowing}
            );

            // Remove the current user from the followed user's followers list
            const updatedFollowers = this.userToFollowFollowers.filter(user => user !== this.currentUser);
            await updateDoc(
                doc(db, "Users", "UserNames", this.userToFollow, "Information", "Followers", "Following"),
                {Followers: updatedFollowers}
            );

            // Fetch updated following and followers
            await this.fetchUserToFollowData();
            await this.checkUserFollowed();


          }
        },




      }


};
</script>

<style scoped>
</style>
