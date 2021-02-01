<template>
  <div :class="left">
    <div v-if="this.$store.state.loadingInfo.toggleLoading" class="loading"></div>
  </div>
</template>

<script>
/*eslint-disable*/ 

export default {
  data() {
    return {
      left: 'left',
      toggleLoading: '',
    }
  },
  methods: {
    testClick() {
      this.$store.commit('SHOW_LOADING');
    },
  }
}
</script>

<style>
.loading {
  width: 100px;
  height: 50px;
  background: #000;
}
</style>