<template>
  <div class="big-container">
    <div class="my-backdrop" @click="removeAccountModal"></div>
    <div class="account-modal">
      <h2>{{ header }}</h2>
      <p v-if="error">{{ error }}</p>
      <div class="flex-btns center center-align">
        <button class="btn btn-flat teal" @click="showModal">
          Yes
        </button>
        <button class="btn btn-flat teal" @click="removeModal">No</button>
      </div>
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
    showModal() {
      this.$emit("showModal");
    }
  }
};
</script>
