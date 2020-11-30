<template>
  <div class="card bg-light">
    <div class="card-body text-center">
      <h2>Create Group</h2>
      <form class="formgroup">
        <div class="input-group input-group-lg">
          <input
            type="text"
            class="form-control"
            name="groupName"
            placeholder="Group name"
            aria-describedby="buttonAdd"
            v-model="groupName"
            ref="groupName"
          />
          <div class="input-group-append">
            <button
              type="submit"
              class="btn btn-sm btn-danger"
              id="buttonAdd"
              v-on:click.prevent="handleCreate"
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
  name: "CreateGroup",
  props: ["user"],
  data() {
    return {
      groupName: this.groupName
    };
  },
  methods: {
    handleCreate() {
      const details = {
        groupName: this.groupName
      };
      var groupRef = null;

      console.log(this.user.uid);
      // Creating Group
      db.collection("groups")
        .add({
          name: details.groupName,
          createAt: Firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(doc => {
          console.log("Created Group");
          groupRef = doc.id;
          // Adding Members to Group
          db.collection("groups")
            .doc(doc.id)
            .collection("members")
            .add({
              memberID: this.user.uid,
              memberName: this.user.displayName,
              memberEmail: this.user.email,
              JoinedAt: Firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
              console.log("Added Member");

              // Adding Group To user Record
              db.collection("users")
                .doc(this.user.uid)
                .collection("groups")
                .add({
                  name: details.groupName,
                  groupID: groupRef,
                  createAt: Firebase.firestore.FieldValue.serverTimestamp()
                })
                .then(console.log("Added Group to member"))
                .catch(error => {
                  console.error(error);
                });
            })
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
