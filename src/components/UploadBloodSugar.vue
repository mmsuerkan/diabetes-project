<template>
  <v-container class="blood-sugar-component">
    <v-form ref="form">
      <v-row>
        <v-col>
          <v-text-field
              v-model.number="form.bloodSugarLevel"
              :rules="[v => !!v || 'Bu alan gereklidir']"
              label="Kan Şekeri Seviyesi"
              required
          ></v-text-field>
        </v-col>
        <v-col >
          <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="form.measurementTime"
              transition="scale-transition"
              offset-y
              min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  v-model="form.measurementTime"
                  label="Ölçüm Saati"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
                v-if="menu"
                v-model="form.measurementTime"
                full-width
                @click:minute="$refs.menu.save(form.measurementTime)"
            ></v-time-picker>
          </v-menu>
        </v-col>
      </v-row>
    </v-form>

    <v-btn color="primary" @click="submitForm">Submit</v-btn>
  </v-container>
</template>


<script>

import { getAuth } from "firebase/auth";
import { ref, set ,push} from "firebase/database";
import { getDatabase } from "firebase/database";
import sweetAlert from "sweetalert";
export default {
  data: () => ({
    menu: false,
    form: {
      bloodSugarLevel: null,
      measurementTime: null,
    },
  }),
  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        const auth = getAuth();
        const user = auth.currentUser;
        const db = getDatabase();

        if (user) {
          const newHealthDataRef = push(ref(db, 'users/' + user.uid + '/healthData'));
          set(newHealthDataRef, {
            bloodSugarLevel: this.form.bloodSugarLevel,
            measurementTime: this.form.measurementTime
          }).then(() => {
            sweetAlert("Başarılı!", "Kan şekeri seviyesi başarıyla kaydedildi.", "success")
            console.log("Health data saved successfully");
          }).catch((error) => {
            console.log("Error saving health data: ", error);
          });
        } else {
          // Kullanıcı oturum açmamışsa, hata mesajı göster
          console.log("No user is signed in");
        }
      }

    },
  },
};
</script>

<style scoped>
.blood-sugar-component {
  /* Bu sınıfa sahip elementler için stiller burada belirlenir */
}
</style>
