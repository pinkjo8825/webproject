import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    logInStatus: false,
    fullname: '',
    userid: '',
    password: '',
    username: '',
    accessToken: '',
    email: '',
    imageUrl: "default-avatar.png",
    listOfRequest: [],
  }),

  getters: {
    doubleCount (state) {
      return state.counter * 2
    }
  },

  actions: {
    increment () {
      this.counter++
    }
  }
})
