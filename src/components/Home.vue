<template>
  <div class="home">
    <div class="container">
      <div class="overlay">
        <div class="text">
          <h2 class="teal-text">Welcome to Banka</h2>
          <p class="white-text">Your security is our priority</p>
          <button class="btn teal darken-3" @click="showSignup">
            Get Started
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
  methods: {
    showSignup() {
      this.$router.push({ name: "Signup" });
    }
  }
};
</script>
