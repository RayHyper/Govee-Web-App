<template>
  <div class="container" id="card">
    <RouterView />
    <div class="mynav">
      <Nav />
    </div>
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";

export default {
  components: {
    Nav,
  },
};
</script>

<style scoped>
.container {
  position: relative;
  /* Other styles for the container */
}

.mynav {
  position: absolute;
  top: 600px; /* Position 100px below the container */
  width: 100%; /* Ensure it takes the full width of the container */
  /* Other styles for the mynav */
}
</style>
