<template>
  <div class="card bg-light">
    <div class="card-body text-center">
      <h2>Join Group</h2>
      <form class="formgroup">
        <div class="input-group input-group-lg">
          <input
            type="text"
            class="form-control"
            name="groupName"
            placeholder="Group ID"
            aria-describedby="buttonAdd"
            v-model="groupName"
            ref="groupName"
          />
          <div class="input-group-append">
            <button
              type="submit"
              class="btn btn-sm btn-danger"
              id="buttonAdd"
              v-on:click.prevent="handleAdd"
            >
              +
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "JoinGroup",
  data() {
    return {
      groupName: this.groupName
    };
  },
  methods: {
    handleJoin() {
      this.$emit("addGroup", this.groupName);
      this.groupName = null;
      this.$refs.groupName.focus();
    }
  }
};
</script>
