<template>
  <div :class="[item.fromWho === 'bot'? left: right]">
    <img :src="getSrc" alt="">
  </div>
</template>

<script>
/*eslint-disable*/ 
// import { mapGetters } from 'vuex';

export default {
  props: ['item'],
  data() {
    return {
      left: 'left',
      right: 'right',
    }
  },
  computed: {    
    // ...mapGetters(['getSrc']),
    getSrc() {
      return this.item.contents.responseData ? this.item.contents.responseData.images.original.url : '';
    },
  },
  created() {
    this.$store.dispatch('FETCH_GIPHY', this.item);
  },
  mounted() {
    if(this.item.nextEvent == 'autoPlay') {
      this.$store.dispatch('EXECUTE_NEXT_EVENT', this.item.nextId);
    }
  },
}
</script>

<style>

</style>