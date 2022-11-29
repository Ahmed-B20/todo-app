<template>
  <div class="user-info-container">
    <UserInfo />

    <RenderTask :id="userInfo.id" :allUserTasks="allUserTasks" @deleteTasksArray="deleteTask" @updateTasksArray="updateArray" />

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
    let allCookies = document.cookie.split(';')
    let userData

    allCookies.forEach((cooke)=>{
      if (cooke.includes('email') && cooke.includes('first_name')&& cooke.includes('last_name')) {
        userData = JSON.parse(cooke)
      }
    })

    // if (JSON.parse(localStorage.getItem("allUserInfo"))) {
    if (!!userData) {
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
    let allCookies = document.cookie.split(';')
    let userData

    allCookies.forEach((cooke)=>{
      if (cooke.includes('email') && cooke.includes('first_name')&& cooke.includes('last_name')) {
        userData = JSON.parse(cooke)
      }
    })

    for (const [key, value] of Object.entries(userData)) {
          this.userInfo[`${key}`] = value;
    }

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
    deleteTask(index){
      this.allUserTasks.splice(index, 1);
      this.allTasks.splice(index, 1);
    },
  },
};
</script>
