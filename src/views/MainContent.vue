<template>
  <div class="user-info-container">
    <UserInfo />

    <RenderTask :id="userInfo.id" />

    <AddTask :id="userInfo.id" />
  </div>
</template>

<script>
import { mapWritableState } from "pinia";
import { userInfo } from "@/stores/userInfo.js";

import UserInfo from "../components/user-info/UserInfo.vue";
import RenderTask from "../components/tasks/RenderTask.vue";
import AddTask from "../components/tasks/AddTask.vue";

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
  components: {
    UserInfo,
    RenderTask,
    AddTask,
  },
};
</script>
