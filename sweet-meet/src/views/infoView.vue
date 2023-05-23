<template>
  <div class="data ma-12 d-flex justify-center">
    <v-card class="pa-12 ma-12" width="1000px" elevation="10" v-if="step == 2">
      <h3>What is yor Genasdder?</h3>
      <v-select :items="genders" label="Pick Gender"></v-select>
      <h3>What atracted to?</h3>
      <v-select :items="genders" label="Pick Gender"></v-select>
      <v-text-field
        label="What is your age?"
        :rules="rules"
        hide-details="auto"
      ></v-text-field>

      <v-btn class="ma-5" @click="nextStep"> next</v-btn>
    </v-card>

    <v-card class="pa-12 ma-12" width="1000px" elevation="10" v-if="step == 1">
      <v-card-title>Chose your music taste</v-card-title>
      <v-chip
        class="ml-3 mt-3"
        link
        outlined
        :selected="selected"
        v-for="music in musicType"
        :key="music"
        @click="checkedChip"
        light
        :color="chipColor"
        >{{ music }}</v-chip
      >

      <v-spacer></v-spacer>
      <v-btn class="ma-5" @click="nextStep()"> next</v-btn>
    </v-card>
  </div>
</template>
<script>
import LocationPickerInit from "vue-location-picker/src/init";
import LocationPicker from "vue-location-picker";

export default {
  data: () => ({
    genders: ["Male", "Female", "other"],
    musicType: [
      "Jazz",
      "Folk music",
      "Rock",
      "Rhythm and blues",
      "Metal",
      "Pop music",
      "Indie rock",
      "Techno",
      "Classical music",
      "Country music",
      "Popular music",
      "Alternative",
      "Punk",
      "Disco",
      "Soul music",
      "Music of Latin America",
      "Hip hop",
      "Blues",
      "Electronic",
      "Reggae",
      "Jazz fusion",
      "Ambient",
      "EDM",
    ],
    selected: false,
    value: 30,
    rules: [(v) => v >= 18 || "Over 18 Allowed"],
    step: 1,
    chipColor: "default",
  }),

  methods: {
    // TODO: https://github.com/pespantelis/vue-location-picker google maps
    // https://stackblitz.com/github/googlemaps/js-samples/tree/sample-add-map?file=index.html

    nextStep() {
      this.step = this.step + 1;
      console.log(this.step);
    },
    checkedChip() {
      if (this.chipColor == "default") this.chipColor = "green";
      else this.chipColor = "default";
    },
  },
};
</script>

<style scoped>
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
