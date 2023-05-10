<template>
  <v-row>
    <v-col> </v-col>
    <v-col>
      <div class="info">
        <h1>Information</h1>
        <h3>gender</h3>
        <v-select :items="genders" label="Pick Gender"></v-select>
        <v-text-field
          label="Gender"
          :rules="rules"
          hide-details="auto"
        ></v-text-field>
        <v-btn>Connect Spotify</v-btn>
        <v-card-text class="pt-0">
          <v-slider
            v-model="value"
            :rules="rules"
            label="How Old Are you?"
            step="1"
            thumb-label="always"
            ticks
          ></v-slider>
        </v-card-text>
      </div>
    </v-col>
    <v-col> </v-col>
  </v-row>
</template>
<script>
export default {
  data: () => ({
    genders: ["Abinary","Agender","Ambigender","Androgyne","Androgynos","Androgynous","Aporagender","Autigender","Bakla","Bigender","Binary","Bissu","Butch","Calabai","Calalai","Cis","Cisgender","Cis female","Cis male","Cis man","Cis woman","Demi-boy","Demiflux","Demigender","Demi-girl","Demi-guy","Demi-man","Demi-woman","Dual gender","Endosex","Eunuch","Faafafine","Female","Female to male","Femme","FTM","Gender bender","Gender creative","Gender diverse","Gender gifted","Genderfluid","Genderflux","Genderfuck","Genderless","Gendervague","Gender nonconforming","Genderqueer","Gender questioning","Gender variant","Graygender","Hijra","Intergender","Intersex","Ipsogender","Kathoey","Male","Male to female","Man","Man of trans experience","Maverique","MTF","Multigender","Muxe","Neither","Neurogender","Neutrois","Non-binary","Non-binary transgender","Omnigender","Pangender","Polygender","Person of transgendered experience","Queer","Sekhet","Third gender","Trans","Trans*","Trans female","Trans male","Trans man","Trans person","Trans woman","Transgender","Transgender female","Transgender male","Transgender man","Transgender person","Transgender woman","Transfeminine","Transmasculine","Transsexual","Transsexual female","Transsexual male","Transsexual man","Transsexual person","Transsexual woman","Travesti","Trigender","Tumtum","Two spirit","Vakasalewalewa","Waria","Winkte","Woman","Woman of trans experience","Xenogender","X-gender","Other"],

    value: 30,
    rules: [(v) => v >= 18 || "Over 18 Allowed"],
  }),
};
</script>

<style scoped>
.info {
  background-color: white;
}
.info h1 {
  text-align: center;
  background-color: white;
}
* {
  background-color: white;
}
</style>
