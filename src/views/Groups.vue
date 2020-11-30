<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-lg-6">
        <JoinGroup />
      </div>
      <div class="col-lg-6">
        <CreateGroup />
      </div>
    </div>
    <br />
    <div class="row">
      <div class="col-12">
        <ListGroup />
      </div>
    </div>
  </div>
</template>

<script>
import CreateGroup from "@/components/CreateGroup.vue";
import JoinGroup from "@/components/JoinGroup.vue";
import ListGroup from "@/components/ListGroup.vue";

export default {
  name: "groups",
  props: ["user", "groups"],
  data() {
    return {
      groupName: null
    };
  },
  components: {
    CreateGroup,
    JoinGroup,
    ListGroup
  },
  methods: {
    handleAdd() {
      this.$emit("addGroup", this.groupName);
      this.groupName = null;
      this.$refs.groupName.focus();
    }
  }
};
</script>
