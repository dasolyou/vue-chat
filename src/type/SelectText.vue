<template>
  <div :class="[item.fromWho === 'bot'? left: right]">
    <ul>
      <li v-for="cont in item.contents" :key="cont.id">
        <button @click="executeNextEvent(cont.nextId)">{{ cont.text }}</button>
      </li>
    </ul>
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
  methods: {
    executeNextEvent(id) {
      this.$store.dispatch('EXECUTE_NEXT_EVENT', id);
    }
  },

  mounted() {
    if(this.item.nextEvent == 'autoPlay') {
      this.executeNextEvent(this.item.nextId);
    }
  }
}
</script>

<style>

</style>