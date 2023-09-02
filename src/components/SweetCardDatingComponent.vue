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
            <v-list-item-title>John Leider</v-list-item-title>
            <v-list-item-subtitle>Author</v-list-item-subtitle>
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

                        <div class="d-flex justify-center">
                          <div>
                            <h1>info about user</h1>
                          </div>
                        </div>
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
              v-for="(slide, i) in slides"
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
                  <v-img contain max-width="800" :src="randomImageUrl(true)"></v-img>

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
import {getAuth} from "firebase/auth";
import {mdiArrowLeft, mdiArrowRight, mdiAccountHeart} from '@mdi/js'

export default {
  components: {
    Vue2InteractDraggable
  },
  data: () => ({
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
    slides: [
      'First',
      'Second',
      'Third',
      'Fourth',
      'Fifth',
    ],


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
    // find a user
    // fetch all images from user
    //fetch all data from user

    //await this.getPostData();


    this.userProfilePicture = await this.getUserProfilePicture(this.userName);

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

    async fetchImagesFromUser() {
      // fix later
      await this.getPostIDs()

      console.log("asd")
      console.log("wata fak")
      const docRef = doc(db, "Users", "UserNames", this.userName, "Posts", "UserPosts", "Data");
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data(), ",--");
      if (docSnap.exists()) {
        console.log(docSnap.data(), ",--");

      } else {

        console.log("error");
        return null;

      }

    },

    async getPostIDs() {
      const collectionSnapshot = await getDocs(collection(db, "Users", "UserNames", "yohni", "Posts", "UserPosts"));
      this.AllPostsIdNames = collectionSnapshot.docs.map(doc => doc.id);
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





