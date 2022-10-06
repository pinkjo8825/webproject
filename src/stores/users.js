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
    getCurrentUserIndex(state) {
      return state.currentUsername;
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
        imageUrl: img,
        requests: requests,
      };
      this.users.push(newUser);
    },
  },
});
