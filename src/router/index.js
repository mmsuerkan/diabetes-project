import Vue from 'vue'
import VueRouter from 'vue-router'

import MainPage from "@/components/MainPage";

import LoginPage from "@/components/LoginPage";
import UploadBloodSugar from "@/components/UploadBloodSugar.vue";

import ChartsComponent from "@/components/ChartsComponent.vue";


Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'LoginPage',
    component: LoginPage
  },

  {
    path: '/MainPage',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/UploadBloodSugar',
    name: 'UploadBloodSugar',
    component: UploadBloodSugar
  },
  {
    path: '/Tab2Component',
    name: 'ChartsComponent',
    component: ChartsComponent
  },


 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
