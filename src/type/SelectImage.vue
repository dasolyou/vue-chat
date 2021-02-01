<template>
  <div :class="[item.fromWho === 'bot'? left: right]">
    <ul>
      <li v-for="cont in item.contents" :key="cont.text">
        <a :href="cont.url">
          <div>
            <img :src="cont.path" alt="">
            <p>{{ cont.text }}</p>
          </div>
        </a>
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
  mounted() {
    if(this.item.nextEvent == 'autoPlay') {
      this.$store.dispatch('EXECUTE_NEXT_EVENT', this.item.nextId);
    }
  }
}
</script>

<style>

</style>