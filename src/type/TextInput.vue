<template>
  <div :class="[item.fromWho === 'bot'? left: right]">
    <template v-if="item.contents.inputType === 'name'">
      <input type="text" v-model="name" @keyup.enter="submitName">
      <button @click="submitName">enter</button>
      <button @click="resetName">back</button>
    </template>

    <template v-if="item.contents.inputType === 'email'">
      <input type="email" v-model="email" @keyup.enter="submitEmail">
      <button :disabled="!isEmailValid" @click="submitEmail">enter</button>
    </template>

  </div>
</template>

<script>
/*eslint-disable*/ 
import { mapGetters } from 'vuex';
import { validateEmail } from '../utils/validation.js';

export default {
  props: ['item'],
  data() {
    return {
      left: 'left',
      right: 'right',

      name: this.$store.state.input.name,
      email: this.$store.state.input.email,
    }
  },
  
  computed: {
    isEmailValid() {
      return validateEmail(this.email);
    }
  },
  methods: {
    submitName() {
      this.$store.commit('SUBMIT_NAME', this.name);
      this.$store.dispatch('EXECUTE_NEXT_EVENT', this.item.contents.nextId);
      console.log(this.$store.state.input.name);
    },
    submitEmail() {
      if(this.isEmailValid) {
        this.$store.commit('SUBMIT_EMAIL', this.email);
        this.$store.dispatch('EXECUTE_NEXT_EVENT', this.item.contents.nextId);
        console.log(this.$store.state.input.email);
      }
    },
    resetName() {
      this.name = '';
      this.$store.state.input.name = '';
    },
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