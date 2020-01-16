<template>
  <div class="big-container">
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
    <EmptyDashboard v-else/>
  </div>
</template>

<script>
import EmptyDashboard from './EmptyDashboard';

export default {
  name: "Dashboard",
  components: {
    EmptyDashboard
  },
  data() {
    return {
      accounts: null,
      transactions: null
    }
  }
};
</script>
