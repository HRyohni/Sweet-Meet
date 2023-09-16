<template>
  <div>
    <v-card elevation="5" class="d-flex pa-5 ma-0 ">
      <v-avatar
          class="ma-2 "
          color="primary"
          size="40"
      >
        <v-img :src="friendsAvatarUrl"></v-img>
      </v-avatar>
      <h1>{{ this.friend }}</h1>

    </v-card>

    <div class="overflow-y-auto pa-3" style="height: 100%">
      <div
          v-for="(message, index) in this.messageHistory"
          :key="index">

        <div v-if="message.sender === friend ">


          <div class="d-flex ">
            <v-avatar
                class="ma-1"
                color="primary"
                size="40"
            >
              <v-img v-if="usersAvatarUrl" :src="friendsAvatarUrl"></v-img>
            </v-avatar>
            <v-card style="width: fit-content" elevation="3" class=" ma-1 d-flex ">
              <v-card-text style="">

                <div class=" ">

                  <v-row style="color: black" class="text--darken-4  ma-n1">

                    {{ message.text }}
                    <p style="font-size: 12px; text-align: right; color: #646567; width: max-content"
                       class="ma-0 pa-0 ml-2">{{ convertTimestamp(message.timestamp) }}</p>
                  </v-row>

                </div>
              </v-card-text>
            </v-card>
          </div>
        </div>


        <!--              USER SEND A MESSAGE-->
        <div

            v-if="message.sender !== friend "
            class="d-flex justify-end">
          <div class="d-inline">


            <v-card style="width: fit-content; height: fit-content" elevation="3"
                    class=" ma-3 pa-0 d-flex justify-end">
              <v-card-text style=" height: fit-content">

                <div class=" ">
                  <v-row style="color: black ;" class="text--darken-4 ma-n1">
                    {{ message.text }}
                  </v-row>
                </div>

              </v-card-text>
              <v-card-text class="d-flex  ma-0 pa-0"
                           style="font-size: 12px; text-align: right; color: #646567; width: max-content">
                <p style="width: max-content" class="pa-1">{{ convertTimestamp(message.timestamp) }}</p>
              </v-card-text>

            </v-card>

          </div>
          <v-avatar
              class="ma-1"
              color="primary"
              size="40"
          >
            <v-img :src="usersAvatarUrl"></v-img>
          </v-avatar>


        </div>

      </div>
      <VEmojiPicker style="width: 100%" emojis-by-row="10" v-if="!marker" @select="selectEmoji"/>
    </div>


    <!--              Type Message-->

    <v-divider></v-divider>

    <div class="d-flex mb-3">

      <v-text-field
          class="ma-2 mb-3"
          outlined
          v-model="currentMessage"
          :append-icon="marker ? emoticon : emoticon"
          :append-outer-icon="message ? 'mdi-send' : 'mdi-microphone'"
          filled
          clear-icon="mdi-close-circle"
          clearable
          label="Message"
          type="text"
          @click:append="toggleMarker"
          @click:append-outer="sendMsgToFriend(currentMessage)"
      ></v-text-field>

    </div>

  </div>
</template>


<script>
import {collection, doc, getDoc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import {auth, db} from "../../firebase.js";
import "firebase/storage";
import {VEmojiPicker} from 'v-emoji-picker';
import {icon} from "@fortawesome/fontawesome-svg-core";

import {mdiEmoticon} from '@mdi/js'
import marker from "vue2-google-maps/dist/components/marker";
import {onAuthStateChanged} from "firebase/auth";

export default {
  data() {
    return {
      currentMessage: "",

      // fetch msg history
      messageHistory: "",
      // fetch chats avatars
      usersAvatarUrl: "",
      friendsAvatarUrl: "",

      password: 'Password',
      show: false,
      message: 'Hey!',
      marker: true,
      iconIndex: 0,
      icons: [
        'mdi-emoticon',
        'mdi-emoticon-cool',
        'mdi-emoticon-dead',
        'mdi-emoticon-excited',
        'mdi-emoticon-happy',
        'mdi-emoticon-neutral',
        'mdi-emoticon-sad',
        'mdi-emoticon-tongue',
      ],
      emoticon: mdiEmoticon,


    };
  },
  props: {
    user: "",
    friend: "",
  },
  components: {
    VEmojiPicker
  },

  updated() {
    if (this.friend && this.user)
      this.fetchMessageHistory()
  },

  async mounted() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await this.allFunctions();
      }
    });

  },
  watch: {
    friend(newValue, oldValue) {
      this.allFunctions();
    },
    user(newValue, oldValue) {
      this.allFunctions();
    }
  },


  methods: {

    async allFunctions() {
      if (this.friend && this.user) {
        //check if user exists
        await this.checkIfFriendExists();

        //Check if Messages exists and Send Message
        await this.checkIfMessagesDatabaseExists();

        //Fetch history of messages data
        await this.fetchMessageHistory()

        //Fetch Chats Avatars
        await this.fetchChatsAvatars()
      } else {
        //console.log("cant find user")
      }
    },


    async checkIfFriendExists() {
      const querySnapshot = await getDocs(collection(db, "Users", "UserNames", this.friend));
      if (querySnapshot.empty) {
        console.log("error cant find user");
        await this.$router.push("/");  // TODO: Make error handler better
      }
    },

    async checkIfMessagesDatabaseExists() {
      const querySnapshot = await getDocs(collection(db, "Users", "UserNames", this.friend, "Friends", this.user));
      if (querySnapshot.empty) {
        console.log("user does not have history" + querySnapshot.empty);
        await this.createMessageDatabase()
        //await this.$router.push("/");  // TODO: Make error handler better
      }
    },


    async createMessageDatabase() {
      // TODO: Check if friends
      await setDoc(doc(db, "Users", "UserNames", this.friend, "Friends", this.user, "Messages"), {}).then(console.log("created"));
      await setDoc(doc(db, "Users", "UserNames", auth.currentUser.displayName, "Friends", this.friend, "Messages"), {}).then(console.log("created"));

    },

    async fetchMessageHistory() {
      const querySnapshot = await getDocs(collection(db, "Users", "UserNames", this.friend, "Friends", this.user));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        this.messageHistory = doc.data()["messages"];
      });


    },

    async sendMsgToFriend(message) {
      // Clears message input after sending message
      this.clearCurrentMessage();
      // close emoji menu after sending message
      if (!this.marker)
        this.toggleMarker();

      let document = doc(
          db,
          "Users",
          "UserNames",
          this.friend,
          "Friends",
          this.user,
          "Messages"
      );

      // Fetch existing messages
      const documentSnapshot = await getDoc(document);
      const existingMessages = documentSnapshot.data()?.messages || [];

      // Append new message to the array
      existingMessages.push({
        sender: this.user,
        text: message,
        timestamp: new Date().getTime(),
      });


      // Update the document with the updated messages array
      await updateDoc(document, {messages: existingMessages});

      // Update friends history
      document = doc(
          db,
          "Users",
          "UserNames",
          this.user,
          "Friends",
          this.friend,
          "Messages"
      );

      // Update the document with the updated messages array
      await updateDoc(document, {messages: existingMessages});

      await this.fetchMessageHistory()
    },

    async saveMsgToUserDatabase(data) {

      await setDoc(doc(db, "Users", "UserNames", this.user, "Friends", this.friend, "Messages"), {
        data
      }).then("Saved locally");
    },

    async fetchChatsAvatars() {

      let querySnapshot = await getDocs(collection(db, "Users", "UserNames", this.user, "Information", "Profile"));
      querySnapshot.forEach((doc) => {
        this.usersAvatarUrl = doc.data()["ProfilePictureUrl"];
      });
      querySnapshot = await getDocs(collection(db, "Users", "UserNames", this.friend, "Information", "Profile"));
      querySnapshot.forEach((doc) => {
        this.friendsAvatarUrl = doc.data()["ProfilePictureUrl"];
      })

    },
    convertTimestamp(timestamp) {
      const date = new Date(timestamp);
      const currentDate = new Date();
      if (currentDate.toDateString() === date.toDateString())
        return date.getHours() + ":" + date.getMinutes();
      else
        return date.getDay() + " " + date.toLocaleString('default', {month: 'short'});
    },

    toggleMarker() {
      this.marker = !this.marker
    },

    clearCurrentMessage() {
      this.currentMessage = ''
    },

    selectEmoji(emoji) {
      this.currentMessage += emoji["data"];
    }

  },


}
</script>
<style scoped>


.messageBox {
  background-color: #ffcccf;
  color: white;

}


</style>
