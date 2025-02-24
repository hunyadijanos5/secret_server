<template>
  <div class="container">
    <h1>Create Secret</h1>
    <input v-model="secret" placeholder="Enter your secret" />
    <input v-model="password" type="password" placeholder="Enter a password (optional)" />
    <button @click="createSecret">Create</button>
    <div v-if="hash" class="hash-container">
      <p>Your secret hash: <span class="hash">{{ hash }}</span></p>
      <button @click="copyToClipboard">Copy to Clipboard</button>
    </div>
  </div>
</template>

<script>
import apiClient from '../axios';

export default {
  data() {
    return {
      secret: '',
      password: '',
      hash: '',
    };
  },
  methods: {
    async createSecret() {
      const response = await apiClient.post('/secrets', { secret: this.secret, password: this.password });
      this.hash = response.data.hash;
    },
    copyToClipboard() {
      const viewLink = `${window.location.origin}/#/view/${this.hash}`;
      navigator.clipboard.writeText(viewLink).then(() => {
        alert('Link copied to clipboard!');
      });
    },
  },
};
</script>

<style scoped>
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

button {
  margin-top: 10px;
}
</style>
