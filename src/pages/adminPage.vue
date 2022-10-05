<template>
  <div v-if="storeLogUser.username != 'admin'" >
    <h1 class="text-red">access denied</h1>
  </div>
  <div v-else >
    <h1>admin</h1>
  </div>

</template>

<script>
import { defineComponent } from "vue";
import { useCounterStore } from "../stores/user";
export default defineComponent({
  name: "adminPage",
  data() {
    return {
      storeLogUser: useCounterStore(),
    };
  },
});
</script>
