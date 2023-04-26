<template>
<v-container
v-on="draggedRight"

@delit="delit"
>
<h1>otorinolaringologija</h1>


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




</v-container>
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
      console.log("dragged Right!");
     debugger
      this.$parent.$delete;
      this.isShowing = false;
      this.$el.isShowing = false;
      console.log(this.$el);
    
    },

    delit() {
      
    this.isShowing = false;
     
    }
  },
  hideCard() {
    this.isShowing = false;
  
      setTimeout(() => {
        this.isShowing = false;
      }, 200);
      setTimeout(() => {
        this.isShowing = true;
      }, 1000);
    }

  
  


};


</script>

<style scoped>
.card
{

position: relative;
margin: 10px;
width: 100%;
height: fit-content;


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

</style>






