<template>
  <div class="navbar-fixed">
    <nav class="teal darken-3">
      <div class="nav-wrapper container">
        <router-link
          :to="{ name: 'ClientDashboard' }"
          v-if="showCustomerLinks() === 'customer'"
        >
          <span href="#" class="banka-logo left-align">Banka</span>
        </router-link>
        <router-link
          :to="{ name: 'AdminDashboard' }"
          v-else-if="showCustomerLinks() === 'admin'"
        >
          <span href="#" class="banka-logo left-align">Banka</span>
        </router-link>
        <router-link :to="{ name: 'Home' }" v-else>
          <span href="#" class="banka-logo left-align">Banka</span>
        </router-link>
        <ul
          id="nav-mobile"
          class="right hide-on-small-only"
          v-if="showCustomerLinks() === 'customer'"
        >
          <li>
            <router-link :to="{ name: 'ClientDashboard' }"
              >Dashboard</router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'UserTransactions' }"
              >Transactions</router-link
            >
          </li>
          <li class="avg-img">
            <avatar :username="firstName"></avatar>
          </li>
          <li @click="logout" class="logout-btn">Logout</li>
        </ul>

        <ul
          id="nav-mobile"
          class="right hide-on-small-only"
          v-else-if="showCustomerLinks() === 'admin'"
        >
          <li>
            <router-link :to="{ name: 'AdminDashboard' }"
              >Dashboard</router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'NewStaff' }">Add Staff</router-link>
          </li>

          <li>
            <router-link :to="{ name: 'ViewAccounts' }"
              >View Accounts</router-link
            >
          </li>
          <li class="avg-img">
            <avatar :username="firstName"></avatar>
          </li>
          <li @click="logout" class="logout-btn">Logout</li>
        </ul>

        <ul
          id="nav-mobile"
          class="right hide-on-small-only"
          v-else-if="showCustomerLinks() === 'cashier'"
        >
          <li>
            <router-link :to="{ name: 'CashierDashboard' }"
              >Dashboard</router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'CashTransactions' }"
              >Cash Transactions</router-link
            >
          </li>
          <li class="avg-img">
            <avatar :username="firstName"></avatar>
          </li>
          <li @click="logout" class="logout-btn">Logout</li>
        </ul>

        <ul v-else id="nav-mobile" class="right">
          <li v-if="this.$route.path == '/signup' || this.$route.path == '/'">
            <router-link :to="{ name: 'Login' }">Login</router-link>
          </li>
          <li v-if="this.$route.path == '/login'">
            <router-link :to="{ name: 'Signup' }">Signup</router-link>
          </li>
        </ul>

        <ul class="right hide-on-med-and-up">
          <li><i class="material-icons">clear_all</i></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import Avatar from "vue-avatar";
export default {
  name: "Navbar",
  components: {
    Avatar
  },
  data() {
    return {
      firstName: null
    };
  },
  methods: {
    showCustomerLinks() {
      const firstName = sessionStorage.getItem("firstName");
      this.firstName = firstName;
      const type = sessionStorage.getItem("type");
      return type;
    },
    logout() {
      sessionStorage.clear();
      localStorage.clear();
      this.firstName = null;
      this.$router.push({ name: "Home" });
    }
  }
};
</script>
