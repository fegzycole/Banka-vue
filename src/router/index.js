import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/components/Home.vue";
import Signup from "@/components/Signup.vue";
import Login from "@/components/Login.vue";
import Dashboard from "@/components/Client/Dashboard.vue";
import UserTransactions from "@/components/Client/UserTransactions.vue";

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
    path: "/client/dashboard",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/client/transactions",
    name: "UserTransactions",
    component: UserTransactions
  }
];

const router = new VueRouter({
  routes
});

export default router;
