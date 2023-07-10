<template>
  <main grid-list-xs >
   <mainText>
     <div class="middleText">
       <h1>Welcome to Sweet Meet</h1>
       <v-btn
           color="primary"
          @click="loginPage"
       >
         Sweet Meet
       </v-btn>


      <v-card
          class="pa-9 ma-11"
          width="400px"
      >
        <v-card-title>naslov</v-card-title>
        <v-card-subtitle>ovo je podnaslov</v-card-subtitle>
      </v-card>


     </div>

   </mainText>
  </main>
</template>

<script>
export default {
    name: "landingPage",
  methods:
{
   loginPage()
{
  this.$router.push("/login")
}

}


}



</script>

<style>

.main
{
  text-align: center;
  background-color: aqua;
    height: 1000px;
}

mainText
{
  text-align: center;

  margin: 500px ;
  background-color: aqua;
  height: 300px;
  width: 300px  ;
}
middleText
{
  margin: 300px;
  text-align: center;
}
</style>