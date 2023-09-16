<template>
    <v-btn color="warning" @click="updateBlockedUsers()">Block</v-btn>
</template>

<script>
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import {mapMutations} from "vuex";
import {collection, doc, getDoc, getDocs, updateDoc} from "firebase/firestore";
import {db} from "../../firebase";

export default {


  name: 'BlockUserComponent',

  data() {
    return {
      BlockedList: [],
      blockUser: "",
    };
  },
  props: {
    usernameToBlock: "",
    currentUser: String,
  },
  async mounted() {


  },

  methods: {
    async fetchBlockedUsers(username) {
      const docSnap = await getDoc(doc(db, "Users", "UserNames", username, "BlockedUser"));
      if (docSnap.exists()) {
        this.BlockedList = docSnap.data()["Blocked"];
      } else {
        console.log("error");
        return null;
      }
    },

    async updateBlockedUsers() {
      await this.fetchBlockedUsers(this.currentUser);
      this.BlockedList.push(this.usernameToBlock);
      await updateDoc(doc(db, "Users", "UserNames", this.currentUser,"BlockedUser"), {
        Blocked: this.BlockedList,
      });
    },

  },

};
</script>

<style scoped>
.phone-input-container {
  margin: 10px;
}
</style>
