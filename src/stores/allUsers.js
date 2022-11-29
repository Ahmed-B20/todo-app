import { defineStore } from "pinia";

export const allUsers = defineStore("allUsers", {
  state: () => {
    return {
      allUsers: {},
    };
  },
  getters: {
    returnallUsers(state) {
      return state.allUsers;
    },
  },
});
