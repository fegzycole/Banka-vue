<template>
  <ul class="nav-ul">
    <li v-for="(moduleRoute, index) in $attrs.moduleRoutes" :key="index">
      <router-link :to="{ name: moduleRoute.routeName }">
        {{ moduleRoute.name }}
      </router-link>
    </li>
    <li class="avg-img">
      <avatar :username="$attrs.firstName"></avatar>
    </li>
    <li @click="logout" class="logout-btn">Logout</li>
  </ul>
</template>

<script>
import Avatar from "vue-avatar";
export default {
  name: "NavbarDesktop",
  components: {
    Avatar
  },
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$emit("logout");
    }
  }
};
</script>
