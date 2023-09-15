<template >
  <v-img class="pa-0  ma-0" src="../../public/imgassets/backgroundSweetMeet.png"  >
    <div class="d-flex justify-center">
      <v-card style="width: 40%"  class="background mt-15 pa-5"  >
        <v-row align="center" justify="center">
          <v-col  justify="center" cols="12">
            <div class="card-border">
              <div class="d-flex justify-center" style="font-size: x-large; color: black">
                <h1 align="left">LOGIN</h1>
              </div>
              <div class="d-flex">
                <h5  align="left" class="d-flex ">dont have Account? </h5>
                <v-btn
                    @click="register()"
                    class="link-left d-flex"
                    text
                    x-small
                    color="blue"
                >
                  Sing in
                </v-btn>
              </div>

              <v-card-text class="card-text-border">
                <v-form v-model="valid">
                  <v-text-field
                      v-model="email"
                      dense
                      label="Email"
                      clearble
                      filled
                      outlined
                      rounded
                      background-color="white"
                      color="blue"
                      type="text"
                      :rules="[rules.required, rules.email]"

                  ></v-text-field>
                  <v-text-field
                      v-model="password"
                      dense
                      label="Password"
                      clearble
                      filled
                      rounded
                      outlined
                      background-color="white"
                      color="blue"
                      :rules="[rules.required, rules.min]"
                      :type="showIcon ? 'text' : 'password'"

                  ></v-text-field>
                </v-form>
                <v-btn
                    @click="openDialog"
                    class="link-left"
                    text
                    x-small
                    color="blue"
                >
                  Forgot password?
                </v-btn>



              </v-card-text>
              <v-card-actions class="card-actions">
                <v-btn @click="login" :disabled="isButtonDisabled" >
                  OK
                </v-btn>
              </v-card-actions>
            </div>
            <v-dialog
                width="300px"
                outlined
                persistent
                v-model="passwordIssuesDialog"
            >
              <v-card class="card-border">
                <v-card-title>E-mail</v-card-title>
                <v-card-subtitle>enter you e-mail</v-card-subtitle>
                <v-card-text>
                  <v-text-field
                      v-model="emailForPassword"
                      dense
                      label="Email"
                      clearble
                      type="text"
                      :rules="[rules.required, rules.email]"
                      outlined
                  ></v-text-field>
                </v-card-text>
                <v-card-actions class="card-actions">
                  <v-btn
                      class="btn-right-margin"
                      color="red darken-3"
                      outlined
                      text

                      small
                      @click="closeDialog"
                  >
                    CLOSE
                  </v-btn>

                  <v-btn outlined text @click="resetPassword(emailForPassword)">
                    SEND
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

          </v-col>
        </v-row>
      </v-card>
    </div>
  </v-img>
</template>
<script>
import {
  auth,
  db,
  doc,
  getDoc,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "../../firebase.js";
import {onAuthStateChanged} from "firebase/auth";
import {mapGetters, mapMutations} from "vuex";
import store from "@/store";

export default {
  name: "LoginView",
  components: {},
  watch: {
    valid: function (newVal, oldVal) {
      if (newVal != true) {
        this.isButtonDisabled = true;
      } else {
        this.isButtonDisabled = false;
      }
    },
  },
  data() {
    return {
      userLoginStatus: false,

      emailForPassword: null,
      passwordIssuesDialog: false,
      isButtonDisabled: false,
      valid: true,
      email: null,
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
  computed: {
    ...mapGetters(
        {
          mail: "getEmail",

        }
    )
  },
  methods: {

    async checkLoginStatus() {
      await onAuthStateChanged(auth, (user) => {
        if (user) {
          this.userLoginStatus = true;
          // ...
        } else {
          this.userLoginStatus = false;
        }
      });
    },
    register() {
      this.$router.push("/register");
    },


    login() {
      let email = this.email;
      let password = this.password;
      signInWithEmailAndPassword(auth, email, password)
          .then(() => {
            if (!this.firstTimeSignIn()) {
              this.$router.push("/info");
            } else {
              this.$router.push("/feed");
            }
          })
          .catch((error) => {
            alert(error.message);
          });
    },

    resetPassword(email) {
      sendPasswordResetEmail(auth, email)
          .then(() => {
            console.log("Email sent");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
      this.closeDialog();
    },
    postActionMoveToView() {
      this.$router.push({path: "/info"});
    },
    async firstTimeSignIn() {
      const docRef = doc(
          db,
          "Users",
          "UserNames",
          auth.currentUser.email,
          "Information"
      );
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        //console.log("Document data:", docSnap.data());

        return true;
      } else {
        // docSnap.data() will be undefined in this case
        return false;
      }
    },
    closeDialog() {
      this.passwordIssuesDialog = false;
    },
    openDialog() {
      this.passwordIssuesDialog = true;
    },
  },
  created() {
    if (this.checkLoginStatus()) {
      //this.$router.push("/test");
    }
  },
  mounted() {

  },
  destroyed() {
  },
};
</script>

<style></style>
