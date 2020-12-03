<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-8 col-sm-6 col-md-4 col-lg-3 mb-2 p-0 px-1">
        <div class="card">
          <div class="card">
            <div class="card-header">
              Members
            </div>
            <div
              class="card-body px-3 py-2 d-flex align-items-center justify-content-center"
              v-for="item in members"
              :key="item.id"
            >
              <div>{{ item.displayName }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../db.js";
export default {
  name: "members",
  data() {
    return {
      members: [],
      userID: this.$route.params.userID,
      userGroupID: this.$route.params.userGroupID,
      groupID: null
    };
  },
  mounted() {
    console.log(this.userID);
    console.log(this.userGroupID);
    db.collection("users")
      .doc(this.userID)
      .collection("groups")
      .doc(this.userGroupID)
      .get()
      .then(doc => {
        this.groupID = doc.data().groupID;
        console.log(doc.data().groupID);

        db.collection("groups")
          .doc(this.groupID)
          .collection("members")
          .onSnapshot(snapshot => {
            const snapData = [];
            snapshot.forEach(doc => {
              snapData.push({
                id: doc.data().memberId,
                email: doc.data().memberEmail,
                displayName: doc.data().memberName
              });
            });
            this.members = snapData;
            console.log(this.members);
          });
      })
      .catch(function(error) {
        console.error(error);
      });
  }
};
</script>
