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
}

.mynav {
  position: absolute;
  top: 600px;
  width: 100%; 
}
</style>
