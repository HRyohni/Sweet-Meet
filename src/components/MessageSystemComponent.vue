<template>
  <v-container>


    <v-row>

      <v-col class="">
        <v-card

            max-height="auto" outlined class=" messageBox pa-5 ma-3 overflow-y-auto">

          <div class="d-flex ">
            <v-avatar
                class="ma-1"
                color="primary"
                size="40"
            >
              <v-img :src="friendsAvatarUrl" ></v-img>
            </v-avatar>

            <h1>{{ this.friend }}</h1>
          </div>

          <v-scroll-x-reverse-transition
              v-for="(message, index) in this.messageHistory"
              :key="index">
            <!--              FRIEND SEND A MESSAGE-->
            <div

                v-if="message.sender === friend "

                class="d-flex">
              <v-avatar
                  class="ma-1"
                  color="primary"
                  size="40"
              >
                <v-img :src="friendsAvatarUrl" ></v-img>
              </v-avatar>

              <div class="d-flex ">
                <v-card style="width: fit-content" elevation="3" class=" ma-1 d-flex ">
                  <v-card-text style="">

                    <div class=" ">
                      <v-row style="color: black" class="text--darken-4  ma-n1">
                        {{message.text}}
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
              <v-card style="width: fit-content; height: fit-content" elevation="3" class=" ma-3 pa-0 d-flex justify-end">
                <v-card-text style=" height: fit-content">

                  <div class=" ">
                    <v-row style="color: black ;" class="text--darken-4 ma-n1"> {{ message.text }}
                    </v-row>
                  </div>
                </v-card-text>


              </v-card>
              <v-avatar
                  class="ma-1"
                  color="primary"
                  size="40"
              >
                <v-img :src="usersAvatarUrl" ></v-img>
              </v-avatar>

            </div>

          </v-scroll-x-reverse-transition>


          <!--              Type Message-->

          <v-divider></v-divider>
          <VEmojiPicker emojis-by-row="10"  v-if="!marker" @select="selectEmoji" />
          <div class="d-flex ">

            <v-text-field
                outlined
                v-model="currentMessage"
                :append-icon="marker ? 'mdi-map-marker' : 'mdi-map-marker-off'"
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

        </v-card>


      </v-col>

    </v-row>

  </v-container>
</template>


<script>
import {collection, doc, getDoc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import {auth, db} from "../../firebase.js";
import "firebase/storage";
import { VEmojiPicker } from 'v-emoji-picker';
import {icon} from "@fortawesome/fontawesome-svg-core";


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
    this.fetchMessageHistory()
  },

  mounted() {
    this.message = "test";

    //check if user exists
    this.checkIfFriendExists();
    //Check if Messages exists and Send Message
    this.checkIfMessagesDatabaseExists();

    //Fetch history of messages data
    this.fetchMessageHistory()

    //Fetch Chats Avatars
    this.fetchChatsAvatars()


  },

  methods: {
    icon,

    async checkIfFriendExists() {
      const querySnapshot = await getDocs(collection(db, "Users", "UserNames", this.friend));
      if (querySnapshot.empty) {
        console.log("error cant find user");
        await this.$router.push("/");  // TODO: Make error handler better
      } else
        console.log("exsists!");
    },

    async checkIfMessagesDatabaseExists() {
      const querySnapshot = await getDocs(collection(db, "Users", "UserNames", this.friend, "Friends", this.user));
      if (querySnapshot.empty) {
        console.log("user does not have history" + querySnapshot.empty);
        await this.createMessageDatabase()
        //await this.$router.push("/");  // TODO: Make error handler better
      } else {
        console.log("history exsists");

      }

    },

    async createMessageDatabase() {
      // TODO: Check if friends

      await setDoc(doc(db, "Users", "UserNames", this.friend, "Friends", this.user, "Messages"), {}).then();


    },

    async fetchMessageHistory() {
      const querySnapshot = await getDocs(collection(db, "Users", "UserNames", this.friend, "Friends", this.user));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        this.messageHistory = doc.data()["messages"];
      });

    },

    async sendMsgToFriend(message) {
      this.clearCurrentMessage();

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

      console.log("Message sent!");


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
        // doc.data() is never undefined for query doc snapshots
        this.usersAvatarUrl = doc.data()["ProfileBackgroundPicture"];
      });

      querySnapshot = await getDocs(collection(db, "Users", "UserNames", this.friend, "Information", "Profile"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        this.friendsAvatarUrl = doc.data()["ProfileBackgroundPicture"];
      });
    },

    toggleMarker () {
      this.marker = !this.marker
    },

    clearCurrentMessage () {
      this.currentMessage = ''
    },
    resetIcon () {
      this.iconIndex = 0
    },
    selectEmoji(emoji) {
      this.currentMessage += emoji["data"];
      console.log(emoji["data"]);
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
