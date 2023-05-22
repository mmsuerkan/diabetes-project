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
import Tab1Component from '@/components/UploadBloodSugar.vue';
import Tab2Component from '@/components/ChartsComponent.vue';

export default {
  data () {
    return {
      tab: null,
      items: [
        { name: 'Upload Blood Sugar', route: '/Tab1Component', component: Tab1Component },
        { name: 'Charts', route: '/Tab2Component', component: Tab2Component },
        { name: 'Guide', route: '/Tab2Component', component: Tab2Component },
        { name: 'Update Daily Diet', route: '/Tab2Component', component: Tab2Component },
        { name: 'Profile', route: '/Tab2Component', component: Tab2Component },
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