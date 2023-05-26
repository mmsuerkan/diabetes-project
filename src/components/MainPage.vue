<template>
  <v-card>
    <v-toolbar
        color="primary"
        dark
        flat
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>DIABETES APP</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <!-- Logout button -->
      <v-btn @click="logout">
        <v-icon
            dark
            right
        >
          mdi-checkbox-marked-circle
        </v-icon>
        Logout
      </v-btn>

      <template v-slot:extension>
        <v-tabs
            v-model="tab"
            align-with-title
        >
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab
              v-for="item in items"
              :key="item"
          >
            {{ item.name }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item
          v-for="item in items"
          :key="item.route"
      >
        <v-card flat>
          <component :is="item.component"></component>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import UploadBloodSugar from '@/components/UploadBloodSugar.vue';
import ChartsComponent from '@/components/ChartsComponent.vue';
import GuideComponent from '@/components/GuideComponent.vue';
import ProfileComponent from "@/components/ProfileComponent.vue";
import UpdateDailyDiet from "@/components/UpdateDailyDiet.vue";

export default {
  data () {
    return {
      tab: null,
      items: [
        { name: 'Upload Blood Sugar', route: '/UploadBloodSugar', component: UploadBloodSugar },
        { name: 'Graphs', route: '/ChartsComponent', component: ChartsComponent },
        { name: 'Guide', route: '/GuideComponent', component: GuideComponent },
        { name: 'Daily Diet Lıst', route: '/UpdateDailyDiet', component: UpdateDailyDiet },
        { name: 'Profile', route: '/ProfileComponent', component: ProfileComponent },
      ],
      // ...
    }
  },
  methods: {
    logout() {
      this.$router.push({name: 'LoginPage'});
    }
  },
  // ...
}
</script>