<template>
  <v-app>
  
    <div class="topbar pa-2">
      <v-row>
        <v-col>
          <v-avatar>
            <img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
            >
          </v-avatar>
        </v-col>
        <v-col style="text-align: center;">
          <h1>SweetMeet</h1>
        </v-col>
        <v-col style="text-align: right; font-size: 3vh;" class="pa-5">
          
      <font-awesome-icon icon="fa-regular fa-bell"  class="ma-2"/> 
      <font-awesome-icon icon="fa-regular fa-heart" class="ma-2"/>
      <font-awesome-icon icon="fa-regular fa-comment" class="ma-2" />
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

export default {
  name: 'App',
  components:
  { //components
    

  },

  data: () => ({
    //
 
   
    
  })
};
</script>



<style scoped>

.topbar
{
 background-color: bisque;
  widows: 100%;
  height: 10%;

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