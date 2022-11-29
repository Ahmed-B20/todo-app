<template>
  <transition name="to-top">
    <div class="warning-message-container">
      <div
        class="warning-message-content"
        :class="{ info: info, hint: hint, check: check }"
      >
        <slot name="warningIcon"></slot>
        <slot name="warningMessage"></slot>
        <slot name="closeWarning"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "WarningMessage",
  props: ["info", "hint", "check"],
};
</script>
