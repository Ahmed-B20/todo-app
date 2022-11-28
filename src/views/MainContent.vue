<template>
  <div class="user-info-container">
    <UserInfo />

    <RenderTask :id="userInfo.id" :allUserTasks="allUserTasks" @updateTasksArray="updateArray" />

    <AddTask :id="userInfo.id" :allUserTasks="allUserTasks" @addNewTask="addTask" />
  </div>
</template>

<script>
import { mapWritableState } from "pinia";
import { userInfo } from "@/stores/userInfo.js";
import { allTasks } from "@/stores/allTasks.js";

import UserInfo from "../components/user-info/UserInfo.vue";
import RenderTask from "../components/tasks/RenderTask.vue";
import AddTask from "../components/tasks/AddTask.vue";

export default {
  name: "main-content",
  data() {
    return {
      allUserTasks: [],
    };
  },
  computed: {
    ...mapWritableState(userInfo, ["userInfo"]),
    ...mapWritableState(allTasks, ["allTasks"]),
  },
  beforeRouteEnter(to, from, next) {
    if (JSON.parse(localStorage.getItem("allUserInfo"))) {
      next();
    } else {
      next({ name: "login" });
    }
  },
  components: {
    UserInfo,
    RenderTask,
    AddTask,
  },
  beforeMount() {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        json.forEach((task) => {
          if (task.userId === this.userInfo.id) {
            this.allUserTasks.push(task);
            this.allTasks.push(task)
          }
        });
      });
  },
  methods: {
    updateArray(index, newTask){
      this.allUserTasks.splice(index, 1, newTask);
      this.allTasks.splice(index, 1, newTask);
    },
    addTask(newTask){
      this.allUserTasks.push(newTask)
      this.allTasks.push(newTask)
    },
  },
};
</script>
