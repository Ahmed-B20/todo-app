<template>
  <div>not found</div>
</template>

<script>
import { mapWritableState } from "pinia";
import { toggleAside } from "@/stores/toggleAside.js";

export default {
  name: "PageNotFound",
  beforeRouteEnter(to, from, next) {
    if (JSON.parse(localStorage.getItem("allUserInfo"))) {
      next();
    } else {
      next({ name: "login" });
    }
  },
  computed: {
    ...mapWritableState(toggleAside, ["toggleState"]),
  },
  methods: {
    toggleAside() {
      this.toggleState = !this.toggleState;
    },
  },
};
</script>
