<template>
  <div class="big-container">
    <div class="my-backdrop" @click="removeAccountModal"></div>
    <form class="account-modal">
      <h2>New Account</h2>
      <div class="input-field">
        <select>
          <option value="" disabled selected>Account Type</option>
          <option value="1">Savings</option>
          <option value="2">Current</option>
        </select>
      </div>

      <button class="btn teal">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "NewAccount",
  methods: {
    removeAccountModal() {
      this.$emit("removeModal");
    }
  }
};
</script>
