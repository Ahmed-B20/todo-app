import { defineStore } from "pinia";

export const userInfo = defineStore("userInfo", {
  state: () => {
    return {
      // userInfo: JSON.parse(localStorage.getItem("allUserInfo")) || {
        userInfo:  {
        createdAt: "",
        email: "",
        id: "",
        userName: "",
      },
    };
  },
  getters: {
    returnUserInfo(state) {
      return state.userInfo;
    },
  },
});
