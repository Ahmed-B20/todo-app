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

          <span class="task-main-info">
            <span class="task-name" :class="{ complete: task.completed }">
              {{ task.title }}
            </span>
          </span>
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<script>
export default {
  name: "render-tasks",
  data() {
    return {};
  },
  props: ["id", "allUserTasks"],
  methods: {
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
  },
};
</script>
