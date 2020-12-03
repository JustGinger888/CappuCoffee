<template>
  <div class="container mt-4">
    <div class="row">
      <!--Join Group-->
      <div class="col-lg-6">
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
      </div>
      <!--Join Group-->
      <!--Create Group-->
      <div class="col-lg-6">
        <div class="card bg-light">
          <div class="card-body text-center">
            <h2>Create Group</h2>
            <form class="formgroup">
              <div class="input-group input-group-lg">
                <input
                  type="text"
                  class="form-control"
                  name="createGroupName"
                  placeholder="Group name"
                  aria-describedby="buttonAdd"
                  v-model="createGroupName"
                  ref="createGroupName"
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
      </div>
      <!--Create Group-->
    </div>
    <br />
    <!--List Group-->
    <div class="row">
      <div class="col-12">
        <div class="card border-top-0 rounded-0">
          <div class="card-body py-2">
            <h4 class="card-title m-0 text-center">Your Groups</h4>
          </div>
          <div class="list-group list-group-flush">
            <div
              class="list-group-item d-flex"
              v-for="item in groups"
              :key="item.id"
            >
              <section
                class="btn-group align-self-center"
                role="group"
                aria-label="Group Options"
              >
                <button
                  class="btn btn-sm btn-outline-secondary"
                  title="Delete Group"
                  v-on:click="deletegroup(item.id)"
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
      </div>
    </div>
    <!--List Group-->
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Firebase from "firebase";
import db from "../db.js";

export default {
  name: "groups",
  props: ["user", "groups"],
  data() {
    return {
      groupName: null,
      groupID: this.groupID,
      createGroupName: this.createGroupName
    };
  },
  methods: {
    handleCreate() {
      const details = {
        createGroupName: this.createGroupName
      };
      var groupRef = null;

      console.log(this.user.uid);
      // Creating Group
      db.collection("groups")
        .add({
          name: details.createGroupName,
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
                  name: details.createGroupName,
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

      this.createGroupName = null;
      this.$refs.createGroupName.focus();
    },
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
    },
    deletegroup(id) {
      db.collection("users")
        .doc(this.user.uid)
        .collection("groups")
        .doc(id)
        .delete();
    }
  },
  components: {
    FontAwesomeIcon
  }
};
</script>
