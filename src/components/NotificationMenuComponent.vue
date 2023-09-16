<template>
  <div class="text-center">
<v-fab-transition>
    <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        :max-height="500"
        offset-x
        class="overflow-y-auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="d-block  mt-2" icon elevation="2" fab color="red" v-bind="attrs" v-on="on">
          <v-icon>{{ notificationIcon }}</v-icon>
        </v-btn>


      </template>
      <v-card elevation="2" class="pa-2 " style="background-color: #f86262" >
        <h3 class="pa-3" v-if="!this.notificationList">No new notifications</h3>
        <div class="d-flex justify-center">
          <v-btn v-if="this.notificationList" @click="clearNotifications" icon elevation="5" class="ma-3">
            <v-icon>{{ trashcan }}</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <h1 class="white--text">Notifications</h1>
        </div>

        <v-card
            class="ma-1 overflow-y-auto"

            v-for="(notification, index) in this.notificationList"
            :key="index"
        >
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <v-progress-circular v-if="!notification.profileAvatar" color="error" indeterminate :size="20"
                                     :width="5"></v-progress-circular>
                <img
                    v-if="notification.profileAvatar"
                    :src="notification.profileAvatar"
                    alt="Profile Avatar"
                >
              </v-list-item-avatar>


              <v-list-item-content>
                <v-list-item-title>{{ notification.username }}</v-list-item-title>
                <v-list-item-subtitle>{{ notification.comment }}</v-list-item-subtitle>
                <div v-if="notification.FollowRequest">
                  <follow-button-component :user-to-follow="notification.username"></follow-button-component>
                </div>
              </v-list-item-content>
              <v-list-item-action >

                  <v-icon  v-if="notification.comment.includes('liked')" color="red">mdi-heart</v-icon>
                  <v-icon  v-if="notification.comment.includes('commented')" color="red">{{commentIcon}}</v-icon>
                  <v-icon v-if="notification.comment.includes('match')" color="red">{{ cupcakeIcon }}</v-icon>

              </v-list-item-action>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>


        </v-card>
      </v-card>
    </v-menu>
</v-fab-transition>
  </div>
</template>

<script>
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import {mdiBell, mdiTrashCan,mdiComment,mdiCupcake} from "@mdi/js";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {auth, db} from "../../firebase";
import FollowButtonComponent from "@/components/FollowButtonComponent.vue";
import {onAuthStateChanged} from "firebase/auth";

export default {

  components: {FollowButtonComponent},

  data() {
    return {
      //Icons
      notificationIcon: mdiBell,
      trashcan: mdiTrashCan,
      commentIcon: mdiComment,
      cupcakeIcon: mdiCupcake,

      fav: true,
      menu: false,
      message: false,
      hints: true,
      notificationList: null,
      NumberNotification: 0,

    }


  },
  async mounted() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await this.fetchNotifications();
      }
    });

  },

  updated() {
    this.checkForNewNotifications();
  },
  methods:
      {
        async fetchNotificationsProfileAvatar(user) {
          const reff = doc(
              db,
              "Users",
              "UserNames",
              user,
              "Information",
              "Profile",
              "Data",
          );
          // Fetch existing data from the document
          const docSnap = await getDoc(reff);
          const postData = docSnap.data();
          return postData.ProfilePictureUrl;
        },

        async fetchNotifications() {
          const reff = doc(
              db,
              "Users",
              "UserNames",
              auth.currentUser.displayName,
              "Notification"
          );

          const docSnap = await getDoc(reff);
          const postData = docSnap.data();

          this.notificationList = postData.Notifications;
          this.NumberNotification = this.notificationList.length;

          for (let notification of this.notificationList) {
            notification.profileAvatar = await this.fetchNotificationsProfileAvatar(notification.username);

          }
        },

        async checkForNewNotifications() {
          const reff = doc(
              db,
              "Users",
              "UserNames",
              auth.currentUser.displayName,
              "Notification"
          );

          const docSnap = await getDoc(reff);
          const postData = docSnap.data();
          let newLength = postData.Notifications

          if (newLength.length !== this.NumberNotification) {
            this.fetchNotifications();
          }


        },
        clearNotifications() {
          try {
            let reff = doc(
                db,
                "Users",
                "UserNames",
                auth.currentUser.displayName,
                "Notification"
            );


            let informationData = {
              Notifications: null,
            };

            updateDoc(reff, informationData);
            this.fetchNotifications();
          } catch (error) {
            console.error("Error deleting notification:", error);
          }

        },
        goToProfilePage(username) {
          this.$router.push("profile/" + username);
        },


      },


};
</script>

<style scoped>
</style>
