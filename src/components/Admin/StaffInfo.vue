<template>
  <div class="big-container">
    <div class="my-backdrop" @click="removeAccountModal"></div>
    <div class="staff-modal">
      <h4>User Information</h4>
      <div v-for="information in info" :key="information.id">
        <p>First Name: <b>{{ information.firstName }}</b></p>
        <p>Last Name: <b>{{ information.lastName }}</b></p>
        <p>Email: <b>{{ information.email }}</b></p>
        <p>Designation: <b>{{ information.type }}</b></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Staff Info",
  props: ["info"],
  data() {
    return {
      infoArray: []
    };
  },
  methods: {
    removeAccountModal() {
      this.$emit("removeModal");
    }
  }
};
</script>
