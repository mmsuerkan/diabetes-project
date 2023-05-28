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

    <v-container fluid>
      <v-row>
        <v-col
            v-for="(dietList, index) in userDietLists"
            :key="index"
            cols="12"
            sm="6"
            md="4"
            lg="3"
        >
          <daily-diet-list-component
              :meals="dietList"
              @delete-diet="deleteDiet(index)"
          ></daily-diet-list-component>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import DailyDietListComponent from "@/components/DailyDietListComponent.vue";
import { getAuth } from "firebase/auth";
import { ref, onValue, set, remove  } from "firebase/database";
import { getDatabase } from "firebase/database";

export default {
  name: "UpdateDailyDiet",
  components: { DailyDietListComponent },
  data() {
    return {
      mealList: [],
      selectedMeals: [],
      userDietLists: [],
    };
  },
  methods: {
    fetchUserDiet() {
      const auth = getAuth();
      const user = auth.currentUser;
      const db = getDatabase();

      if (user) {
        const userDietRef = ref(db, `users/${user.uid}/diet/`);
        onValue(userDietRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const dietLists = Object.values(data);
            this.userDietLists = dietLists;
            localStorage.setItem('userDietLists', JSON.stringify(dietLists));
          }
        });
      } else {
        console.log("No user is signed in");
      }
    },
    /*
        uploadInitialMealData() {
          const db = getDatabase();

          const initialMeals = [
            { id: 1, name: "Oatmeal with Berries", calories: 150, details: "A healthy breakfast option made with oats and topped with fresh berries.", imageUrl: "https://d2t88cihvgacbj.cloudfront.net/manage/wp-content/uploads/2016/02/Triple-Berry-Oatmeal-Breakfast-Bowl-3.jpg?x96187" },
            { id: 2, name: "Grilled Chicken Salad", calories: 300, details: "A delicious salad made with grilled chicken, mixed greens, and a variety of vegetables.", imageUrl: "https://example.com/image1.jpg" },
            { id: 3, name: "Salmon with Roasted Vegetables", calories: 400, details: "Baked salmon served with a side of roasted vegetables, seasoned with herbs and spices.", imageUrl: "https://example.com/image2.jpg" },
            { id: 4, name: "Greek Yogurt with Nuts", calories: 200, details: "Creamy Greek yogurt topped with a mix of nuts for added crunch and protein.", imageUrl: "https://example.com/image3.jpg" },
            { id: 5, name: "Quinoa Salad with Avocado", calories: 250, details: "A refreshing salad made with quinoa, avocado, cherry tomatoes, and a light lemon dressing.", imageUrl: "https://example.com/image4.jpg" },
            { id: 6, name: "Steamed Broccoli with Tofu", calories: 180, details: "Steamed broccoli served with tofu cubes and a drizzle of soy sauce.", imageUrl: "https://example.com/image5.jpg" },
            { id: 7, name: "Whole Wheat Pasta with Tomato Sauce", calories: 350, details: "Whole wheat pasta tossed in a flavorful tomato sauce, topped with grated Parmesan cheese.", imageUrl: "https://example.com/image6.jpg" },
            { id: 8, name: "Spinach and Mushroom Omelette", calories: 200, details: "A classic omelette made with fresh spinach, mushrooms, and melted cheese.", imageUrl: "https://example.com/image7.jpg" },
            { id: 9, name: "Turkey Wrap with Vegetables", calories: 300, details: "A light and nutritious wrap filled with sliced turkey, crisp vegetables, and a touch of hummus.", imageUrl: "https://example.com/image8.jpg" },
            { id: 10, name: "Baked Sweet Potato with Grilled Chicken", calories: 400, details: "A satisfying meal of baked sweet potato topped with seasoned grilled chicken and a side of steamed vegetables.", imageUrl: "https://example.com/image9.jpg" },
          ];
          initialMeals.forEach(meal => {
            const mealRef = push(ref(db, "meals"));
            set(mealRef, {
              name: meal.name,
              calories: meal.calories,
              details: meal.details,
            });
          });
        },

     */

    fetchMealData() {
      return new Promise((resolve, reject) => {
        const db = getDatabase();
        const mealRef = ref(db, "meals");
        onValue(mealRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const meals = Object.entries(data).map(([id, meal]) => ({
              id,
              name: meal.name,
              calories: meal.calories,
              details: meal.details,
            }));
            this.mealList = meals;
            resolve();
          } else {
            reject(new Error("No meals found"));
          }
        });
      });
    },
    deleteDiet(index) {
      const auth = getAuth();
      const user = auth.currentUser;
      const db = getDatabase();

      if (user) {
        const dietList = this.userDietLists[index];
        const dietListKey = Object.keys(dietList)[0]; // Assuming each diet list has only one key
        const dietListRef = ref(db, `users/${user.uid}/diet/${dietListKey}`);
        remove(dietListRef)
            .then(() => {
              console.log("Diet list deleted successfully");
            })
            .catch((error) => {
              console.error("Error deleting diet list:", error);
            });
      } else {
        console.log("No user is signed in");
      }
    },
    saveDailyDiet() {
      const auth = getAuth();
      const user = auth.currentUser;
      const db = getDatabase();

      if (user) {
        const timestamp = Date.now();
        const date = new Date(timestamp);
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

        const dietListRef = ref(db, `users/${user.uid}/diet/${formattedDate}_${time}`);
        const meals = this.selectedMealsData.map(meal => ({
          id: meal.id,
          name: meal.name,
          calories: meal.calories,
          details: meal.details,
        }));
        set(dietListRef, meals);
      } else {
        console.log("No user is signed in");
      }
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
    },
  },

  mounted() {

    this.fetchMealData().then(() => {
      this.fetchUserDiet();
    });
  },
};
</script>
