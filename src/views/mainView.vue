<template>
  <v-container class="d-flex ma-10 justify-center">
    <UploadPostComponent :dialog="dialog" ></UploadPostComponent>

    <v-row>
      <v-col cols="1">
        <div class=" ml-2 mt-2">
          <v-avatar  @click="goToProfilePage()" size="50">

            <v-img  :src="userProfilePicture"></v-img>
          </v-avatar>
          <p class="d-inline ma-2">{{ userName }}</p>

          <div>


            <NotificationMenuComponent></NotificationMenuComponent>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" @click="openMessageView" class="d-block mt-2" icon elevation="2" fab color="red">
                  <v-icon>{{ messageIcon }}</v-icon>
                </v-btn>
              </template>
              <span>Open Messages</span>
            </v-tooltip>



            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">

                <v-btn v-bind="attrs" v-on="on" @click="openDialog()" class="d-block mt-2" icon elevation="2" fab color="red">
                  <v-icon>{{ plusIcon }}</v-icon>
                </v-btn>
              </template>
              <span>Add Post</span>
            </v-tooltip>


            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" @click="signOut()" class="d-block mt-2" icon elevation="2" fab color="red">
                  <v-icon>{{ logoutIcon }}</v-icon>
                </v-btn>
              </template>
              <span>Sign out</span>
            </v-tooltip>

          </div>
        </div>
      </v-col>

      <v-col cols="6">
        <div class="d-inline" style="">
          <v-card
              style="width: fit-content"
              v-scroll.self="onScroll"
              color="white"
              class="overflow-y-auto "
          >
            <sweet-card
                v-for="(data, index) in friendsPosts"
                :key="index"
                :post-i-d="data.postId"
                :user-name="data.username"
                :is-swipe-locked="true"

                :is-dating-sweet-card="false"
            ></sweet-card>

          </v-card>

          <!--                    v-if="!friendsPosts" TODO:remove-->
          <v-overlay
              v-if="false"
              class="align-center justify-center"
          >
            <v-progress-circular
                color="red"

                indeterminate
                size="64"
            ></v-progress-circular>
          </v-overlay>

        </div>
      </v-col>


      <v-col width="100%" cols="4">
        <div class="d-flex justify-center">
          <sweet-card-dating
              style="width: 500px"
              :debug-mod="true"
              :is-swipe-locked="false"
              :is-dating-sweet-card="true"
          ></sweet-card-dating>


        </div>
      </v-col>

    </v-row>
  </v-container>


</template>

<script>
import SweetCard from "@/components/SweetCard.vue";
import {collection, doc, getDoc, getDocs} from "firebase/firestore";
import {ref} from "firebase/database";
import {auth, db} from "../../firebase.js";
import {getStorage,} from "firebase/storage";
import "firebase/storage";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {mdiBell, mdiLogout, mdiMessage, mdiPlus} from '@mdi/js'
import NotificationMenuComponent from "@/components/NotificationMenuComponent.vue";
import RecommendationFriends from "@/components/RecommendationFriends.vue";
import FollowSugestionComponent from "@/components/FollowSugestionComponent.vue";
import FollowButtonComponent from "@/components/FollowButtonComponent.vue";
import SweetCardDating from "@/components/SweetCardDatingComponent.vue";
import {signOut} from "../../firebase";
import UploadPostComponent from "@/components/UploadPostComponent.vue";

export default {
  data() {
    return {
      displayName: "username",
      // User Login Info
      userLoginStatus: false,
      userInfo: null,
      userEmail: null,
      userName: "",
      userProfilePicture: "",
      // icons
      notificationIcon: mdiBell,
      messageIcon: mdiMessage,
      plusIcon: mdiPlus,
      logoutIcon: mdiLogout,
      dialog: false,


      extend: false,
      scrollInvoked: 0,
      widnowHeight: window.innerHeight,


      // Sweet Cards
      AllPostsIdNames: "",

      // friends posts
      friendsPosts: null,
    };
  },


  components: {
    UploadPostComponent,
    SweetCardDating,
    FollowButtonComponent,
    FollowSugestionComponent,
    RecommendationFriends,
    NotificationMenuComponent,
    //components
    SweetCard,
  },
  async mounted() {
    await onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.userName = user.displayName;
        this.userProfilePicture = await this.getUserProfilePicture(this.userName)
        await this.showFollowingUsersPosts();
        // get data
        await this.getPostIDs();

        //debugger;
        this.GetUserStatus();
        await this.GetUserDataFeed();
        //this.Debugging();

      }
    });


  },
  methods: {
    auth() {
      return auth
    },
    async Debugging() {
      // Create a reference to the file whose metadata we want to retrieve

      // TODO: SETUP STORAGE IMPORT IMAGE
      const storage = getStorage();
      const pathReference = ref(
          storage,
          "Users" + auth.currentUser.displayName + "ProfilePicture/profile.png"
      );
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

    },

    friend() {
      if (this.extend === false) this.extend = true;
      else this.extend = false;
    },

    async getPostIDs() {
      const collectionSnapshot = await getDocs(collection(db, "Users", "UserNames", "yohni", "Posts", "UserPosts"));
      this.AllPostsIdNames = collectionSnapshot.docs.map(doc => doc.id);
    },

    async showFollowingUsersPosts() {
      const followingData = [];

      const userCollectionsRef = doc(db, "Users", "UserNames", auth.currentUser.displayName, "Information", "Followers", "Following");
      const followingUsersPosts = await getDoc(userCollectionsRef);

      for (const followingKey in followingUsersPosts.data().Following) {
        const collectionSnapshot = await getDocs(collection(db, "Users", "UserNames", followingUsersPosts.data().Following[followingKey], "Posts", "UserPosts"));
        for (const el of collectionSnapshot.docs) {
          const userPostDates = await getDoc(doc(db, "Users", "UserNames", followingUsersPosts.data().Following[followingKey], "Posts", "UserPosts", el.id));
          followingData.push({
            username: followingUsersPosts.data().Following[followingKey],
            postId: el.id,
            postDate: userPostDates.data().PostedDate.seconds,
          });
        }
      }

      // Convert postDate strings to timestamps  // sort by date
      for (const data of followingData) {
        data.postDate = parseInt(data.postDate);
      }

      // Sort the followingData array in ascending order by postDate
      followingData.sort((a, b) => a.postDate - b.postDate);

      //append to show
      this.friendsPosts = followingData;
      this.friendsPosts.reverse()
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

    async getUserProfilePicture(user) {
      const docRef = doc(db, "Users", "UserNames", user, "Information", "Profile", "Data");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data()["ProfilePictureUrl"];
      } else {
        console.log("error");
        return null;
      }
    },
    openDialog()
    {
      this.dialog = !this.dialog;

    }
  },
};


</script>


