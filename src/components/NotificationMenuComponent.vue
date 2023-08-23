<template>
  <div class="text-center">
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

      <v-card
          v-for="(notification, index) in this.notificationList"
          :key="index"
      >
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-progress-circular v-if="!notification.profileAvatar" color="error" indeterminate :size="20" :width="5"></v-progress-circular>
              <img
                  v-if="notification.profileAvatar"
                  :src="notification.profileAvatar"
                  alt="Profile Avatar"
              >
            </v-list-item-avatar>


            <v-list-item-content>
              <v-list-item-title>{{ notification.username }}</v-list-item-title>
              <v-list-item-subtitle>{{ notification.comment }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn
                  :class="fav ? 'red--text' : ''"
                  icon
                  @click="fav = !fav"
              >
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>


      </v-card>
    </v-menu>
  </div>
</template>

<script>
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import {mdiBell} from "@mdi/js";
import {collection, doc, getDoc, getDocs} from "firebase/firestore";
import {auth, db} from "../../firebase";

export default {

  components: {},

  data() {
    return {
      notificationIcon: mdiBell,
      fav: true,
      menu: false,
      message: false,
      hints: true,
      notificationList: null,

    }


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

          for (let notification of this.notificationList) {
            const profileAvatar = await this.fetchNotificationsProfileAvatar(notification.username);
            notification.profileAvatar = profileAvatar;
          }

        },

      },

  async mounted() {
    await this.fetchNotifications()

  }


};
</script>

<style scoped>
</style>
