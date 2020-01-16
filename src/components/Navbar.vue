<template>
  <div class="navbar-fixed">
    <nav class="teal darken-3">
      <div class="nav-wrapper container">
        <router-link :to="{ name: 'Dashboard' }" v-if="showFirstName()">
          <span href="#" class="brand-logo left-align">Banka</span>
        </router-link>
        <router-link :to="{ name: 'Home' }" v-else>
          <span href="#" class="brand-logo left-align">Banka</span>
        </router-link>
        <ul
          id="nav-mobile"
          class="right hide-on-med-and-down"
          v-if="showFirstName()"
        >
          <li>
            <router-link :to="{ name: 'Dashboard' }">Dashboard</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'UserTransactions' }"
              >Transactions</router-link
            >
          </li>
          <li class="avg-img">
            <avatar :username="firstName"></avatar>
          </li>
          <li @click="logout" class="logout-btn">
            Logout
          </li>
        </ul>
        <ul v-else id="nav-mobile" class="right hide-on-med-and-down">
          <li v-if="this.$route.path == '/signup' || this.$route.path == '/'">
            <router-link :to="{ name: 'Login' }">Login</router-link>
          </li>
          <li v-if="this.$route.path == '/login'">
            <router-link :to="{ name: 'Signup' }">Signup</router-link>
          </li>
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
    showFirstName() {
      const firstName = sessionStorage.getItem("firstName");
      if (firstName) {
        this.firstName = firstName;
        return true;
      }
      return false;
    },
    logout() {
      sessionStorage.clear();
      localStorage.clear();
      this.$router.push({ name: "Home" });
    }
  }
};
</script>
