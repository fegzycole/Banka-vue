<template>
  <div class="container empty-dashboard card z-depth-1">
    <h2>Create an Account</h2>
     <button class="btn-floating btn-large waves-effect waves-light teal"
     @click="showAccountModal">
       <i class="material-icons">add</i>
     </button>
  </div>
</template>

<script>
export default {
  name: 'EmptyDashboard',
  methods: {
    showAccountModal() {
      this.$emit('addModal')
    }
  }
}
</script>