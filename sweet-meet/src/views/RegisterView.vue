<template>
  <v-container fill-height fluid class="background">
    <v-row align="center" justify="center">
      <v-col align="center" justify="center" cols="12">
        <v-card class="card-border" width="600px" outlined>
          <v-card-title align="left">REGISTER</v-card-title>
          <v-card-subtitle align="left">
            Deer user, plz register
          </v-card-subtitle>
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
            <v-btn
              @click="login()"
              class="link-left"
              text
              x-small
              color="blue"
            >
              Alerady have account?
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
</template>

<script>
import {
  doc,
  auth,
  db,
  setDoc,
  createUserWithEmailAndPassword,
} from "../../firebase.js";
export default {
  name: "RegistrationView",
  components: {},
  watch: {
    valid: function (isValid) {
      this.isButtonDisabled = isValid != true;
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
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    clearFormData() {
      this.displayName = null;
      
      this.email = null;
      this.password = null;
    },
    postActionMoveToView() {
      this.$router.push({ path: "/info" });
    },
    async saveAdditionalData(user, email, firstName, lastName) {
      await setDoc(doc(db, "Users","UserNames", email,"Information"), {
        Email: email,
        displayName: firstName,
        AuthorisationType: "USER",
      });
    },
    registerUser() {
      const email = this.email;
      const password = this.password;
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          const firstName = this.firstName;
          const lastName = this.lastName;

          this.saveAdditionalData(user, email, firstName, lastName);
          this.postActionMoveToView();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error, errorCode, errorMessage);
        });
    },
    login()
    {
    
      this.$router.push("/login");
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
