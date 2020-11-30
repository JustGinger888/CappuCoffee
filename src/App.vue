<template>
  <div id="app">
    <Navigation :user="user" @logout="logout" />
    <router-view
      class="container"
      :user="user"
      :error="error"
      @updateprofile="updateprofile"
    />
  </div>
</template>

<script>
// Components Import
import Navigation from "@/components/Navigation.vue";
// Firebase Imports
import Firebase from "firebase";
// eslint-disable-next-line no-unused-vars
import db from "./db.js";
export default {
  name: "app",
  data() {
    return {
      user: null,
      error: null,
      groups: []
    };
  },
  methods: {
    logout() {
      Firebase.auth()
        .signOut()
        .then(() => {
          this.user = null;
          this.$router.push("login");
        })
        .catch(err => {
          console.error(err);
        });
    },
    updateprofile(payload) {
      db.collection("users")
        .doc(this.user.uid)
        .update({ displayName: payload })
        .then(this.user.updateProfile({ displayName: payload }))
        .catch(err => {
          this.error = err.message;
          console.error(err);
        });
    }
  },
  mounted() {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      }
    });
  },
  components: {
    Navigation
  }
};
</script>

<style lang="scss">
$primary: brown;
@import "node_modules/bootstrap/scss/bootstrap";
</style>
