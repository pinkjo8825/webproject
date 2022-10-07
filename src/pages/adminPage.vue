<template>
  <div v-if="storeLogUser.currentUsername !== 'admin'">
    <h1 class="text-red">access denied</h1>
  </div>
  <div v-else class="q-pa-md">
    <q-layout
      view="hHh Lpr lff"
      container
      style="height: 90vh"
      class="shadow-2 rounded-borders"
    >
      <q-header elevated class="bg-black">
        <q-toolbar>
          <q-toolbar-title>admin</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer show-if-above :width="300" :breakpoint="500">
        <q-scroll-area class="fit">
          <q-list padding class="menu-list">
            <q-item   >
              <q-item-section avatar>
                <q-icon name="account_circle" />
              </q-item-section>

              <q-item-section> Total Acc: </q-item-section>
            </q-item>

            <q-item >
              <q-item-section avatar>
                <q-icon name="text_snippet" />
              </q-item-section>

              <q-item-section> Total Req: </q-item-section>
            </q-item>

            <q-item >
              <q-item-section avatar>
                <q-icon name="pending_actions" />
              </q-item-section>

              <q-item-section> Pending Req: </q-item-section>
            </q-item>

            <q-item >
              <q-item-section avatar>
                <q-icon name="loop" />
              </q-item-section>

              <q-item-section> In-process Req: </q-item-section>
            </q-item>

            <q-item >
              <q-item-section avatar>
                <q-icon name="check_circle_outline" />
              </q-item-section>

              <q-item-section> Finished Req: </q-item-section>
            </q-item>
            <q-separator />
          <q-item clickable v-ripple >
              <q-item-section avatar>
                <q-icon name="settings" />
              </q-item-section>

              <q-item-section> Edit </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-page padding>
          <p v-for="n in 15" :key="n">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil
            praesentium molestias a adipisci, dolore vitae odit, quidem
            consequatur optio voluptates asperiores pariatur eos numquam rerum
            delectus commodi perferendis voluptate?
          </p>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useCounterStore } from "../stores/users";
export default defineComponent({
  name: "adminPage",
  data() {
    return {
      storeLogUser: useCounterStore(),
    };
  },
});
</script>
