<template>
  <div class="data d-flex justify-center">
    <v-card class="pa-12 ma-12" width="1000px" elevation="10" v-if="step == 1">
      <h3>What is yor Gender?</h3>
      <v-select
          :items="genders"
          label="Pick Gender"
          v-model="UserGender"
      ></v-select>
      <h3>What are you atracted to?</h3>

      <v-select
          :items="genders"
          label="Pick Gender"
          v-model="UserAttractedToGender"
      ></v-select>
      <v-text-field
          label="What is your age?"
          :rules="rules"
          hide-details="auto"
          v-model="age"
      ></v-text-field>

      <v-btn class="ma-5" @click="nextStep"> next</v-btn>
    </v-card>

    <v-card class="pa-12 ma-12" width="1000px" elevation="10" v-if="step == 2">
      <v-card-title>Chose your music taste</v-card-title>
      <v-chip
          class="ml-3 mt-3"
          link
          outlined
          light
          :class="{ green: music.isActive }"
          v-for="(music, index) in musicType"
          :key="index"
          v-model="musics"
          @click="checkedMusic(index)"
      >{{ music.label }}
      </v-chip
      >
      <v-spacer></v-spacer>
      <v-divider class="mt-12"></v-divider>

      <v-card-title>Chose your movie taste</v-card-title>
      <v-chip
          class="ml-3 mt-3"
          link
          outlined
          light
          :class="{ green: movie.isActive }"
          v-for="(movie, index) in movieType"
          :key="index"
          @click="checkedMovie(index)"
      >{{ movie.label }}
      </v-chip
      >

      <v-spacer></v-spacer>
      <v-btn class="ma-5" @click="backStep"> back</v-btn>
      <v-btn class="ma-5" @click="nextStep()"> next</v-btn>
    </v-card>

    <v-card class="pa-12 ma-12" width="1000px" elevation="10" v-if="step == 3">
      <v-card-title>Location</v-card-title>

      <div id="app">
        <GmapMap
            :center="center"
            :zoom="18"
            map-style-id="roadmap"
            :options="mapOptions"
            style="width: 100vmin; height: 50vmin"
            ref="mapRef"
            @click="handleMapClick"
        >
          <GmapMarker
              :zoom="2"
              :position="marker.position"
              :clickable="true"
              :draggable="true"
              @drag="handleMarkerDrag"
              @click="panToMarker"
          />
        </GmapMap>
        <v-btn @click="geolocate"> Detect Location</v-btn>
        <p>Selected Position: {{ marker.position }}</p>
      </div>
      <v-btn class="ma-5" @click="backStep"> back</v-btn>
      <v-btn class="ma-5" @click="nextStep()"> next</v-btn>
    </v-card>

    <v-card class="pa-12 ma-12" width="1000px" elevation="10" v-if="step == 4">
      <v-card-title> Setup your profile picture</v-card-title>

      <v-file-input ref="myfile" type="file" v-model="imageUrl"></v-file-input>
      <v-btn class="ma-5" @click="backStep"> back</v-btn>
      <v-btn
          class="ma-5"
          color="primary"
          @click="nextStep(), UploadImageToStorage(), addInfo()"
      >
        Done
      </v-btn
      >
    </v-card>
  </div>
</template>

<script>
import {faMapMarked} from "@fortawesome/free-solid-svg-icons";
import {auth, db, storage, getDoc} from "../../firebase.js";
import {ref, uploadBytes} from "firebase/storage";

import {doc, updateDoc} from "firebase/firestore";
import {onMounted} from 'vue';

export default {
  data: () => ({
    marker: {position: {lat: 10, lng: 10}},
    center: {lat: 10, lng: 10},
    mapOptions: {
      disableDefaultUI: true,
    },
    google: null,

    genders: ["Male", "Female", "other"],
    UserGender: "",
    UserAttractedToGender: "",
    age: null,
    musics: null,

    musicType: [
      {label: "Jazz", isActive: false},
      {label: "Folk music", isActive: false},
      {label: "Rock", isActive: false},
      {label: "Rhythm and blues", isActive: false},
      {label: "Metal", isActive: false},
      {label: "Pop music", isActive: false},
      {label: "Indie rock", isActive: false},
      {label: "Techno", isActive: false},
      {label: "Classical music", isActive: false},
      {label: "Country music", isActive: false},
      {label: "Popular music", isActive: false},
      {label: "Alternative", isActive: false},
      {label: "Punk", isActive: false},
      {label: "Disco", isActive: false},
      {label: "Soul music", isActive: false},
      {label: "Music of Latin America", isActive: false},
      {label: "Hip hop", isActive: false},
      {label: "Blues", isActive: false},
      {label: "Electronic", isActive: false},
      {label: "Reggae", isActive: false},
      {label: "Jazz fusion", isActive: false},
      {label: "Ambient", isActive: false},
      {label: "EDM", isActive: false},
    ],

    movieType: [
      {label: "Action", isActive: false},
      {label: "Adventure", isActive: false},
      {label: "Comedy", isActive: false},
      {label: "Drama", isActive: false},
      {label: "Horror", isActive: false},
      {label: "Romance", isActive: false},
      {label: "Science fiction", isActive: false},
      {label: "Fantasy", isActive: false},
      {label: "Historical", isActive: false},
      {label: "Crime", isActive: false},
    ],
    selected: false,
    value: 30,
    rules: [(v) => v >= 18 || "Over 18 Allowed"],
    step: -1,
    imageUrl: "",
    email: "",
    chipColor: "default",
    PictureUrl: null,
  }),
  mounted() {
    console.log(auth.currentUser);
    this.email = auth.currentUser.email;
    this.CheckInformationStatus();
  },
  created() {
    console.log(this.email);
    this.step = 1;
  },
  methods: {
    //detects location from browser
    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.marker.position = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.panToMarker();
      });
    },
    //sets the position of marker when dragged
    handleMarkerDrag(e) {
      this.marker.position = {lat: e.latLng.lat(), lng: e.latLng.lng()};
    },
    //Moves the map view port to marker
    panToMarker() {
      /* this.$refs.mapRef.panTo(this.marker.position);
      this.$refs.mapRef.$mapPromise.then((map) => {
        map.setZoom(10000);
      });*/
    },

    //Moves the marker to click position on the map
    handleMapClick(e) {
      this.marker.position = {lat: e.latLng.lat(), lng: e.latLng.lng()};
      console.log(e);
    },

    // TODO: https://github.com/pespantelis/vue-location-picker google maps
    // https://stackblitz.com/github/googlemaps/js-samples/tree/sample-add-map?file=index.html

    nextStep() {
      this.step = this.step + 1;
    },
    backStep() {
      if (this.step > 1) this.step = this.step - 1;
    },

    UploadImageToStorage() {
      console.log("uplodaing..." + this.imageUrl);
      const storageRef = ref(
          storage,
          "Users/" + this.email + "/ProfilePicture/profile"
      );
      uploadBytes(storageRef, this.imageUrl).then(console.log("done!"));
    },
    CheckInformationStatus() {


      const docRef = doc(db,
          "Users",
          "UserNames",
          this.email,
          "Information");

      const docSnap = getDoc(docRef);

      if (docSnap) {
        if (docSnap.data().InformationComplete) {
          console.log("information done!");
          this.$router.push("/");
        }


      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      this.step = 1;
      console.log("asdasd");
    },

    async addInfo() {
      // for music
      let FavoriteMusicType = [];
      this.musicType.forEach((el) => {
        if (el.isActive) FavoriteMusicType.push(el.label);
      });
      // for movies
      let FavoriteMovieType = [];
      this.movieType.forEach((el) => {
        if (el.isActive) FavoriteMovieType.push(el.label);
      });

      const reff = doc(
          db,
          "Users",
          "UserNames",
          this.email,
          "Information"
      );
      const InformationData = {
        UserGender: this.UserGender,
        UserAttractedToGender: this.UserAttractedToGender,
        age: this.age,
        lat: this.marker.position.lat,
        lng: this.marker.position.lng,
        FavMusicType: FavoriteMusicType,
        FavMovieType: FavoriteMovieType,
        InformationComplete: true,
      };

      await updateDoc(reff, InformationData);
      this.$router.push("/");
    },


    checkedMusic(index) {
      console.log(this.musicType[index].isActive);
      this.musicType[index].isActive = !this.musicType[index].isActive;
    },

    checkedMovie(index) {
      //this.musicType[index].isActive = !this.musicType[index].isActive;
      this.movieType[index].isActive = !this.movieType[index].isActive;
    },

    async GetDisplayName() {
      const docRef = doc(
          db,
          "Users",
          "UserNames",
          auth.currentUser.email,
          "Information"
      );

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        this.displayName = docSnap.data().displayName
      } else {
        // docSnap.data() will be undefined in this case
        console.log("DisplayName Error");
      }
    },
  },
};
</script>

<style scoped>
.test.active {
  color: red; /* Change the color to your desired value */
}

.data {
  background-color: white;
}

.data h1 {
  text-align: center;
  background-color: white;
}

* {
  background-color: white;
}
</style>
