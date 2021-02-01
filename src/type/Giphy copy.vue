<template>
  <div>
    <!-- <img :src="immutableGiphy.data[randomGiphy].images.original.url" alt=""> -->
    <img :src="propsdata.responseData.data[randomGiphy].images.original.url" alt="">
  </div>
</template>

<script>
/*eslint-disable*/ 
// import { mapGetters } from 'vuex';

export default {
  props: ['propsdata'],
  data() {
    return {
      immutableGiphy: ''
    }
  },
  computed: {
    // ...mapGetters(['currentGiphy']),

    randomGiphy() {
      return Math.floor(Math.random() * 5);
    }
  },
  created() {
    // console.log("propsdata",this.propsdata.search);
    this.$store.dispatch('FETCH_GIPHY', this.propsdata.search);
    console.log("randomGiphy", this.randomGiphy);
    return this.immutableGiphy = this.$store.state.giphy;
    // return this.immutableGiphy = this.currentGiphy;
  },
}
</script>

<style>

</style>