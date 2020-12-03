import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Profile from "../views/Profile.vue";
import Groups from "../views/Groups.vue";
import Orders from "../views/Orders.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile
  },
  {
    path: "/orders",
    name: "orders",
    component: Orders
  },
  {
    path: "/groups",
    name: "groups",
    component: Groups
  },
  {
    path: "/chat/:userID/:chatID",
    name: "Chat",
    component: Chat
  },
  {
    path: "/*",
    redirect: "/"
  }
];

const router = new VueRouter({
  routes
});

export default router;
