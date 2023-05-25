<template>

  <v-card
      class="mx-auto"
      max-width="500"
      max-height="500"

  >
    <v-card-text>
      <div style="display : flex ; text-align: center; justify-items: center">

        <v-toolbar-title>DIABETES APP</v-toolbar-title>
      </div>
      <form>
        <v-text-field
            v-model="email"
            label="Email"
        ></v-text-field>
        <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            @click:append="show1 = !show1"
        ></v-text-field>

        <v-btn
            depressed
            color="primary"
            @click="enter"
        >
          Sign in
        </v-btn>
        <!-- araya mesafe bırak-->

        <v-btn
            depressed
            color="primary"
            @click="register"
        >
          Register
        </v-btn>

      </form>
    </v-card-text>
  </v-card>
</template>
<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import sweetAlert from "sweetalert";
export default {
  components: {},
  data: () => ({
    password: '',
    email: '',
    isLogin: false,
    show1: false
  }),

  methods: {
    async enter(e) {
      e.preventDefault();
      const auth = getAuth();

      signInWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            sweetAlert("Success", user.email + "You are logged in", "success");
            this.$router.push({name: 'MainPage'});
            // ...
          })
          .catch((error) => {

            const errorMessage = error.message;
            sweetAlert("Error", errorMessage, "error");
          });

    },
    async register(e) {
      e.preventDefault();

      this.$router.push({name: 'RegisterPage'});
    },

  },

}
</script>
