<template>
  <div class="user-info-parent">
    <div class="user-info">
      <div class="img">
        <img
          title="user avatar"
          class="user-image"
          :src="userInfo.avatar"
          alt="settings"
        />
      </div>

      <div class="info">
        <p>{{ userInfo.first_name }} {{ userInfo.last_name }}</p>
        <p>{{ userInfo.email }}</p>
      </div>

      <img
        @click.self="toggleUserInfo"
        title="user setting"
        class="user-setting"
        src="@/assets/design-materials/icons/setting.png"
        alt="settings"
      />
    </div>
  </div>

  <teleport to=".main-content">
    <PopUp :showPopUp="showPopUp">
      <template #title> Hello {{ userInfo.first_name }} </template>

      <template v-slot:content>
        <p>it is a good day for achievement</p>

        <hr class="custom-hr" />

        <ToDoAnalysis />
      </template>

      <template #button>
        <button class="close" @click="toggleUserInfo">Cancel</button>
        <button class="delete" @click="logout">Logout</button>
      </template>
    </PopUp>
  </teleport>
</template>

<script>
import { mapWritableState } from "pinia";
import { userInfo } from "@/stores/userInfo.js";
import { allTasks } from "@/stores/allTasks.js";

import PopUp from "@/components/global/PopUp.vue";
import ToDoAnalysis from "./ToDoAnalysis.vue";

export default {
  name: "user-info",
  data() {
    return {
      showPopUp: false,
    };
  },
  components: {
    PopUp,
    ToDoAnalysis,
  },
  computed: {
    ...mapWritableState(userInfo, ["userInfo"]),
    ...mapWritableState(allTasks, ["allTasks"]),
  },
  methods: {
    toggleUserInfo() {
      this.showPopUp = !this.showPopUp;
    },
    logout(){
      localStorage.removeItem("allUserInfo");
      this.allTasks = []
      this.$router.push({ name: "login" });
    }
  },
};
</script>
