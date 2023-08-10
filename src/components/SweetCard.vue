<template>

  <v-container>
    <Vue2InteractDraggable

        @draggedRight="draggedRight"
        :interact-max-rotation="15"
        :interact-out-of-sight-x-coordinate="3000"
        :interact-x-threshold="500"
        :interact-lock-y-axis="true"
    >


      <v-scroll-y-transition>
        <div v-if="false" class="comment pa-4 ma-2">  <!--Comment secstion-->

          <div>
            <v-avatar class="d-inline">

            </v-avatar>
            <div>username:</div>
            <div>comment</div>
          </div>

          <div>
            <v-text-field
                class="d-inline-flex"
                label="Leave a comment">
            </v-text-field>
            <v-btn class="d-inline-flex">send</v-btn>
          </div>

          <v-btn dark @click="openOrCloseComments()">
            <font-awesome-icon icon="fa-regular fa-message" style=" font-size: 30px; color: white"/>
          </v-btn>
        </div>
      </v-scroll-y-transition>
      <!--      image section-->
      <v-scroll-y-transition style="background-color: aqua;">


        <v-img   max-height="1000" width="100%" :src="randomImageUrl(debugMod)">
          <div class="bottomText" style="top: 0;">
            <v-container class="bg-surface-variant">
              <v-row no-gutters>
                <v-col style="text-align: left;">
                  <v-avatar class="">
                    <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
                  </v-avatar>

                  <p style="text-align: center;" class="d-inline pa-2"> {{ userName }} </p>
                </v-col>


                <v-col class="d-inline pa-2" style="text-align: center;">
                  <p class="d-inline">likes: {{this.numberOfLikesOnPost}}  </p>

                  <p class="d-inline">comments: {{numberOfCommentsOnPost}}  </p>
                </v-col>


                <v-col class="d-inline pa-2" style="text-align: right; ">
                  <v-btn @click="openOrCloseComments()">
                    <font-awesome-icon icon="fa-regular fa-message" style=" font-size: 30px; color: white"/>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>


            <v-expand-transition>
            <div class="pa-5" v-if="isCommentWindowOpen"
                 style=" font-size: 50px; background-color: #9aa7de; color: black; height: 100%">
              <div class="d-flex mt-2">
                <v-avatar class="">
                  <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
                </v-avatar>
                <v-col class="ml-2" style="font-size: 1vw">
                  <v-row>UserName</v-row>
                  <v-row>you are so ugly fuck off!</v-row>
                  <v-row>Replay</v-row>
                </v-col>
              </div>
              <v-divider class="mt-2"></v-divider>

            </div>
            </v-expand-transition>


          </div>
        </v-img>


      </v-scroll-y-transition>


    </Vue2InteractDraggable>
  </v-container>
</template>

<script>
import {Vue2InteractDraggable} from 'vue2-interact'

export default {
  components: {
    Vue2InteractDraggable
  },
  data: () => ({
    isCommentWindowOpen: false,
    numberOfLikesOnPost: "2",
  }),

  props: {
    userName: "User Name",
    imageUrl: "",
    debugMod: false,
    numberOfCommentsOnPost: 0,
    numberOfLikesOnPost: 0,
  },

  name: 'SweetCard',

  methods: {
    randomImageUrl(debugMode) {
      if (debugMode)
      return "https://picsum.photos/id/" + Math.floor(Math.random() * 100) + "/1080/1920/";
      return this.imageUrl;
    },

    openOrCloseComments() {
      this.isCommentWindowOpen = !this.isCommentWindowOpen;
      console.log("nista ne pise?", this.isCommentWindowOpen);
    },

    draggedRight() {
      const element = this.$el;
      setTimeout(() => {
        element.remove();
      }, 300);
    },
  },
};


</script>

<style scoped>
.cardTran {
  opacity: 0;

}

.card {


}

.comment {
  background-color: grey;
  width: 100%;
  border-radius: 20px;
  height: 100%;
}

img {
  width: 100%;
  height: 100%;
  border-radius: 20px;
}

.bottomText {
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;

  color: rgb(235, 235, 235);
  border-radius: 0px 0px 20px 20px;

}

@keyframes animate-pop {
  0% {
    opacity: 0;
    transform: scale(0.5, 0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1, 1);
  }
}

.Vue2InteractDraggable {
  animation-duration: 0.5s;
  animation-name: animate-fade;
  animation-delay: 0.5s;
  animation-fill-mode: backwards;
}


@keyframes animate-fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

</style>





