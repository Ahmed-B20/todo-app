<template>
  <div class="user-info-container">

  </div>
</template>

<script>
import { mapWritableState } from "pinia";
import { userInfo } from "@/stores/userInfo.js";

export default {
  name: "main-content",
  data() {
    return {};
  },
  computed: {
    ...mapWritableState(userInfo, ["userInfo"]),
  },
  beforeRouteEnter(to, from, next) {
    if (JSON.parse(localStorage.getItem("allUserInfo"))) {
      next();
    } else {
      next({ name: "login" });
    }
  },
};
</script>
