<template>
  <div>
    <h2>Daily Diet List - {{ getCurrentDate() }} - Total Calories - {{ totalCalories}}</h2>
    <v-expansion-panels>
      <v-expansion-panel v-for="meal in meals" :key="meal.id">
        <v-expansion-panel-header>
          {{ meal.name }} - {{ meal.calories }} calories
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <p>Meal details go here</p>
          <!-- You can add the components needed to display meal details here -->
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  name: "DailyDietListComponent",
  props: {
    meals: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getCurrentDate() {
      const date = new Date();
      return date.toLocaleDateString();
    },
  },
  computed:{
    totalCalories() {
      return this.meals.reduce((total, meal) => total + meal.calories, 0);
    }
  }
};
</script>