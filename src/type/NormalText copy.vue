<template>
  <div :class="[immutableCurrentItem.fromWho === 'bot'? left: right]">
    <span class="normal">{{ immutableCurrentItem.contents.text }}</span>
  </div>
</template>

<script>
/*eslint-disable*/ 
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      left: 'left',
      right: 'right',
      immutableCurrentItem: '',
    }
  },
  computed: {
    ...mapGetters(['currentItem']),

    nextEventType() {
      return this.immutableCurrentItem.nextEvent;
    }
  },
  methods: {
    executeNextEvent(item) {
      this.$store.dispatch('EXECUTE_NEXT_EVENT', item);
    }
    // executeNextEvent() {
    //   this.$store.dispatch('EXECUTE_NEXT_EVENT', {item: item, currentItem: this.currentItem});
    // }

    // executeNextEvent(item) {
    //   this.$store.commit('FIND_NEXT_CHAT_ITEM', item);
    //   console.log(this.currentItem);
    //   if(this.currentItem.loading) {
    //     this.$store.commit('SHOW_LOADING');
    //     console.log("loading");
    //     var delayTime = this.$store.state.loadingInfo.loadingTime;
    //     this.$store.commit('CHANGE_HISTORY', delayTime);
    //   } else {
    //     var delayTime = this.$store.state.delayTime;
    //     console.log("loading- no");

    //     this.$store.commit('CHANGE_HISTORY', delayTime);
    //   }
    // },

    // executeNextEvent(item, nextEventType) {
    //   // if (this.immutableCurrentItem.nextEvent == nextEventType) {
    //     if(this.immutableCurrentItem.loading) {
    //       this.$store.commit('TOGGLE_LOADING');
    //       this.$store.commit('GET_SHOW_TIME');
    //       var loadingTime = this.$store.state.loadingInfo.loadingTime;
    //       var store = this.$store;

    //       setTimeout(function() {
    //         console.log('test');
    //         store.commit('FIND_NEXT_CHAT_ITEM', {item, nextEventType});
    //         store.commit('CHANGE_HISTORY');
    //         return store.commit('TOGGLE_LOADING');
    //       }, loadingTime);
    //     } else {
    //       var store = this.$store;
    //       var delayTime = this.$store.state.delayTime;

    //       setTimeout(function() {
    //         store.commit('FIND_NEXT_CHAT_ITEM', {item, nextEventType});
    //         store.commit('CHANGE_HISTORY');
    //       }, delayTime);
    //     }
    //   // }
    // },
  },
  created() {
    this.$store.commit('CHANGE_CURRENT_ID');
    return this.immutableCurrentItem = this.currentItem;
  },
  mounted() {
    if(this.immutableCurrentItem.nextEvent == 'autoPlay') {
      // this.executeNextEvent(this.immutableCurrentItem);
      this.$store.dispatch('EXECUTE_NEXT_EVENT', this.immutableCurrentItem);
    }
  },
}

</script>

<style scoped>
.left {
  text-align: left;
}
.right {
  text-align: right;
}
.normal {
  
}
</style>