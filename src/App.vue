<template lang="pug">
  #app
    vue-letter-nav()
</template>

<script>
import VueLetterNav from './components/demo/vue-letter-nav.vue'

export default {
  name: 'app',
  components: {
    VueLetterNav
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
