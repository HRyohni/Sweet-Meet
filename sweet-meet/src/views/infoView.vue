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
      <v-btn class="ma-5" @click="kreni"> oblak</v-btn>
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
        @click="checkedChip(index)"
        >{{ music.label }}</v-chip
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
        >{{ movie.label }}</v-chip
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
        <v-btn @click="geolocate"> Detect Location </v-btn>
        <p>Selected Position: {{ marker.position }}</p>
      </div>
      <v-btn class="ma-5" @click="backStep"> back</v-btn>
      <v-btn class="ma-5" @click="nextStep()"> next</v-btn>
   
    </v-card>

    <v-card class="pa-12 ma-12" width="1000px" elevation="10" v-if="step == 4">
      <div>
        <!-- slot for parent component to activate the file changer -->
        <div @click="launchFilePicker()">
          <slot name="activator"></slot>
        </div>
        <!-- image input: style is set to hidden and assigned a ref so that it can be triggered -->
        <input
          type="file"
          ref="file"
          :name="uploadFieldName"
          @change="onFileChange($event.target.name, $event.target.files)"
          style="display: none"
        />
        <!-- error dialog displays any potential error messages -->
        <v-dialog v-model="errorDialog" max-width="300">
          <v-card>
            <v-card-text class="subheading">{{ errorText }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="errorDialog = false" flat>Got it!</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <v-btn class="ma-5" @click="nextStep"> next</v-btn>
      <v-file-input truncate-length="15" v-model="PictureUrl"></v-file-input>

      <input type="file" ref="myfile" />
     
      <v-btn class="ma-5" @click="nextStep() , UploadImageToStorage() , addInfo()"> Done</v-btn>
  
    </v-card>
  </div>
</template>

<script>
import { faMapMarked } from "@fortawesome/free-solid-svg-icons";
import { auth, db, doc, setDoc,storage } from "../../firebase.js";
import { ref, uploadBytes } from "firebase/storage";

export default {
  data: () => ({
    marker: { position: { lat: 10, lng: 10 } },
    center: { lat: 10, lng: 10 },
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
      { label: "Jazz", isActive: false },
      { label: "Folk music", isActive: false },
      { label: "Rock", isActive: false },
      { label: "Rhythm and blues", isActive: false },
      { label: "Metal", isActive: false },
      { label: "Pop music", isActive: false },
      { label: "Indie rock", isActive: false },
      { label: "Techno", isActive: false },
      { label: "Classical music", isActive: false },
      { label: "Country music", isActive: false },
      { label: "Popular music", isActive: false },
      { label: "Alternative", isActive: false },
      { label: "Punk", isActive: false },
      { label: "Disco", isActive: false },
      { label: "Soul music", isActive: false },
      { label: "Music of Latin America", isActive: false },
      { label: "Hip hop", isActive: false },
      { label: "Blues", isActive: false },
      { label: "Electronic", isActive: false },
      { label: "Reggae", isActive: false },
      { label: "Jazz fusion", isActive: false },
      { label: "Ambient", isActive: false },
      { label: "EDM", isActive: false },
    ],

    movieType: [
      { label: "Action", isActive: false },
      { label: "Adventure", isActive: false },
      { label: "Comedy", isActive: false },
      { label: "Drama", isActive: false },
      { label: "Horror", isActive: false },
      { label: "Romance", isActive: false },
      { label: "Science fiction", isActive: false },
      { label: "Fantasy", isActive: false },
      { label: "Historical", isActive: false },
      { label: "Crime", isActive: false },
    ],
    selected: false,
    value: 30,
    rules: [(v) => v >= 18 || "Over 18 Allowed"],
    step: 1,
    chipColor: "default",
    PictureUrl: null,
  }),

  methods: {
    kreni() {
      this.geolocate();
      this.google = window.google;
     
    

      var client_id = "7448353694614b49b63a0132165f3d54";
      var client_secret = "acad1c8ca7f747ed89ee4c56707bd643";

      var authOptions = {
        url: "https://accounts.spotify.com/api/token",
        headers: {
          Authorization:
            "Basic " +
            new Buffer.from(client_id + ":" + client_secret).toString("base64"),
        },
        form: {
          grant_type: "client_credentials",
        },
        json: true,
      };
      var spotifyApi = new SpotifyWebApi();
      spotifyApi.setAccessToken(token);
      request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          var token = body.access_token;
        }
      });
      console.log(token);
      spotifyApi.getArtistAlbums(
        "43ZHCT0cAZBISjO8DG9PnE",
        function (err, data) {
          if (err) console.error(err);
          else console.log("Artist albums", data);
        }
      );

      // get Elvis' albums, using Promises through Promise, Q or when
      spotifyApi.getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE").then(
        function (data) {
          console.log("Artist albums", data);
        },
        function (err) {
          console.error(err);
        }
      );
    },

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
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
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
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
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
    checkedMusic(index) {
      //this.musicType[index].isActive = !this.musicType[index].isActive;
    },
    UploadImageToStorage() {
      console.log("uplodaing...");
      const storageRef = ref(storage, "Users/"+auth.currentUser.email+"/ProfilePicture/profile");
      uploadBytes(storageRef, this.$refs.myfile.files[0]).then(
        console.log("done!")
      );
    },

    async addInfo() {
      console.log(auth.currentUser);
      let FavoriteMusicType = [];
      this.musicType.forEach((el) => {
        if (el.isActive) FavoriteMusicType.push(el.label);
        this.$router.push("/");
      });

      await setDoc(
        doc(db, "Users", "UserNames", auth.currentUser.email, "Information"),
        {
          UserGender: this.UserGender,
          UserAttractedToGender: this.UserAttractedToGender,
          age: this.age,
          lat: this.marker.position.lat,
          lng: this.marker.position.lng,
          musicType: FavoriteMusicType,
          InformationComplete: true,
        }
      );
    },

    checkedChip(index) {
      console.log(this.musicType[index].isActive);
      this.musicType[index].isActive = !this.musicType[index].isActive;
    },

    checkedMovie(index) {
      //this.musicType[index].isActive = !this.musicType[index].isActive;
      this.movieType[index].isActive = !this.movieType[index].isActive;
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
