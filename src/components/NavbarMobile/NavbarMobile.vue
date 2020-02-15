<template>
  <ul class="mob-ul" :style="showNav ? 'display: block' : null">
    <li v-for="(moduleRoute, index) in $attrs.moduleRoutes" :key="index">
      <router-link :to="{ name: moduleRoute.routeName }">
        {{ moduleRoute.name }}
      </router-link>
    </li>
    <li @click="logout" class="logout-btn">Logout</li>
  </ul>
</template>

<script>
export default {
  name: "NavbarDesktop",
  props: ["showNav"],
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
