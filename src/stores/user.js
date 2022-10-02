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
