<template>
  <div class="navbar-fixed">
    <nav class="teal darken-3">
      <div class="nav-wrapper container">
        <router-link :to="{ name: 'Home' }">
          <span href="#" class="brand-logo left-align">Banka</span>
        </router-link>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li v-if="this.$route.path == '/signup' || this.$route.path == '/'">
            <router-link :to="{ name: 'Login' }">Login</router-link>
          </li>
          <li v-if="this.$route.path == '/login'">
            <router-link :to="{ name: 'Signup' }">Signup</router-link>
          </li>
          <li v-if="showFirstName()" class="avg-img"><avatar :username="firstName"></avatar></li>
          <li v-if="showFirstName()"
          @click="logout"
          class="logout-btn">Logout</li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import Avatar from 'vue-avatar'
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
      const firstName = sessionStorage.getItem('firstName');
      if (firstName) {
        this.firstName = firstName;
        return true
      }
      return false;
    },
    logout() {
      sessionStorage.clear();
      localStorage.clear();
      this.$router.push({ name: 'Home' })
    }
  }
};
</script>
