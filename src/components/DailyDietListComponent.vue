<template>
  <v-card>
    <v-card-title>
      <h4>Daily Diet List - {{ getCurrentDate() }} <v-spacer></v-spacer>
        Total Calories - {{ totalCalories }} cal</h4>
    </v-card-title>
    <v-card-actions>

    </v-card-actions>
    <v-card-text>
      <template v-if="meals.length > 0">
        <v-expansion-panels>
          <v-expansion-panel v-for="meal in meals" :key="meal.id">
            <v-expansion-panel-header>
              {{ meal.name }} - {{ meal.calories }} calories
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="meal-details">
                <div class="meal-image">
                  <img :src="getMealImage(meal.name.replace(/ /g, '-'))" alt="meal image" />
                </div>
                <div class="meal-info">
                  <p>{{ meal.details }}</p>
                </div>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </template>
      <template v-else>
        <div class="no-meals-message">
          <p>No diet list available.</p>
        </div>
      </template>
    </v-card-text>
  </v-card>
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
    getMealImage(mealId) {
      return require(`@/assets/meal-images/${mealId}.jpg`);
    },
    getCurrentDate() {
      const date = new Date();
      return date.toLocaleDateString();
    },
  },
  computed: {
    totalCalories() {
      return this.meals.reduce((total, meal) => total + meal.calories, 0);
    },
  },
};
</script>

<style scoped>
.meal-details {
  display: flex;
  align-items: center;
}

.meal-image {
  width: 100px;
  height: 100px;
  margin-right: 16px;
}

.meal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.meal-info {
  flex: 1;
}

.no-meals-message {
  text-align: center;
  margin-top: 16px;
  font-weight: bold;
}
</style>