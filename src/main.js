import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { registerLicense } from '@syncfusion/ej2-base'
Vue.config.productionTip = false


registerLicense("ORg4AjUWIQA/Gnt2VFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5WdEFiW39ccXdVRmda");
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
