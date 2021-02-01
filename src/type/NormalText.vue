<template>
  <div :class="[item.fromWho === 'bot'? left: right]">
    <span>{{ item.contents.text }}</span>
  </div>
</template>

<script>
/*eslint-disable*/ 
import { mapGetters } from 'vuex';

export default {
  props: ['item'],
  data() {
    return {
      left: 'left',
      right: 'right',
    }
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