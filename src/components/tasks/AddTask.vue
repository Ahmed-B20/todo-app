<template>
  <div class="add-task">
    <div class="add-task-container" :class="{ error: errorToggle }">
      <template v-if="+listId !== 4">
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
      </template>
    </div>
  </div>
</template>
