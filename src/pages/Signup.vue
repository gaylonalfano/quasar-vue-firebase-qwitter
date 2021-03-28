<template>
  <q-page>
    <div class="q-pa-md" style="max-width: 400px">
      <q-form @submit.prevent="handleSignup" class="q-gutter-md">
        <q-input
          filled
          v-model="displayName"
          label="Display name"
          type="text"
        />

        <q-input filled v-model="email" label="Email address" type="email" />

        <q-input filled type="password" v-model="password" label="Password" />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue';
//import { useQuasar } from 'quasar';
import useSignup from '../composables/useSignup';

export default defineComponent({
  name: 'Signup',
  emits: {
    signup(user) {
      // Validate our payload (true if good, false is bad)
      // NOTE Can add type validation as well, etc.
      console.log('signup function payload VALIDATION: ', user);
      if (user) {
        return true;
      } else {
        return false; // invalid payload
      }
      // NOTE Can simplify using !! not not syntax
      // return !!currentCtxUser;
    },
  },
  setup(props, context) {
    // Q: Can I change the var name to 'quasar' instead?
    //const quasar = useQuasar();
    const { signup, error } = useSignup();

    const displayName = ref<string>('');
    const email = ref<string>('');
    const password = ref<string>('');

    // Form submit handler
    async function handleSignup() {
      // UPDATE If you save 'response' then you can get the user via
      // response.user (instead of via auth.currentUser)
      // Testing whether I can get user from response object instead
      // of auth.currentUser
      const response = await signup(
        email.value,
        password.value,
        displayName.value
      );
      // Works but need auth.currentUser since you're not saving response
      // await signup(email.value, password.value, displayName.value);

      // Confirm successful and context.emit("signup") to Parent
      if (!error.value) {
        // Need emit custom event and auth user
        // Q: Could we get user from the await signup() response?
        // A: Yes! You can use response?.user to achieve the same thing
        // const user = auth.currentUser;
        // context.emit("signup", user);
        context.emit('signup', response?.user);
      }
    }

    return { displayName, email, password, handleSignup };
  },
});
</script>
