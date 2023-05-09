<template>


  <Vue2InteractDraggable 
 
  @draggedRight="draggedRight"
  :interact-max-rotation="15"
  :interact-out-of-sight-x-coordinate="3000"
  :interact-x-threshold="500"
  :interact-lock-y-axis="true"
>
  <div  class="card" >
  
    <img src="https://picsum.photos/1080/1920" alt="" srcset=""  >
    <div  class="bottomText">
      <v-container class="bg-surface-variant">
          <v-row no-gutters>
            <v-col style="text-align: left;">
              <v-avatar class="">
                  <v-img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                   
                  ></v-img>
                 
                
              
              </v-avatar>
              <p style="text-align: center;" class="d-inline pa-2" > {{imeKorisnika}}  </p>
             
              
            </v-col>
            <v-col class="d-inline pa-2" style="text-align: center;">
            <p >likes </p>
              
              
            </v-col>
            <v-col class="d-inline pa-2" style="text-align: right;">
              
              <font-awesome-icon icon="fa-regular fa-message" style="font-size: 30px;" />

            </v-col>
           
          </v-row>
         
        </v-container>


  </div>
    
   
    
</div>
</Vue2InteractDraggable>





</template>



<script>

import { Vue2InteractDraggable } from 'vue2-interact'


export default {
  name: 'SweetCard',
  components: {
    Vue2InteractDraggable
  },
 props:{
  kurac: String, 
  marko : String,
  imeKorisnika: String, 
 
 },
 methods: {

  draggedRight() {
    const element = this.$el;
    //element.style.transition = 'opacity 0.3s ease-in-out';
    //element.style.opacity = "0";
    console.log(element.style.width);
    //element.style.width = "0"

  
   
      setTimeout(() => {
        element.remove();
        
        //element.style.height = "0";

        
      }, 500);

     
    },

    delit() {
      
    this.isShowing = false;
     
    }
  },

    

};


</script>

<style scoped>



.cardTran
{
opacity: 0;

}
.card
{

position: relative;
margin: 10px;
width: 100%;
height: fit-content;

animation-duration: 0.5s;
animation-name: animate-fade;
animation-delay: 0.5s;
animation-fill-mode: backwards;


}

img
{
  

    width: 100%;
    border-radius: 20px;

    
}

.bottomText
{

  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
 


  color: rgb(235, 235, 235);
   
    
    background: linear-gradient(0deg, rgb(31, 31, 32) 0%, rgba(0,212,255,0) 100%);
    border-radius: 20px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
   
   


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

.Vue2InteractDraggable
{
  animation-duration: 0.5s;
  animation-name: animate-fade;
  animation-delay: 0.5s;
  animation-fill-mode: backwards;
}



@keyframes animate-fade {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

</style>






