<template>
  <v-container>
    <v-card>
      <Vue2InteractDraggable
          style="background-color: #ff7b92; width: 800px"
          @draggedRight="draggedRight"
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
            height="1000"
            hide-delimiter-background
            show-arrows-on-hover
        >

          <template v-slot:prev="{ on, attrs }">
            <v-btn
                color="success"
                v-bind="attrs"
                v-on="on"
            >Previous slide
            </v-btn>
          </template>
          <template v-slot:next="{ on, attrs }">
            <v-btn
                color="info"
                v-bind="attrs"
                v-on="on"
            >Next slide
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
                  <v-img contain  max-width="800" :src="randomImageUrl(true)"></v-img>

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

export default {
  components: {
    Vue2InteractDraggable
  },
  data: () => ({

    imageUrl: "",
    userProfilePicture: "",


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
    goToProfile(username) {
      this.$router.push("/profile/" + username);
    },
  },
  randomImageUrl(debugMode) {
    if (debugMode)
      return "https://picsum.photos/id/" + Math.floor(Math.random() * 100) + "/1080/1920/";
    return this.imageUrl;
  },




 async  mounted() {

    await this.getPostData();
    this.userProfilePicture = await this.getUserProfilePicture(this.userName);

  }


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





