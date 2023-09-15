<template>
  <v-container>
    <v-card width="" class="d-flex justify-center">
      <v-row>

        <v-col  ref="mojElement">
          <Vue2InteractDraggable
              class="d-flex justify-center"
              style=" width: 100%"
              @draggedRight="draggedRight"
              :interact-max-rotation="15"
              :interact-out-of-sight-x-coordinate="3000"
              :interact-x-threshold="500"
              :interact-lock-y-axis="true"
              :interact-lock-x-axis="isSwipeLocked"
          >

            <!--  Social media-->
            <div v-if="!isDatingSweetCard">
              <v-scroll-y-transition style="height: 200px">
                <div v-if="false" class="comment pa-4 ma-2">  <!--Comment section-->
                  <div>
                    <v-avatar class="d-inline">

                    </v-avatar>
                    <div>username:</div>
                    <div>comment</div>
                  </div>

                  <div>
                    <v-text-field
                        class="d-inline-flex"
                        label="Leave a comment">
                    </v-text-field>
                    <v-btn class="d-inline-flex">send</v-btn>
                  </div>


                  <v-btn icon dark @click="openOrCloseComments()">
                    <v-icon>{{ commentIcon }}</v-icon>
                  </v-btn>
                </div>
              </v-scroll-y-transition>


              <!--      image section-->


              <v-scroll-y-transition style="background-color: aqua;" class="align-center">
                <v-img contain max-width="500" :src="randomImageUrl(debugMod)">

                  <!--    COMMENTS SYSTEM-->


                </v-img>

              </v-scroll-y-transition>
              <v-container style="width: 500px" class="bg-surface-variant mt-2">
                <v-row no-gutters>
                  <v-col style="text-align: left;">
                    <v-avatar class="" @click="goToProfile(userName)">

                      <v-img :src="this.userProfilePicture"></v-img>
                    </v-avatar>

                    <p style="text-align: center;" class="d-inline pa-2"> {{ userName }} </p>
                  </v-col>


                  <v-col class=" font-weight-bold" style="text-align: center;">
                    <p class="">likes: {{ this.numberOfLikesOnPost }} </p>
                  </v-col>

                  <v-col class="d-inline pa-2" style="text-align: right; ">
                    <v-btn icon @click="openOrCloseComments()">
                      <v-icon>{{ commentIcon }}</v-icon>
                    </v-btn>
                    <!--                  // TODO: Fix like-->
                    <v-btn icon class="ma-1" :color="this.isLikedPost" @click="likeBtn()">
                      <v-icon>{{ heartIcon }}</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
                <div v-if="postDescription">
                  {{ postDescription }}
                </div>
              </v-container>
            </div>
          </Vue2InteractDraggable>
        </v-col>


        <v-col  ref="mojColumn" v-if="isCommentWindowOpen">
          <v-expand-transition>
            <div style=" background-color: #51A6F5">


              <v-card height="500" class="pa-5 overflow-y-auto"
                      style="width: auto;  background-color: #f3f3f3; color: black; ">
                <div>
                  <p>Comments: {{ this.numberOfCommentsOnPost }}</p>
                  <div class="d-flex justify-center " v-if="this.existingCommentsOnPost[0] == null">
                    <p style="text-align: center; font-size: 20px">Be first to leave a comment</p>
                  </div>
                  comment:
                  <div style=" width: 100%" class="">
                    <v-row>
                      <v-col>
                        <v-text-field
                            height="50px"
                        outlined
                        v-model="newComment"
                        class="d-inline justify-end"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="2">
                        <v-btn elevation="1" icon dark @click="addNewComment()">
                          <v-icon color="black">{{ sendIcon }}</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </div>


                  <div class="d-flex mt-2"

                       v-for="(data, index) in this.existingCommentsOnPost[0]"
                       :key="index">

                    <v-avatar class="">
                      <v-img :src="data.UserProfilePicture"></v-img>
                    </v-avatar>
                    <v-col class="ml-2" style="font-size: 0.8vw">

                      <v-row>{{ data.UserName }}</v-row>

                      <v-row>{{ data.Comment }}</v-row>
                      <v-row>
                        <v-divider></v-divider>
                      </v-row>

                    </v-col>

                  </div>


                </div>
                <v-divider class="mt-4"></v-divider>

              </v-card>
            </div>
          </v-expand-transition>
        </v-col>
      </v-row>
    </v-card>


  </v-container>
</template>

<script>
import {Vue2InteractDraggable} from 'vue2-interact'
import {collection, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc} from "firebase/firestore";
import {auth, db} from "../../firebase";
import firebase from "firebase/compat/app";
import {getAuth} from "firebase/auth";
import {mdiHeart, mdiComment, mdiSend} from "@mdi/js";

export default {
  components: {
    Vue2InteractDraggable
  },
  data: () => ({
    numberOfLikesOnPost: "",
    //icons
    heartIcon: mdiHeart,
    commentIcon: mdiComment,
    sendIcon: mdiSend,
    // For Post Data
    imageUrl: "",
    numberOfCommentsOnPost: 0,
    userProfilePicture: "",
    postDescription: "",

    //comment system
    isCommentWindowOpen: false,
    newComment: "",
    existingCommentsOnPost: [],

    // Like system
    isLikedPost: "grey",

    // dating app

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
heightOfElement: 0,

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

  name: 'SweetCard',
  methods: {
    async getPostData() {
      const docRef = doc(db, "Users", "UserNames", this.userName, "Posts", "UserPosts", this.postID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.numberOfCommentsOnPost = docSnap.data()["NumberOfCommentsOnPost"];
        this.numberOfLikesOnPost = docSnap.data()["NumberOfLikesOnPost"];
        this.imageUrl = docSnap.data()["PostUrl"];
        this.postDescription = docSnap.data()["PostDescription"];
      } else {
        console.log("Cant Find post!");
      }

    },

    randomImageUrl(debugMode) {
      if (debugMode)
        return "https://picsum.photos/id/" + Math.floor(Math.random() * 100) + "/1080/1920/";
      return this.imageUrl;
    },

    openOrCloseComments() {
      this.isCommentWindowOpen = !this.isCommentWindowOpen;
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

    async likeBtn() {

      // Put +1 for likes
      const reff = doc(
          db,
          "Users",
          "UserNames",
          this.userName,
          "Posts",
          "UserPosts",
          this.postID
      );

      // save post as liked on personal firebase account
      if (!await this.isPostAlreadyLiked()) {
        await setDoc(doc(db, "Users", "UserNames", auth.currentUser.displayName, "Posts", "LikedPosts", this.postID), {
          LikedPost: true,
        });


        const InformationData = {NumberOfLikesOnPost: this.numberOfLikesOnPost + 1};
        await updateDoc(reff, InformationData);
        this.numberOfLikesOnPost += 1;

        // change btn color
        this.isLikedPost = "red";
        // Send Notification
        await this.sendNewNotificationToUser({
          username: auth.currentUser.displayName,
          comment: auth.currentUser.displayName + " liked your post!"
        });

      } else {

        await setDoc(doc(db, "Users", "UserNames", auth.currentUser.displayName, "Posts", "LikedPosts", this.postID), {
          LikedPost: false,
        });

        const InformationData = {NumberOfLikesOnPost: this.numberOfLikesOnPost - 1};
        await updateDoc(reff, InformationData);
        this.numberOfLikesOnPost -= 1;

        // change btn color
        this.isLikedPost = "grey";

      }


    },

    async addNewComment() {
      console.log(this.newComment);
      if (this.newComment !== "") {
        const reff = doc(
            db,
            "Users",
            "UserNames",
            this.userName,
            "Posts",
            "UserPosts",
            this.postID
        );
        // Get users profile picture
        const usersProfilePictureUrl = await this.getUserProfilePicture(auth.currentUser.displayName);

        // Fetch existing data from the document
        const docSnap = await getDoc(reff);
        const postData = docSnap.data();

        // Initialize the Comments array if it doesn't exist or is not an array
        if (!Array.isArray(postData.Comments)) {
          postData.Comments = [];
        }

        // Append the new comment to the existing comments
        const newComment = {
          UserName: auth.currentUser.displayName,
          Comment: this.newComment,
          CommentId: new Date(),
          UserProfilePicture: usersProfilePictureUrl,
        };
        postData.Comments.push(newComment);

        const InformationData = {
          NumberOfCommentsOnPost: postData.NumberOfCommentsOnPost + 1, // Update comment count
          Comments: postData.Comments, // Update comments array
        };

        // Update the Firestore document
        await updateDoc(reff, InformationData);

        // Update the local comment count
        this.numberOfCommentsOnPost = postData.NumberOfCommentsOnPost + 1;
      } else {
        console.log("Write something before sending.");
      }
      // Clear input
      this.newComment = '';
      // Send Notification
      await this.sendNewNotificationToUser({
        username: auth.currentUser.displayName,
        comment: auth.currentUser.displayName + " commented your post!"
      });

      await this.getComments();
    },


    async getComments() {
      this.existingCommentsOnPost = [];
      const reff = doc(
          db,
          "Users",
          "UserNames",
          this.userName,
          "Posts",
          "UserPosts",
          this.postID
      );

      // Fetch existing data from the document
      const docSnap = await getDoc(reff);
      const postData = docSnap.data();
      this.test1 = docSnap.data();
      this.existingCommentsOnPost.push(postData.Comments)
      console.log(this.existingCommentsOnPost.reverse());

    },


    async getDataFromFirebasePost(DataName) {     // TODO: Fix this fucntion giving wrong output
      const docRef = doc(db, "Users", "UserNames", this.userName, "Posts", "UserPosts", this.postID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data()[DataName];
      } else {
        console.log("Can't find post!");
        return null;
      }
    },
    async isPostAlreadyLiked() {

      const docRef = doc(db, "Users", "UserNames", auth.currentUser.displayName, "Posts", "LikedPosts", this.postID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        if (docSnap.data()["LikedPost"]) {
          this.isLikedPost = "red"
        } else {
          this.isLikedPost = "grey"
        }
        return docSnap.data()["LikedPost"];
      } else {
        return null;

      }
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

    async reportUser() {
      let reff2 = doc(db, "Users", "UserNames", this.userName, "Report");
      let docSnapSoulmate = await getDoc(reff2);

      let reportList = docSnapSoulmate.data()["Reports"];
      if (!reportList.includes(auth.currentUser.displayName)) {
        reportList.push(auth.currentUser.displayName);
        await setDoc(reff2, {
          Reports: reportList,
        });

      }
    },
  },


  // dating Card   --->



  async mounted() {
    getAuth();
    // get random user based on similarity
    await this.getPostData();
    await this.getComments();
    await this.isPostAlreadyLiked()
    this.userProfilePicture = await this.getUserProfilePicture(this.userName);
  },
};


</script>

<style scoped>
.cardTran {
  opacity: 0;

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





