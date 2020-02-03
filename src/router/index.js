import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/components/Home.vue";
import Signup from "@/components/Signup.vue";
import Login from "@/components/Login.vue";
import ViewAccounts from "@/components/ViewAccounts.vue";
import ClientDashboard from "@/components/Client/Dashboard.vue";
import UserTransactions from "@/components/Client/UserTransactions.vue";
import AdminDashboard from "@/components/Admin/Dashboard.vue";
import NewStaff from "@/components/Admin/NewStaff.vue";

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
    name: "ClientDashboard",
    component: ClientDashboard
  },
  {
    path: "/client/transactions",
    name: "UserTransactions",
    component: UserTransactions
  },
  {
    path: "/admin/dashboard",
    name: "AdminDashboard",
    component: AdminDashboard
  },
  {
    path: "/admin/newstaff",
    name: "NewStaff",
    component: NewStaff
  },
  {
    path: "/admin/view_accounts",
    name: "ViewAccounts",
    component: ViewAccounts
  }
];

const router = new VueRouter({
  routes
});

export default router;
