<template>
  <div class="big-container">
    <Spinner v-if="showSpinner" />
    <div class="container">
      <input type="date" name="data" class="inputBox" />
      <div class="card">
        <table class="striped responsive-table">
          <thead class="teal darken-3 white-text">
            <tr>
              <th>Account Number</th>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Balance</th>
            </tr>
          </thead>

          <tbody v-if="transactions">
            <tr v-for="transaction in transactions" :key="transaction.id">
              <td>{{ transaction.accountNumber }}</td>
              <td>{{ new Date(transaction.createdAt).toDateString() }}</td>
              <td>{{ transaction.type }}</td>
              <td>{{ transaction.amount }}</td>
              <td>{{ transaction.newBalance }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <ul class="pagination">
        <li class="disabled">
          <a href="#!">
            <i class="material-icons">chevron_left</i>
          </a>
        </li>
        <li class="active teal darken-3">
          <a href="#!">1</a>
        </li>
        <li class="waves-effect">
          <a href="#!">2</a>
        </li>
        <li class="waves-effect">
          <a href="#!">3</a>
        </li>
        <li class="waves-effect">
          <a href="#!">4</a>
        </li>
        <li class="waves-effect">
          <a href="#!">5</a>
        </li>
        <li class="waves-effect">
          <a href="#!">
            <i class="material-icons">chevron_right</i>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import server from "../services/Server";
import Spinner from "./Spinner";

export default {
  name: "UserTransactions",
  components: {
    Spinner
  },
  data() {
    return {
      transactions: [],
      showSpinner: false,
      error: null,
      page: 1,
      perPage: 5,
      pages: []
    };
  },
  methods: {
    extractTransactions(data) {
      data.forEach(transaction => {
        this.transactions.push(transaction);
      });
    }
  },
  async created() {
    try {
      this.showSpinner = true;
      const response = await server.getUserAccounts({
        token: sessionStorage.getItem("token")
      });
      this.showSpinner = false;
      response.data.data.forEach(account => {
        this.extractTransactions(account.transactions);
      });
    } catch (error) {
      this.error = error.response.errors;
    }
  }
};
</script>
