<template>
  <div class="admin-dashboard">
    <Spinner v-if="showSpinner" />
    <TransactionModal
      v-if="showTransactionModal"
      :header="header"
      :error="dashboardError"
      @removeModal="removeTransactionModal"
      @perFormCashTransaction="cashTransactions"
    />
    <div class="container">
      <div class="flex-items">
        <input
          type="text"
          placeholder="Search By Account Number"
          v-model="accountNo"
        />
      </div>
      <h4 class="staffs center center-align">Bank Accounts</h4>
      <table class="responsive-table centered striped card">
        <thead class="teal darken-3 white-text">
          <tr>
            <th>Account Number</th>
            <th>Account Balance(₦)</th>
            <th>Status</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="account in paginatedData" :key="account.id">
            <td>{{ account.accountNumber }}</td>
            <td>{{ account.balance.toFixed(2) }}</td>
            <td>{{ account.status }}</td>
            <td>{{ account.type }}</td>
            <td>
              <button
                class="btn teal mleft"
                @click="showCreditModal(account.accountNumber)"
              >
                Credit
              </button>
              <button
                class="btn teal mleft"
                @click="showDebitModal(account.accountNumber)"
              >
                Debit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="paginate" v-if="filteredUsers.length > size">
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
          :disabled="pageNumber >= filteredUsers.length / size - 1"
        >
          <i class="material-icons">chevron_right</i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import server from "../../services/Server";
import Spinner from "../Spinner";
import TransactionModal from "./TransactionModal";

export default {
  name: "ViewAccounts",
  components: {
    Spinner,
    TransactionModal
  },
  data() {
    return {
      accountNo: null,
      showSpinner: false,
      dashboardError: null,
      accounts: [],
      type: null,
      showTransactionModal: false,
      pageNumber: 0,
      header: null,
      status: null,
      accountNumber: null,
      transactionType: null,
      size: 5
    };
  },
  methods: {
    nextPage() {
      this.pageNumber += 1;
    },
    prevPage() {
      this.pageNumber -= 1;
    },
    showCreditModal(accountNo) {
      this.transactionType = "credit";
      this.header = "Credit Account";
      this.accountNumber = accountNo;
      this.showTransactionModal = !this.showTransactionModal;
    },
    showDebitModal(accountNo) {
      this.transactionType = "debit";
      this.header = "Debit Account";
      this.accountNumber = accountNo;
      this.showTransactionModal = !this.showTransactionModal;
    },
    removeTransactionModal() {
      this.header = null;
      this.showTransactionModal = !this.showTransactionModal;
    },
    async cashTransactions(amount) {
      try {
        this.showSpinner = !this.showSpinner;
        this.dashboardError = null;
        const response = await server.cashTransaction(this.accountNumber, {
          amount: parseFloat(amount),
          type: this.transactionType,
          token: sessionStorage.getItem("token")
        });
        const account = this.accounts.find(
          acct => acct.accountNumber === this.accountNumber
        );
        account.balance = response.data.data.newBalance;
        this.showSpinner = !this.showSpinner;
        this.showTransactionModal = !this.showTransactionModal;
      } catch (error) {
        this.showSpinner = !this.showSpinner;
        this.dashboardError = error.response.data.errors;
      }
    }
  },
  async created() {
    try {
      this.showSpinner = true;
      const response = await server.getAccounts({
        headers: {
          "x-access-token": sessionStorage.getItem("token")
        }
      });
      this.showSpinner = false;
      response.data.data.forEach(account => {
        this.accounts.push(account);
      });
      this.type = sessionStorage.getItem("type");
    } catch (error) {
      this.showSpinner = false;
      this.dashboardError = error.response.errors;
    }
  },
  computed: {
    paginatedData() {
      const start = this.pageNumber * this.size,
        end = start + this.size;
      return this.filteredUsers.slice(start, end);
    },
    filteredUsers() {
      if (!this.accountNo) {
        return this.accounts;
      } else {
        return this.accounts.filter(account => {
          return account.accountNumber.toString().match(this.accountNo);
        });
      }
    }
  }
};
</script>
