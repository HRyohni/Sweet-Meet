<template>
  <v-container>


    <v-row>
      <v-col cols="2">
        <v-card>
          <v-card-text>
            <h1>Username</h1>
          </v-card-text>
          <v-card-text>
            <h1>Username</h1>
          </v-card-text>
          <v-card-text>
            <h1>Username</h1>
          </v-card-text>

        </v-card>


      </v-col>
      <v-col class="">
        <v-card

            max-height="1000" outlined class=" messageBox pa-5 ma-3 overflow-y-auto">



          <div
              v-for="(message, index) in this.messageHistory"
              :key="index">
            <!--              FRIEND SEND A MESSAGE-->
            <div

                v-if="message.sender === friend "

                class="d-flex">
              <v-avatar
                  class="ma-1 d-flex"
                  color="red"
                  size="40"
              >M
              </v-avatar>

              <div class="d-flex ">
                <v-card style="width: 50%" elevation="3" class=" ma-3 d-flex ">
                  <v-card-text style="">
                    <div class=" d-flex">
                      {{message.sender}}
                    </div>
                    <div class=" ">
                      <v-row style="color: black" class="text--darken-4   ma-2">
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
              <v-card style="width: 50%" elevation="3" class=" ma-3 d-flex justify-end">
                <v-card-text style="">
                  <div class="justify-end d-flex">
                    {{ message.sender }}
                  </div>
                  <div class=" ">
                    <v-row style="color: black" class="text--darken-4   ma-2"> {{ message.text }}
                    </v-row>
                  </div>
                </v-card-text>


              </v-card>
              <v-avatar
                  class="ma-1"
                  color="primary"
                  size="40"
              >L
              </v-avatar>

            </div>

          </div>


          <!--              Type Message-->

          <v-divider></v-divider>
          <div class="d-flex ">
            <v-text-field v-model="currentMessage" outlined class="ma-2"></v-text-field>
            <v-btn class="ma-4" @click="sendMsgToFriend(currentMessage);" dark> send</v-btn>
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


export default {
  data() {
    return {
      currentMessage: "",

      // fetch msg history
      messageHistory: "",

    };
  },
  props: {
    user: "",
    friend: "",
  },

  mounted() {
    this.message = "test";

    //check if user exists
    this.checkIfFriendExists();
    //Check if Messages exists and Send Message
    this.checkIfMessagesDatabaseExists();

    //Fetch history of messages data
    this.fetchMessageHistory()


  },
  methods: {

    async checkIfFriendExists() {
      const querySnapshot = await getDocs(collection(db, "Users", "UserNames", this.friend));
      if (querySnapshot.empty) {
        alert("error cant find user");
        await this.$router.push("/");  // TODO: Make error handler better
      } else
        console.log("exsists!");
    },

    async checkIfMessagesDatabaseExists() {
      const querySnapshot = await getDocs(collection(db, "Users", "UserNames", this.friend, "Friends", this.user));
      if (querySnapshot.empty) {
        alert("user does not have history" + querySnapshot.empty);
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


  },

}
</script>
<style scoped>


.messageBox {
  background-color: #e195a5;
  color: white;

}


</style>
