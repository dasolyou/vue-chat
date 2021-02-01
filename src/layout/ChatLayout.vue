<template>
  <div> 
    <div v-for="(item, index) in getChatItem" :key="index" :propsindex="index">
      <select-text v-if="item.type === 'SelectText'" :item="item"></select-text>
      <normal-text v-else-if="item.type === 'NormalText'" :item="item"></normal-text>
      <text-input v-else-if="item.type === 'TextInput'" :item="item"></text-input>
      <select-image v-else-if="item.type === 'SelectImage'" :item="item"></select-image>
      <giphy v-else-if="item.type === 'Giphy'" :item="item"></giphy>
    </div>
    <chat-loading></chat-loading>
  </div>
</template>

<script>
import ChatLoading from "./ChatLoading.vue";
import SelectText from "../type/SelectText.vue";
import TextInput from "../type/TextInput.vue";
import NormalText from "../type/NormalText.vue";
import SelectImage from "../type/SelectImage.vue";
import Giphy from "../type/Giphy.vue";
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getChatItem']),
  },
  components: {
    ChatLoading,
    SelectText,
    TextInput,
    NormalText,
    SelectImage,
    Giphy,
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
</style>