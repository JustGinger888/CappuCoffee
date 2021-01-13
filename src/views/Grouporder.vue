<template>
  <div>
    <div class="card mt-4">
      <h5 class="card-header">
        <div>Order Drink List</div>
        <div>Invite Code: {{ userGroupID }}</div>
      </h5>
      <div class="card-body">
        <button
          type="button"
          class="btn btn-success mr-3"
          v-on:click.prevent="handleCreate"
        >
          Add Coffee
        </button>
        <button
          type="button"
          class="btn btn-danger mr-3"
          v-on:click.prevent="handleDelete"
        >
          Remove Coffee
        </button>
      </div>
      <div class="form-group m-4">
        <label for="formControlRange">Strength 1-5</label>
        <input
          type="range"
          class="custom-range"
          value="1"
          min="1"
          max="5"
          id="strength"
          v-model="strength"
          name="strength"
          ref="strength"
        />
      </div>
      <div class="form-group m-4">
        <label for="customRange3">Sugars 0-4</label>
        <input
          type="range"
          class="custom-range"
          value="0"
          min="0"
          max="4"
          id="sugars"
          v-model="sugars"
        />
      </div>
      <div
        class="card-footer px-3 py-2 d-flex align-items-center justify-content-center"
        v-for="item in orders"
        :key="item.id"
      >
        <div class="mr-3">{{ item.displayName }}</div>
        <div class="mr-3">Strength:{{ item.displayStrength }}</div>
        <div class="mr-3">Sugars: {{ item.displaySugars }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Firebase from "firebase";
import db from "../db.js";

export default {
  name: "groups",
  props: ["user", "groups"],
  data() {
    return {
      orders: [],
      groupName: this.groupName,
      userID: this.$route.params.userID,
      userGroupID: this.$route.params.userGroupID,
      groupID: this.groupID,
      createGroupName: this.createGroupName,
      sugars: this.sugars,
      strength: this.strength
    };
  },
  methods: {
    handleCreate() {
      const details = {
        sugars: this.sugars,
        strength: this.strength
      };
      if (details.sugars == undefined) {
        details.sugars = 2;
      }
      if (details.strength == undefined) {
        details.strength = 3;
      }
      console.log(details.strength);
      db.collection("groups")
        .doc(this.userGroupID)
        .collection("order")
        .doc(this.userID)
        .set({
          CreatedAt: Firebase.firestore.FieldValue.serverTimestamp(),
          orderName: this.user.displayName,
          orderStrength: details.strength,
          orderSugars: details.sugars
        });
    },
    handleDelete() {
      db.collection("groups")
        .doc(this.userGroupID)
        .collection("order")
        .doc(this.userID)
        .delete();
    }
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
            displayName: doc.data().orderName,
            displayStrength: doc.data().orderStrength,
            displaySugars: doc.data().orderSugars
          });
        });
        this.orders = snapData;
        console.log(this.orders);
      });
  }
};
</script>
