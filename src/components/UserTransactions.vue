<template>
  <div class="big-container">
    <Spinner v-if="showSpinner" />
    <div class="container">
      <div class="input-field">
        <select v-model="selected" required>
          <option disabled value="">Account Number</option>
          <option>All Accounts</option>
          <option v-for="(account, index) in accounts" :key="index">{{
            account
          }}</option>
        </select>
      </div>
      <div class="card">
        <table class="striped responsive-table">
          <thead class="teal darken-3 white-text">
            <tr>
              <th>Account Number</th>
              <th>Date</th>
              <th>Type</th>
              <th>Amount(₦)</th>
              <th>Balance(₦)</th>
            </tr>
          </thead>

          <tbody v-if="transactions">
            <tr v-for="transaction in paginatedData" :key="transaction.id">
              <td>{{ transaction.accountNumber }}</td>
              <td>{{ new Date(transaction.createdAt).toDateString() }}</td>
              <td>{{ transaction.type }}</td>
              <td>{{ transaction.amount }}</td>
              <td>{{ transaction.newBalance }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="paginate" v-if="filteredTransactions.length > size">
        <button
          class="btn-floating"
          @click="prevPage"
          :disabled="pageNumber === 0"
        >
          <i class="material-icons">chevron_left</i>
        </button>
        <button
          class="btn-floating next"
          @click="nextPage"
          :disabled="pageNumber >= transactions.length / size - 1"
        >
          <i class="material-icons">chevron_right</i>
        </button>
      </div>
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
      pageNumber: 0,
      size: 10,
      selected: '',
      accounts: []
    };
  },
  methods: {
    extractTransactions(data) {
      data.forEach(transaction => {
        this.transactions.push(transaction);
      });
    },
    nextPage() {
      this.pageNumber += 1;
    },
    prevPage() {
      this.pageNumber -= 1;
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
        this.accounts.push(account.accountNumber);
        this.extractTransactions(account.transactions);
      });
    } catch (error) {
      this.error = error.response.errors;
    }
  },
  computed: {
    paginatedData() {
      const start = this.pageNumber * this.size,
        end = start + this.size;
      return this.filteredTransactions.slice(start, end);
    },
    filteredTransactions() {
      if (!this.selected || this.selected === 'All Accounts') {
        return this.transactions;
      } else {
        return this.transactions.filter(transaction => {
          return transaction.accountNumber === (Number(this.selected));
        });
      }
    }
  }
};
</script>
