<template>
  <div class="container">
    <input type="date" name="data" class="inputBox" />
    <div class="card">
      <table class="striped responsive-table">
        <thead class="teal darken-3 white-text">
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Balance</th>
          </tr>
        </thead>

        <!-- <tbody v-if="transactions">
          <tr v-for="transaction in transactions" :key="transaction.id">
            <td>{{ transaction.created_at }}</td>
            <td>{{ transaction.type }}</td>
            <td>{{ transaction.amount }}</td>
            <td>{{ transaction.newBalance }}</td>
          </tr>
        </tbody> -->

        <tbody>
          <tr>
            <td>Alvin</td>
            <td>Eclair</td>
            <td>$0.87</td>
            <td>$0.87</td>
          </tr>
          <tr>
            <td>Alan</td>
            <td>Jellybean</td>
            <td>$3.76</td>
            <td>$0.87</td>
          </tr>
          <tr>
            <td>Jonathan</td>
            <td>Lollipop</td>
            <td>$7.00</td>
            <td>$0.87</td>
          </tr>
        </tbody>
      </table>
    </div>
    <ul class="pagination">
      <li class="disabled">
        <a href="#!"><i class="material-icons">chevron_left</i></a>
      </li>
      <li class="active teal darken-3"><a href="#!">1</a></li>
      <li class="waves-effect"><a href="#!">2</a></li>
      <li class="waves-effect"><a href="#!">3</a></li>
      <li class="waves-effect"><a href="#!">4</a></li>
      <li class="waves-effect"><a href="#!">5</a></li>
      <li class="waves-effect">
        <a href="#!"><i class="material-icons">chevron_right</i></a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "UserTransactions"
};
</script>
