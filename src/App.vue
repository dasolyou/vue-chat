<template>
  <div id="app">
    <chat-layout></chat-layout>
  </div>
</template>

<script>
import ChatLayout from './layout/ChatLayout.vue'

export default {
  name: 'App',
  created(){
    this.$store.commit('INIT_CHAT');
  },
  components: {
    ChatLayout,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
