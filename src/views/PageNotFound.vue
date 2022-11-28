<template>
  <div class="page-not-found">
    <h1 class="no-result">No Results Found</h1>
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
  beforeRouteEnter(to, from, next) {
    if (JSON.parse(localStorage.getItem("allUserInfo"))) {
      next();
    } else {
      next({ name: "login" });
    }
  },
};
</script>
