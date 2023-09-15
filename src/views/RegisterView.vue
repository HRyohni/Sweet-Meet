<template>
  <v-img class="pa-0 ma-0"   src="../../public/imgassets/backgroundSweetMeet.png">
    <div  style="position: absolute;">
      <v-img style="left: 45%;" width="1000" src="../../public/imgassets/blob.png"></v-img>
    </div>
  <v-container  fluid class="background mt-15">

    <v-row align="center" justify="center">
      <v-col align="center" justify="center" cols="12">

        <v-card class="card-border" width="600px" outlined>
          <div class="d-flex justify-center">
            <v-card-title style="font-size: x-large">REGISTER</v-card-title>
          </div>

          <v-card-text>
            <v-form v-model="valid">
              <v-text-field
                  v-model="firstName"
                  dense
                  label="User Name"
                  clearble
                  type="text"
                  outlined
              ></v-text-field>

              <v-text-field
                  v-model="email"
                  dense
                  label="Email"
                  clearble
                  type="text"
                  :rules="[rules.required, rules.email]"
                  outlined
              ></v-text-field>
              <v-text-field
                  v-model="password"
                  dense
                  label="Password"
                  clearble
                  :append-icon="showIcon ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="showIcon ? 'text' : 'password'"
                  outlined
              ></v-text-field>
            </v-form>
          </v-card-text>
          <p class="d-inline" style="font-size: 12px;"> Already have account?</p>
          <v-btn
              @click="login()"
              class="link-left d-inline"
              text
              x-small
              color="blue"
          >
            Log in
          </v-btn>

          <v-card-actions class="card-actions">

            <v-btn
                class="btn-right-margin"
                @click="clearFormData"
                color="red darken-3"
                outlined
            >
              CLEAR
            </v-btn>
            <v-btn :disabled="isButtonDisabled" outlined @click="registerUser">
              OK
            </v-btn>
          </v-card-actions>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
  </v-img>

</template>

<script>
import {
  doc,
  auth,
  db,
  setDoc,

  createUserWithEmailAndPassword,
} from "../../firebase.js";

import { getAuth, updateProfile } from "@firebase/auth";
import {getDoc} from "firebase/firestore";

export default {
  name: "RegistrationView",
  components: {},
  watch: {
    valid: function (isValid) {
      this.isButtonDisabled = isValid !== true;
    },
  },
  data() {
    return {
      isButtonDisabled: false,
      valid: true,
      firstName: null,
      email: null,
      displayName: null,
      password: null,
      showIcon: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v?.length >= 6 || "Min 6 characters",
        email: (v) =>
            !v ||
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            "E-mail must be valid",
      },
    };
  },
  created() {
  },
  async mounted() {
  },
  destroyed() {
  },
  methods: {
    clearFormData() {
      this.displayName = null;

      this.email = null;
      this.password = null;
    },
    postActionMoveToView() {
      this.$router.push({path: "/info"});
    },
    async saveAdditionalData(user, email, firstName, lastName) {
      await setDoc(doc(db, "Users", "UserNames", firstName, "Information"), {
        Email: email,
        displayName: firstName,
        AuthorisationType: "USER",
      });
      await setDoc(doc(db, "Users", "UserNames", firstName, "Information", "Profile", "Data"), {});
    },
    async registerUser() {
      if (await this.checkIfUserNameExists(this.firstName))
      {
        console.log("fuck off");
        alert("user already exists");
        return "error"
      }

      const email = this.email;
      const password = this.password;

      createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            const firstName = this.firstName;
            const lastName = this.lastName;

            updateProfile(auth.currentUser, {
              displayName: this.firstName,
            }).then(() => {
              // Profile updated!
              // ...
            }).catch((error) => {
              // An error occurred
              // ...
            });

            this.saveAdditionalData(user, email, firstName, lastName);
            this.UpdateProfile();
            this.postActionMoveToView();


          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error, errorCode, errorMessage);
          });


    },


    UpdateProfile() {
      updateProfile(auth.currentUser, {
        displayName: this.displayName
      }).then(() => {
        // Profile updated!
        console.log("updated!");
        // ...
      }).catch((error) => {
        // An error occurred
        console.log("fuck");
      });
    },

    login() {

      this.$router.push("/login");
    },
    async checkIfUserNameExists(username)

    {
      let usernameList = [];
      const docRef = doc(
          db,
          "Users",
          "UserNames",
      );

      const docSnap = await getDoc(docRef);


      if (docSnap.exists()) {
        // setup display name
        usernameList = docSnap.data().ListOfAllUsernames;
        return usernameList.includes(username);

      } else {
        // docSnap.data() will be undefined in this case
        console.log("cant find nothing");
        await this.$router.push("/")
      }

    },
  },
};
</script>

<style>
.card-border {
  padding: 2%;
}

.card-text-border {
  padding: 2.5%;
}

.card-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.btn-right-margin {
  margin-right: 2%;
}
</style>
