<template>
  <v-container class="blood-sugar-component">
    <v-form ref="form">
      <v-row>
        <v-col>
          <v-text-field
              v-model.number="form.bloodSugarLevel"
              :rules="[v => !!v || 'Bu alan gereklidir']"
              label="Kan Şekeri Seviyesi (mg/dL)"
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
    <BloodSugarTable />
  </v-container>
</template>


<script>
import { getAuth } from "firebase/auth";
import { ref, set, push } from "firebase/database";
import { getDatabase } from "firebase/database";
import sweetAlert from "sweetalert";
import BloodSugarTable from '@/components/BloodSugarTable.vue';

export default {
  components: {
    BloodSugarTable
  },
  data() {
    return {
      menu: false,
      form: {
        bloodSugarLevel: null,
        measurementTime: null,
      },
    };
  },
  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        const auth = getAuth();
        const user = auth.currentUser;
        const db = getDatabase();

        if (user) {
          // Kan şekeri değerini kontrol et
          const bloodSugarLevel = parseInt(this.form.bloodSugarLevel);
          if (isNaN(bloodSugarLevel) || bloodSugarLevel < 70 || bloodSugarLevel > 140) {
            sweetAlert("Hata!", "Kan şekeri seviyesi geçerli değil. 70-140 arası değeri olmalıdır", "error");
            return;
          }

          // Ölçüm saati değerini kontrol et
          if (!this.form.measurementTime) {
            sweetAlert("Hata!", "Ölçüm saati boş olamaz.", "error");
            return;
          }

          // Anlık tarih/saat bilgisi oluştur
          const now = new Date();
          const dateTimeString = now.toISOString();

          const newHealthDataRef = push(ref(db, 'users/' + user.uid + '/healthData'));
          set(newHealthDataRef, {
            bloodSugarLevel: this.form.bloodSugarLevel,
            measurementTime: this.form.measurementTime,
            dateTime: dateTimeString // Tarih/saat bilgisini burada ekliyoruz
          })
              .then(() => {
                sweetAlert("Başarılı!", "Kan şekeri seviyesi başarıyla kaydedildi.", "success");
                console.log("Health data saved successfully");
              })
              .catch((error) => {
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
