import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    users: [],
    logInStatus: false,
    currentUsername: "",
  }),
  getters: {
    getCurrentUserIndex(state) {
      const index = state.users
        .map((e) => e.username)
        .indexOf(this.currentUsername);
      return index;
    },
  },
  actions: {
    createNewUser(
      username,
      password,
      img = "default-avatar.png",
      requests = [],
      requestsType = [0, 0, 0]
    ) {
      const newUser = {
        username: username,
        password: password,
        imageUrl: img,
        requests: requests,
        requestsType: requestsType,
      };
      this.users.push(newUser);
    },
  },
});
