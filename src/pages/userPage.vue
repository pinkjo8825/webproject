<template>
  <q-layout view="hHh lpR lff">
    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" elevated>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import { useCounterStore } from "../stores/user";
export default defineComponent({
  name: "userPage",
  data() {
    return {
      leftDrawerOpen: true,
      storeLogUser: useCounterStore(),
    };
  },
});
</script>
