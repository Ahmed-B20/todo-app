<template>
  <div class="all-task">
    <ul class="tasks">
      <transition-group name="tasks-transition">
        <li
          :class="{ complete: task.completed }"
          v-for="task in allUserTasks"
          :key="task.id"
        >
          <span @click="completeTask(task)" class="check">
            <img src="@/assets/design-materials/icons/check.png" alt="check" />
          </span>

          <div class="task-main-info">
            <span class="task-name" :class="{ complete: task.completed }">
              {{ task.title }}
            </span>
          </div>

          <span class="icons-container">
            <img @click="togglePopUp(task, 'rename')" src="@/assets/design-materials/icons/edit.png" alt="edit" />
            <img @click="togglePopUp(task, 'delete')" src="@/assets/design-materials/icons/delete.png" alt="delete" />
          </span>
        </li>
      </transition-group>
    </ul>
  </div>

  <teleport to=".main-content">
    <PopUp :showPopUp="showPopUp">
      <template #title> {{target==='delete'?'Delete Task':'Rename Task'}} </template>

      <template #content>
        <p>{{target==='delete'?`task ${task.name} will be
        permanently
        deleted.`:'enter the new task name'}}</p>

          <template v-if="target==='rename'">
              <div class="rename">
                <input @keypress.enter="newTaskName" @focus="toggleErrorClass" v-model="newName"
                    placeholder="New Name" type="text" name="" id="" :class="{ error: toggleError }" />
              </div>
            </template>
      </template>

      <template #button>
        <button class="close" @click="togglePopUp">Cancel</button>
        <button v-if="target==='delete'" class="delete" @click="deleteTask(task)">Delete</button>
        <button v-else class="move" @click="newTaskName()">Rename</button>
      </template>
    </PopUp>
  </teleport>
</template>

<script>
import PopUp from "@/components/global/PopUp.vue";

export default {
  name: "render-tasks",
  data() {
    return {
      showPopUp: false,
      task: {},
      newName: '',
      target: '',
      toggleError: false,
    };
  },
  components:{
    PopUp,
  },
  props: ["id", "allUserTasks"],
  emits: ['updateTasksArray','deleteTasksArray'],
  methods: {
    toggleErrorClass(){
      return this.toggleError = false
    },
    newTaskName(){
      if (this.newName.length > 0) {
        fetch(`https://jsonplaceholder.typicode.com/todos/${this.task.id}`, {
        method: "PUT",
        body: JSON.stringify({
          userId: this.id,
          id: this.task.id,
          title: this.newName,
          completed: false,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          this.allUserTasks.forEach((userTask, index) => {
            if (userTask.id === this.task.id) {
              this.$emit("updateTasksArray", index, json);
            }
          });
        });
      this.showPopUp = false
      } else {
          if (!!this.toggleError) {
              this.toggleError = false
              setTimeout(() => {
                  this.toggleError = true
              }, 0)
          } else {
              setTimeout(() => {
                  this.toggleError = true
              }, 0)
          }
      }
    },
    togglePopUp(task, target){
      this.task = task
      this.showPopUp = !this.showPopUp
      this.target = target

      if (target === 'rename') {
        this.newName = task.title
      }
    },
    completeTask(task) {
      fetch(`https://jsonplaceholder.typicode.com/todos/${task.id}`, {
        method: "PUT",
        body: JSON.stringify({
          userId: this.id,
          id: task.id,
          title: task.title,
          completed: !task.completed,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          this.allUserTasks.forEach((userTask, index) => {
            if (userTask.id === task.id) {
              this.$emit("updateTasksArray", index, json);
            }
          });
        });
    },
    deleteTask(task){
      fetch(`https://jsonplaceholder.typicode.com/todos/${task.id}`, {
        method: 'DELETE',
      }).then((response) => {
        this.allUserTasks.forEach((userTask, index) => {
            if (userTask.id === task.id) {
              this.showPopUp = false
              this.$emit("deleteTasksArray", index);
            }
          });
      });
    }
  },
  watch: {
    newName(){
      if (!!this.newName) {
        this.toggleError = false
      }
    }
  }
};
</script>
