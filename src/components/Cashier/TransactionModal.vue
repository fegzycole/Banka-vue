<template>
  <div class="big-container">
    <div class="my-backdrop" @click="removeAccountModal"></div>
    <div class="account-modal">
      <h2>{{ header }}</h2>
      <p v-if="error">{{ error }}</p>
      <form
        class="big-field center center-align"
        @submit.prevent="perFormCashTransaction"
      >
        <input type="number" />
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
    return {};
  },
  methods: {
    removeModal() {
      this.$emit("removeModal");
    },
    perFormCashTransaction() {
      this.$emit("perFormCashTransaction");
    },
    removeAccountModal() {
      this.$emit("removeModal");
    }
  }
};
</script>
