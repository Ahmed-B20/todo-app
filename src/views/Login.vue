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
</template>

<script>
import { userInfo } from '@/stores/userInfo.js'
import { mapWritableState } from 'pinia'

export default {
  name: "login-form",
  data() {
    return {
      userName: "",
      email: "",
    };
  },
  computed:{
    ...mapWritableState(userInfo, ['userInfo']),
  },
  methods: {
    checkAuthentication() {
      if (!!this.userName && this.email) {
        fetch("https://reqres.in/api/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userName: this.userName,
            email: this.email,
          }),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Something went wrong");
          })
          .then((responseJson) => {
            console.log(responseJson);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>
