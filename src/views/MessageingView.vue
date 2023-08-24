<template>
  <v-row class="ma-5 mt-15">
    <v-col cols="3">
      <v-card elevation="5" height="100%">
        <v-card-title>Messages</v-card-title>
        <v-card
            v-for="(user, index) in this.friendList"
            :key="index"
        >

          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <v-progress-circular v-if="!user" color="error" indeterminate :size="20"
                                     :width="5"></v-progress-circular>
                <img
                    v-if="user"
                    :src="user.userAvatar"
                    alt="Profile Avatar"
                >
              </v-list-item-avatar>


              <v-list-item-content @click="getFriendUsername(user.username)">
                <v-list-item-title>{{ user.username }}</v-list-item-title>
                <v-list-item-subtitle> {{ user.lastMessage.text }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn
                    :class="'red--text'"
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
      </v-card>
    </v-col>
    <v-col>
      <v-card elevation="5" color="white" height="1000">
        <v-card-title>test</v-card-title>
        <MessageSystemComponent
            style="height: 800px"
            class="overflow-y-auto"
            height="max"
            :user="this.user"
            :friend="this.friend"
        ></MessageSystemComponent>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import MessageSystemComponent from "@/components/MessageSystemComponent.vue";
import {doc, getDoc} from "firebase/firestore";
import {auth, db} from "../../firebase";
import {mdiBell} from "@mdi/js";
import NotificationMenuComponent from "@/components/NotificationMenuComponent.vue";
import {onAuthStateChanged} from "firebase/auth";

export default {
  data() {
    return {
      friendList: [],
      userFollowing: null,
      displayName: "",

      // dm's
      user: null,
      friend: null,
    }
  },

  name: 'Home',

  components: {
    NotificationMenuComponent,
    MessageSystemComponent
  },
  async mounted() {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("fuxck");

      }
    });
    // fetch username
    await this.fetchUsernames()
    this.friend = "yohni";
    await this.fetchFriendList()
  },


  methods: {
    async fetchFriendList() {
      const userCollectionsRef = doc(
          db,
          "Users",
          "UserNames",
          auth.currentUser.displayName,
          "Information",
          "Followers",
          "Following",
      );

      const userCollectionsDoc = await getDoc(userCollectionsRef);
      this.userFollowing = userCollectionsDoc.data().Following;
      for (let userFollowingKey in this.userFollowing) {
        this.friendList.push({
          username: this.userFollowing[userFollowingKey],
          lastMessage: await this.fetchLastMessage(this.userFollowing[userFollowingKey]),
          userAvatar: await this.fetchProfileAvatar(this.userFollowing[userFollowingKey])
        })
      }


    },

    async fetchLastMessage(user) {
      const userCollectionsRef = doc(
          db,
          "Users",
          "UserNames",
          auth.currentUser.displayName,
          "Friends",
          user,
          "Messages"
      );


      const userCollectionsDoc = await getDoc(userCollectionsRef);
      const userData = userCollectionsDoc.data();
      const messages = userData ? userData.messages : []; // Make sure messages is an array
      return messages[messages.length - 1];
    },


    async fetchProfileAvatar(user) {
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

    getFriendUsername(username)
    {
      console.log(username);
      this.friend = username;
      return username;
    },

    async fetchUsernames()
    {
      await onAuthStateChanged(auth, (user) => {this.user = user.displayName;});

    },

  },


}
</script>
