<template>
  <!-- Make page position relative so scroll area is absolute in order -->
  <!-- for Left Drawer not to scroll off page -->
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
      <h2 v-if="error">{{ error }}</h2>
      <!-- === NewQweet === -->
      <!-- Add a Grid Row to contain TWO nested columns -->
      <!-- Force button to bottom using items-end -->
      <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
        <!-- Column for the input and avatar -->
        <div class="col">
          <q-input
            v-model="newQweetContent"
            :input-style="{ fontSize: '19px', lineHeight: '1.4' }"
            placeholder="What's happening?"
            maxlength="280"
            bottom-slots
            autogrow
            counter
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
            :disable="!newQweetContent"
            class="q-mb-lg"
            color="primary"
            label="Qweet"
            no-caps
            unelevated
            rounded
          />
        </div>
      </div>

      <q-separator class="divider" size="10px" color="grey-2" />

      <!-- === Tweets Feed === -->
      <q-list separator>
        <!-- Wrap Tweets with Transtion-Group Component -->
        <!-- NOTE Must have v-for INSIDE (on q-item, not q-list) of transition component -->
        <transition-group
          appear
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated fadeOut slow"
        >
          <!-- Single Tweet Item -->
          <q-item v-for="qweet in qweets" :key="qweet.id" class="q-py-md">
            <q-item-section avatar top>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-subtitle1"
                ><strong>{{ qweet.displayName }}</strong
                ><span class="text-grey-7 q-mx-xs"
                  >@{{ qweet.displayName.toLowerCase() }} <br class="lt-md" />
                  &bull;
                  {{ formatDistanceToNow(qweet.createdAt.toDate()) }}
                </span></q-item-label
              >
              <q-item-label class="qweet-content">
                {{ qweet.content }}
              </q-item-label>
              <!-- Add Action Bar of Icons/Buttons -->
              <div class="qweet-icons row justify-between q-mt-sm">
                <q-btn
                  color="grey"
                  icon="far fa-comment"
                  size="sm"
                  flat
                  round
                />
                <q-btn
                  color="grey"
                  icon="fas fa-retweet"
                  size="sm"
                  flat
                  round
                />
                <q-btn color="grey" icon="far fa-heart" size="sm" flat round />
                <q-btn color="grey" icon="fas fa-trash" size="sm" flat round />
              </div>
            </q-item-section>

            <q-item-section side top> </q-item-section>
          </q-item>
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import getCollection from '../composables/getCollection';
import { formatDistanceToNow } from 'date-fns';

// interface Qweet {
//   id?: string;
//   displayName: string;
//   //handler: string;
//   content: string;
//   date: number;
// }

interface User {
  username: string;
  handler: string;
}

export default defineComponent({
  name: 'Home',
  setup() {
    const { documents: qweets, error } = getCollection('qweets') as {
      documents: Ref<object> /* eslint-disable-line */;
      error: Ref<string | null>;
    };

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

    // const qweets = ref<Qweet[]>([
    //   {
    //     username: 'Gaylon Alfano',
    //     handler: '@gaylonalfano',
    //     content:
    //       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quo repudiandae perspiciatis saepe praesentium architecto sequi repellat veritatis aut possimus incidunt rem iusto, dignissimos voluptate necessitatibus! Ipsum doloribus animi voluptates?',
    //     date: 1616654601670,
    //   },
    //   {
    //     username: 'Elon Musk',
    //     handler: '@teslaking',
    //     content:
    //       'Consectetur adipisicing elit. Ea quo repudiandae perspiciatis saepe praesentium architecto sequi repellat veritatis aut possimus incidunt rem iusto, dignissimos voluptate necessitatibus! Ipsum doloribus animi voluptates?',
    //     date: 1616655054439,
    //   },
    //   {
    //     username: 'Bruce Willis',
    //     handler: '@yippykayay',
    //     content:
    //       'Architecto sequi repellat veritatis aut possimus incidunt rem iusto, dignissimos voluptate necessitatibus! Ipsum doloribus animi voluptates?',
    //     date: 1616726930472,
    //   },
    // ]);
    // console.log('qweets INIT: ', qweets.value);

    // function addQweet() {
    //   // Randomly select a user from users
    //   const randomUser = users[Math.floor(Math.random() * users.length)];
    //   console.log('addQweet:randomUser: ', randomUser);

    //   const newQweet: Qweet = {
    //     username: randomUser.username,
    //     handler: randomUser.handler,
    //     content: newQweetContent.value,
    //     date: Date.now(),
    //   };

    //   // Append to beginning (unshift) instead of end (push)
    //   qweets.value.unshift(newQweet);
    //   console.log('qweets AFTER: ', qweets.value);

    //   // Clear newQweetContent so it quickly loads
    //   newQweetContent.value = '';
    // }

    // function deleteQweet(qweet: Qweet) {
    //   console.log('deleteQweet:qweet: ', qweet);
    //   // Eventually we'll be using Firestore IDs, etc.
    //   // For now using date as the identifier
    //   const dateToDelete = qweet.date;
    //   const indexToDelete = qweets.value.findIndex(
    //     (qweet: Qweet) => qweet.date === dateToDelete
    //   );
    //   console.log('indexToDelete: ', indexToDelete);
    //   // Delete the actual Qweet using splice()
    //   qweets.value.splice(indexToDelete, 1);
    //   //qweets.value.filter((qweet: Qweet) => qweet.date != dateToDelete); // Doesn't really delete...
    //   console.log('qweets AFTER: ', qweets.value);
    // }

    return { newQweetContent, qweets, formatDistanceToNow, error };
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
