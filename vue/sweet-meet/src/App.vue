<template>
  <v-app>
  
    <div class="topbar">

    <v-row>
      <v-col><h1>Sweet Meet</h1> </v-col>
      <v-col><v-spacer></v-spacer></v-col>
      
      <v-col sm="3"> <h3 style="text-align: left;">login</h3></v-col>
      
      
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

*
{
  padding: 0px;
  margin: 0px;
}
.topbar
{
  background-color: rgb(255, 255, 255);


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