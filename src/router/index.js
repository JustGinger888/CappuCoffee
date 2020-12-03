import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Profile from "../views/Profile.vue";
import Groups from "../views/Groups.vue";
import Orders from "../views/Orders.vue";
import GroupOrder from "../views/Grouporder.vue";
import Members from "../views/Members.vue";

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
    path: "/groupOrder/:userID/:userGroupID",
    name: "GroupOrder",
    component: GroupOrder
  },
  {
    path: "/members/:userID/:userGroupID",
    name: "Members",
    component: Members
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
