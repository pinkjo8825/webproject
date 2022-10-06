<template>
  <div v-if="storeLogUser.username != 'admin'" >
    <h1 class="text-red">access denied</h1>
  </div>
  <q-page v-else>
  <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <p>234</p>
    </q-drawer>
 </q-page>

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
