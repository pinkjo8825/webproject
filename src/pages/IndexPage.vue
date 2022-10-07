<template>
  <h1>{{ getRequestType() }}</h1>
  <h3>{{ getCurrentUserRequestType()}}</h3>
  <div>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam hic
    voluptatem dolores nam saepe itaque atque? Maiores temporibus voluptate,
    quaerat perspiciatis optio repellat laboriosam cum vel ab quidem facere
  </div>
  <q-icon name="local_car_wash" />
</template>
<script>
import { defineComponent } from "vue";
import { useCounterStore } from "../stores/users";
const fuxk = useCounterStore();
export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      storeLogUser: useCounterStore(),
      alLog: true,
      array: [1, 2, 3, 4],
    };
  },
  methods: {
    getRequestType() {
      let arr = [0, 0, 0];
      for (let user of this.storeLogUser.users) {
        for (let request of user.requests) {
          if (request.status === "pending") {
            arr[0]++;
          }
          if (request.status === "inProcess") {
            arr[1]++;
          }
          if (request.status === "finish") {
            arr[2]++;
          }
        }
      }
      return arr;
    },
    getCurrentUserRequestType() {
      let arr = [0, 0, 0];
      for (let user of this.storeLogUser.users) {
        if (user.username === this.storeLogUser.currentUsername) {
          for (let request of user.requests) {
            if (request.status === "pending") {
              arr[0]++;
            }
            if (request.status === "inProcess") {
              arr[1]++;
            }
            if (request.status === "finish") {
              arr[2]++;
            }
          }
        }
      }
      return arr;
    },
  },
  setup() {
    if (fuxk.users < 1) {
      fuxk.createNewUser("admin", "123456789");
      fuxk.createNewUser("john", "123456789");
      fuxk.createNewUser("net", "123456789");
    }
  },
});
</script>
