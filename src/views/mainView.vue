<template>

  <div class="d-flex">
    <v-row>
      <v-col cols="4">
        <v-row  class="mt-10">
          <v-col cols="2" style="width: fit-content">
            <div class=" ml-2 mt-2">
              <v-avatar size="50">
                <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
              </v-avatar>
              <p class="d-inline ma-2">{{ displayName }}</p>
              <div>
                <NotificationMenuComponent></NotificationMenuComponent>

                <v-btn class="d-block mt-2" icon elevation="2" fab color="red">
                  <v-icon>{{ messageIcon }}</v-icon>
                </v-btn>

                <v-btn class="d-block mt-2" icon elevation="2" fab color="red">
                  <v-icon>{{ plusIcon }}</v-icon>
                </v-btn>

                <v-btn class="d-block mt-2" icon elevation="2" fab color="red">
                  <v-icon>{{ logoutIcon }}</v-icon>
                </v-btn>


              </div>
            </div>
          </v-col>



        </v-row>
      </v-col>


      <v-col>
        <div class="d-flex flex-column">
          <v-card style="width: fit-content" class="  d-flex ">
            <div class="ma-2"
                 v-for="n in 5"
                 :key="n">
              <v-avatar color="green" size="3vw" class="ma-1"></v-avatar>
              <p class="">Leo m</p>
            </div>
          </v-card>

          <v-row class="ma-5  justify-lg-space-around">
            <v-col cols="5" class="overflow-y-auto">
              <div class=" d-inline">
                <v-card
                    max-height="50%"
                    v-scroll.self="onScroll"
                    class="overflow-y-auto "

                >
                  <sweet-card
                      v-for="(data, index) in AllPostsIdNames"
                      :key="index"
                      :post-i-d="data"
                      user-name="yohni"
                      :is-swipe-locked="true"
                      :is-dating-sweet-card="false"
                  ></sweet-card>
                </v-card>
              </div>
            </v-col>

            <v-col class="justify-end" cols="5" style="text-align: center">
              <sweet-card
                  v-for="(data, index) in AllPostsIdNames"
                  :key="index"
                  :post-i-d="data"
                  user-name="yohni"
                  :is-swipe-locked="false"
                  :is-dating-sweet-card="true"
              ></sweet-card>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </div>


</template>

<script>
import SweetCard from "@/components/SweetCard.vue";
import {collection, doc, getDoc, getDocs, setDoc} from "firebase/firestore";
import {ref} from "firebase/database";
import {auth, db} from "../../firebase.js";
import {getStorage,} from "firebase/storage";
import "firebase/storage";
import {onAuthStateChanged} from "../../firebase";
import NewComtestponent from "@/views/NewComtestponent.vue";
import {getAuth} from "firebase/auth";
import MessageSystemComponent from "@/components/MessageSystemComponent.vue";
import {mdiBell, mdiMessage, mdiPlus, mdiLogout} from '@mdi/js'
import NotificationMenuComponent from "@/components/NotificationMenuComponent.vue";

export default {
  data() {
    return {
      displayName: "username",
      // User Login Info
      userLoginStatus: false,
      userInfo: null,
      userEmail: null,
      notificationIcon: mdiBell,
      messageIcon: mdiMessage,
      plusIcon: mdiPlus,
      logoutIcon: mdiLogout,

      drag: 4,
      extend: false,
      scrollInvoked: 0,
      widnowHeight: window.innerHeight,

      // Sweet Cards
      AllPostsIdNames: "",
    };
  },
  name: "main",


  components: {
    NotificationMenuComponent,
    MessageSystemComponent,
    NewComtestponent,
    //components
    SweetCard,
  },
  mounted() {
    // get data
    this.getPostIDs()

    console.log(auth);
    //debugger;
    this.GetUserStatus();
    this.GetUserDataFeed();
    //this.Debugging();

  },
  methods: {
    async Debugging() {
      // Create a reference to the file whose metadata we want to retrieve

      // TODO: SETUP STORAGE IMPORT IMAGE
      const storage = getStorage();
      const pathReference = ref(
          storage,
          "Users" + auth.currentUser.displayName + "ProfilePicture/profile.png"
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

      const docRef = doc(
          db,
          "Users",
          "UserNames",
          auth.currentUser.displayName,
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

    friend() {
      if (this.extend === false) this.extend = true;
      else this.extend = false;
    },

    async getPostIDs() {
      const collectionSnapshot = await getDocs(collection(db, "Users", "UserNames", "yohni", "Posts", "UserPosts"));
      this.AllPostsIdNames = collectionSnapshot.docs.map(doc => doc.id);
    },

    onScroll() {
      this.scrollInvoked++;
    },
  },
};
</script>

<style scoped>

</style>

