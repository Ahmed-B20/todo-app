import { defineStore } from "pinia";

export const statistics = defineStore("statistics", {
  state: () => {
    return {
      statistics: JSON.parse(
        localStorage.getItem("allListAndTasksStatistics")
      ) || {
        allTasks: {
          completedTasks: 0,
          unCompletedTasks: 0,
          allTasks: 0,
        },
      },
    };
  },
  getters: {
    returnStatistics(state) {
      return state.statistics;
    },
  },
});
