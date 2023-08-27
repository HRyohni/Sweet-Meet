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
                <v-list-item-subtitle v-if="user.lastMessage"> {{ user.lastMessage.text }}</v-list-item-subtitle>
                <v-list-item-subtitle v-if="user.newUser"> {{ user.username }} wants to send you msg
                </v-list-item-subtitle>

                <p v-if="user.newUser"> Follow Back user</p>
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
import {collection, doc, getDoc, getDocs} from "firebase/firestore";
import {auth, db} from "../../firebase";
import {mdiBell} from "@mdi/js";
import NotificationMenuComponent from "@/components/NotificationMenuComponent.vue";
import {onAuthStateChanged} from "firebase/auth";

export default {
  data() {
    return {
      friendList: [],
      userFollowing: null,
      userFollowers: null,
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
  created() {
    // Use created hook instead of mounted

    // Check authentication state using onAuthStateChanged
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is authenticated, fetch necessary data
        this.user = user.displayName;
        this.fetchUsernames()
        this.friend = "yohni";
        this.fetchFriendList();
        this.newMessageRequest()
      } else {
        this.$router.push("/login");
        // User is not authenticated, handle accordingly
        // For example, you might want to redirect to a login page
      }
    });
  },

  async mounted() {

    // fetch username


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
        let lastMessage = await this.fetchLastMessage(this.userFollowing[userFollowingKey]);
        this.friendList.push({
          username: this.userFollowing[userFollowingKey],
          lastMessage: lastMessage,
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
      const reff = doc(db,"Users","UserNames",user,"Information","Profile","Data",);
      const docSnap = await getDoc(reff);
      const postData = docSnap.data();

      return postData.ProfilePictureUrl;
    },

    getFriendUsername(username) {
      this.friend = username;
      return username;
    },

    async fetchUsernames() {
      await onAuthStateChanged(auth, (user) => {
        this.user = user.displayName;
      });
    },

    async newMessageRequest() {
      try {
        // Fetch followers
        const userCollectionsRef = doc(
            db,
            "Users",
            "UserNames",
            auth.currentUser.displayName,
            "Information",
            "Followers",
            "Following"
        );

        const userCollectionsDoc = await getDoc(userCollectionsRef);
        this.userFollowers = userCollectionsDoc.data().Followers;

        console.log("start");
        let data = [];
        for (let userFollowersKey in this.userFollowers) {
          const followerUsername = this.userFollowers[userFollowersKey];

          const messageRef = doc(
              db,
              "Users",
              "UserNames",
              followerUsername,
              "Friends",
              this.user, // Assuming this.user represents the current user's username
              "Messages"
          );

          const docSnap = await getDoc(messageRef);
          const messageData = docSnap.data();


          for (let friendListElement of this.friendList) {
            console.log(friendListElement.username.include(messageData.messages[0].sender));

          }


          this.friendList.push({
            username: followerUsername,
            lastMessage: "lastMessage",
            userAvatar: await this.fetchProfileAvatar(followerUsername),
            newUser: true,
          })

        }
        if (this.friendList.includes("mobitel")) {
        }

        console.log("end");


      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },


  },


}
</script>
