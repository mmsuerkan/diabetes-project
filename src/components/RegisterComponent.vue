<template>
  <v-card
      class="mx-auto"
      max-width="500"
      max-height="500"
      color="primary"
      dark
  >
    <v-card-text>
      <div style="display: flex; justify-content: center; align-items: center">
        <v-toolbar-title class="white--text">DIABETES APP - Register</v-toolbar-title>
      </div>
      <form @submit.prevent="register">
        <v-text-field
            v-model="email"
            label="Email"
            color="white"
        ></v-text-field>
        <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            @click:append="show1 = !show1"
            color="white"
        ></v-text-field>

        <v-select
            v-model="gender"
            :items="genderOptions"
            label="Gender"
            color="white"
        ></v-select>

        <v-btn
            depressed
            color="secondary"
            dark
            type="submit"
            @click="register"
        >
          Register
        </v-btn>
        <v-btn
            depressed
            color="secondary"
            dark
            type="button"
            @click="$router.push('/')"
        >
          Back
        </v-btn>
      </form>
    </v-card-text>
  </v-card>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set,getDatabase } from "firebase/database";

import sweetAlert from "sweetalert";
export default {
  data() {
    return {
      email: '',
      password: '',
      name: '',
      gender: '',
      show1: false,
      genderOptions: ['Male', 'Female', 'Other']
    };
  },
  methods: {
    register () {
      const auth = getAuth();

      const db = getDatabase();
      createUserWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // Write user data to realtime database
            set(ref(db, 'users/' + user.uid), {
              email: user.email,
              gender:this.gender,
              photoURL: user.photoURL,
              // any other user info you want to save...
            });

            sweetAlert("Success!", "You have successfully registered!", "success")

            console.log(user);
            this.$router.push('/');
            // ...
          })
          .catch((error) => {
            sweetAlert("Error!", error.message, "error")
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
          });
    }
  }
};
</script>

<style scoped>
.v-card {
  background-color: #fafafa;
  border-radius: 8px;
}
.v-card-text {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.v-toolbar-title {
  font-size: 24px;
  margin-top: 16px;
  margin-bottom: 32px;
}
</style>
