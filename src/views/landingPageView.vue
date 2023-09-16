<template>
  <v-container fluid class="pa-0">

    <v-img height="1000" src="../../public/imgassets/backgroundSweetMeet.png">
      <div class="d-flex justify-end">
        <v-btn @click="loginPage" class="pa-2 ma-5" color="white" outlined>Log in</v-btn>

      </div>

      <div class="d-flex justify-center mt-15">
        <div style="border: 1px solid #FFF;" class="pl-15 pr-15">
          <p style="font-size: 128px;" class="Heading">Sweet Meet</p>
        </div>
      </div>
      <div class="d-flex justify-center white--text fonts" style="font-size: 36px">
        <p><b>dating</b> and <b>social app</b> in <b>one</b></p>

      </div>
      <div class="d-flex justify-center">
        <v-btn @click="registerPage()" class="pa-2 ma-2" outlined color="white">Join Now</v-btn>
      </div>
      <v-row>
        <v-col>
          <div style="width: fit-content;" class="vibrate-2 d-flex justify-center">
            <v-img style="rotate: 45deg" width="500" src="../../public/imgassets/blob.png"></v-img>
          </div>
        </v-col>
        <v-col class="d-flex justify-end">
          <div style="width: fit-content;" class="vibrate-2 d-flex justify-end">
            <v-img width="500" src="../../public/imgassets/blob.png"></v-img>
          </div>
        </v-col>
      </v-row>
   

    </v-img>
    <v-parallax src="../../public/imgassets/loveBackground.png">
      <div class="d-flex justify-center">
        <h1 style="font-size: 400px; color: white">LOVE</h1>
      </div>
    </v-parallax>
    <div class="datingHeading d-flex justify-center">
      <h1 style="font-size: 128px">Find your Perfect Match!</h1>
    </div>


    <v-img src="../../public/imgassets/rectangle.png" class="mt-10">


      <v-row align="center" justify="center">
        <v-col class="d-flex justify-center">
          <div>

            <v-img style="width: 652px; height: 978px;" src="../../public/imgassets/lovecupple.png"></v-img>
          </div>
        </v-col>
        <v-col style="font-size: 36px">

          <div class="white--text">

            <div class="ma-10">
              <v-icon color="white" size="70">{{ gearIcon }}</v-icon>
              <b class="pl-5">over 30k+ users</b></div>
            <div class="ma-10">
              <v-icon color="white" size="70">{{ heartIcon }}</v-icon>
              <b class="pl-5">Perfect Match</b></div>
            <div class="ma-10">
              <v-icon color="white" size="70">{{ smileIcon }}</v-icon>
              <b class="pl-5">Smart Alghoritam</b></div>
            <div class="justify-center d-flex">
              <v-btn @click="registerPage" outlined color="white">Join Now</v-btn>
            </div>
          </div>
          <v-spacer></v-spacer>
        </v-col>
      </v-row>
    </v-img>

    <v-parallax height="500" src="../../public/imgassets/frinedsBackground.png">
      <div class="d-flex justify-center">
        <h1 style="font-size: 400px; color: white">FRIENDS</h1>
      </div>
    </v-parallax>
    <div style="width: 100%; height: fit-content; background-color: black; color: white; font-size: 120px"
         class="pl-4 pr-4  d-flex">
      <h3><b>Hang out</b></h3>
      <v-spacer></v-spacer>
      <h3><b>Connect</b></h3>
      <v-spacer></v-spacer>
      <h3><b>Enjoy</b></h3>
    </div>

    <v-row style="background-color: black" no-gutters justify="center" align="center">
      <v-col>
        <v-parallax height="1050" src="../../public/imgassets/grid1.png"></v-parallax>
      </v-col>

      <v-col>
        <v-row no-gutters>
          <v-col>
            <v-parallax height="525" src="../../public/imgassets/grid2.png"></v-parallax>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col>
            <v-parallax height="525" src="../../public/imgassets/grid3.png">
            </v-parallax>
          </v-col>
        </v-row>
      </v-col>

    </v-row>

  </v-container>
</template>
<script>
import MessageSystemComponent from "@/components/MessageSystemComponent.vue";
import SweetCardDating from "@/components/SweetCardDatingComponent.vue";
import {mdiHeart, mdiEmoticon, mdiAccount} from "@mdi/js";

export default {
  name: "landingPage",
  components: {SweetCardDating, MessageSystemComponent},
  data() {
    return {
      //icons
      smileIcon: mdiEmoticon,
      heartIcon: mdiHeart,
      gearIcon: mdiAccount,
      user: '',
      friend: '',

    };
  },
  methods:
      {
        loginPage() {
          this.$router.push("/login")
        },
        registerPage()
        {
          this.$router.push("/Register")
        }

      }
}


</script>

<style>

.Heading {
  color: #FFF;
  text-align: center;
  font-family: Roboto, serif;
  font-size: 128px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.datingHeading {
  background: linear-gradient(91deg, #EC8888 29.64%, #51A6F5 69.14%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.vibrate-2 {
  animation: vibrate-2 3s linear infinite both
}


/* ----------------------------------------------
 * Generated by Animista on 2023-9-13 9:28:54
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info.
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

@keyframes vibrate-2 {
  0% {
    transform: translate(0)
  }
  20% {
    transform: translate(2px, -2px)
  }
  40% {
    transform: translate(2px, 2px)
  }
  60% {
    transform: translate(-2px, 2px)
  }
  80% {
    transform: translate(-2px, -2px)
  }
  100% {
    transform: translate(0)
  }
}
</style>

