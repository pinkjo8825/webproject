import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    users: [],
    logInStatus: false,
    currentUsername: "",
    currentIndex: null,
  }),

  getters: {
    doubleCount(state) {
      return state.counter * 2;
    },
    getImg(state) {
      return this.users[this.currentIndex].imageUrl;
    },
  },

  actions: {
    createNewUser(
      username,
      password,
      img = "default-avatar.png",
      requests = []
    ) {
      const newUser = {
        username: username,
        password: password,
        requests: requests,
        imageUrl: img,
      };
      this.users.push(newUser);
    },
  },
});
