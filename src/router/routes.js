import MainContent from "@/views/MainContent.vue";
import PageNotFound from "@/views/PageNotFound.vue";
import Login from "@/views/Login.vue";

const routes = [
  { path: "/", name: "home", redirect: "/home/0" },
  { path: "/home", name: "homePage", redirect: "/home/0" },
  { path: "/login", name: "login", component: Login },
  {
    path: "/home/:taskId(\\d+)",
    name: "task",
    component: MainContent,
    props: true,
  },
  { path: "/:pathMatch(.*)*", name: "not-found", component: PageNotFound },
];

export default routes;
