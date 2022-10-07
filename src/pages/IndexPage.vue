<template>
<h1>
  <p>lorem10</p>

</h1>

  <div>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam hic
    voluptatem dolores nam saepe itaque atque? Maiores temporibus voluptate,
    quaerat perspiciatis optio repellat laboriosam cum vel ab quidem facere

  </div>
  <q-icon name='local_car_wash'/>
</template>

<script>
import { defineComponent } from "vue";
import { useCounterStore } from "../stores/users";
export default defineComponent({
  name: "IndexPage",

  data() {
    return {
      storeLogUser: useCounterStore(),
      alLog: true,
    };
  },
});
</script>
