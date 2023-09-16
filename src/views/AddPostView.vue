<template>
<div>
  <div class="ma-15">
    <v-btn icon color="red" elevation="5" >X</v-btn>
  </div>
  <div   class="pa-2 mt-15 d-flex justify-center " >

    <div class="" style="width: 500px">
      <v-card elevation="5">
        <Vue2InteractDraggable
            class="d-flex justify-center"
            style=" width: 100%"
            :interact-max-rotation="15"
            :interact-out-of-sight-x-coordinate="3000"
            :interact-x-threshold="500"
            :interact-lock-y-axis="true"
            :interact-lock-x-axis="true"
        >

          <div>
            <v-fab-transition>
              <v-img  v-if="imageUrl" contain max-width="500" :src="imageUrl"></v-img>
            </v-fab-transition>
            <v-img v-if="!imageUrl" contain max-width="500"
                   src="https://placehold.co/300x300?text=SweetMeet"></v-img>

            <v-container style="width: 500px" class="bg-surface-variant mt-2">
              <v-row no-gutters>
                <v-col style="text-align: left;">
                  <v-avatar class="">

                    <v-img :src="this.userProfilePicture"></v-img>
                  </v-avatar>

                  <p style="text-align: center;" class="d-inline pa-2">{{ this.displayName }}</p>
                </v-col>


                <v-col class=" font-weight-bold" style="text-align: center;">
                  <p class="">likes: 23 </p>
                </v-col>

                <v-col class="d-inline pa-2" style="text-align: right; ">
                  <v-btn icon>
                    <v-icon>{{ commentIcon }}</v-icon>
                  </v-btn>
                  <!--                  // TODO: Fix like-->
                  <v-btn icon class="ma-1" color="red">
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
      </v-card>
    </div>
    <v-card elevation="5" class="pa-4 "

            width="500"
    >
      <h1>Add Image Here</h1>

      <v-file-input
          v-model="selectedImage"
          accept="image/*"
          label="Select an image"
          @change="handleFileChange"
      ></v-file-input>


      <v-textarea
          v-model="postDescription"
          color="teal"
          outlined
      >
        <template v-slot:label>
          <div>
            Post description
          </div>
        </template>
      </v-textarea>
      <v-fab-transition>
        <v-card v-if="postDescription.length > 100" style="width: fit-content" elevation="2"
                class="white--text pa-2 d-flex justify-center" color="red" outlined> must be less then 100
          characters
        </v-card>
      </v-fab-transition>
      <div class="d-flex space-between">
        <v-btn color="red" outlined @click="goToFeed" class="ma-3">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="blue" outlined :disabled="postDescription.length > 100 || imageUrl.length === 0"
               @click="UploadPost()" class="ma-3">Upload
        </v-btn>
      </div>


    </v-card>

    <v-snackbar
        v-model="snackbar"
    >
      Image Uploaded!
      <template v-slot:action="{ attrs }">
        <v-btn
            color="pink"
            text
            v-bind="attrs"
            @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</div>
</template>

<script>
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {auth, db, storage} from "../../firebase";
import SweetCard from "@/components/SweetCard.vue";
import {addDoc, collection, doc, getDoc, updateDoc} from "firebase/firestore";
import {onAuthStateChanged} from "firebase/auth";
import {mdiComment, mdiHeart, mdiSend} from "@mdi/js";
import router from "@/router";

export default {
  components: {SweetCard},
  data: () =>
      ({
        displayName: auth.currentUser.displayName,
        selectedImage: "",
        imageUrl: "",
        downloadImageUrl: "",
        postDescription: "",
        userProfilePicture: "",
        snackbar: false,

        //icons
        heartIcon: mdiHeart,
        commentIcon: mdiComment,
        sendIcon: mdiSend,


      }),
  mounted() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.userProfilePicture = await this.getUserProfilePicture(user.displayName);
      } else {
        await this.$router.push("/login");
        // User is not authenticated, handle accordingly
        // For example, you might want to redirect to a login page
      }
    });

  },
  methods:
      {
        router() {
          return router
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
        auth() {
          return auth
        },
        getCurrentDate() {
          return new Date().getDay() + "." + new Date().getMonth() + "." + new Date().getFullYear();
        },

        UploadPost() {
          this.snackbar = !this.snackbar;

          this.imageUrl = this.selectedImage;


          const storageRef = ref(
              storage,
              "Users/" + this.displayName + "/Posts/" + new Date().getTime().toString()
          );

          // Upload the image to Firebase Storage
          uploadBytes(storageRef, this.selectedImage).then((snapshot) => {
            console.log("Upload complete!");

            // Get the download URL of the uploaded image
            getDownloadURL(snapshot.ref).then((url) => {
              this.downloadImageUrl = url;

              this.savePostUrl();
            }).catch((error) => {
              console.error("Error getting download URL:", error);
            });
          }).catch((error) => {
            console.error("Error uploading image:", error);
          });

        },

        handleFileChange() {
          if (this.selectedImage) {
            this.imageUrl = URL.createObjectURL(this.selectedImage);
          }
        },
        goToFeed() {
          this.$router.push("/login")
        },


        async savePostUrl() {
          const docRef = await addDoc(collection(db, "Users", "UserNames", this.displayName, "Posts", "UserPosts"), {
            PostUrl: this.downloadImageUrl,
            NumberOfLikesOnPost: 0,
            NumberOfCommentsOnPost: 0,
            PostedDate: new Date(),
            PostDescription: this.postDescription,
          });
          console.log("Document written with ID: ", docRef.id);
        },
      }

}
</script>

<style scoped>

</style>

