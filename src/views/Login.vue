<!-- eslint-disable prettier/prettier -->
<template>
    <div class="login-container">
        <div class="container">
            <div class="screen">
                <div class="screen__content">
                    <form class="login" @submit.prevent="checkAuthentication">
                        <div class="login__field">
                            <i class="login__icon fas fa-user"></i>
                            <input type="text" class="login__input" v-model="userName" placeholder="User name" />
                        </div>
                        <div class="login__field">
                            <i class="login__icon fas fa-lock"></i>
                            <input type="email" class="login__input" v-model="email" placeholder="Email" />
                        </div>
                        <button class="button login__submit">
                            <span class="button__text">Log In Now</span>
                            <i class="button__icon fas fa-chevron-right"></i>
                        </button>
                    </form>
                </div>
                <div class="screen__background">
                    <span class="screen__background__shape screen__background__shape4"></span>
                    <span class="screen__background__shape screen__background__shape3"></span>
                    <span class="screen__background__shape screen__background__shape2"></span>
                    <span class="screen__background__shape screen__background__shape1"></span>
                </div>
            </div>
        </div>
    </div>

    <transition name="toggle-opacity">
      <info-message v-if="toggleInfoMessage" :info="info" :hint='hint' :check='check'>
          <template #warningIcon>
              <img :src="src" alt="warning icon">
          </template>

          <template #warningMessage>
              <p>{{ warningMessage }}</p>
          </template>

          <template #closeWarning>
              <img class="close" @click="closeWarning" src="@/assets/design-materials/icons/close.png" alt="close icon">
          </template>
      </info-message>
    </transition>
</template>

<script>
import { mapWritableState } from "pinia";
import { userInfo } from "@/stores/userInfo.js";
import { allUsers } from "@/stores/allUsers.js";

import InfoMessage from "../components/global/InfoMessage.vue";

export default {
  name: "login-form",
  data() {
    return {
      userName: "",
      email: "",
      toggleInfoMessage: false,
      src: "",
      warningMessage: "",
      info: false,
      hint: false,
      check: false,
      userState: false,
      emailState: false,
      allUserInfo: [],
    };
  },
  components: {
    InfoMessage,
  },
  computed: {
    ...mapWritableState(userInfo, ["userInfo"]),
    ...mapWritableState(allUsers, ["allUsers"]),
  },
  beforeRouteEnter(to, from, next) {
    if (JSON.parse(localStorage.getItem("allUserInfo"))) {
      next({ name: "home" });
    } else {
      next();
    }
  },
  beforeMount() {
    fetch("https://reqres.in/api/users")
      .then((response) => response.json())
      .then((data) => {
        this.allUsers = data;
      });
  },
  methods: {
    closeWarning() {
      this.toggleInfoMessage = false;
    },
    checkAuthentication() {
      if (this.userState && this.emailState) {
        localStorage.setItem("allUserInfo", JSON.stringify(this.allUserInfo));
        for (const [key, value] of Object.entries(this.allUserInfo)) {
          this.userInfo[`${key}`] = value;
        }
        this.$router.push({ name: "home" });
      } else {
        this.toggleInfoMessage = true;
        this.warningMessage = "wrong username or email";
        this.src = "/src/assets/design-materials/icons/warning.png";
        this.info = false;
        this.hint = false;
        this.check = false;
      }
    },
  },
  watch: {
    userName() {
      for (const user of this.allUsers.data) {
        if (user.first_name === this.userName) {
          this.userState = true;
          break;
        } else {
          this.userState = false;
        }
      }
    },
    email() {
      for (const user of this.allUsers.data) {
        if (user.email === this.email) {
          this.emailState = true;
          this.allUserInfo = user;
          break
        } else {
          this.allUserInfo = false;
          this.userInfo = [];
        }
      }
    },
    toggleInfoMessage() {
      setTimeout(() => {
        this.toggleInfoMessage = false;
      }, 3000);
    },
  },
};
</script>
