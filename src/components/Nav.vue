<!--Navbar component-->
<template>
  <RouterLink to="/">
    <button class="home">
      <img
        width="20"
        height="20"
        src="https://img.icons8.com/ios-filled/50/home.png"
        alt="home"
      />
    </button>
  </RouterLink>
  <RouterLink to="/about">
    <button class="info">
      <img
        width="20"
        height="20"
        src="https://img.icons8.com/ios/50/test--v1.png"
        alt="test--v1"
      />
    </button>
  </RouterLink>
</template>

<style scoped>
.home,
.info {
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}
</style>
