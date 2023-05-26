<template>
  <div>
    <h1>Update Daily Diet</h1>
    <v-card>
      <v-card-title>
        Select Meals
      </v-card-title>
      <v-card-subtitle>
        Choose your meals from the list
      </v-card-subtitle>
      <v-card-text>
        <v-select
            v-model="selectedMeals"
            :items="mealList"
            label="Select Meals"
            multiple
            item-text="name"
            item-value="id"
            item-selected="isSelected"
            dense
        >
          <template v-slot:item="{ item }">
            <span>{{ item.name }} - {{ item.calories }} calories</span>
          </template>
        </v-select>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="saveDailyDiet">Save</v-btn>
      </v-card-actions>
    </v-card>

    <h2>Daily Diet List - {{ getCurrentDate() }}</h2>
    <v-expansion-panels>
      <v-expansion-panel v-for="meal in selectedMealsData" :key="meal.id">
        <v-expansion-panel-header>
          {{ meal.name }} - {{ meal.calories }} calories
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <p>Meal details go here</p>
          <!-- Burada yemek ayrıntılarını görüntülemek için gerekli bileşenleri ekleyebilirsiniz -->
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  name: "UpdateDailyDiet",
  data() {
    return {
      mealList: [
        { id: 1, name: "Oatmeal with Berries", calories: 150, isSelected: false },
        { id: 2, name: "Grilled Chicken Salad", calories: 300, isSelected: false },
        { id: 3, name: "Salmon with Roasted Vegetables", calories: 400, isSelected: false },
        { id: 4, name: "Greek Yogurt with Nuts", calories: 200, isSelected: false },
        { id: 5, name: "Quinoa Salad with Avocado", calories: 250, isSelected: false },
        { id: 6, name: "Steamed Broccoli with Tofu", calories: 180, isSelected: false },
        { id: 7, name: "Whole Wheat Pasta with Tomato Sauce", calories: 350, isSelected: false },
        { id: 8, name: "Spinach and Mushroom Omelette", calories: 200, isSelected: false },
        { id: 9, name: "Turkey Wrap with Vegetables", calories: 300, isSelected: false },
        { id: 10, name: "Baked Sweet Potato with Grilled Chicken", calories: 400, isSelected: false },
      ],
      selectedMeals: [],
    };
  },
  methods: {
    saveDailyDiet() {
      // Seçilen yemekleri günlük diyet listesine kaydetme işlemleri burada yapılabilir
      console.log("Selected Meals:", this.selectedMeals);
    },
    getCurrentDate() {
      const date = new Date();
      return date.toLocaleDateString();
    },
  },
  computed: {
    selectedMealsData() {
      return this.selectedMeals.map(mealId => {
        return this.mealList.find(meal => meal.id === mealId);
      });
    }
  }
};
</script>
