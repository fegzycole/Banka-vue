<template>
  <div class="big-container">
    <Spinner v-if="showSpinner" />
    <div class="signup container">
      <form @submit.prevent="signIn">
        <div class="card">
          <h2 class="teal-text center-align">Login</h2>
          <ul class="errors center center-align" v-if="errors.length">
            <li class="red-text" v-for="(error, index) in errors" :key="index">
              {{ error }}
            </li>
          </ul>
          <div class="field">
            <label for="email">Email:</label>
            <input type="email" name="email" v-model="email" />
          </div>
          <div class="field">
            <label for="email">Password:</label>
            <input type="password" name="email" v-model="password" />
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
import Spinner from "./Spinner";
import server from "../services/Server";

export default {
  name: "Login",
  components: {
    Spinner
  },
  data() {
    return {
      email: null,
      password: null,
      errors: [],
      showSpinner: false
    };
  },
  methods: {
    async signIn() {
      try {
        this.errors = [];
        this.showSpinner = true;
        const response = await server.login({
          email: this.email,
          password: this.password
        });
        this.showSpinner = false;
        this.setSessionStorage(response.data);
        const { data } = response.data;
        this.redirectUser(data)
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
    setSessionStorage(dataSource) {
      sessionStorage.setItem("token", dataSource.data.token);
      sessionStorage.setItem("email", dataSource.data.email);
      sessionStorage.setItem("id", dataSource.data.id);
      sessionStorage.setItem("firstName", dataSource.data.firstName);
      sessionStorage.setItem("lastName", dataSource.data.lastName);
      localStorage.setItem("email", dataSource.data.email);
      sessionStorage.setItem("type", dataSource.data.type);
    },
    redirectUser(data) {
      if (data.type === "customer") {
        this.$router.push({ name: "ClientDashboard" });
      } else if (data.type === "cashier") {
        this.$router.push({ name: "CashierDashboard" });
      } else {
        this.$router.push({ name: "AdminDashboard" });
      }
    }
  }
};
</script>
