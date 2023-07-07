<template>
  <div class="mainbar">
    <v-container class="bg-surface-variant">
      <v-row no-gutters class="justify-center">
        <v-col class="d-block" cols="1">
          <v-avatar size="30">
            <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
          </v-avatar>
          <p class="d-inline ma-2">{{ displayName }}</p>
          <p>Home</p>
          <font-awesome-icon icon="fa-regular fa-bell" class="d-block mt-4"/>
          <font-awesome-icon icon="fa-regular fa-heart" class="d-block mt-4"/>
          <font-awesome-icon
              icon="fa-regular fa-comment"
              class="d-block mt-4"
          />

          <v-icon large color="blue darken-2" class="d-block mt-4">
            mdi-message-text
          </v-icon>

          <v-btn class="mt-3" @click="addData" dark elevation="12">Test</v-btn>
        </v-col>

        <v-col class="d-block justify-center ml-2 mr-2" cols="1">
          <h2 class="d-inline">messages</h2>
          <div v-for="n in 5" :key="n" class="mt-5">
            <v-btn class="justify-left" @click="friend">
              <v-badge
                  bordered
                  bottom
                  color="deep-purple green"
                  large
                  dot
                  offset-x="10"
                  offset-y="10"
              >
                <v-avatar size="40">
                  <v-img
                      src="https://cdn.vuetifyjs.com/images/lists/2.jpg"
                  ></v-img>
                </v-avatar>
              </v-badge>
            </v-btn>
          </div>
        </v-col>

        <v-col v-if="extend">
          <v-btn
              class="d-flex"
              v-for="index in 10"
              :key="index"
              style="width: 100%; height: 5%"
          >
            kurac
          </v-btn>
          <h1>MESSAAGES HERE</h1>
        </v-col>
        <v-col :cols="drag">
          <h1>Stories</h1>
          <div class="stories d-inline">
            <v-row>
              <v-col
                  class="justify-left d-flex mt-4 pa-0"
                  v-for="n in 4"
                  :key="n"
              >
                <div class="d-inline">
                  <v-avatar size="3vw" class="ma-1">
                    <h1>asdasd</h1>
                  </v-avatar>
                  <h1 class="ma"

                  <p class="d-flex justify-center">Leo m</p>
                </div>
              </v-col>
            </v-row>
            <h1>Posts</h1>
            <v-btn dark elevation-10 @click="DragPosts">test</v-btn>

            <v-card
                v-scroll.self="onScroll"
                class="overflow-y-auto pa-4"
                :max-height="widnowHeight"
            >
              <span v-scroll.self="onScroll"></span>
              <sweet-card v-for="index in 10" :key="index"></sweet-card>
            </v-card>
          </div>
        </v-col>
        <v-col style="text-align: center" cols="3">
          <h1>Feed</h1>
          <sweet-card class="ma-5"></sweet-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SweetCard from "@/components/SweetCard.vue";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {ref} from "firebase/database";
import {auth, db} from "../../firebase.js";
import {getStorage,} from "firebase/storage";
import "firebase/storage";
import {onAuthStateChanged} from "../../firebase";
import NewComtestponent from "@/views/NewComtestponent.vue";
import {getAuth} from "firebase/auth";

export default {
  data() {
    return {
      displayName: "username",
      // User Login Info
      userLoginStatus: false,
      userInfo: null,
      userEmail: null,

      drag: 2,
      extend: false,
      scrollInvoked: 0,
      widnowHeight: window.innerHeight,
    };
  },
  name: "main",
  components: {
    NewComtestponent,
    //components
    SweetCard,
  },
  mounted() {
    //debugger;
    this.GetUserStatus();
    this.GetUserDataFeed();
    //this.Debugging();

  },
  methods: {
    async Debugging() {
      // Create a reference to the file whose metadata we want to retrieve
      debugger;
      // TODO: SETUP STORAGE IMPORT IMAGE
      const storage = getStorage();
      const pathReference = ref(
          storage,
          "Users" + "/matosevic.leo@gmail.com/" + "ProfilePicture/profile.png"
      );
      console.log(pathReference);
    },
    DragPosts() {
      if (this.drag === 2)
        this.drag = 4;
      else
        this.drag = 2;
    },

    async GetUserDataFeed() {
      debugger;
      const docRef = doc(
          db,
          "Users",
          "UserNames",
          auth.currentUser.email,
          "Information"
      );
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // setup display name
        this.displayName = docSnap.data().displayName;
      } else {
        // docSnap.data() will be undefined in this case
        console.log("Unkown Users");
        await this.$router.push("/")
      }
    },
    GetUserStatus() {
      debugger;
      let auth = getAuth();
      let user = auth.currentUser;


      if (user) {
        this.userLoginStatus = true;
        this.userInfo = user;
        this.userEmail = user.email;

      } else {
        this.userLoginStatus = false;
      }


      console.log("->", this.userLoginStatus.toString());
      if (!this.userLoginStatus) {
        this.$router.push("/login")
      }

    },
    async addData() {
      await setDoc(
          doc(db, "Users", "UserNames", auth.currentUser.email, "testing"),
          {
            name: "Los Angeles",
            state: "CA",
            country: "USA",
          }
      );
    },
    friend() {
      if (this.extend == false) this.extend = true;
      else this.extend = false;
    },
    onScroll() {
      this.scrollInvoked++;
    },
  },
};
</script>

