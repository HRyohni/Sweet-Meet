<template>

      <v-autocomplete
          v-model="username"
          :items="itemArray"
          rounded

          label="Search user "
      >

        <template v-slot:append-outer>
            <v-icon @click=" goToProfile(username)" v-text="icon" ></v-icon>
        </template>
      </v-autocomplete>




</template>
<script>
import {db, doc, getDoc} from "../../firebase";
import router from "@/router";
import {mdiSearchWeb} from '@mdi/js'
export default {

  data() {return{
      itemArray: ["test","test1","test2","test3"],
      itemArray1: [],
    username:"",
    icon: mdiSearchWeb,
    }
  },
  props:{

  },
  async mounted() {

    await this.fetchAllUsernames();
  },
  methods:
      {
       async fetchAllUsernames()
        {
          const docSnap = await getDoc(doc(db, "Users", "UserNames"));
          if (docSnap.exists()) {
            this.itemArray = docSnap.data()["ListOfAllUsernames"];

          } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
          }
        },

        goToProfile(username)
        {
          this.username = "";
          if (username)
          router.push("/profile/"+username)
          window.location.reload()
        },

      }

}
</script>