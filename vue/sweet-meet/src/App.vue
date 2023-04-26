<template>
  <v-app>
  
    <div class="topbar">
      <h1>Sweet Meet</h1> 
    
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