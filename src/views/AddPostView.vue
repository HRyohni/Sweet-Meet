<template>
  <v-container fluid>
    <v-row class="d-flex justify-center ma-3">
      <v-col cols="6">
        <v-card class="ma-12 pa-10 mt-12"
                width="80%"
        >
          <h1>Add Image Here</h1>
          <sweet-card
              :debug-mod="false"
              :image-url="this.imageUrl"
              :user-name="this.displayName"
              :number-of-comments-on-post="23"
              :number-of-likes-on-post="123"
          ></sweet-card>

          <v-file-input
              v-model="selectedImage"
              accept="image/*"
              label="Select an image"
              @change="handleFileChange"
          ></v-file-input>

          <v-btn @click="UploadPost()" class="ma-3">Upload</v-btn>
        </v-card>
      </v-col>


    </v-row>

  </v-container>
</template>

<script>
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {auth, db, storage} from "../../firebase";
import SweetCard from "@/components/SweetCard.vue";
import {addDoc, collection, doc, updateDoc} from "firebase/firestore";

export default {
  components: {SweetCard},
  data: () =>
      ({
        displayName: auth.currentUser.displayName,
        selectedImage: "",
        imageUrl: "",
        downloadImageUrl: "",


      }),
  mounted() {
    console.log(this.getCurrentDate());
  },
  methods:
      {
        auth() {
          return auth
        },
        getCurrentDate() {
          return new Date().getDay() + "." + new Date().getMonth() + "." + new Date().getFullYear();
        },

        UploadPost() {

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
            console.log(this.imageUrl);
          }
        },


        async savePostUrl() {
          const docRef = await addDoc(collection(db, "Users","UserNames",this.displayName,"Posts","UserPosts"), {
           PostUrl: this.downloadImageUrl,
           NumberOfLikesOnPost: 0,
           NumberOfCommentsOnPost: 0,
           PostedDate: new Date(),
          });
          console.log("Document written with ID: ", docRef.id);
        },
      }

}
</script>

<style scoped>

</style>

