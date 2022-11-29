<template>
  <div class="page-not-found">
    <h1 class="no-result">No Results Found</h1>
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
  beforeRouteEnter(to, from, next) {
    let allCookies = document.cookie.split(';')
    let userData

    allCookies.forEach((cooke)=>{
      if (cooke.includes('email') && cooke.includes('first_name')&& cooke.includes('last_name')) {
        userData = JSON.parse(cooke)
      }
    })

    // if (JSON.parse(localStorage.getItem("allUserInfo"))) {
    if (!!userData) {
      next();
    } else {
      next({ name: "login" });
    }
  },
};
</script>
