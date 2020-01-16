<template>
  <div class="big-container">
    <NewAccount v-if="showAccountModal" 
    @removeModal="toggleAccountModal"/>
    <div class="container" v-if="accounts">
      <div class="account-section">
        <div class="card" v-for="account in accounts" :key="account.id">
          <p>Account Number: {{ account.accountNumber }}</p>
          <p>Account Type: {{ account.type }}</p>
          <p>Balance: {{ account.balance }}</p>
          <p>Status: {{ account.status }}</p>
        </div>
      </div>

      <div class="container">
        <h2 class="center center-align">Recent Transactions</h2>
        <table class="striped responsive-table">
          <thead class="teal darken-3 white-text">
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Balance</th>
            </tr>
          </thead>

          <tbody v-if="transactions">
            <tr v-for="transaction in transactions" :key="transaction.id">
              <td>{{ transaction.created_at }}</td>
              <td>{{ transaction.type }}</td>
              <td>{{ transaction.amount }}</td>
              <td>{{ transaction.newBalance }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <EmptyDashboard v-else @addModal="toggleAccountModal"/>
  </div>
</template>

<script>
import EmptyDashboard from './EmptyDashboard';
import NewAccount from './NewAccount';

export default {
  name: "Dashboard",
  components: {
    EmptyDashboard,
    NewAccount
  },
  data() {
    return {
      accounts: null,
      transactions: null,
      showAccountModal: false
    }
  },
  methods: {
    toggleAccountModal() {
      this.showAccountModal = !this.showAccountModal
    }
  }
};
</script>
