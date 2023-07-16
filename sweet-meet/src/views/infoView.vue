<template>
  <div class="data d-flex  justify-center">

    <v-card class="pa-12 ma-12 red--text" width="1000px" elevation="10" v-if="step == 1">
      <v-progress-linear class="mt-5 mb-3" value="50"></v-progress-linear>
      <h1>Introduce yourself</h1>
      <div class="d-inline">
        <v-row>
          <v-col class="ma-2">
            <h3>First Name</h3>
            <v-text-field outlined placeholder="First Name"></v-text-field>
          </v-col>
          <v-col class="ma-2">
            <h3>Second Name</h3>
            <v-text-field outlined placeholder="First Name"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="ma-2">
            <h3>Country</h3>
            <v-select
                outlined
                :items="this.countries"
                label="Pick Country"
                v-model="this.countriesPick"
            ></v-select>
          </v-col>
          <v-col class="ma-2">
            <h3>City</h3>
            <v-text-field outlined placeholder="First Name"></v-text-field>
          </v-col>
        </v-row>
        <phone-number @phone-number="handlePhoneNumber" />
        <p>Retrieved Phone Number: {{ retrievedPhoneNumber }}</p>


        <div>
          <v-btn class="ma-5 white--text d-flex justify-end" color="red" @click="nextStep"> next</v-btn>

        </div>
      </div>


    </v-card>

    <v-card class="pa-12 ma-12" width="1000px" elevation="10" v-if="step == 2">
      <v-progress-linear class="mt-5 mb-3" value="50"></v-progress-linear>
      <h3>What is yor Gender?</h3>
      <v-select
          :items="genders"
          label="Pick Gender"
          v-model="UserGender"
      ></v-select>
      <h3>What are you attracted to?</h3>

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

      <v-btn class="ma-5 white--text d-flex justify-end" color="red" @click="nextStep"> next</v-btn>  
    </v-card>

    <v-card class="pa-12 ma-12" width="1000px" elevation="10" v-if="step == 2">
      <v-progress-linear class="mt-5 mb-3" value="50"></v-progress-linear>
      <h3>Add some information you want to add</h3>
      <h3>{{ firstQuestion }}</h3>
      <v-select
          :items="this.questions"
          label="Pick Question no.1"
          v-model="firstQuestion"
      ></v-select>
      <v-text-field></v-text-field>
      <v-divider class="mt-5"></v-divider>

      <h3>{{ firstQuestion }}</h3>
      <v-select
          :items="this.questions"
          label="Pick Question no.2"
          v-model="firstQuestion"
      ></v-select>
      <v-text-field></v-text-field>
      <v-divider class="mt-5"></v-divider>
      <h3>{{ firstQuestion }}</h3>
      <v-select
          :items="this.questions"
          label="Pick Question no.3"
          v-model="firstQuestion"
      ></v-select>
      <v-text-field></v-text-field>

      <v-btn class="ma-5" @click="nextStep"> next</v-btn>
    </v-card>

    <v-card class="pa-12 ma-12" width="1000px" elevation="10" v-if="step == 3">
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

    <v-card class="pa-12 ma-12" width="1000px" elevation="10" v-if="step == 4">
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

    <v-card class="pa-12 ma-12" width="1000px" elevation="10" v-if="step == 5">
      <v-card-title> Setup your profile picture</v-card-title>

      <v-file-input @change="onFileChangeProfileImage" :ref="this.myFileUrl" type="file"
                    v-model="profileImageUrl"></v-file-input>
      <v-btn class="ma-5" @click="backStep"> back</v-btn>
      <v-btn class="ma-5" @click="nextStep()"> next</v-btn>
    </v-card>

    <!--            SETUP PROFILE DESCRIPTION-->
    <v-card class="pa-12 ma-12" width="1000px" elevation="10" v-if="step == 6">
      <v-card-title> Setup your profile Description</v-card-title>
      <p>change profile</p>
      <input type="file" @change="onFileChangeProfileImage"/>
      <p>chnage background image</p>
      <input @change="this.onFileChangeProfileBackground" type="file" :v-model="this.profileBackgroundImageUrl"></input>

      <v-img width="200px" v-if="this.urlImageProfile" :src="this.urlImageProfile"></v-img>
      <v-btn class="ma-5" @click="backStep"> back</v-btn>
      <profile-info-card :first-name="this.displayName"
                         :profile-picture="this.urlImageProfile"
                         :profile-description="description"
                         :background-image="this.urlImageBackgroundProfile"
                         :card-color="this.cardColor"

      ></profile-info-card>

      <div class="ma-4">
        <p>Pick Color:</p>
        <v-btn @click="colorOfCard('white')" class="ma-2" color="white"></v-btn>
        <v-btn @click="colorOfCard('blue')" class="ma-2" color="blue"></v-btn>
        <v-btn @click="colorOfCard('red')" class="ma-2" color="red"></v-btn>
        <v-btn @click="colorOfCard('yellow')" class="ma-2" color="yellow"></v-btn>
        <v-btn @click="colorOfCard('green')" class="ma-2" color="green"></v-btn>
      </div>


      <p>Description: </p>
      <v-text-field class="mt-10" v-model="description"></v-text-field>

      <v-btn class="ma-5" color="primary"
             @click="UploadProfileImageToStorage(),UploadProfileBackgroundImageToStorage(), addInfo()">Done
      </v-btn>
    </v-card>

  </div>
</template>

<script>

import {auth, db, getDoc, storage} from "../../firebase.js";

import {ref, uploadBytes} from "firebase/storage";
import {doc, updateDoc} from "firebase/firestore";
import ProfileInfoCard from "@/components/ProfileInfoCardComponent.vue";
import PhoneNumber from "@/components/PhoneNumber.vue";

import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';


export default {
  components: {PhoneNumber, ProfileInfoCard},
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

    questions: [
      "What are your favorite hobbies or interests?",
      "Are you involved in any clubs or organizations? Which ones and what do you do there?",
      "What kind of books, movies, or TV shows do you enjoy?",
      "Do you have any sports or physical activities that you participate in?",
      "Are there any particular causes or social issues that you are passionate about?",
      "Have you traveled anywhere recently or do you have any upcoming travel plans?",
      "What kind of music do you listen to? Do you have any favorite artists or genres?",
      "Are you currently working on any personal projects or creative endeavors?",
      "Do you play any musical instruments or have any artistic talents?",
      "Are there any new skills or subjects you are interested in learning more about?"
    ],
    countries: [
      "Afghanistan",
      "Albania",
      "Algeria",
      "Andorra",
      "Angola",
      "Antigua and Barbuda",
      "Argentina",
      "Armenia",
      "Australia",
      "Austria",
      "Azerbaijan",
      "Bahamas",
      "Bahrain",
      "Bangladesh",
      "Barbados",
      "Belarus",
      "Belgium",
      "Belize",
      "Benin",
      "Bhutan",
      "Bolivia",
      "Bosnia and Herzegovina",
      "Botswana",
      "Brazil",
      "Brunei",
      "Bulgaria",
      "Burkina Faso",
      "Burundi",
      "Côte d'Ivoire",
      "Cabo Verde",
      "Cambodia",
      "Cameroon",
      "Canada",
      "Central African Republic",
      "Chad",
      "Chile",
      "China",
      "Colombia",
      "Comoros",
      "Congo (Congo-Brazzaville)",
      "Costa Rica",
      "Croatia",
      "Cuba",
      "Cyprus",
      "Czechia (Czech Republic)",
      "Democratic Republic of the Congo",
      "Denmark",
      "Djibouti",
      "Dominica",
      "Dominican Republic",
      "Ecuador",
      "Egypt",
      "El Salvador",
      "Equatorial Guinea",
      "Eritrea",
      "Estonia",
      "Eswatini (fmr. Swaziland)",
      "Ethiopia",
      "Fiji",
      "Finland",
      "France",
      "Gabon",
      "Gambia",
      "Georgia",
      "Germany",
      "Ghana",
      "Greece",
      "Grenada",
      "Guatemala",
      "Guinea",
      "Guinea-Bissau",
      "Guyana",
      "Haiti",
      "Holy See",
      "Honduras",
      "Hungary",
      "Iceland",
      "India",
      "Indonesia",
      "Iran",
      "Iraq",
      "Ireland",
      "Israel",
      "Italy",
      "Jamaica",
      "Japan",
      "Jordan",
      "Kazakhstan",
      "Kenya",
      "Kiribati",
      "Kuwait",
      "Kyrgyzstan",
      "Laos",
      "Latvia",
      "Lebanon",
      "Lesotho",
      "Liberia",
      "Libya",
      "Liechtenstein",
      "Lithuania",
      "Luxembourg",
      "Madagascar",
      "Malawi",
      "Malaysia",
      "Maldives",
      "Mali",
      "Malta",
      "Marshall Islands",
      "Mauritania",
      "Mauritius",
      "Mexico",
      "Micronesia",
      "Moldova",
      "Monaco",
      "Mongolia",
      "Montenegro",
      "Morocco",
      "Mozambique",
      "Myanmar (formerly Burma)",
      "Namibia",
      "Nauru",
      "Nepal",
      "Netherlands",
      "New Zealand",
      "Nicaragua",
      "Niger",
      "Nigeria",
      "North Korea",
      "North Macedonia",
      "Norway",
      "Oman",
      "Pakistan",
      "Palau",
      "Palestine State",
      "Panama",
      "Papua New Guinea",
      "Paraguay",
      "Peru",
      "Philippines",
      "Poland",
      "Portugal",
      "Qatar",
      "Romania",
      "Russia",
      "Rwanda",
      "Saint Kitts and Nevis",
      "Saint Lucia",
      "Saint Vincent and the Grenadines",
      "Samoa",
      "San Marino",
      "Sao Tome and Principe",
      "Saudi Arabia",
      "Senegal",
      "Serbia",
      "Seychelles",
      "Sierra Leone",
      "Singapore",
      "Slovakia",
      "Slovenia",
      "Solomon Islands",
      "Somalia",
      "South Africa",
      "South Korea",
      "South Sudan",
      "Spain",
      "Sri Lanka",
      "Sudan",
      "Suriname",
      "Sweden",
      "Switzerland",
      "Syria",
      "Tajikistan",
      "Tanzania",
      "Thailand",
      "Timor-Leste",
      "Togo",
      "Tonga",
      "Trinidad and Tobago",
      "Tunisia",
      "Turkey",
      "Turkmenistan",
      "Tuvalu",
      "Uganda",
      "Ukraine",
      "United Arab Emirates",
      "United Kingdom",
      "United States of America",
      "Uruguay",
      "Uzbekistan",
      "Vanuatu",
      "Venezuela",
      "Vietnam",
      "Yemen",
      "Zambia",
      "Zimbabwe"
    ],
    countriesPick: "",
    cityPick: "",
    retrievedPhoneNumber: '',

    selected: false,
    value: 30,
    rules: [(v) => v >= 18 || "Over 18 Allowed"],
    step: -1,
    profileImageUrl: "",
    profileBackgroundImageUrl: "",
    email: "",
    chipColor: "default",
    PictureUrl: null,
    displayName: auth.currentUser.displayName,
    description: "",
    myFileUrl: "",
    urlImageProfile: "",
    file: null,
    urlImageBackgroundProfile: "",
    cardColor: "white",

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

    UploadProfileImageToStorage() {
      console.log("uplodaing..." + this.profileImageUrl);
      const storageRef = ref(
          storage,
          "Users/" + auth.currentUser.displayName + "/ProfilePicture/profile"
      );
      uploadBytes(storageRef, this.profileImageUrl).then(console.log("done!"));
      console.log(this.profileImageUrl);
    },

    UploadProfileBackgroundImageToStorage() {
      console.log("uplodaing..." + this.profileBackgroundImageUrl);
      const storageRef = ref(
          storage,
          "Users/" + auth.currentUser.displayName + "/ProfileBacgroundImage/BackgroundImageProfile"
      );
      uploadBytes(storageRef, this.profileBackgroundImageUrl).then(console.log("done!"));
      console.log(this.profileBackgroundImageUrl);
    },

    onFileChangeProfileImage(event) {
      this.file = event.target.files[0];
      this.urlImageProfile = URL.createObjectURL(this.file);
    },
    onFileChangeProfileBackground(event) {
      this.file = event.target.files[0];
      this.urlImageBackgroundProfile = URL.createObjectURL(this.file);
    },
    handlePhoneNumber(phoneNumber) {
      this.retrievedPhoneNumber = phoneNumber;
    },

    CheckInformationStatus() {


      const docRef = doc(db,
          "Users",
          "UserNames",
          "test",
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

      let reff = doc(
          db,
          "Users",
          "UserNames",
          auth.currentUser.displayName,
          "Information"
      );
      let InformationData = {
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
// Update Profile Data
      reff = doc(
          db,
          "Users",
          "UserNames",
          auth.currentUser.displayName,
          "Information",
          "Profile",
          "Data"
      );
      InformationData = {
        ProfileDescription: this.description,
        ProfileCardColor: this.cardColor,
      };

      await updateDoc(reff, InformationData);
      await this.$router.push("/");
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
      this.displayName = auth.currentUser.displayName;
    },
    colorOfCard(color) {
      this.cardColor = color;
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

input {
  width: 100px;
  height: 100px;
  border: solid 1px black;
  border-radius: 5px;
  object-fit: cover;
}


* {
  background-color: white;
}
</style>
