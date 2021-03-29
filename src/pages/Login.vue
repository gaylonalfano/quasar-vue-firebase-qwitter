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
import { useRouter } from 'vue-router';
import useLogin from '../composables/useLogin';
//import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'Login',
  setup() {
    // Q: Can I change the var name to 'quasar' instead?
    //const quasar = useQuasar();

    const { login, error } = useLogin();
    const router = useRouter();

    const email = ref<string>('');
    const password = ref<string>('');

    // Form submit handler
    async function handleLogin() {
      // UPDATE If you save 'response' then you can get the user via
      // response.user (instead of via auth.currentUser)
      // Testing whether I can get user from response object instead
      // of auth.currentUser
      const response = await login(email.value, password.value);
      // Works but need auth.currentUser since you're not saving response
      // await login(email.value, password.value);

      // Confirm successful and context.emit("login") to Parent
      if (!error.value) {
        console.log(
          'SUCCESS:Login:handleLogin:response.user: ',
          response?.user
        );

        void router.push({ name: 'Home' });
      }
    }

    return { email, password, handleLogin };
  },
});
</script>

