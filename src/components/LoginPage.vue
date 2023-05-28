<template>
  <v-container fill-height fluid class="d-flex justify-center align-center">
    <v-card class="mx-auto" max-width="700">
      <v-toolbar color="deep-purple accent-4" dark>
        <v-toolbar-title class="white--text" style="margin:auto">DIABETES APP</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Email"
              required
          ></v-text-field>
          <v-text-field
              v-model="password"
              :rules="passwordRules"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              @click:append="showPassword = !showPassword"
          ></v-text-field>
          <v-row>
            <v-col cols="12">
              <v-btn :disabled="!valid" color="primary" class="mr-4" @click="enter">Sign in</v-btn>
              <v-btn color="primary" @click="register" class="mr-4">Register</v-btn>
            </v-col>
            <v-col cols="12">
              <v-btn text @click="goToForgotPasswordPage">Forgot Password?</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";
import sweetAlert from "sweetalert";

export default {
  data: () => ({
    valid: true,
    showPassword: false,
    email: '',
    password: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    passwordRules: [
      v => !!v || 'Password is required',
    ],
  }),
  methods: {
    goToForgotPasswordPage() {
      this.$router.push({name: 'ForgotPassword'});
    },
    validate () {
      if (this.$refs.form.validate()) {
        this.enter();
      }
    },
    async enter() {
      const auth = getAuth();
      try {
        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password)
        const user = userCredential.user;
        if(!user.emailVerified) {
          sweetAlert("Error", "Please verify your email before logging in.", "error");
          return;
        }
        sweetAlert("Success", `${user.email} You are logged in`, "success");
        this.$router.push({name: 'MainPage'});
      } catch (error) {
        sweetAlert("Error", error.message, "error");
      }
    },
    register() {
      this.$router.push({name: 'RegisterPage'});
    },
  },
}
</script>
