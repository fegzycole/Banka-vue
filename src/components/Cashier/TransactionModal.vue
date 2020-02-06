<template>
  <div class="big-container">
    <div class="my-backdrop" @click="removeAccountModal"></div>
    <div class="account-modal">
      <h2>{{ header }}</h2>
      <p v-if="error">{{ error }}</p>
      <form
        class="big-field center center-align container trans-modal"
        @submit.prevent="perFormCashTransaction(amount)"
      >
        <input type="text" v-model="amount" required />
        <input type="submit" value="submit" />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmationModal",
  props: ["error", "email", "header"],
  data() {
    return {
      amount: 0.0
    };
  },
  methods: {
    removeModal() {
      this.$emit("removeModal");
    },
    perFormCashTransaction(amount) {
      this.$emit("perFormCashTransaction", amount);
    },
    removeAccountModal() {
      this.$emit("removeModal");
    }
  }
};
</script>
