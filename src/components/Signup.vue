<template>
  <div class="big-container">
    <Spinner v-if="showSpinner"/>
    <div class="signup container">
      <form @submit.prevent="register">
        <div class="card">
          <h2 class="teal-text center-align">Sign Up</h2>
          <ul class="errors center center-align" v-if="errors.length">
            <li class="red-text" v-for="(error, index) in errors" :key="index">
              {{ error }}
            </li>
          </ul>
          <div class="field">
            <label for="firstName">First Name:</label>
            <input type="text" name="firstName" v-model="firstName" />
          </div>
          <div class="field">
            <label for="lastName">Last Name:</label>
            <input type="text" name="lastName" v-model="lastName" />
          </div>
          <div class="field">
            <label for="email">Email:</label>
            <input type="email" name="email" v-model="email" />
          </div>
          <div class="field">
            <label for="password">Password:</label>
            <input type="password" name="password" v-model="password" />
          </div>
          <div class="field center">
            <button class="btn teal darken-3">Submit</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Authenticationservice from "../services/AuthenticationService";
import Spinner from "./Spinner";

export default {
  name: "Signup",
  components: {
    Spinner
  },
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      errors: [],
      showSpinner: false
    };
  },
  methods: {
    async register() {
      try {
        this.errors = [];
        this.showSpinner = true;
        await Authenticationservice.register({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          type: "customer"
        });
        this.showSpinner = false;
      } catch (err) {
        this.showSpinner = false;
        const errors = err.response.data.errors;
        this.generateErrors(errors);
      }
    },
    generateErrors(errors) {
      if (typeof errors === "object") {
        Object.values(errors).forEach(error => {
          error.forEach(err => {
            this.errors.push(err);
          });
        });
      } else {
        this.errors.push(errors);
      }
    }
  }
};
</script>
