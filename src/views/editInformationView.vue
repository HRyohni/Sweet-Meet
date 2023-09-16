<template>
  <div class="data mt-15  d-flex  justify-center">

    <v-card class="pa-12 ma-12 red--text" width="1000px" elevation="10">

      <v-card-title> Setup your profile Description</v-card-title>
      <v-row class="ma-2 justify-center">

        <v-col>
          <label class="custom-file-upload blue--text">
            Change Profile Image
            <input type="file" @change="onFileChangeProfileImage"/>

          </label>
        </v-col>
        <v-col>
          <label class="custom-file-upload blue--text">
            Change Profile Image
            <input @change="this.onFileChangeProfileBackground" type="file">
          </label>
        </v-col>
      </v-row>
      <profile-info-card
          :show-case="true"
          :display-name="this.displayName"
          :first-name="this.firstName"
          :second-name="this.secondName"
          :profile-description="description"
          :profile-picture="this.urlImageProfile"
          :background-image="this.urlImageBackgroundProfile"
          :card-color="this.cardColor"
      ></profile-info-card>
      <div class="ma-4">
        <p>Pick Color:</p>
        <div class="d-flex justify-center">
          <v-btn @click="colorOfCard('blue')" class="ma-2" color="blue"></v-btn>
          <v-btn @click="colorOfCard('red')" class="ma-2" color="red"></v-btn>
          <v-btn @click="colorOfCard('green')" class="ma-2" color="green"></v-btn>
          <v-btn @click="colorOfCard('purple')" class="ma-2" color="purple"></v-btn>
          <v-btn @click="colorOfCard('pink')" class="ma-2" color="pink"></v-btn>
          <v-btn @click="colorOfCard('deep-purple')" class="ma-2" color="deep-purple"></v-btn>
          <v-btn @click="colorOfCard('indigo')" class="ma-2" color="indigo"></v-btn>
          <v-btn @click="colorOfCard('orange')" class="ma-2" color="orange"></v-btn>
          <v-btn @click="colorOfCard('blue-grey')" class="ma-2" color="blue-grey"></v-btn>
        </div>

      </div>
      <v-text-field  :rules="descriptionRules" label="Description" outlined class="mt-10" v-model="description"></v-text-field>

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
        <phone-number :phone-number="phoneNumber" @phone-number="handlePhoneNumber"/>

      </div>


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


      <h3 class="ma-6">Add some information you want to add</h3>
      <v-select
          :items="this.questions"
          :label="question1"
          v-model="question1"


          outlined
      ></v-select>
      <p>{{ question1 }}</p>

      <v-text-field outlined v-model="answer1"></v-text-field>
      <v-divider class="mt-5"></v-divider>

      <v-select
          outlined
          :items="this.questions"
          :label="question2"
          v-model="question2"
      ></v-select>
      <v-text-field outlined v-model="answer2"></v-text-field>
      <v-divider class="mt-5"></v-divider>

      <v-select
          outlined
          :items="this.questions"
          :label="question3"
          v-model="question3"
      ></v-select>
      <v-text-field outlined v-model="answer3"></v-text-field>


      <v-card-title>Chose your interests</v-card-title>
      <v-chip
          class="ml-3 mt-3 d-inline-flex justify-center"
          link
          outlined
          light
          :class="{ green: inter.isActive }"
          v-for="(inter, index) in interests"
          :key="index+'a'"
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
          :key="index+'b'"
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
          :key="index+'c'"
          @click="checkedElement(movieType,index)"
      >{{ movie.label }}
      </v-chip>
      <v-spacer></v-spacer>


      <v-card-title>Location</v-card-title>

      <div id="app">
        <GmapMap
            :center="center"
            :zoom="3"
            map-style-id="roadmap"
            :options="mapOptions"
            style="width: 100%; height: 50vmin"
            ref="mapRef"
            @click="handleMapClick"
        >

          <GmapMarker
              class="ma-5"
              :zoom="2"
              :position="marker.position"
              :clickable="true"
              :draggable="true"
              @drag="handleMarkerDrag"
              @click="panToMarker"

          />
        </GmapMap>
        <!--        <p>Selected Position: {{ marker }}</p>-->
      </div>


      <!--            SETUP PROFILE DESCRIPTION-->



      <v-btn class="ma-5" color="primary"
             :disabled="this.description.length >100"
             @click="UplodaAllDataToFirebase()">Save
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
import marker from "vue2-google-maps/dist/components/marker";


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

    answerQuestions: "",
    musics: null,
    interest: null,

    interesti: null,
    movies: null,
    music: null,

    firstName: "",
    secondName: "",
    country: "",
    city: "",

    phoneNumber: "",
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


    isChangedProfileImage: false,
    isChangedBackgroundProfileImage: false,

    currentProfileImage: "",
    currentBackgroundProfileImage: "",

    descriptionRules: [
      value => {
        if (value) return true
        return 'Cant be empty.'
      },
      value => {
        if (value?.length <= 100) return true

        return 'Description must be less than 100 characters.'
      },
    ],



  }),
  async mounted() {
    this.email = auth.currentUser.email;
    await this.fetchAllData()

    this.appendQuestions();


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

      });
    },

    //Moves the marker to click position on the map
    handleMapClick(e) {
      this.marker.position = {lat: e.latLng.lat(), lng: e.latLng.lng()};
    },

    // TODO: https://github.com/pespantelis/vue-location-picker google maps
    // https://stackblitz.com/github/googlemaps/js-samples/tree/sample-add-map?file=index.html


    UploadProfileImageToStorage() {

      // Assuming you have imported the necessary functions and objects
      const storageRef = ref(
          storage,
          "Users/" + auth.currentUser.displayName + "/ProfilePicture/profile"
      );


      // Upload the image to Firebase Storage
      uploadBytes(storageRef, this.profileImageUrl).then((snapshot) => {

        // Get the download URL of the uploaded image
        getDownloadURL(snapshot.ref).then((url) => {
          this.downloadProfilePictureUrl = url;
          this.addInfo();
        }).catch((error) => {
          console.error("Error getting download URL:", error);
        });
      }).catch((error) => {
        console.error("Error uploading image:", error);
      });

    },


    UploadProfileBackgroundImageToStorage() {

      // Assuming you have imported the necessary functions and objects
      const storageRef = ref(
          storage,
          "Users/" + auth.currentUser.displayName + "/ProfileBacgroundImage/BackgroundImageProfile"
      );

      // Upload the image to Firebase Storage
      uploadBytes(storageRef, this.profileBackgroundImageUrl).then((snapshot) => {

        // Get the download URL of the uploaded image
        getDownloadURL(snapshot.ref).then((url) => {
          this.downloadProfileBackgroundPictureUrl = url;
          this.addInfo();
        }).catch((error) => {
          console.error("Error getting download URL:", error);
        });
      }).catch((error) => {
        console.error("Error uploading image:", error);
      });

    },


    onFileChangeProfileImage(event) {
      this.isChangedProfileImage = true;
      this.file = event.target.files[0];
      this.urlImageProfile = URL.createObjectURL(this.file);
      this.profileImageUrl = this.file;
    },
    onFileChangeProfileBackground(event) {
      this.isChangedBackgroundProfileImage = true;
      this.file = event.target.files[0];
      this.urlImageBackgroundProfile = URL.createObjectURL(this.file);
      this.profileBackgroundImageUrl = this.file;
    },
    handlePhoneNumber(phoneNumber) {
      this.retrievedPhoneNumber = phoneNumber;
    },

    async addInfo() {
      this.appendQuestionsAndAnswers()
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
      await setDoc(doc(db, "Users", "UserNames", auth.currentUser.displayName, "Information", "Followers", "Following"), {
        Following: [],
        Followers: [],
      });

      // Add Notification system to database
      await setDoc(doc(db, "Users", "UserNames", auth.currentUser.displayName, "Notification"), {
        Notifications: [],
      });

      // await this.$router.push("/profile/" + auth.currentUser.displayName);
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

      if (this.isChangedProfileImage)
      {await this.UploadProfileImageToStorage();}

      if (this.isChangedBackgroundProfileImage)
      {await this.UploadProfileBackgroundImageToStorage();}

      if (!this.isChangedProfileImage ) {
        this.downloadProfilePictureUrl = this.currentProfileImage;

      }
      if (!this.isChangedBackgroundProfileImage) {
        this.downloadProfileBackgroundPictureUrl = this.currentBackgroundProfileImage;
      }

      await this.addInfo()
      await this.$router.push("/profile/" + this.displayName);


    },


    appendQuestions() {

      this.question1 = this.answerQuestions[0];
      this.answer1 = this.answerQuestions[1];

      this.question2 = this.answerQuestions[2];
      this.answer2 = this.answerQuestions[3];

      this.question3 = this.answerQuestions[4];
      this.answer3 = this.answerQuestions[5];


    },
    async fetchAllData() {
      let lat;
      let lng;

      let docSnap = await getDoc(doc(db, "Users", "UserNames", auth.currentUser.displayName, "Information"));

      if (docSnap.exists()) {
        this.firstName = docSnap.data()["FirstName"];
        this.city = docSnap.data()["City"];

        this.secondName = docSnap.data()["SecondName"];
        this.interesti = docSnap.data()["FavInterestType"];
        this.movies = docSnap.data()["FavMovieType"];
        this.music = docSnap.data()["FavMusicType"];
        this.phoneNumber = docSnap.data()["PhoneNumber"];
        this.countriesPick = docSnap.data()["Country"];
        this.sexualOrientation = docSnap.data()["UserAttractedToGender"];
        this.age = docSnap.data()["age"];
        this.UserGender = docSnap.data()["UserGender"];
        this.UserAttractedToGender = docSnap.data()["UserAttractedToGender"];

        this.answerQuestions = docSnap.data()["AnswerQuestions"];
        lat = docSnap.data()["lat"];
        lng = docSnap.data()["lng"];
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      //marker: {position: {lat: 10, lng: 10}},
      this.marker.position.lat = lat;
      this.marker.position.lng = lng;

      this.musicType.forEach((value) => {
        if (this.music.includes(value.label)) {
          value.isActive = true;
        } else {
          value.isActive = false; // Ensure elements not in music array are inactive
        }
      });

      this.interests.forEach((value) => {
        if (this.interesti.includes(value.label)) {
          value.isActive = true;
        } else {
          value.isActive = false; // Ensure elements not in music array are inactive
        }
      });

      this.movieType.forEach((value) => {
        if (this.movies.includes(value.label)) {
          value.isActive = true;
        } else {
          value.isActive = false; // Ensure elements not in music array are inactive
        }


      });


      docSnap = await getDoc(doc(db, "Users", "UserNames", auth.currentUser.displayName, "Information", "Profile", "Data"));

      if (docSnap.exists()) {
        this.urlImageBackgroundProfile = docSnap.data()["ProfileBackgroundPicture"];
        this.urlImageProfile = docSnap.data()["ProfilePictureUrl"];

        this.currentBackgroundProfileImage = docSnap.data()["ProfileBackgroundPicture"];
        this.currentProfileImage = docSnap.data()["ProfilePictureUrl"];

        this.description = docSnap.data()["ProfileDescription"];
        this.cardColor = docSnap.data()["ProfileCardColor"];
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      console.log("-->",this.currentBackgroundProfileImage);




    }

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
