<template>
  <v-container class="blood-sugar-component">
    <v-form ref="form">
      <v-row>
        <v-col cols="12">
          <v-text-field
              v-model.number="form.bloodSugarLevel"
              :rules="[v => !!v || 'Bu alan gereklidir']"
              label="Kan Şekeri Seviyesi"
              required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
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
        // Form bilgilerini sunucuya gönderme işlemleri burada yapılır
        console.log(this.form);
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
