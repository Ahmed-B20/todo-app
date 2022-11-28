import MainContent from "@/views/MainContent.vue";
import PageNotFound from "@/views/PageNotFound.vue";
import Login from "@/views/Login.vue";

const routes = [
  { path: "/", name: "home", redirect: "/list/0" },
  { path: "/home", name: "homePage", redirect: "/list/0" },
  { path: "/login", name: "login", component: Login },
  {
    path: "/home/:listId(\\d+)",
    name: "list",
    component: MainContent,
    props: true,
  },
  { path: "/:pathMatch(.*)*", name: "not-found", component: PageNotFound },
];

export default routes;
