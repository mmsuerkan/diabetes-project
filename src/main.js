import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { registerLicense } from '@syncfusion/ej2-base'
Vue.config.productionTip = false


registerLicense("342e312e30dFt1fa9RzKRGAPOgedcb+95PDTwe0U5g0rLOj6Vz+kM=");
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
