<template>
  <div class="admin-dashboard">
    <StaffInfo
      v-if="showStaffInfo"
      :info="info"
      @removeModal="removeStaffInfoModal"
    />
    <Spinner v-if="showSpinner" />
    <ConfirmationModal
      v-if="showDeleteModal"
      :error="dashboardError"
      :email="userEmail"
      header="Delete Staff?"
      @showModal="deleteUserAccount"
      @removeModal="removeShowDeleteModal"
    />
    <div class="container">
      <div class="flex-items">
        <input type="text" placeholder="Search By Email" v-model="email" />
      </div>
      <h4 class="staffs center center-align">Staff Accounts</h4>
      <table class="responsive-table centered striped card">
        <thead class="teal darken-3 white-text">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="user in paginatedData" :key="user.id">
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.type }}</td>
            <td>
              <i class="material-icons eye" @click="toggleUserInfo(user.id)"
                >visibility</i
              ><i
                class="material-icons trash"
                @click="showAndDeleteUser(user.email)"
                >delete</i
              >
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
import ConfirmationModal from "../ConfirmationModal";
import StaffInfo from "./StaffInfo";
export default {
  name: "AdminDashboard",
  components: {
    Spinner,
    StaffInfo,
    ConfirmationModal
  },
  data() {
    return {
      email: null,
      showSpinner: false,
      dashboardError: null,
      users: [],
      pageNumber: 0,
      size: 5,
      info: null,
      showStaffInfo: false,
      showDeleteModal: false,
      userEmail: null
    };
  },
  methods: {
    nextPage() {
      this.pageNumber += 1;
    },
    prevPage() {
      this.pageNumber -= 1;
    },
    toggleUserInfo(id) {
      this.info = this.users.filter(el => el.id === id);
      this.showStaffInfo = !this.showStaffInfo;
    },
    removeStaffInfoModal() {
      this.showStaffInfo = !this.showStaffInfo;
    },
    async deleteUserAccount() {
      try {
        this.showSpinner = !this.showSpinner;
        await server.deleteStaff(this.userEmail, {
          headers: {
            "x-access-token": sessionStorage.getItem("token")
          }
        });
        this.users = this.users.filter(el => el.email !== this.userEmail);
        this.showSpinner = !this.showSpinner;
        this.showDeleteModal = !this.showDeleteModal;
      } catch (error) {
        this.showSpinner = !this.showSpinner;
        this.dashboardError = error.response.data.errors;
      }
    },
    showAndDeleteUser(email) {
      this.userEmail = email;
      this.showDeleteModal = !this.showDeleteModal;
    },
    removeShowDeleteModal() {
      this.userEmail = null;
      this.showDeleteModal = !this.showDeleteModal;
    }
  },
  async created() {
    try {
      this.showSpinner = true;
      const response = await server.getStaffs({
        headers: {
          "x-access-token": sessionStorage.getItem("token")
        }
      });
      this.showSpinner = false;
      response.data.data.forEach(staff => {
        this.users.push(staff);
      });
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
      if (!this.email) {
        return this.users;
      } else {
        return this.users.filter(user => {
          return user.email.match(this.email);
        });
      }
    }
  }
};
</script>
