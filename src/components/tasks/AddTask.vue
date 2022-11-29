<template>
  <div class="add-task">
    <div class="add-task-container" :class="{ error: errorToggle }">
      <span
        :class="{ active: activeToggle }"
        ref="addTask"
        @click="addTaskToList"
      >
        <img src="@/assets/design-materials/icons/plus.png" alt="add-task" />
      </span>

      <input
        @keypress.enter="addTaskToList"
        required
        placeholder="add task"
        v-model="inputValue"
        ref="taskInput"
        type="text"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "add-task",
  props: ["id", 'allUserTasks'],
  data() {
    return {
      inputValue: "",
      activeToggle: false,
      errorToggle: false,
    };
  },
  methods: {
    addTaskToList() {
      if (this.inputValue.length > 0) {
        fetch("https://jsonplaceholder.typicode.com/todos/", {
          method: "POST",
          body: JSON.stringify({
            userId: this.id,
            title: this.inputValue,
            completed: false,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => response.json())
          .then((json) => {
            this.inputValue = ''
            this.$emit('addNewTask', json)
          });
      } else {
        if (this.errorToggle) {
          this.errorToggle = false;
          setTimeout(() => {
            this.errorToggle = true;
          }, 0);
        } else {
          setTimeout(() => {
            this.errorToggle = true;
          }, 0);
        }
      }
    },
  },
};
</script>
