<template>
  <div>
    <select-text :id='id' v-if="componentType === 'SelectText'"></select-text>
    <normal-text :id='id' v-else-if="componentType === 'NormalText'"></normal-text>
    <text-input :id='id' v-else-if="componentType === 'TextInput'"></text-input>
    <select-image :id='id' v-else-if="componentType === 'SelectImage'"></select-image>
    <giphy :id='id' v-else-if="componentType === 'Giphy'"></giphy>
  </div>
</template>

<script>
import SelectText from "../type/SelectText.vue";
import TextInput from "../type/TextInput.vue";
import NormalText from "../type/NormalText.vue";
import SelectImage from "../type/SelectImage.vue";
import Giphy from "../type/Giphy.vue";

export default {
  props: ['id', 'propsindex'],
  data() {
    return {
      componentType: '',
    }
  },
  components: {
    SelectText,
    TextInput,
    NormalText,
    SelectImage,
    Giphy,
  },
  computed: {
    // getComponentType() {
    //   for(var chatItem of this.$store.state.chatItems) {
    //     if(chatItem.id == this.id) {
    //       this.componentType = chatItem.type;
    //       return this.componentType;
    //     }
    //   }
    // }
  },
  created() {
    this.$store.dispatch('PASS_PROPS_INDEX', this.propsindex);
    for(var chatItem of this.$store.state.chatItems) {
      if(chatItem.id == this.id) {
        this.componentType = chatItem.type;
      }
    }
  }
}
</script>

<style>

</style>