<template>
  <q-layout view="lHr lpR fFf">
    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="text-weight-bold">
          <span class="gt-sm">{{ $route.name }}</span>
          <q-icon
            class="header-icon q-pa-md lt-md"
            name="fas fa-dove"
            size="sm"
            color="primary"
          />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- Left Drawer -->
    <q-drawer
      :width="280"
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
    >
      <q-icon class="q-pa-md" name="fas fa-dove" size="lg" color="primary" />
      <!-- Add the QList component: https://next.quasar.dev/vue-components/list-and-list-items#qitemsection -->
      <q-list>
        <!-- Add our Navigation Links -->
        <q-item :to="{ name: 'Home' }" exact clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="home" size="md" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold">Home</q-item-section>
        </q-item>

        <q-item :to="{ name: 'About' }" exact clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="help" size="md" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold"
            >About</q-item-section
          >
        </q-item>

        <q-item
          @click="handleLogout"
          :to="{ name: 'Login' }"
          class="absolute-bottom"
          exact
          clickable
          v-ripple
        >
          <q-item-section side>
            <q-avatar size="md">
              <img src="https://cdn.quasar.dev/img/avatar.png" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-subtitle1"
              ><strong>{{ user?.email }}</strong></q-item-label
            >
            <q-item-label caption>@{{ user?.displayName }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="logout" size="md" color="primary" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Right Drawer -->
    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <!-- drawer content -->
      <q-input
        placeholder="Search Qwitter"
        class="q-ma-md"
        outlined
        rounded
        dense
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>

      <!-- Add the News Feed: https://next.quasar.dev/vue-components/list-and-list-items#qitemlabel -->
      <q-list separator padding>
        <q-item class="q-pa-md">
          <q-item-section>
            <q-item-label overline class="text-gray">Education</q-item-label>
            <q-item-label class="text-weight-bold"
              >Amazing happenings!</q-item-label
            >
            <q-item-label caption
              >Secondary line text. Lorem ipsum dolor sit amet, consectetur
              adipiscit elit.</q-item-label
            >
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>

        <q-item class="q-pa-md">
          <q-item-section>
            <q-item-label overline class="text-gray">Education</q-item-label>
            <q-item-label class="text-weight-bold"
              >Amazing happenings!</q-item-label
            >
            <q-item-label caption
              >Secondary line text. Lorem ipsum dolor sit amet, consectetur
              adipiscit elit.</q-item-label
            >
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>

        <q-item class="q-pa-md">
          <q-item-section>
            <q-item-label overline class="text-gray">Education</q-item-label>
            <q-item-label class="text-weight-bold"
              >Amazing happenings!</q-item-label
            >
            <q-item-label caption
              >Secondary line text. Lorem ipsum dolor sit amet, consectetur
              adipiscit elit.</q-item-label
            >
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import useLogout from '../composables/useLogout';
import getUser from '../composables/getUser';

export default defineComponent({
  setup() {
    const { user } = getUser();
    const { logout, error } = useLogout();

    const leftDrawerOpen = ref<boolean>(false);
    const rightDrawerOpen = ref<boolean>(false);

    const router = useRouter();

    // Handle the logout and
    async function handleLogout() {
      await logout();
      // redirect to '/' Login page
      if (!error.value) {
        console.log('SUCCESS:handleLogout');
        void router.push({ name: 'Login' });
      }
    }

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      rightDrawerOpen,
      handleLogout,
      user,
    };
  },
});
</script>

<style lang="sass">
.header-icon
  position: absolute
  bottom: 0
  left: 50%
  transform: translateX(-50%)
</style>
