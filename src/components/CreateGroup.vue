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
