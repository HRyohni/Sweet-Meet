<template>
  <v-container>
    <v-card >

      <Vue2InteractDraggable
          style="background-color: #ff7b92"
          v-if="soulMate.length !== 0"
          @draggedRight="draggedRight"
          @draggedLeft="draggedLeft"
          :interact-max-rotation="15"
          :interact-out-of-sight-x-coordinate="3000"
          :interact-x-threshold="500"
          :interact-lock-y-axis="true"
          :interact-lock-x-axis="isSwipeLocked"
      >


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
              v-for="(user, i) in this.soulMatePosts"
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
                  <v-img contain max-width="800" :src="user.PostUrl">
                    <v-app-bar
                        flat
                        style="background: linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(0,0,0,1) 100%);"
                        color="rgba(0, 0, 0, 0)"
                        class="pb-4"
                    >


                      <v-toolbar-title class="text-h6 white--text pl-0 ma-2 ">
                        <p class="d-inline font-weight-bold">{{ soulMate["FirstName"] }}</p>
                        <p class="d-inline font-weight-light"><b> {{ soulMate["age"] }} </b></p>
                        <div class="d-inline grey--text" v-if="currentUserData['lng'] && soulMate['lng']">
                          {{ usersDistance }}
                        </div>
                      </v-toolbar-title>


                      <v-spacer></v-spacer>

                      <v-menu
                          bottom
                          left
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                              dark
                              icon
                              v-bind="attrs"
                              v-on="on"
                          >
                            <v-icon>mdi-dots-vertical</v-icon>
                          </v-btn>
                        </template>

                        <v-list>
                          <v-list-item class="red--text">
                            <v-list-item-title>Report</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>

                    </v-app-bar>
                  </v-img>

                </div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>

        <v-list-item

        >
          <v-list-item-content>

            <div class="child-flex justify-center ma-3">
              <v-list color="white" rounded>
                <v-list-group
                    v-for="item in items"
                    :key="item.title"
                    v-model="item.active"
                    :prepend-icon="item.active ? arrowUp : arrowDown "
                    no-action
                >

                  <template v-slot:activator>
                    <v-list-item-content>

                      <v-list-item-title v-if="item.active">less</v-list-item-title>
                      <v-list-item-title v-if="!item.active">more</v-list-item-title>
                    </v-list-item-content>
                  </template>

                  <v-scale-transition>
                    <v-list-item
                        v-for="child in item.items"
                        :key="child.title"
                    >
                      <v-list-item-content>
                        <div>
                          <h1>About me</h1>
                          <p class="pa-2">{{ profileDescription }}</p>
                        </div>
                        <v-divider></v-divider>

                        <h1 class="ml-2">Interests</h1>
                        <div class="pa-2">
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
                        </div>

                        <v-divider></v-divider>

                        <h1 class="ml-2">Music</h1>
                        <div class="pa-2">
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
                        </div>
                        <v-divider></v-divider>

                        <h1 class="ml-2">Movies</h1>
                        <div class="pa-2">
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
                        </div>

                      </v-list-item-content>
                    </v-list-item>
                  </v-scale-transition>
                </v-list-group>
              </v-list>

            </div>
          </v-list-item-content>
        </v-list-item>

      </Vue2InteractDraggable>
      <v-overlay
          :value="closeOverly"
          class="d-flex justify-center"
      >
        <h1>You got Sweet Meet</h1>
        <v-btn
            class="justify-center"
            color="success"
            @click="closeOverly = false"
        >
          Great!
        </v-btn>
      </v-overlay>

    </v-card>
  </v-container>
</template>

<script>
import {Vue2InteractDraggable} from 'vue2-interact'
import {collection, doc, getDoc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import {auth, db} from "../../firebase";
import {onAuthStateChanged} from "firebase/auth";
import {mdiAccountHeart, mdiArrowLeft, mdiArrowRight, mdiArrowDownBold, mdiArrowUpBold} from '@mdi/js'
import SweetCard from "@/components/SweetCard.vue";

export default {
  components: {
    SweetCard,
    Vue2InteractDraggable
  },
  data: () => ({
    closeOverly: false,
    currentUserData: null,
    allUserNames: [],
    soulMate: [],
    soulMatePostsId: [],
    profileDescription: "",
    usersDistance: null,
    rejectedSoulmates: [],
    approvedSoulmates: [],

    items: [
      {
        action: mdiArrowDownBold,
        items: [{title: 'List Item'}],
        title: 'more',
      },
    ],

    imageUrl: "",
    userProfilePicture: "",
    // icons
    leftArrow: mdiArrowLeft,
    rightArrow: mdiArrowRight,
    heart: mdiAccountHeart,
    arrowDown: mdiArrowDownBold,
    arrowUp: mdiArrowUpBold,


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

    try {
      // Fetch current user data
      await this.fetchUserInformation();

      // Fetch Rejected and approved Soulmates
      await this.fetchStatusOfSoulmates();

      // Fetch all usernames
      await this.fetchAllUsers();

      // Find soulmate
      await this.findSoulMate();

      // Fetch soulmate posts
      await this.fetchPostsFromUser();

      // Calculate distance if both soulMate and currentUserData are available
      if (this.soulMate && this.currentUserData) {
        this.calculateDistance(this.soulMate["lat"], this.soulMate["lng"], this.currentUserData["lat"], this.currentUserData["lng"]);
      }

      await this.checkForMatchingSoulmates();

      this.userProfilePicture = this.getUserProfilePicture(this.userName);
    } catch (error) {
      console.error("An error occurred:", error);
    }
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

    async draggedRight() {
      //const x = event.clientX; // X coordinate
      await this.approveSoulmate();
      await this.checkForMatchingSoulmates();

      if (this.closeOverly === false) {
        const element = this.$el;
        setTimeout(() => {
          element.remove();

        }, 300);
      }
    },
    draggedLeft() {
      this.rejectSoulmate();
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

    async sendNewNotificationToUser(username, notificationMessage) {
      try {
        let notificationList = [];
        let reff = doc(
            db,
            "Users",
            "UserNames",
            username,
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
      try {
        for (let userName of this.allUserNames) {
          const collection = doc(db, "Users", "UserNames", userName, "Information");

          const userData = await getDoc(collection);
          if (this.currentUserData["UserAttractedToGender"] === userData.data()["UserGender"] && !this.rejectedSoulmates.includes(userData.data()["displayName"]) && !this.approvedSoulmates.includes(userData.data()["displayName"])) {
            this.soulMate = userData.data();       // TODO: ADD BREAK
            break;

          }
        }
        if (this.soulMate)
        {
          await this.getPostIDs(this.soulMate["displayName"]);
          await this.getUserProfilePicture(this.soulMate["displayName"]);
        }


      } catch (error) {
        console.log(error)
      }

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


    async createSoulmateDatabase() {
      await setDoc(doc(db, "Users", "UserNames", auth.currentUser.displayName, "Soulmate", "Dating", "Status"), {
        RejectedSoulmates: [],
        ApprovedSoulmates: [],
      });

    },

    async fetchStatusOfSoulmates() {

      let reff = doc(
          db,
          "Users",
          "UserNames",
          auth.currentUser.displayName,
          "Soulmate",
          "Dating",
          "Status",
      );

      const docSnap = await getDoc(reff);
      if (docSnap.exists()) {
        this.rejectedSoulmates = docSnap.data()["RejectedSoulmates"];
        this.approvedSoulmates = docSnap.data()["ApprovedSoulmates"];
      } else {
        console.log("nope");
        await this.createSoulmateDatabase();
        return null;

      }

    },
    async rejectSoulmate() {
      this.rejectedSoulmates.push(this.soulMate["displayName"])
      await setDoc(doc(db, "Users", "UserNames", auth.currentUser.displayName, "Soulmate", "Dating", "Status"), {
        RejectedSoulmates: this.rejectedSoulmates,
        ApprovedSoulmates: this.approvedSoulmates,
      });

    },

    async approveSoulmate() {
      this.approvedSoulmates.push(this.soulMate["displayName"])
      await setDoc(doc(db, "Users", "UserNames", auth.currentUser.displayName, "Soulmate", "Dating", "Status"), {
        RejectedSoulmates: this.rejectedSoulmates,
        ApprovedSoulmates: this.approvedSoulmates,
      });

    },

    async checkForMatchingSoulmates() {

      let reff = doc(db, "Users", "UserNames", auth.currentUser.displayName, "Soulmate", "Dating", "Status");
      console.log(auth.currentUser.displayName);
      const docSnapCurrentUser = await getDoc(reff);

      // this.soulMate["displayName"]
      let reff2 = doc(db, "Users", "UserNames", this.soulMate["displayName"], "Soulmate", "Dating", "Status");
      let docSnapSoulmate = await getDoc(reff2);

      if (docSnapCurrentUser.exists()) {
        if (docSnapSoulmate.data()["ApprovedSoulmates"].includes(auth.currentUser.displayName) && docSnapCurrentUser.data()["ApprovedSoulmates"].includes(this.soulMate["displayName"])) {
          await this.sendNewNotificationToUser(this.soulMate["displayName"], {
            username: auth.currentUser.displayName,
            comment: "you got match with " + auth.currentUser.displayName,
            FollowRequest: false
          });
          this.closeOverly = true
          await this.$router.push("/profile/" + this.soulMate["displayName"]);
        } else
          console.log("not matching");
      } else {
        console.log("nothing found");
      }

    },


    calculateDistance(lat1, lon1, lat2, lon2) {
      if (!lat1 && !lon1 && !lat2 && !lon2) {
        return null;
      }
      const earthRadius = 6371; // Radius of the Earth in kilometers

      // Convert latitude and longitude from degrees to radians
      const lat1Rad = this.toRadians(lat1);
      const lon1Rad = this.toRadians(lon1);
      const lat2Rad = this.toRadians(lat2);
      const lon2Rad = this.toRadians(lon2);

      // Haversine formula
      const dLat = lat2Rad - lat1Rad;
      const dLon = lon2Rad - lon1Rad;

      const a =
          Math.sin(dLat / 2) ** 2 +
          Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      // Calculate the distance in kilometers
      if (earthRadius * c < 1) {
        this.usersDistance = "less then kilometre";
        return "less then kilometre";
      }
      this.usersDistance = (earthRadius * c).toFixed(1) + " km";
      return ((earthRadius * c).toFixed(1) + " km");
    },
    toRadians(degrees) {
      return degrees * (Math.PI / 180);
    }

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





