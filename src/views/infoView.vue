<template>
  <div class="data d-flex  justify-center">

    <v-card class="pa-12 ma-12 red--text" width="1000px" elevation="10" v-if="step===1">
      <v-progress-linear class="mt-5 mb-3" value="14"></v-progress-linear>
      <h1>Introduce yourself</h1>
      <div class="d-inline">
        <v-row>
          <v-col class="ma-2">
            <h3>First Name</h3>
            <v-text-field outlined v-model="firstName" placeholder="First Name"></v-text-field>
          </v-col>

          <v-col class="ma-2">
            <h3>Second Name</h3>
            <v-text-field outlined v-model="secondName" placeholder="First Name"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="ma-2">
            <h3>Country</h3>
            <v-select
                outlined
                :items="this.countries"
                label="Pick Country"
                v-model="countriesPick"

            ></v-select>
          </v-col>
          <v-col class="ma-2">
            <h3>City</h3>
            <v-text-field outlined placeholder="City name" v-model="city"></v-text-field>
          </v-col>
        </v-row>
        <phone-number @phone-number="handlePhoneNumber"/>


        <div>
          <v-btn class="ma-5 white--text d-flex justify-end" color="red" @click="nextStep"> next</v-btn>

        </div>
      </div>


    </v-card>

    <v-card class="pa-12 ma-12" width="1000px" elevation="10" v-if="step == 2">
      <v-progress-linear class="mt-5 mb-3" value="28"></v-progress-linear>
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
      <v-btn class="ma-5" @click="backStep"> back</v-btn>
      <v-btn class="ma-5 white--text " color="red" @click="nextStep"> next</v-btn>
    </v-card>

    <v-card class="pa-12 ma-12" width="1000px" elevation="10" v-if="step == 3">
      <v-progress-linear class="mt-5 mb-3" value="42"></v-progress-linear>
      <h3 class="ma-6">Add some information you want to add</h3>
      <v-select
          :items="this.questions"
          label="Pick Question no.1"
          v-model="question1"
          outlined
      ></v-select>

      <v-text-field outlined v-model="answer1"></v-text-field>
      <v-divider class="mt-5"></v-divider>

      <v-select
          outlined
          :items="this.questions"
          label="Pick Question no.2"
          v-model="question2"
      ></v-select>
      <v-text-field outlined v-model="answer2"></v-text-field>
      <v-divider class="mt-5"></v-divider>

      <v-select
          outlined
          :items="this.questions"
          label="Pick Question no.3"
          v-model="question3"
      ></v-select>
      <v-text-field outlined v-model="answer3"></v-text-field>
      <v-btn class="ma-5" @click="backStep"> back</v-btn>
      <v-btn class="ma-5" @click="appendQuestionsAndAnswers(), nextStep()"> next</v-btn>
    </v-card>

    <v-card class="pa-12 ma-12" width="1000px" elevation="10" v-if="step == 4">
      <v-progress-linear class="mt-5 mb-3" value="56"></v-progress-linear>
      <v-card-title>Chose your interests</v-card-title>
      <v-chip
          class="ml-3 mt-3 d-inline-flex justify-center"
          link
          outlined
          light
          :class="{ green: inter.isActive }"
          v-for="(inter, index) in interests"
          :key="index"
          v-model="interest"
          @click="checkedElement(interests,index)"
      >{{ inter.label }}
      </v-chip>

      <v-spacer></v-spacer>
      <v-divider class="mt-12"></v-divider>
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
          @click="checkedElement(musicType,index)"
      >{{ music.label }}
      </v-chip>

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
          @click="checkedElement(movieType,index)"
      >{{ movie.label }}
      </v-chip>
      <v-spacer></v-spacer>
      <v-btn class="ma-5" @click="backStep"> back</v-btn>
      <v-btn class="ma-5" @click="nextStep()"> next</v-btn>
    </v-card>

    <v-card class="pa-12 ma-12" width="1000px" elevation="10" v-if="step == 5">
      <v-progress-linear class="mt-5 mb-3" value="70"></v-progress-linear>
      <v-card-title>Location</v-card-title>

      <div id="app">
        <GmapMap
            :center="center"
            :zoom="3"
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
        <v-btn class="ma-5" @click="geolocate"> Detect Location</v-btn>
        <!--        <p>Selected Position: {{ marker }}</p>-->
      </div>
      <v-btn class="ma-5" @click="backStep"> back</v-btn>
      <v-btn class="ma-5" @click="nextStep()"> next</v-btn>
    </v-card>


    <!--            SETUP PROFILE DESCRIPTION-->
    <v-card class="pa-12 ma-12" width="1000px" elevation="10" v-if="step === 6">
      <v-progress-linear class="mt-5 mb-3" value="100"></v-progress-linear>
      <v-card-title> Setup your profile Description</v-card-title>
      <v-btn>
        <label class="custom-file-upload">
          Change Profile Image
          <input type="file" @change="onFileChangeProfileImage"/>

        </label>
      </v-btn>


      Change Profile background Image

      <v-btn>
        <label class="custom-file-upload">
          Change Profile Image
          <input @change="this.onFileChangeProfileBackground" type="file">
        </label>
      </v-btn>

      <profile-info-card
          :display-name="this.displayName"
          :first-name="this.firstName"
          :second-name="this.secondName"
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
        <v-btn @click="colorOfCard('green')" class="ma-2" color="green"></v-btn>
      </div>
      <v-text-field label="Description" outlined class="mt-10" v-model="description"></v-text-field>

      <v-btn class="ma-5" @click="backStep"> back</v-btn>
      <v-btn class="ma-5" color="primary"
             @click="UplodaAllDataToFirebase()">Done
      </v-btn>
    </v-card>

  </div>
</template>

<script>

import {auth, db, getDoc, storage} from "../../firebase.js";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {collection, doc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import ProfileInfoCard from "@/components/ProfileInfoCardComponent.vue";
import PhoneNumber from "@/components/PhoneNumber.vue";
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
    interest: null,

    firstName: "",
    secondName: "",
    country: "",
    city: "",

    question1: "",
    question2: "",
    question3: "",

    answer1: "",
    answer2: "",
    answer3: "",

    answerdQuestions: [],
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

    interests: [

      {label: "Traveling", isActive: false},
      {label: "Reading", isActive: false},
      {label: "Cooking", isActive: false},
      {label: "Hiking", isActive: false},
      {label: "Photography", isActive: false},
      {label: "Music", isActive: false},
      {label: "Painting", isActive: false},
      {label: "Writing", isActive: false},
      {label: "Fitness", isActive: false},
      {label: "Yoga", isActive: false},
      {label: "Dancing", isActive: false},
      {label: "Swimming", isActive: false},
      {label: "Cycling", isActive: false},
      {label: "Gaming", isActive: false},
      {label: "Movies", isActive: false},
      {label: "Fashion", isActive: false},
      {label: "Soccer", isActive: false},
      {label: "Basketball", isActive: false},
      {label: "Tennis", isActive: false},
      {label: "Camping", isActive: false},
      {label: "Gardening", isActive: false},
      {label: "Dogs", isActive: false},
      {label: "Cats", isActive: false},
      {label: "Food and dining", isActive: false},
      {label: "Art", isActive: false},
      {label: "Volunteering", isActive: false},
      {label: "DIY projects", isActive: false},
      {label: "Meditation", isActive: false},
      {label: "Acting", isActive: false},
      {label: "Singing", isActive: false},
      {label: "Environmental activism", isActive: false},
      {label: "Wine making", isActive: false},
      {label: "Creative writing", isActive: false},
      {label: "Calligraphy", isActive: false},
      {label: "Car restoration", isActive: false},
      {label: "Film-making", isActive: false},
      {label: "Fashion blogging", isActive: false},
      {label: "CrossFit", isActive: false},
      {label: "Knitting", isActive: false},
      {label: "Beekeeping", isActive: false},
      {label: "Organic farming", isActive: false},
      {label: "Scuba diving", isActive: false},
      {label: "Magic tricks", isActive: false},
      {label: "Baking", isActive: false},
      {label: "Birdwatching", isActive: false},
      {label: "Archery", isActive: false},
      {label: "Skydiving", isActive: false},
      {label: "Stand-up paddleboarding", isActive: false},
      {label: "Fitness coaching", isActive: false},
      {label: "Weightlifting", isActive: false},
      {label: "Martial arts", isActive: false},
      {label: "Woodworking", isActive: false},
      {label: "Wine and food pairing", isActive: false},
      {label: "Flower arranging", isActive: false},
      {label: "Philosophy", isActive: false},
      {label: "DIY home decor", isActive: false},
      {label: "Jazz music", isActive: false},
      {label: "Snowboarding", isActive: false},
      {label: "Photography editing", isActive: false},
      {label: "Geocaching", isActive: false},
      {label: "Fashion styling", isActive: false},
      {label: "Cosplay", isActive: false},
      {label: "Book club", isActive: false},
      {label: "Wine collecting", isActive: false},
      {label: "Horseback riding", isActive: false},
      {label: "Pilates", isActive: false},
      {label: "Motorcycling", isActive: false},
      {label: "Painting landscapes", isActive: false},
      {label: "Graphic novels", isActive: false},
      {label: "Singing in a choir", isActive: false},
      {label: "Pottery throwing", isActive: false},
      {label: "Leatherworking", isActive: false},
      {label: "Classic literature", isActive: false},
      {label: "Jazz dancing", isActive: false},
      {label: "Film photography", isActive: false},
      {label: "Scenic drives", isActive: false},
      {label: "Fine dining", isActive: false},
      {label: "Salsa dancing", isActive: false},
      {label: "Tai Chi", isActive: false}
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
    myBackgroundImageFileUrl: "",
    urlImageProfile: "",
    file: null,
    urlImageBackgroundProfile: "",
    cardColor: "primary",
    downloadProfilePictureUrl: "",
    downloadProfileBackgroundPictureUrl: "",

  }),
  mounted() {
    this.interests
    this.email = auth.currentUser.email;

  },
  created() {
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
      this.$refs.mapRef.panTo(this.marker.position);
      this.$refs.mapRef.$mapPromise.then((map) => {

        console.log(map);
      });
    },

    //Moves the marker to click position on the map
    handleMapClick(e) {
      this.marker.position = {lat: e.latLng.lat(), lng: e.latLng.lng()};
      console.log(this.marker);
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
      console.log("uploading profile image");

      // Assuming you have imported the necessary functions and objects
      const storageRef = ref(
          storage,
          "Users/" + auth.currentUser.displayName + "/ProfilePicture/profile"
      );

      // Upload the image to Firebase Storage
      uploadBytes(storageRef, this.profileImageUrl).then((snapshot) => {
        console.log("Upload complete!");

        // Get the download URL of the uploaded image
        getDownloadURL(snapshot.ref).then((url) => {
          this.downloadProfilePictureUrl = url;
        }).catch((error) => {
          console.error("Error getting download URL:", error);
        });
      }).catch((error) => {
        console.error("Error uploading image:", error);
      });

      console.log(this.profileImageUrl);
    },


    UploadProfileBackgroundImageToStorage() {
      // Assuming you have imported the necessary functions and objects
      const storageRef = ref(
          storage,
          "Users/" + auth.currentUser.displayName + "/ProfileBacgroundImage/BackgroundImageProfile"
      );

      // Upload the image to Firebase Storage
      uploadBytes(storageRef, this.profileBackgroundImageUrl).then((snapshot) => {
        console.log("Upload complete!");

        // Get the download URL of the uploaded image
        getDownloadURL(snapshot.ref).then((url) => {
          console.log("Download URL:", url);
          this.downloadProfileBackgroundPictureUrl = url;
          console.log(this.downloadProfileBackgroundPictureUrl);
          this.addInfo();
        }).catch((error) => {
          console.error("Error getting download URL:", error);
        });
      }).catch((error) => {
        console.error("Error uploading image:", error);
      });

    },


    onFileChangeProfileImage(event) {
      this.file = event.target.files[0];
      this.urlImageProfile = URL.createObjectURL(this.file);
      this.profileImageUrl = this.file;
    },
    onFileChangeProfileBackground(event) {

      this.file = event.target.files[0];
      this.urlImageBackgroundProfile = URL.createObjectURL(this.file);
      this.profileBackgroundImageUrl = this.file;
    },
    handlePhoneNumber(phoneNumber) {
      this.retrievedPhoneNumber = phoneNumber;
    },

    async addInfo() {
      setTimeout(function () {
        this.UploadProfileImageToStorage();
        this.UploadProfileBackgroundImageToStorage();

      }, 10000);
      console.log("done");
      // for music
      //  this.musicType.forEach((el) => {
      //    if (el.isActive) FavoriteMusicType.push(el.label);
      // });

      let FavoriteMusicType = this.extractActiveElementsFromArray(this.musicType);
      let FavoriteMovieType = this.extractActiveElementsFromArray(this.movieType);
      let FavoriteInterestType = this.extractActiveElementsFromArray(this.interests);
      let reff = doc(
          db,
          "Users",
          "UserNames",
          auth.currentUser.displayName,
          "Information"
      );
      let InformationData = {
        FirstName: this.firstName,
        SecondName: this.secondName,
        Country: this.countriesPick,
        City: this.city,
        PhoneNumber: this.retrievedPhoneNumber,
        UserGender: this.UserGender,
        UserAttractedToGender: this.UserAttractedToGender,
        age: this.age,
        lat: this.marker.position.lat,
        lng: this.marker.position.lng,
        AnswerQuestions: this.answerdQuestions,
        FavMusicType: FavoriteMusicType,
        FavMovieType: FavoriteMovieType,
        FavInterestType: FavoriteInterestType,
        InformationComplete: true,
      };
      await updateDoc(reff, InformationData);
      this.answerdQuestions = [];

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
        ProfilePictureUrl: this.downloadProfilePictureUrl,
        ProfileBackgroundPicture: this.downloadProfileBackgroundPictureUrl,
        Followers: "",
      };

      await updateDoc(reff, InformationData);

      // Add follow system database
      await setDoc(doc(db, "Users", "UserNames", this.displayName, "Information", "Followers", "Following"), {
        Following: [],
        Followers: [],
      }).then(console.log("done!"));

      await this.$router.push("/");
    },

    checkedElement(elemType, index) {
      elemType[index].isActive = !elemType[index].isActive;
    },

    colorOfCard(color) {
      this.cardColor = color;
    },

    extractActiveElementsFromArray(elem) {

      let favoriteChip = [];
      elem.forEach((el) => {
        if (el.isActive) favoriteChip.push(el.label);
      });
      return favoriteChip;

    },
    appendQuestionsAndAnswers() {
      this.answerdQuestions.push(this.question1);
      this.answerdQuestions.push(this.answer1);

      this.answerdQuestions.push(this.question2);
      this.answerdQuestions.push(this.answer2);

      this.answerdQuestions.push(this.question3);
      this.answerdQuestions.push(this.answer3);
    },

    async UplodaAllDataToFirebase() {
      await this.UploadProfileImageToStorage()
      await this.UploadProfileBackgroundImageToStorage();

    },

  },
}
;
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
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;

}

input[type="file"] {
  display: none;
  background-color: red;
}

* {
  background-color: white;
}
</style>
