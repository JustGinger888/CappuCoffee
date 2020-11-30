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
            v-model="groupID"
            ref="groupName"
          />
          <div class="input-group-append">
            <button
              type="submit"
              class="btn btn-sm btn-danger"
              id="buttonAdd"
              v-on:click.prevent="handleJoin"
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
import Firebase from "firebase";
import db from "../db.js";

export default {
  name: "JoinGroup",
  props: ["user"],
  data() {
    return {
      groupID: this.groupID
    };
  },
  methods: {
    handleJoin() {
      const details = {
        groupID: this.groupID
      };
      db.collection("groups")
        .doc(details.groupID)
        .get()
        .then(doc => {
          // Adding Member To Group
          db.collection("groups")
            .doc(doc.id)
            .collection("members")
            .add({
              memberID: this.user.uid,
              memberName: this.user.displayName,
              memberEmail: this.user.email,
              JoinedAt: Firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(console.log("Group Member Added Succesfully"))
            .catch(error => {
              console.error(error);
            });

          // Add group to user
          db.collection("users")
            .doc(this.user.uid)
            .collection("groups")
            .add({
              name: doc.data().name,
              groupID: doc.id,
              createAt: Firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(console.log("Joined Group Succesfully"))
            .catch(error => {
              console.error(error);
            });
        })
        .catch(error => {
          console.error(error);
        });
      this.groupName = null;
      this.$refs.groupName.focus();
    }
  }
};
</script>
