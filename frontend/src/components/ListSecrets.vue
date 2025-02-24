<template>
  <div class="container">
    <h1>List of Secrets</h1>
    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Hash</th>
            <th>Redeem Left</th>
            <th>Created Date</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="secret, i in secrets" :key="secret._id">
            <td>{{ i + 1 }}</td>
            <td>
              <router-link :to="'/view/' + secret.hash">{{ secret.hash }}</router-link>
            </td>
            <td>{{ secret.redeemLeft }}</td>
            <td>{{ new Date(secret.createdAt).toLocaleString('hu') }}</td>
            <td>
              <span v-if="secret.password"> Protected </span>
              <span v-else> not protected </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import apiClient from '../axios';

export default {
  data() {
    return {
      secrets: [],
    };
  },
  async created() {
    const response = await apiClient.get('/secrets');
    this.secrets = response.data;
  },
};
</script>

<style scoped>
.table-responsive {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f1f1f1;
}

td {
  transition: background-color 0.3s ease;
}

td a {
  color: #007bff;
  text-decoration: none;
}

td a:hover {
  text-decoration: underline;
}

i {
  font-size: 16px;
  color: #007bff;
}
</style>
