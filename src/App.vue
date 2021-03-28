<template>
  <!-- Don't use MainLayout if Login or Signup -->
  <div v-if="$route.name === 'Login'">
    <Login />
  </div>
  <div v-else-if="$route.name === 'Signup'">
    <Signup />
  </div>
  <div v-else>
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Login from './pages/Login.vue';
import Signup from './pages/Signup.vue';

export default defineComponent({
  name: 'App',
  components: { Login, Signup },
});
</script>
