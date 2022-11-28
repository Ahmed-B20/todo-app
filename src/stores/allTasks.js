import { defineStore } from "pinia";

export const allTasks = defineStore("allTasks", {
  state: () => {
    return {
      allTasks: [],
    };
  },
  getters: {
    returnAllTasks(state) {
      return state.allTasks;
    },
  },
});
