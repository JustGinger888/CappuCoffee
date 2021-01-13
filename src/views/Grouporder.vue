<template>
  <div>
    <div class="card mt-4">
      <h5 class="card-header">{{ userGroupID }} Drink List</h5>
      <div class="card-body">
        <button type="button" class="btn btn-success mr-3">Add Coffee</button>
        <button type="button" class="btn btn-danger mr-3">Remove Coffee</button>
        <button type="button" class="btn btn-warning mr-3">Clear List</button>
      </div>
      <div class="form-group m-4">
        <label for="formControlRange">Strength</label>
        <input
          type="range"
          class="custom-range"
          min="0"
          max="5"
          id="customRange3"
        />
      </div>
      <div class="form-group m-4">
        <label for="customRange3">Sugars</label>
        <input
          type="range"
          class="custom-range"
          min="0"
          max="5"
          id="customRange3"
        />
      </div>
      <div
        class="card-footer px-3 py-2 d-flex align-items-center justify-content-center"
        v-for="item in orders"
        :key="item.id"
      >
        <div>{{ item.displayName }}</div>
      </div>
    </div>
  </div>
</template>

<script>
//import Firebase from "firebase";
import db from "../db.js";

export default {
  name: "groups",
  props: ["groups"],
  data() {
    return {
      orders: [],
      groupName: null,
      userID: this.$route.params.userID,
      userGroupID: this.$route.params.userGroupID,
      groupID: this.groupID,
      createGroupName: this.createGroupName
    };
  },
  methods: {
    handleCreate() {}
  },
  mounted() {
    console.log(this.userID);
    console.log(this.userGroupID);

    db.collection("groups")
      .doc(this.userGroupID)
      .collection("order")
      .onSnapshot(snapshot => {
        const snapData = [];
        snapshot.forEach(doc => {
          snapData.push({
            id: doc.data().orderId,
            email: doc.data().orderStrength,
            displayName: doc.data().orderSugars
          });
        });
        this.orders = snapData;
        console.log(this.orders);
      });
  }
};
</script>
