<template>
<v-container>



<div  class="card">
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
                <p style="text-align: center;" class="d-inline pa-2" > Yohni</p>
               
                
              </v-col>
              <v-col class="d-inline pa-2" style="text-align: center;">
              <p >likes</p>
                
                
              </v-col>
              <v-col class="d-inline pa-2" style="text-align: right;">
                
                <font-awesome-icon icon="fa-regular fa-message" style="font-size: 30px;" />

              </v-col>
             
            </v-row>
           
          </v-container>


    </div>
   
    
</div>

<div class="card">
    <img src="https://picsum.photos/200/300" alt="" srcset="">
    


 
   
</div>   

</v-container>
</template>



<script>



</script>

<style scoped>
.card
{
margin: 10px;
padding: 10px;
width: 100%;
height: fit-content;


}

img
{
    width: 100%;
    border-radius: 30px;
    z-index: -1;
    
    
    
}

.bottomText
{
  color: rgb(235, 235, 235);
   z-index: 111;
    margin-top: -100px;
    background: linear-gradient(0deg, rgba(8,5,50,1) 0%, rgba(0,212,255,0) 100%);
    border-radius: 30px;
   
   


}

</style>






