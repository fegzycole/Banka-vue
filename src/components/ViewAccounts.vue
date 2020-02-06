<template>
  <div class="admin-dashboard">
    <Spinner v-if="showSpinner" />
    <ConfirmationModal
      v-if="showConfirmationModal"
      :error="dashboardError"
      :header="header"
      @showModal="staffActions"
      @removeModal="removeConfirmationModal"
      @removeAccountModal="removeConfirmationModal"
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
            <th>Email</th>
            <th>Status</th>
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
                class="btn teal"
                :disabled="account.status === 'active'"
                @click="showActivateButton(account.accountNumber)"
                v-if="type === 'admin'"
              >
                Activate
              </button>
              <button
                class="btn teal mleft"
                :disabled="account.status === 'dormant'"
                @click="showDeactivateButton(account.accountNumber)"
                v-if="type === 'admin'"
              >
                Deactivate
              </button>
              <button
                class="btn teal mleft"
                @click="showDeleteButton(account.accountNumber)"
              >
                Delete
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
import server from "../services/Server";
import Spinner from "./Spinner";
import ConfirmationModal from "./ConfirmationModal";
export default {
  name: "ViewAccounts",
  components: {
    Spinner,
    ConfirmationModal
  },
  data() {
    return {
      accountNo: null,
      showSpinner: false,
      dashboardError: null,
      accounts: [],
      type: null,
      showConfirmationModal: false,
      pageNumber: 0,
      header: null,
      status: null,
      accountNumber: null,
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
    showActivateButton(accountNo) {
      this.status = "active";
      this.header = "Activate Account?";
      this.accountNumber = accountNo;
      this.showConfirmationModal = !this.showConfirmationModal;
    },
    showDeactivateButton(accountNo) {
      this.status = "dormant";
      this.header = "Deactivate Account?";
      this.accountNumber = accountNo;
      this.showConfirmationModal = !this.showConfirmationModal;
    },
    showDeleteButton(accountNo) {
      this.header = "Delete Account?";
      this.status = null;
      this.accountNumber = accountNo;
      this.showConfirmationModal = !this.showConfirmationModal;
    },
    removeConfirmationModal() {
      this.header = null;
      this.showConfirmationModal = !this.showConfirmationModal;
    },
    async staffActions() {
      try {
        this.showSpinner = !this.showSpinner;

        if (this.status) {
          await this.toggleAccountStatus();
        } else {
          await this.deleteAnAccount();
        }

        this.showSpinner = !this.showSpinner;
        this.showConfirmationModal = !this.showConfirmationModal;
      } catch (error) {
        this.showSpinner = !this.showSpinner;
        this.dashboardError = error.response.data.errors;
      }
    },
    async deleteAnAccount() {
      this.dashboardError = null;
      await server.deleteAccount(this.accountNumber, {
        headers: {
          "x-access-token": sessionStorage.getItem("token")
        }
      });
      this.accounts = this.accounts.filter(
        account => account.accountNumber !== this.accountNumber
      );
    },
    async toggleAccountStatus() {
      await server.toggleAccountStatus(
        this.accountNumber,
        {
          status: this.status
        },
        {
          headers: {
            "x-access-token": sessionStorage.getItem("token")
          }
        }
      );
      const newAccount = this.accounts.find(
        acct => acct.accountNumber === this.accountNumber
      );
      newAccount.status = this.status;
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
