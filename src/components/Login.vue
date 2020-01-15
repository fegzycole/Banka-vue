<template>
  <div class="signup container">
    <form @submit.prevent="signUp">
      <div class="card">
        <h2 class="teal-text center-align">Login</h2>
        <div class="field">
          <label for="email">Email:</label>
          <input type="email" name="email" v-model="email" />
        </div>
        <div class="field">
          <label for="email">Password:</label>
          <input type="password" name="email" v-model="password" />
        </div>
        <div class="field center">
          <button class="btn teal darken-3">Submit</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null
    };
  },
  beforeCreate() {
    this.$emit('toggleSignup')
  }
};
</script>
