import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/components/Home.vue";
import Signup from "@/components/Signup.vue";
import Login from '@/components/Login.vue';
import Dashboard from '@/components/Dashboard.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard
  }
];

const router = new VueRouter({
  routes
});

export default router;
