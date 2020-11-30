<template>
  <div>
    <form
      class="mt-3"
      v-on:submit.prevent="$emit('updateprofile', displayName)"
    >
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <div class="card bg-light">
              <div class="card-body">
                <h3 class="font-weight-light mb-3">Profile Information</h3>
                <section class="form-group">
                  <label class="form-control-label sr-only" for="Email"
                    >Email</label
                  >
                  <input
                    required
                    class="form-control"
                    type="email"
                    id="email"
                    disabled
                    :placeholder="[[user.email]]"
                  />
                </section>
                <section class="form-group">
                  <input
                    required
                    class="form-control"
                    type="text"
                    v-model="displayName"
                    :placeholder="[[user.displayName]]"
                  />
                </section>
                <div class="form-group text-center mb-0">
                  <button class="btn btn-primary" type="submit">Update</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Profile",
  props: ["user"],
  data() {
    return {
      displayName: this.displayName
    };
  },
  mounted() {
    console.log(this.user);
  }
};
</script>
