<template>
  <div class="container">
    <h1>View Secret</h1>
    <div v-if="error === 'Secret not found'">
      <p class="error">Secret not found</p>
    </div>
    <div v-else>
      <p v-if="loaded && !secret.text" class="error"> Please enter password </p>
      <div v-if="!secret.text">
        <input v-model="password" type="password" placeholder="Enter password (if required)" />
        <button @click="fetchSecret">View Secret</button>
      </div>
      <div v-if="secret.text" class="hash-container">
        <p>Secret: <span class="hash">{{ secret.text }}</span></p>
        <p>Redeem Left: <span class="hash">{{ secret.redeemLeft }}</span></p>
        <p>Created Date: <span class="hash">{{ new Date(secret.createdAt).toLocaleString('hu') }}</span></p>
      </div>
      
    </div>
    <p v-if="!loaded">Loading...</p>
  </div>
</template>

<script>
import apiClient from '../axios';

export default {
  data() {
    return {
      password: '',
      secret: {
        text: '',
        redeemLeft: 0,
        createdAt: ''
      },
      error: '',
      loaded: false
    };
  },
  methods: {
    async fetchSecret() {
      const hash = this.$route.params.hash;
      try {
        const response = await apiClient.get(`/secrets/${hash}`, {
          params: { password: this.password }
        });

        this.secret = { 
          text: response.data.secret,
          redeemLeft: response.data.redeemLeft,
          createdAt: response.data.createdAt
        };

      } catch (error) {

        if (error.response && error.response.status === 404) {
          this.error = 'Secret not found';
        } else if (error.response && error.response.status === 403) {
          this.error = 'Incorrect password';
        } else {
          this.error = 'An error occurred';
          console.error('Error fetching secret:', error);
        }

      }

      this.loaded = true;
    }
  },
  async created() {
    this.fetchSecret();
  },
};
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

h1 {
  margin-bottom: 20px;
  color: #343a40;
}

.hash-container {
  margin-top: 20px;
  padding: 10px;
  background-color: #e9ecef;
  border-radius: 5px;
}

.hash {
  font-weight: bold;
  color: #007bff;
}

p {
  font-size: 18px;
  color: #495057;
}

p.error {
  color: #dc3545;
}

input {
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  margin-bottom: 10px;
  width: 100%;
  box-sizing: border-box;
}
</style>
