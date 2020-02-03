<template>
  <div class="big-container">
    <div class="my-backdrop" @click="removeAccountModal"></div>
    <div class="account-modal">
      <h2>Delete Staff?</h2>
      <p v-if="error">{{ error }}</p>
      <div class="flex-btns center center-align">
        <button class="btn btn-flat teal" @click="deleteAccount">
          Yes
        </button>
        <button class="btn btn-flat teal" @click="removeModal">No</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewAccount",
  props: ["error", "email"],
  data() {
    return {
      selected: ""
    };
  },
  methods: {
    removeModal() {
      this.$emit("removeModal");
    },
    deleteAccount() {
      this.$emit("deleteAccount");
    }
  }
};
</script>
