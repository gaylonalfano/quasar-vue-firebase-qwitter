<template>
  <q-page>
    <!-- === NewQweet === -->
    <!-- Add a Grid Row to contain TWO nested columns -->
    <!-- Force button to bottom using items-end -->
    <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
      <!-- Column for the input and avatar -->
      <div class="col">
        <q-input
          bottom-slots
          v-model="newQweetContent"
          placeholder="What's happening?"
          counter
          maxlength="280"
          autogrow
          :input-style="{ fontSize: '19px', lineHeight: '1.4' }"
        >
          <template v-slot:before>
            <q-avatar size="lg">
              <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
            </q-avatar>
          </template>
        </q-input>
      </div>
      <!-- Column for the submit button -->
      <div class="col col-shrink">
        <!-- Add margin-bottom on the button to lift it a little -->
        <q-btn
          @click="addQweet"
          unelevated
          rounded
          class="q-mb-lg"
          color="primary"
          label="Qweet"
          :disable="!newQweetContent"
          no-caps
        />
      </div>
    </div>

    <q-separator class="divider" size="10px" color="grey-2" />

    <!-- === Tweets Feed === -->
    <q-list v-for="qweet in qweets" :key="qweet.date" class="">
      <q-item class="q-py-md">
        <q-item-section avatar top>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-subtitle1"
            ><strong>{{ qweet.username }}</strong
            ><span class="text-grey-7 q-mx-xs">{{
              qweet.handler
            }}</span></q-item-label
          >
          <q-item-label class="qweet-content">
            {{ qweet.content }}
          </q-item-label>
          <!-- Add Action Bar of Icons -->
          <div class="qweet-icons row justify-between q-mt-sm">
            <q-btn color="grey" icon="far fa-comment" size="sm" flat round />
            <q-btn color="grey" icon="fas fa-retweet" size="sm" flat round />
            <q-btn color="grey" icon="far fa-heart" size="sm" flat round />
            <q-btn color="grey" icon="fas fa-trash" size="sm" flat round />
          </div>
        </q-item-section>

        <q-item-section side top>
          {{ formatDistance(qweet.date, new Date()) }}
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { formatDistance } from 'date-fns';

interface Qweet {
  username: string;
  handler: string;
  content: string;
  date: number;
}

interface User {
  username: string;
  handler: string;
}

export default defineComponent({
  name: 'Home',
  setup() {
    const newQweetContent = ref<string>('');

    const users: User[] = [
      {
        username: 'Gaylon Alfano',
        handler: '@gaylonalfano',
      },
      {
        username: 'Elon Musk',
        handler: '@teslaking',
      },
      {
        username: 'Bruce Willis',
        handler: '@yippykayay',
      },
    ];

    const qweets: Qweet[] = [
      {
        username: 'Gaylon Alfano',
        handler: '@gaylonalfano',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quo repudiandae perspiciatis saepe praesentium architecto sequi repellat veritatis aut possimus incidunt rem iusto, dignissimos voluptate necessitatibus! Ipsum doloribus animi voluptates?',
        date: 1616654601670,
      },
      {
        username: 'Elon Musk',
        handler: '@teslaking',
        content:
          'Consectetur adipisicing elit. Ea quo repudiandae perspiciatis saepe praesentium architecto sequi repellat veritatis aut possimus incidunt rem iusto, dignissimos voluptate necessitatibus! Ipsum doloribus animi voluptates?',
        date: 1616655054439,
      },
      {
        username: 'Bruce Willis',
        handler: '@yippykayay',
        content:
          'Architecto sequi repellat veritatis aut possimus incidunt rem iusto, dignissimos voluptate necessitatibus! Ipsum doloribus animi voluptates?',
        date: 1616655054439,
      },
    ];

    function addQweet() {
      // Randomly select a user from users
      const randomUser = users[Math.floor(Math.random() * users.length)];
      console.log('addQweet:randomUser: ', randomUser);

      const newQweet: Qweet = {
        username: randomUser.username,
        handler: randomUser.handler,
        content: newQweetContent.value,
        date: Date.now(),
      };

      // Append to beginning (unshift) instead of end (push)
      qweets.unshift(newQweet);
      console.log('qweets AFTER: ', qweets);

      // Clear newQweetContent so it quickly loads
      newQweetContent.value = '';
    }

    return { newQweetContent, qweets, formatDistance, addQweet };
  },
});
</script>

<style lang="sass">
.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4

.qweet-content
  white-space: pre-line

.qweet-icons
  margin-left: -5px
</style>
