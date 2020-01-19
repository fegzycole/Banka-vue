<template>
  <div class="admin-dashboard">
    <div class="container">
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
          <tr>
            <td>Alvin</td>
            <td>Eclair</td>
            <td>staff</td>
            <td>alvineclair@banka.com</td>
            <td>
              <i class="material-icons eye">visibility</i
              ><i class="material-icons trash">delete</i>
            </td>
          </tr>
          <tr>
            <td>Alvin</td>
            <td>Eclair</td>
            <td>staff</td>
            <td>alvineclair@banka.com</td>
            <td><i class="material-icons eye">visibility</i
              ><i class="material-icons trash">delete</i></td>
          </tr>
          <tr>
            <td>Alvin</td>
            <td>Eclair</td>
            <td>staff</td>
            <td>alvineclair@banka.com</td>
            <td><i class="material-icons eye">visibility</i
              ><i class="material-icons trash">delete</i></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminDashboard"
};
</script>
