<template>
  <h2>Tasks Analysis</h2>

  <table>
    <thead>
      <tr>
        <th class="main">Category</th>
        <th>Completed</th>
        <th>Uncompleted</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td rowspan="2">Task</td>
        <td>{{completedTasks}}</td>
        <td>{{unCompletedTasks}}</td>
      </tr>
      <tr>
        <td colspan="2" class="text-center">{{allTasks.length}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState } from "pinia";
import { allTasks } from "@/stores/allTasks.js";

export default {
  name: "ToDoAnalysis",
  beforeMount() {
    this.completedTasks = 0
    this.unCompletedTasks = 0
    
    this.allTasks.forEach((task) => {
      if (task.completed) {
        this.completedTasks++
      } else {
        this.unCompletedTasks++
      }
    })
  },
  data() {
    return {
      completedTasks: 0,
      unCompletedTasks: 0,
    }
  },
  computed: {
    ...mapState(allTasks, ["allTasks"]),
  },
};
</script>
