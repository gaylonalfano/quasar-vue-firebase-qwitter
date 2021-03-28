<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit.prevent="handleLogin" class="q-gutter-md">
      <q-input filled v-model="email" label="Email address" type="email" />

      <q-input filled type="password" v-model="password" label="Password" />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue';
//import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'Login',
  setup() {
    // Q: Can I change the var name to 'quasar' instead?
    //const quasar = useQuasar();

    const displayName = ref<string>('');
    const email = ref<string>('');
    const password = ref<string>('');

    function handleLogin() {
      console.log('handleLogin');
    }

    return { displayName, email, password, handleLogin };
  },
});
</script>

