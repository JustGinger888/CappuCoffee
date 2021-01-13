<template>
  <div class="mt-3">
    <div class="text-secondary text-center">
      <div v-if="user" class="text-center">
        Welcome Back
        <span class="font-weight-bold text-danger">{{ user.displayName }}</span>
      </div>
    </div>
    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col-10 col-md-10 col-lg-8 col-xl-7">
          <h4 class="display-4 text-primary mb-2">Groups Log</h4>
          <p class="lead">
            This simple app creates Groups, allows people to join them, and then
            add their cup of coffee with their set preferances to an active
            order. It's an example of a Single Page Application which includes
            connection to a database and routing, and demonstrates CRUD
            operations by using
            <a href="https://vuejs.org/">Vue.js</a>
            with
            <a href="https://firebase.google.com">Firebase</a>.
          </p>

          <router-link
            class="btn btn-outline-primary mr-2"
            to="/register"
            v-if="!user"
            >Register</router-link
          >
          <router-link
            class="btn btn-outline-primary mr-2"
            to="/login"
            v-if="!user"
            >Log In</router-link
          >
          <router-link class="btn btn-primary" to="/groups" v-if="user"
            >Groups</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  props: ["user", "error"],
  components: {}
};
</script>
