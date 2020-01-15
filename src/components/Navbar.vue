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
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
  }
};
</script>
