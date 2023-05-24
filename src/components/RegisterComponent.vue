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
        >
          Register
        </v-btn>
        <v-btn
            depressed
            color="secondary"
            dark
            type="submit"
            @click="$router.push('/')"
        >
          Back
        </v-btn>
      </form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      birthDate: null,
      gender: '',
      show1: false,
      genderOptions: ['Male', 'Female', 'Other']
    };
  },
  methods: {
    register() {
      // Register işlemlerini burada gerçekleştirin
      // Örneğin, Firebase'e bağlanma ve kayıt işlemlerini bu kısımda gerçekleştirin
      // this.email, this.password, this.birthDate ve this.gender değerlerini kullanarak kayıt işlemlerini gerçekleştirin
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
