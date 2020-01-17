<template>
  <div class="big-container">
    <Spinner v-if="showSpinner" />
    <NewAccount
      v-if="showAccountModal"
      @removeModal="toggleAccountModal"
      @createAccount="createBankAccount"
      :error="error"
    />
    <div class="container account-container" v-if="accounts.length">
      <div class="add-btn">
        <button
          class="btn teal"
          @click="toggleAccountModal"
        >
        New Account
        </button>
      </div>
      <div class="account-section">
        <div class="card" v-for="account in accounts" :key="account.id">
          <p>Account Number: {{ account.accountNumber }}</p>
          <p>Account Type: {{ account.type }}</p>
          <p>Balance: ₦{{ account.balance }}</p>
          <p>Status: {{ account.status }}</p>
        </div>
      </div>

      <div class="container">
        <h4 class="center center-align">Recent Transactions</h4>
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
    </div>
    <EmptyDashboard v-else @addModal="toggleAccountModal" />
  </div>
</template>

<script>
import EmptyDashboard from "./EmptyDashboard";
import NewAccount from "./NewAccount";
import server from "../services/Server";
import Spinner from "./Spinner";

export default {
  name: "Dashboard",
  components: {
    EmptyDashboard,
    NewAccount,
    Spinner
  },
  data() {
    return {
      accounts: [],
      transactions: [],
      showAccountModal: false,
      error: null,
      dashboardError: null,
      showSpinner: false
    };
  },
  methods: {
    toggleAccountModal() {
      this.showAccountModal = !this.showAccountModal;
    },
    async createBankAccount(selectValue) {
      try {
        this.error = "";
        this.showSpinner = true;
        const response = await server.newAccount({
          type: selectValue.toLowerCase(),
          token: sessionStorage.getItem("token")
        });
        this.showSpinner = false;
        this.showAccountModal = !this.showAccountModal;
        this.accounts.push(response.data.data);
      } catch (error) {
        this.showSpinner = false;
        this.error = error.response.errors;
      }
    },
    extractTransactions(data) {
      data.forEach(transaction => {
        this.transactions.push(transaction)
      })
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
        this.extractTransactions(account.transactions)
        this.accounts.push(account);
      });
    } catch (error) {
      this.dashboardError = error.response.errors;
    }
  }
};
</script>
