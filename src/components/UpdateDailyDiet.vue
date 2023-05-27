<template>
  <div>
    <h1> Daily Diet List </h1>
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
    <daily-diet-list-component :meals="selectedMealsData"></daily-diet-list-component>
  </div>
</template>


<script>
import DailyDietListComponent from "@/components/DailyDietListComponent.vue";
import { getAuth } from "firebase/auth";
import { ref, onValue, set } from "firebase/database";
import { getDatabase } from "firebase/database";

export default {
  name: "UpdateDailyDiet",
  components: {DailyDietListComponent},
  data() {
    return {
      mealList: [],
      selectedMeals: [],
    };
  },
  methods: {

    fetchUserDiet() {
      const auth = getAuth();
      const user = auth.currentUser;
      const db = getDatabase();

      if (user) {
        const userRef = ref(db, 'users/' + user.uid + '/diet/');
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const mealIds = Object.values(data).map(meal => meal.id);
            this.selectedMeals = mealIds;
          }
        });
      } else {
        console.log("No user is signed in");
      }
    },

    uploadInitialMealData() {
      const db = getDatabase();


      const initialMeals = [
        { id: 1, name: "Oatmeal with Berries", calories: 150 },
        { id: 2, name: "Grilled Chicken Salad", calories: 300 },
        { id: 3, name: "Salmon with Roasted Vegetables", calories: 400 },
        { id: 4, name: "Greek Yogurt with Nuts", calories: 200 },
        { id: 5, name: "Quinoa Salad with Avocado", calories: 250 },
        { id: 6, name: "Steamed Broccoli with Tofu", calories: 180 },
        { id: 7, name: "Whole Wheat Pasta with Tomato Sauce", calories: 350 },
        { id: 8, name: "Spinach and Mushroom Omelette", calories: 200 },
        { id: 9, name: "Turkey Wrap with Vegetables", calories: 300 },
        { id: 10, name: "Baked Sweet Potato with Grilled Chicken", calories: 400 },
      ];

      initialMeals.forEach(meal => {
        set(ref(db, 'meals/' + meal.id), {
          name: meal.name,
          calories: meal.calories,
        });
      });
    },
    fetchMealData() {
      const db = getDatabase();
      const mealRef = ref(db, 'meals/');
      onValue(mealRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          let formattedData = Object.keys(data).map(key => {
            return {
              id: key,
              name: data[key].name,
              calories: data[key].calories,
              isSelected: false,
            };
          });
          this.mealList = formattedData;
        }
      });
    },
    saveDailyDiet() {
      const auth = getAuth();
      const user = auth.currentUser;
      const db = getDatabase();

      if (user) {
        const timestamp = Date.now();
        const date = new Date(timestamp);
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
        const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

        const userRef = ref(db, `users/${user.uid}/diet/${formattedDate}_${time}`);
        set(userRef, this.selectedMealsData);
      } else {
        console.log("No user is signed in");
      }
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
    },
    totalCalories() {
      return this.selectedMealsData.reduce((total, meal) => total + meal.calories, 0);
    }
  },
  mounted() {
   // this.uploadInitialMealData(); // Bu satırı veri yüklendikten sonra yorum satırına alabilirsiniz.
    this.fetchMealData();
    this.fetchUserDiet();
  },
};
</script>