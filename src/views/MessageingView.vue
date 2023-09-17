<template>
  <v-row class="ma-5 mt-15" style="">
    <UploadPostComponent :dialog="dialog2" ></UploadPostComponent>
    <v-col cols="1" style="z-index: 4">
      <div class=" ml-2 mt-2">
        <v-avatar @click="goToProfilePage()" size="50">
          <v-img :src="userProfileAvatar"></v-img>

        </v-avatar>
        <p class="d-inline ma-2">{{ displayName }}</p>
        <div>

          <NotificationMenuComponent></NotificationMenuComponent>
          <v-btn @click="openMessageView" class="d-block mt-2" icon elevation="2" fab color="red">
            <v-icon>{{ messageIcon }}</v-icon>
          </v-btn>

          <v-btn @click="openDialog" class="d-block mt-2" icon elevation="2" fab color="red">
            <v-icon>{{ plusIcon }}</v-icon>
          </v-btn>
          <v-btn @click="signOut()" class="d-block mt-2" icon elevation="2" fab color="red">
            <v-icon>{{ logoutIcon }}</v-icon>
          </v-btn>
        </div>
      </div>

    </v-col>


    <v-col style="z-index: 1" cols="2">
      <v-card elevation="5" height="700px" class="overflow-y-auto">
        <div class="">
          <v-card-title class="mt-0">Messages</v-card-title>
          <v-autocomplete
              auto-select-first
              clearable
              filled
              solo
              class="pa-3 pt-0"
              label="Search Friend"
              :items="friendListArray"
              v-model="pickedFriend"
              @click="getFriendUsername(pickedFriend)"
          ></v-autocomplete>
        </div>
        <div v-if="friendList.length === 0 ">
          <div class="d-flex justify-center">

            <h3>Meet new people!</h3>
          </div>

          <follow-suggestion-component style="width: 100%"></follow-suggestion-component>
        </div>
        <v-card
            v-if="friendList.length !== 0 "
            color="green"
            class="ma-3"
            v-for="(friend, index) in this.friendList"
            :key="index"
        >

          <v-list color="#b8c6ff">
            <v-list-item>
              <v-list-item-avatar>
                <v-progress-circular v-if="!friend.username" color="error" indeterminate :size="20"
                                     :width="5"></v-progress-circular>
                <img
                    @click="goToProfileOnClick(friend.username)"
                    v-if="friend"
                    :src="friend.userAvatar"
                    alt="Profile Avatar"
                >
              </v-list-item-avatar>


              <v-list-item-content @click="getFriendUsername(friend.username)">
                <v-list-item-subtitle><h3>{{ friend.username }}</h3></v-list-item-subtitle>
                <v-list-item-subtitle v-if="friend.lastMessage"> {{ friend.lastMessage.text }}</v-list-item-subtitle>
                <v-list-item-subtitle v-if="friend.newUser"><b>new Friend</b></v-list-item-subtitle>

                <div class="d-flex" v-if="friend.newUser">
                  <follow-button-component :user-to-follow="friend.username"></follow-button-component>

                  <BlockUserComponent class="ml-1" :current-user="user"
                                      :username-to-block="friend.username"></BlockUserComponent>

                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>
        </v-card>
      </v-card>
    </v-col>

    <v-col>
      <v-card elevation="5" class="" color="white" height="100%">
        <MessageSystemComponent
            style="height: 650px"
            :user="this.user"
            :friend="this.friend"
        ></MessageSystemComponent>
      </v-card>
    </v-col>

    <v-col style="z-index: 3" cols="3">
      <v-card class="pa-4 ">
        <v-img lazy-src="https://placehold.co/300x400?text=sweetMeet" style="height: 400px"
               :src="friendsProfileBackground" class="d-flex justify-center pa-10">
          <v-progress-circular indeterminate color="red" v-if="!this.userProfileAvatar"></v-progress-circular>
          <div class="d-inline " style="text-align: center">
            <div class="d-flex justify-center">
              <v-avatar class="justify-center" size="150">
                <img
                    :src="this.friendsProfileAvatar"
                    height="300"

                >
              </v-avatar>
            </div>

            <h1 style="color: white">{{ this.friend }}</h1>
            <h3 style="color: white">{{ this.friendFirstName + ' ' + this.friendSecondName }}</h3>
          </div>
        </v-img>

        <v-card elevation="2" class="d-flex justify-start pa-10 mt-5">
          <v-progress-circular indeterminate color="red" v-if="!this.userProfileAvatar"></v-progress-circular>
          <div class=" " style="text-align: center">

            <h1>Personal Information</h1>
            <v-progress-circular indeterminate color="red" v-if="!this.friendPhoneNumber"></v-progress-circular>
            <div v-if="friendPhoneNumber" class="d-inline" style="text-align: left; color: black">


              <p class="ma-2 black--text">
                <v-icon right class="mr-2">
                  {{ cityIcon }}
                </v-icon>

                {{ this.friendCitiy }}
                <v-spacer></v-spacer>
              </p>

              <p class="ma-2 black--text">
                <v-icon right class="mr-2">
                  {{ phoneIcon }}
                </v-icon>
                + {{ this.friendPhoneNumber }}
                <v-spacer></v-spacer>
              </p>

              <p class="ma-2 black--text">
                <v-icon right class="mr-2">
                  {{ emailIcon }}
                </v-icon>

                {{ this.friendEmail.toLowerCase() }}
                <v-spacer></v-spacer>
              </p>


            </div>
          </div>
        </v-card>

        <v-card elevation="1" class="d-flex justify-center pa-2 mt-5">
          <v-progress-circular indeterminate color="red" v-if="!this.userProfileAvatar"></v-progress-circular>
          <div class="" style="text-align: center">
            <follow-button-component class="d-inline ma-1" :user-to-follow="this.friend"></follow-button-component>
            <block-user-component @click="this.fetchFriendList()" class="mr-2 ma-1" :current-user="user"
                                  :username-to-block="this.friend"></block-user-component>
            <v-dialog
                v-model="dialog"
                width="500"
                class="pa-10 ma-1"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="red "
                    dark
                    class="ma-1"
                    v-bind="attrs"
                    v-on="on"
                >
                  Report
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                  <p class="d-inline">Are you sure you want to report:</p>

                </v-card-title>
                <v-card-title style="text-align: center" class="text-h5  grey lighten-2">
                  <p><b> {{ this.friend }}</b></p>
                </v-card-title>

                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn
                      color="primary"
                      outlined
                      @click="dialog = false"
                  >
                    No
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="red"
                      class="white--text "
                      @click="reportUser()"
                      reportUser
                  >
                    Report
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-card>


      </v-card>


    </v-col>
  </v-row>
</template>

<script>
import MessageSystemComponent from "@/components/MessageSystemComponent.vue";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {auth, db, signOut} from "../../firebase";
import NotificationMenuComponent from "@/components/NotificationMenuComponent.vue";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import router from "@/router";
import FollowButtonComponent from "@/components/FollowButtonComponent.vue";
import BlockUserComponent from "@/components/BlockUserComponent.vue";
import {mdiBell, mdiLogout, mdiMessage, mdiPlus, mdiPhone, mdiEmail, mdiCity} from "@mdi/js";
import FollowSuggestionComponent from "@/components/FollowSugestionComponent.vue";
import UploadPostComponent from "@/components/UploadPostComponent.vue";

export default {
  data() {
    return {
      // ICONS
      notificationIcon: mdiBell,
      messageIcon: mdiMessage,
      plusIcon: mdiPlus,
      logoutIcon: mdiLogout,
      emailIcon: mdiEmail,
      phoneIcon: mdiPhone,
      cityIcon: mdiCity,

      //Data
      friendList: [],
      userFollowing: null,
      userFollowers: null,
      displayName: "",
      friendListArray: [],
      pickedFriend: "",
      userProfileAvatar: "",
      dialog2: false,

      //Friend Data
      friendFirstName: "",
      friendSecondName: "",
      friendPhoneNumber: "",
      friendCitiy: "",
      friendEmail: "",
      friendsProfileBackground: "",
      friendsProfileAvatar: "",

      // dm's
      user: null,
      friend: null,
    }
  },

  name: 'Home',

  components: {
    UploadPostComponent,
    FollowSuggestionComponent,
    BlockUserComponent,
    FollowButtonComponent,
    NotificationMenuComponent,
    MessageSystemComponent
  },

  created() {
    // Use created hook instead of mounted

    // Check authentication state using onAuthStateChanged
    onAuthStateChanged(auth, async (user) => {
      if (user) {
         //User is authenticated, fetch necessary data
        this.user = user.displayName;
        this.userProfileAvatar = await this.fetchProfileAvatar(this.user);
        this.friend = "Franko";

            await this.fetchFriendList();
        await this.fetchFriendInformation();
        await this.newMessageRequest()
      } else {
        await this.$router.push("/login");
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
      this.friendList = [];
      this.userFollowing = [];
      const userCollectionsRef = doc(
          db,
          "Users",
          "UserNames",
          this.user,
          "Information",
          "Followers",
          "Following",
      );

      const userCollectionsDoc = await getDoc(userCollectionsRef);
      this.userFollowing = userCollectionsDoc.data().Following;
      const blockedList = await this.fetchBlockedUsers(this.user);

      for (let userFollowingKey in this.userFollowing) {
        let lastMessage = await this.fetchLastMessage(this.userFollowing[userFollowingKey]);
        if (!blockedList.includes(this.userFollowing[userFollowingKey])) {
          this.friendList.push({
            username: this.userFollowing[userFollowingKey],
            lastMessage: lastMessage,
            userAvatar: await this.fetchProfileAvatar(this.userFollowing[userFollowingKey])
          })
        }
      }


    },

    async fetchLastMessage(user) {
      try {
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
      } catch (e) {
        console.log("error occured at fetching last messages.")

      }

    },


    async fetchProfileAvatar(user) {
      const reff = doc(db, "Users", "UserNames", user, "Information", "Profile", "Data",);
      const docSnap = await getDoc(reff);
      const postData = docSnap.data();

      return postData.ProfilePictureUrl;
    },


    async getFriendUsername(username) {
      this.friend = username;
      await this.fetchFriendInformation();
      return username;
    },


    newMessageRequest: async function () {

      let currentUserFollowingList = await this.returnUserFollowing();
      this.userFollowers = await this.returnUserFollowers();
      const blockedList = await this.fetchBlockedUsers(this.user);

      try {
        for (let userFollowersKey in this.userFollowers) {

          if (!currentUserFollowingList.includes(this.userFollowers[userFollowersKey]) && this.userFollowers[userFollowersKey] !== this.user &&
              !blockedList.includes(this.userFollowers[userFollowersKey])) {
            const followerUsername = await this.userFollowers[userFollowersKey];
            const messageRef = doc(
                db,
                "Users",
                "UserNames",
                followerUsername,
                "Friends",
                this.user,
                "Messages"
            );

            const docSnap = await getDoc(messageRef);
            const messageData = docSnap.data().messages;

            let userHasSendMessageBack = false;
            let isFriendAlready = false;


            this.friendList.push({
              username: followerUsername,
              lastMessage: "lastMessage",
              userAvatar: await this.fetchProfileAvatar(followerUsername),
              newUser: true,
            });


            userHasSendMessageBack = false;

          }

        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async returnUserFollowing() {
      const userCollectionsDoc = await getDoc(doc(db, "Users", "UserNames", auth.currentUser.displayName, "Information", "Followers", "Following"));
      return userCollectionsDoc.data().Following
    },

    async returnUserFollowers() {
      const userCollectionsDoc = await getDoc(doc(db, "Users", "UserNames", auth.currentUser.displayName, "Information", "Followers", "Following"));
      return userCollectionsDoc.data().Followers
    },

    async fetchFriendInformation() {
      let docSnap = await getDoc(doc(db, "Users", "UserNames", this.friend, "Information"));

      if (docSnap.exists()) {
        this.friendFirstName = docSnap.data()["FirstName"];
        this.friendSecondName = docSnap.data()["SecondName"];
        this.friendPhoneNumber = docSnap.data()["PhoneNumber"];
        this.friendCitiy = docSnap.data()["City"];
        this.friendEmail = docSnap.data()["Email"];
      } else {
        // docSnap.data() will be undefined in this case
        this.userExists = false;
      }
      docSnap = await getDoc(doc(db, "Users", "UserNames", this.friend, "Information", "Profile", "Data"));
      const postData = docSnap.data();

      this.friendsProfileBackground = postData.ProfileBackgroundPicture;
      this.friendsProfileAvatar = postData.ProfilePictureUrl;


    },

    async reportUser() {
      this.dialog = false;
      let reff2 = doc(db, "Users", "UserNames", this.friend, "Reports");
      let docSnapSoulmate = await getDoc(reff2);

      let reportList = docSnapSoulmate.data()["Reports"];
      if (!reportList.includes(auth.currentUser.displayName)) {
        reportList.push(auth.currentUser.displayName);
        await setDoc(reff2, {
          Reports: reportList,
        });
        this.dialog = false;
      }
    },

    goToProfileOnClick(username) {
      this.$router.push("/profile/" + username);
    },
    signOut() {
      const auth = getAuth();
      signOut(auth)
          .then(() => {
            this.$router.push("/");
          })
          .catch((error) => {
            // An error happened.
            console.log(error);
          });
    },
    addPost() {
      this.$router.push("/addPost");
    },
    onScroll() {
      this.scrollInvoked++;
    },
    openMessageView() {
      this.$router.push("messages")
    },

    goToProfilePage() {
      this.$router.push("profile/" + auth.currentUser.displayName);
    },

    async fetchBlockedUsers(username) {
      const docSnap = await getDoc(doc(db, "Users", "UserNames", username, "BlockedUser"));
      if (docSnap.exists()) {
        return docSnap.data()["Blocked"];
      } else {
        console.log("error");
        return null;
      }
    },

    openDialog()
    {
      this.dialog2 = !this.dialog2;

    }

  },


}
</script>


