<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import store from 'renderer/vuex/store'
  export default {
    store
  }
</script>

<style>
  @import url(https://fonts.googleapis.com/css?family=Lato:300);

  * {
    margin: 0;
    padding: 0;
  }

  html,
  body { height: 100%;overflow: hidden;}

  body {
    font-family: Lato, Helvetica, sans-serif;
    box-shadow:0 0 10px 20px #3d0ab7;
  }
</style>
