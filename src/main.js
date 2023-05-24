import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { registerLicense } from '@syncfusion/ej2-base'
Vue.config.productionTip = false


registerLicense("342e312e30gRlrcldnNTefx7U5J4NIho7fOQOKLZfvRwKrdwrLjhc=");
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
