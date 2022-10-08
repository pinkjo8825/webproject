<template>
  <div class="bg-image fixed text-blue-1 q-px-xl">
    <div class="q-px-xl q-mt-xl flex justify-center">
      <div class="q-mt-xl text-h1" id="title">
        CAR WASHING SYSTEM
        <div>
          <q-btn
            color="deep-orange"
            glossy
            @click="priceDialog = true"
            label="Pricing"
          />
        </div>
      </div>

      <div class="q-mt-xl">
        <img
          src="carwash.svg"
          width="500"
          height="300"
        />
      </div>
    </div>
    <div class="secondary q-mt-xl flex justify-center"></div>
  </div>
  <q-dialog v-model="priceDialog">
    <q-card>

        <q-card-section class="q-pt-sm">
         <img
          src="price.png"
          width="500"
          height="300"
        />
        </q-card-section>
        <q-separator/>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent } from "vue";
import { useCounterStore } from "../stores/users";
const store = useCounterStore();
export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      storeLogUser: useCounterStore(),
      priceDialog: false
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
    if (store.users.length < 1) {
      const newUser = {
        username: "admin",
        password: "password",
        imageUrl: "",
        requests: [],
      };
      store.users.push(newUser);
    }
  },
});
</script>

<style scoped>
#title {
  width: 500px;
  height: 300px;
}
.center-text {
  justify-content: center;
  align-items: center;
  text-align: center;
}
.bg-image {
  width: 100%;
  height: 100%;
  background: rgb(53, 50, 103);
  background: linear-gradient(
    45deg,
    rgba(53, 50, 103, 1) 13%,
    rgba(26, 123, 164, 0.9206276260504201) 41%
  );
}
</style>
