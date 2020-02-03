<template>
  <div class="big-container">
    <div class="my-backdrop" @click="removeAccountModal"></div>
    <form @submit.prevent="createAccount(selected)" class="account-modal">
      <h2>New Account</h2>
      <p v-if="error">{{ error }}</p>
      <div class="input-field">
        <select v-model="selected" required>
          <option disabled value="">Account Type</option>
          <option>Current</option>
          <option>Savings</option>
        </select>
      </div>

      <button class="btn teal">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "NewAccount",
  props: ["error"],
  data() {
    return {
      selected: ""
    };
  },
  methods: {
    removeAccountModal() {
      this.selected = "";
      this.$emit("removeModal");
    },
    createAccount(selectValue) {
      this.$emit("createAccount", selectValue);
    }
  }
};
</script>
