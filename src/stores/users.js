import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    users: [],
    logInStatus: false,
    currentUsername: "",
    currentIndex: "",
  }),
  getters: {
    getCurrentUserIndex(state) {
      const index = state.users
        .map((e) => e.username)
        .indexOf(this.currentUsername);
      this.currentIndex = index;
      return index;
    },
  },
  actions: {

  },
});
