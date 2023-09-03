<template>
  <v-container>
    <v-card>

      <Vue2InteractDraggable
          style="background-color: #ff7b92"
          @draggedRight="draggedRight"
          :interact-max-rotation="15"
          :interact-out-of-sight-x-coordinate="3000"
          :interact-x-threshold="500"
          :interact-lock-y-axis="true"
          :interact-lock-x-axis="isSwipeLocked"
      >

        <v-list-item>

          <v-list-item-content>
            <v-list-item-title class="d-inline"><h1 class="d-inline">{{ this.soulMate["FirstName"] }}</h1>
              {{ this.soulMate["age"] }}
            </v-list-item-title>
            <v-list-item-subtitle>Distance: {{ this.soulMate["age"] }}</v-list-item-subtitle>
            <div class="child-flex justify-center">
              <v-list dark color="pink" rounded>
                <v-list-group
                    v-for="item in items"
                    :key="item.title"
                    v-model="item.active"
                    :prepend-icon="item.action"
                    no-action
                >

                  <template v-slot:activator>
                    <v-list-item-content>

                      <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item-content>
                  </template>

                  <v-scale-transition>
                    <v-list-item
                        v-for="child in item.items"
                        :key="child.title"
                    >
                      <v-list-item-content>
                        <v-card>
                          <v-card-title>Description</v-card-title>
                          <v-card-text>{{ profileDescription }}</v-card-text>
                        </v-card>

                          <h1 class="ml-2">Interests</h1>
                        <v-card  color="white" class="pa-2">
                          <div
                              v-for="(data, index) in soulMate['FavInterestType']"
                              :key="index"
                              class="d-inline"
                          >
                              <v-chip
                                  class="ma-2 "
                                  color="blue"
                                >
                                {{ data }}
                              </v-chip>
                          </div>
                        </v-card>


                        <h1 class="ml-2">Music</h1>
                        <v-card  color="white" class="pa-2">
                          <div
                              v-for="(data, index) in soulMate['FavMusicType']"
                              :key="index"
                              class="d-inline"
                          >
                            <v-chip
                                class="ma-1"
                                color="blue"
                                >
                              {{ data }}
                            </v-chip>
                          </div>
                        </v-card>

                        <h1 class="ml-2">Movies</h1>
                        <v-card  color="white" class="pa-2">
                          <div
                              v-for="(data, index) in soulMate['FavMovieType']"
                              :key="index"
                              class="d-inline"
                          >
                            <v-chip
                                class="ma-1"
                                color="blue"
                                >
                              {{ data }}
                            </v-chip>
                          </div>
                        </v-card>

                        <v-list-item-title v-text="child.title"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-scale-transition>
                </v-list-group>
              </v-list>

            </div>
          </v-list-item-content>


        </v-list-item>


        <!--      dating app-->
        <v-carousel
            v-if="isDatingSweetCard"
            cycle
            height="500"
            hide-delimiter-background
            show-arrows-on-hover
        >

          <template v-slot:prev="{ on, attrs }">
            <v-btn

                v-bind="attrs"
                v-on="on"
                icon>
              <v-icon>{{ leftArrow }}</v-icon>
            </v-btn>
          </template>
          <template v-slot:next="{ on, attrs }">
            <v-btn
                v-bind="attrs"
                icon
                v-on="on">
              <v-icon>{{ rightArrow }}</v-icon>
            </v-btn>
          </template>

          <v-carousel-item
              v-for="(slide, i) in this.soulMatePosts"
              :key="i"
          >
            <v-sheet
                :color="colors[i]"
                height="100%"
            >
              <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
              >
                <div class="text-h2">
                  <v-img contain max-width="800" :src="slide.PostUrl"></v-img>

                </div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>


      </Vue2InteractDraggable>
    </v-card>
  </v-container>
</template>

<script>
import {Vue2InteractDraggable} from 'vue2-interact'
import {collection, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc} from "firebase/firestore";
import {auth, db} from "../../firebase";
import firebase from "firebase/compat/app";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {mdiArrowLeft, mdiArrowRight, mdiAccountHeart} from '@mdi/js'
import SweetCard from "@/components/SweetCard.vue";

export default {
  components: {
    SweetCard,
    Vue2InteractDraggable
  },
  data: () => ({
    currentUserData: null,
    allUserNames: [],
    soulMate: [],
    soulMatePostsId: [],
    profileDescription: "",

    items: [
      {
        action: 'mdi-ticket',
        items: [{title: 'List Item'}],
        title: 'More Info',
      },
    ],

    imageUrl: "",
    userProfilePicture: "",
    // icons
    leftArrow: mdiArrowLeft,
    rightArrow: mdiArrowRight,
    heart: mdiAccountHeart,


    colors: [
      'indigo',
      'warning',
      'pink darken-2',
      'red lighten-1',
      'deep-purple accent-4',
    ],
    soulMatePosts: [],


  }),

  props: {
    // main data to catch all information
    postID: null,
    userName: null,
    // For debugging
    debugMod: false,
    // Dating system
    isSwipeLocked: true,
    isDatingSweetCard: false,
  },

  name: 'SweetCardDating',

  async mounted() {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        //console.log("user exists");
      }
    });

    //fetch current user data
    await this.fetchUserInformation();

    // fetch all user
    await this.fetchAllUsers(); // check rejected ones

    // find soulmate
    await this.findSoulMate();

    // fetch soulmate posts
    await this.fetchPostsFromUser();
    // find a user
    // fetch all images from user
    //fetch all data from user

    //await this.getPostData();

    this.userProfilePicture = this.getUserProfilePicture(this.userName);


  },

  methods: {
    async getPostData() {
      const docRef = doc(db, "Users", "UserNames", this.userName, "Posts", "UserPosts", this.postID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.imageUrl = docSnap.data()["PostUrl"];
      } else {
        console.log("Cant Find post!");
      }

    },

    randomImageUrl(debugMode) {
      if (debugMode)
        return "https://picsum.photos/id/" + Math.floor(Math.random() * 100) + "/1080/1920/";
      return this.imageUrl;
    },

    draggedRight() {
      //const x = event.clientX; // X coordinate
      //console.log(x);
      const element = this.$el;
      setTimeout(() => {
        element.remove();

      }, 300);

    },

    draggedLeft() {
      const element = this.$el;
      setTimeout(() => {
        element.remove();
      }, 300);
    },

    async getUserProfilePicture(user) {
      const docRef = doc(db, "Users", "UserNames", user, "Information", "Profile", "Data");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        this.profileDescription = docSnap.data()["ProfileDescription"];
        return docSnap.data()["ProfilePictureUrl"];
      } else {
        console.log("error");
        return null;

      }

    },

    async sendNewNotificationToUser(notificationMessage) {
      try {
        let notificationList = [];
        let reff = doc(
            db,
            "Users",
            "UserNames",
            this.userName,
            "Notification"
        );

        // Fetch data
        const docSnap = await getDoc(reff);

        if (docSnap.exists()) {
          // Ensure Notifications field exists in docSnap data
          if (docSnap.data() && docSnap.data().Notifications) {
            // Get existing notifications
            notificationList = docSnap.data().Notifications;
            notificationList.push(notificationMessage);
          } else {
            console.log("No existing notifications field found.");
          }
        } else {
          console.log("No New Notifications");
        }

        let informationData = {
          Notifications: notificationList,
        };

        await updateDoc(reff, informationData);
      } catch (error) {
        console.error("Error sending new notification:", error);
      }
    },

    async fetchUserInformation() {
      const collection = doc(db, "Users", "UserNames", auth.currentUser.displayName, "Information");
      const currentUser = await getDoc(collection);
      this.currentUserData = currentUser.data();
    },

    async fetchAllUsers() {
      const collection = doc(db, "Users", "UserNames");
      const userNames = await getDoc(collection);
      this.allUserNames = userNames.data()["ListOfAllUsernames"];
    },

    async findSoulMate() {
      for (let userName of this.allUserNames) {

        const collection = doc(db, "Users", "UserNames", userName, "Information");
        const userData = await getDoc(collection);

        if (this.currentUserData["UserAttractedToGender"] === userData.data()["UserGender"]) {
          this.soulMate = userData.data();       // TODO: ADDD BREAK
        }
      }
      await this.getPostIDs(this.soulMate["displayName"]);
      await this.getUserProfilePicture(this.soulMate["displayName"]);
    },

    async getPostIDs(username) {
      const collectionSnapshot = await getDocs(collection(db, "Users", "UserNames", username, "Posts", "UserPosts"));
      this.soulMatePostsId = collectionSnapshot.docs.map(doc => doc.id);
    },

    async fetchPostsFromUser() {

      for (let PostId of this.soulMatePostsId) {
        const docRef = doc(db, "Users", "UserNames", this.soulMate["displayName"], "Posts", "UserPosts", PostId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists())
          this.soulMatePosts.push(docSnap.data());

        else {
          console.log("error");
          return null;
        }

      }

    },

  },


};


</script>

<style scoped>
.cardTran {
  opacity: 0;

}

.card {


}

.comment {
  background-color: grey;
  width: 100%;
  border-radius: 20px;
  height: 100%;
}


.bottomText {
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;

  color: rgb(235, 235, 235);
  border-radius: 0px 0px 20px 20px;

}

@keyframes animate-pop {
  0% {
    opacity: 0;
    transform: scale(0.5, 0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1, 1);
  }
}

.Vue2InteractDraggable {
  animation-duration: 0.5s;
  animation-name: animate-fade;
  animation-delay: 0.5s;
  animation-fill-mode: backwards;
}


@keyframes animate-fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

</style>





