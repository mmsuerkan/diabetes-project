<template>
  <v-container fill-height fluid class="d-flex justify-center align-center">
    <v-card class="mx-auto" style="width: 50%">
      <v-toolbar color="deep-purple accent-4" dark>
        <v-toolbar-title class="white--text" style="margin:auto">DIABETES APP - Register</v-toolbar-title>
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
          <v-text-field
              v-model="passwordConfirm"
              :rules="passwordConfirmRules"
              :append-icon="showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPasswordConfirm ? 'text' : 'password'"
              label="Confirm Password"
              @click:append="showPasswordConfirm = !showPasswordConfirm"
          ></v-text-field>
          <v-text-field
              v-model="name"
              label="Full Name"
              required
          ></v-text-field>
          <v-select
              v-model="gender"
              :items="genderOptions"
              label="Gender"
              required
          ></v-select>
          <v-btn :disabled="!valid" color="primary" class="mr-4" @click="validate">Register</v-btn>
          <v-btn color="primary" @click="$router.push('/')">Back</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { ref, set,getDatabase } from "firebase/database";
import sweetAlert from "sweetalert";

export default {
  data: () => ({
    valid: true,
    showPassword: false,
    showPasswordConfirm: false,
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    gender: '',
    genderOptions: ['Male', 'Female', 'Other'],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    passwordRules: [
      v => !!v || 'Password is required',
    ],
    passwordConfirmRules: [
      v => !!v || 'Password confirmation is required',
      v => v === this.password || 'Password must match',
    ],
  }),
  methods: {
    validate () {
      this.passwordConfirmRules = [
        v => !!v || 'Password confirmation is required',
        v => v === this.password || 'Password must match',
      ];
      if (this.$refs.form.validate()) {
        this.register();
      }
    },
    async register() {
      const auth = getAuth();
      const db = getDatabase();
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password)
        const user = userCredential.user;
        // Write user data to realtime database
        await set(ref(db, 'users/' + user.uid), {
          email: user.email,
          gender:this.gender,
          name: this.name,
          // any other user info you want to save...
        });
        await sendEmailVerification(user)
        sweetAlert("Success!", "You have successfully registered! Please verify your email address.", "success")
        this.$router.push('/');
      } catch (error) {
        sweetAlert("Error!", error.message, "error")
      }
    }
  },
};
</script>
