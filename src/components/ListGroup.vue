<template>
  <div class="card border-top-0 rounded-0">
    <div class="card-body py-2">
      <h4 class="card-title m-0 text-center">Your Groups</h4>
    </div>
    <div class="list-group list-group-flush">
      <div class="list-group-item d-flex" v-for="item in groups" :key="item.id">
        <section
          class="btn-group align-self-center"
          role="group"
          aria-label="Group Options"
        >
          <button
            class="btn btn-sm btn-outline-secondary"
            title="Delete Group"
            v-on:click="$emit('deletegroup', item.id)"
          >
            <font-awesome-icon icon="trash"></font-awesome-icon>
          </button>

          <router-link
            class="btn btn-sm btn-outline-secondary"
            title="Chat"
            :to="'/chat/' + user.uid + '/' + item.id"
          >
            <font-awesome-icon icon="link"></font-awesome-icon>
          </router-link>

          <router-link
            class="btn btn-sm btn-outline-secondary"
            title="Members"
            :to="'/members/' + user.uid + '/' + item.id"
          >
            <font-awesome-icon icon="list-ul"></font-awesome-icon>
          </router-link>
        </section>

        <section class="pl-3 text-left align-self-center">
          {{ item.name }}
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export default {
  name: "ListGroup",
  props: ["user", "groups"],

  components: {
    FontAwesomeIcon
  }
};
</script>
