<template>
  <v-app>
    <v-main>
      <router-view
          :societies="societies"
      ></router-view>
    </v-main>
  </v-app>
</template>

<script>
const axios = require('axios');
export default {
  name: 'App',

  data: () => ({
    //
    societies : []
  }),
  methods : {
    async fetchData() {
      // fetch products
      await axios.get("https://tedu-app.herokuapp.com/staff/get-all-society/")
          .then(res => this.societies = res.data)
          .catch(err => console.log(err))
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>
