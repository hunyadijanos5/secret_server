<template>
  <div id="app">
    <nav class="nav-container">
      <router-link to="/create" class="nav-button">Create Secret</router-link>
      <router-link to="/list" class="nav-button">List Secrets</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
nav {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.nav-container {
  padding: 15px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #e0e0e0;
}

.nav-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.nav-button:hover {
  background-color: #0056b3;
}
</style>
