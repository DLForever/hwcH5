<template>
  <div id="app">
    <keep-alive v-if="$route.meta.keepAlive">
      <img class="img-cover" src="./assets/list1.png">
      <!-- <router-link to="/">
        <img src="@/assets/back.png" style="float: left">
      </router-link> -->
    </keep-alive>
    <!-- <img class="img-cover" src="./assets/list1.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    goBack() {
      this.$router.go(-1)
    },
  }
}
</script>

<style>
/*@import '~vux/src/styles/reset.less';*/
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.img-cover {
  /*position: fixed;*/
  width: 100%;
  height: 100%;
}
</style>
