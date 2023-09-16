<template>
  <div>
    <v-btn v-if="!isUserFollowed" @click="follow()" class="d-inline white--text  red   pa-1"
           style="">Follow
    </v-btn>
    <v-btn v-if="isUserFollowed" @click="unFollow()" class="d-inline white--text  blue  pa-1"
           style="">Un Follow
    </v-btn>
  </div>
</template>

<script>
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import {collection, doc, getDoc, getDocs, updateDoc} from "firebase/firestore";
import {auth, db} from "../../firebase";
import {onAuthStateChanged} from "firebase/auth";

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

      isUserFollowed: false,
    };
  },
  props:
      {
        userToFollow: "",
      },
  async mounted() {
    await onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.currentUser = user.displayName;
         await this.fetchUserToFollowData();
         await this.fetchUsersFollowing();
         await this.checkUserFollowed();
      }
    });

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

        },

        async fetchUsersFollowing() {
          let querySnapshot = await getDocs(collection(db, "Users", "UserNames", this.currentUser, "Information", "Followers"));
          querySnapshot.forEach((doc) => {
            this.userFollowing = doc.data()["Following"];
          });

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
            //Send Notification
            await this.sendNewNotificationToUser({
              username: auth.currentUser.displayName,
              comment: auth.currentUser.displayName + " Followed you!",
              FollowRequest: true
            });

            // Fetch updated following and followers
            await this.fetchUserToFollowData();
            await this.checkUserFollowed();


          }
        },

        async sendNewNotificationToUser(notificationMessage) {
          try {
            let notificationList = [];
            let reff = doc(
                db,
                "Users",
                "UserNames",
                this.userToFollow,
                "Notification"
            );

            // Fetch data
            const docSnap = await getDoc(reff);

            if (docSnap.exists()) {
              // Ensure Notifications field exists in docSnap data
              if (docSnap.data() && docSnap.data().Notifications) {
                // Get existing notifications
                notificationList = docSnap.data().Notifications;
                notificationList.push(notificationMessage);
              } else {
                console.log("No existing notifications field found.");
              }
            } else {
              console.log("No New Notifications");
            }

            let informationData = {
              Notifications: notificationList,
            };

            await updateDoc(reff, informationData);
          } catch (error) {
            console.error("Error sending new notification:", error);
          }
        },




      }


};
</script>

<style scoped>
</style>
