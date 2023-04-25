<template>
  <v-app>
  
    <div class="topbar">
      <h1>Sweet Meet</h1> 
    
    </div>
    
    <div class="mainbar">

      <v-container class="bg-surface-variant">
        <v-row no-gutters>
          <v-col style="text-align: left;">
           <p>side Chicks</p>
          </v-col>
          <v-col style="text-align: center;">
         
             <sweet-card imeKorisnika="Markan" v-for="elem in elements" :key="elem"></sweet-card>
           
          </v-col>
          <v-col style="text-align: right;">
          <div ></div>
          

              <p class="d-inline pa-2"> Profile Account</p>
              
              <v-avatar class="d-inline pa-2">
                <v-img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                ></v-img>
              </v-avatar>
          

         

            
          </v-col>
          
        </v-row>
       
      </v-container>
      
    </div>
    
   
    <div class="bottom">
    
    </div>
      
    

    



  </v-app>

</template>

<script>
// imports
import SweetCard from './views/SweetCard.vue';

let elements = [123,213];
let post ={
profileName : "Yohn",
likes: 231
};




export default {
  name: 'App',
  components:
  { //components
    SweetCard

  },

  data: () => ({
    //
    elements : elements,
    test : "fuk",
    imeKorisnika:"markan",
   
    
  })
};
</script>



<style scoped>

.topbar
{
  background-color: aqua;
  widows: 100%;
  height: 10%;

}


.mainbar
{


}

.bottom
{

  position: absolute;
  display: fixed;
  bottom: 0px;
  width: 100%;
  height: 50px;
  
  
}
</style>