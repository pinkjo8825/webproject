import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    users: [
      {
        imageUrl: "default-avatar.png",
        password: "1234567890",
        requests: [
          {
            additionServices: ["paintRestoration", "waterSpotRemoval"],
            carType: "pickUpL",
            clean: "insideAndOutsite",
            licensePlate: "ab1123",
            status: "pending",
          },
        ],
        username: "john",
        requestsType: [0,0,0]
      },
    ],
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
      requestsType = [0,0,0]
    ) {
      const newUser = {
        username: username,
        password: password,
        imageUrl: img,
        requests: requests,
        requestsType: requestsType
      };
      this.users.push(newUser);
    },

    getRequestIndex(license) {
      const indexUser = this.getCurrentUserIndex;
      const index = this.users[indexUser]
        .map((e) => e.requests)
        .map((a) => a.licensePlate)
        .indexOf(license);
      return index;
    },
    getRequestIndex(usrname, license) {
      const indexUser = getUserIndex(usrname);
      const index = this.users[indexUser]
        .map((e) => e.requests)
        .map((a) => a.licensePlate)
        .indexOf(license);
      return index;
    },
    getRequestStatus() {
      console.log("getRequestStatus")
      const indexUser = this.getCurrentUserIndex;
      let arr = [0, 0, 0];
      for (const request of this.users[indexUser].requests) {
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
      return arr;
    },
  },
});
