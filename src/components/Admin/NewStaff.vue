<template>
  <div class="big-container">
    <Spinner v-if="showSpinner" />
    <div class="success" v-if="success">
      <div class="success-msg green darken-3 white-text">
        <p>User created sucessfully</p>
        <i class="material-icons" @click="toggleSuccess">cancel</i>
      </div>
    </div>
    <div class="signup container">
      <form @submit.prevent="createStaff">
        <div class="card">
          <h2 class="teal-text center-align">Banka Staff</h2>
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
          <div class="input-field">
            <select v-model="type" required>
              <option disabled value="">Account Type</option>
              <option>Cashier</option>
              <option>Admin</option>
            </select>
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
import server from "../../services/Server";
import Spinner from "../Spinner";

export default {
  name: "NewStaff",
  components: {
    Spinner
  },
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      type: "",
      password: null,
      errors: [],
      success: false,
      showSpinner: false
    };
  },
  methods: {
    toggleSuccess() {
      this.success = !this.success;
    },
    async createStaff() {
      try {
        this.errors = [];
        this.showSpinner = true;
        await server.createStaff({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          type: this.type.toLowerCase(),
          token: sessionStorage.getItem("token")
        });
        this.showSpinner = false;
        this.clearAll();
        this.success = true;
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
    },
    clearAll() {
      this.firstName = null;
      this.lastName = null;
      this.type = "";
      this.password = null;
      this.email = null;
    }
  }
};
</script>
