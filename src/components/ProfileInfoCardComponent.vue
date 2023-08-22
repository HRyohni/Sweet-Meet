<template>
  <v-card :color="this.cardColor">
    <v-img height="300px" cover :src="this.backgroundImage">


      <v-app-bar flat color="rgba(0, 0, 0, 0)">
        <v-spacer></v-spacer>
      </v-app-bar>

      <v-card-title class="white--text ">
        <v-avatar size="100" class="ml-10 mx-auto text-md-h3">
          <v-img class="elevation-10" alt="user" :src="this.profilePicture"></v-img>
        </v-avatar>

        <div class="ml-3  text-lg-h3  d-inline">{{ this.displayName }}</div>

        <v-card-text>
          <h3 class=" ml-3 d-inline">followers: {{ this.followersCount }} following: {{ this.followersCount }}</h3>
          <h3 class="ml-3    ">{{ this.firstName + " " + this.secondName }}</h3>
        </v-card-text>

      </v-card-title>


    </v-img>
    <!--    <v-btn v-if="userAdmin"  style="font-size:10px" class="align-center">edit profile picture</v-btn>-->
    <v-icon icon="mdi-information"></v-icon>
    <v-card-text>

      <div class="font-weight-bold ml-8 mb-2 white--text"><b>About Me:</b></div>
      <div>
        <h4 class="white--text">
          {{ profileDescription }}
        </h4>
        <v-btn v-if="userAdmin" class="d-inline  mt-5  font-weight-light pa-1  " style="font-size: 1em">Edit</v-btn>
        <!--         TODO: remove userAdmin !-->
        <v-btn v-if="!isUserFollowed && !userAdmin" @click="follow()" class="d-inline  mt-5 red  font-weight-light pa-1" style="font-size: 1em">Follow </v-btn>
        <v-btn v-if="isUserFollowed && !userAdmin" @click="unFollow()" class="d-inline  mt-5 blue  font-weight-light pa-1" style="font-size: 1em">Un Follow</v-btn>
      </div>
    </v-card-text>
  </v-card>


</template>

<script>


import {collection, doc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import {auth, db} from "../../firebase";

export default {
  name: 'ProfileInfoCard',

  data: () => ({
    // following system
    profileUserFollowing: [],
    profileUserFollowers: [],
    userFollowing: [],
    isUserFollowed: true,
    test: "wat",
  }),

  props: {
    profileDescription: "",
    displayName: "",
    firstName: "",
    secondName: "",
    userAdmin: false,
    profilePicture: "",
    backgroundImage: "",
    cardColor: "",
    followersCount: "",


  },

  async mounted() {
    await this.fetchFollowingAndFollowers();
    await this.fetchUsersFollowing();
    await this.checkUserFollowed();

  },
  methods: {

    async fetchFollowingAndFollowers() {
      let querySnapshot = await getDocs(collection(db, "Users", "UserNames", this.displayName, "Information", "Followers"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        this.profileUserFollowers = doc.data()["Followers"];
        this.profileUserFollowing = doc.data()["Following"];
      });
    },

    async fetchUsersFollowing() {
      let querySnapshot = await getDocs(collection(db, "Users", "UserNames", auth.currentUser.displayName, "Information", "Followers"));
      querySnapshot.forEach((doc) => {
        this.userFollowing = doc.data()["Following"];
      });
    },


    async follow() {
      const currentUserUid = auth.currentUser.displayName;
// Check if the user is already following
      await this.fetchUsersFollowing();
      await this.fetchFollowingAndFollowers();

      if (!this.profileUserFollowers.includes(currentUserUid)) {
        await updateDoc(doc(db, "Users", "UserNames", this.displayName, "Information", "Followers", "Following"), {
          Followers: [...this.profileUserFollowers, currentUserUid],
        });

        await updateDoc(doc(db, "Users", "UserNames", currentUserUid, "Information", "Followers", "Following"), {
          Following: [...this.userFollowing, this.displayName],
        });
      }


      // Fetch updated following and followers
      await this.fetchFollowingAndFollowers();
      await this.checkUserFollowed();


    },

    async unFollow() {
      await this.fetchFollowingAndFollowers();
      await this.checkUserFollowed();


      if (this.checkUserFollowed()) {

        const currentUserUid = auth.currentUser.displayName;

        let updatedFollowing = [];
        for (let userFollowingElement of this.userFollowing)
          if (userFollowingElement !== this.displayName)
            updatedFollowing.push(userFollowingElement)

        // Remove the followed user from the current user's following list
        console.log(updatedFollowing);
        await updateDoc(
            doc(db, "Users", "UserNames", currentUserUid, "Information", "Followers", "Following"),
            {Following: updatedFollowing}
        );

        // Remove the current user from the followed user's followers list
        const updatedFollowers = this.profileUserFollowers.filter(user => user !== currentUserUid);
        await updateDoc(
            doc(db, "Users", "UserNames", this.displayName, "Information", "Followers", "Following"),
            {Followers: updatedFollowers}
        );

        // Fetch updated following and followers
        await this.fetchFollowingAndFollowers();
        await this.checkUserFollowed();


      }
    },


    async checkUserFollowed() {

      this.isUserFollowed = this.profileUserFollowers.includes(auth.currentUser.displayName);
    }


  }

}

</script>