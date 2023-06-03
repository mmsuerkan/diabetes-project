<template>
  <v-data-table :headers="headers" :items="healthData">
    <template v-slot:item.measurementTime="{ item }">
      {{ item.measurementTime }}
    </template>
    <template v-slot:item.measurementDate="{ item }">
      {{ item.measurementDate }}
    </template>
  </v-data-table>
</template>

<script>
import { onValue, ref as ref_database } from "firebase/database";
import { getAuth ,onAuthStateChanged} from "firebase/auth";
import { getDatabase } from "firebase/database";

export default {
  data: () => ({
    healthData: [],
    headers: [
      { text: 'Ölçüm Saati(Sırala)', value: 'measurementTime' },
      { text: 'Kan Şekeri Seviyesi(Sırala)', value: 'bloodSugarLevel' },
      { text: 'Ölçüm Tarihi(Sırala)', value: 'measurementDate' }, // Ölçüm Tarihi kolonunu ekledik
    ],
  }),
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.fetchHealthData();
      } else {
        console.log("No user is signed in");
      }
    });
  },

  methods: {
    async fetchHealthData() {
      const auth = getAuth();
      const user = auth.currentUser;
      const db = getDatabase();

      if (user) {
        const healthDataRef = ref_database(db, 'users/' + user.uid + '/healthData');
        onValue(healthDataRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            this.healthData = Object.values(data);
          }
        });
      }
    },
  },
};
</script>