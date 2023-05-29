<template>
  <v-app>
  
    <div class="topbar pa-2">
      <v-row>
        <v-col>
       <h1>Hello, {{this.userName}}</h1>
       <v-btn color="dark" @click="UsernamePlacement()">refresh</v-btn>
        </v-col>
        <v-col style="text-align: center;">
      
          <div>
            <v-text-field
              label="Search"
             
              hide-details="auto"
            ></v-text-field>
           
          </div>
        </v-col>
        <v-col style="text-align: right; font-size: 3vh;" class="pa-5">
          
      
          <v-btn color="red" elevation="12">Sign Out</v-btn>

        </v-col>
      </v-row>
     
      
    </div>
    
    
    <router-view ></router-view>
   
    <div class="bottom">
    
    </div>
      
    

    



  </v-app>

</template>

<script>
// imports
import {auth} from "../firebase.js";

export default {
  name: 'App',
  components:
  { //components
    

  },

  data: () => ({
    //
    userName: "test"
   
    
  }),
  methods:
  {
    mounted()
    {
      this.UsernamePlacement()
      console.log("kurac");
    },
    UsernamePlacement()
    {
      this.userName = "kurac"
      console.log(auth == null);
    }
  }
  
};
</script>



<style scoped>

.topbar
{
 
  widows: 100%;
  height: 5%;

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