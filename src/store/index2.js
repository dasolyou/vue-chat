import Vue from "vue";
import Vuex from "vuex";
// import { validateEmail } from "../utils/validation.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    chatHistory: [
      {
        parentType: 'SelectText', 
        childType: 'text'
      }
    ],
    greetings: ['Nice to see you!', 'And welcome back!', 'What are you looking for?'],
    welcome: { // select text
      type: 'text',
      selected: null,
      list: [
        {
          name: 'project',
          type: 'url',
          text: 'Any cool projects?',
          // answer: 'cool projects cool projects cool projects'
        },
        {
          name: 'new',
          type: 'content',
          text: 'Whats new?',
          // answer: 'Whats new Whats new Whats new'
        },
        {
          name: 'know',
          type: 'select',
          text: 'I dont know!',
          // answer: 'I dont know I dont know I dont know'
        },
        {
          name: 'alright',
          type: 'text',
          text: 'alright',
        }
      ]
    },
    project: { // select text
      type: 'url',
      list: [
        {
          name: 'quantum',
          url: 'https://hhey.studio/projects/quantum-ag',
          text: 'quantum quantum quantum',
        },
        {
          name: 'herold',
          url: 'https://hhey.studio/projects/herold-carrent',
          text: 'herold herold herold',
        },
        {
          name: 'infected',
          url: 'https://hhey.studio/projects/infected',
          text: 'infected infected infected',
        },
      ]
    },
    newCont: { // select text
      type: 'content',
      selected: null,
      list: [
        {
          name: 'project',
          question: 'Any cool projects?',
          answer: 'cool projects cool projects cool projects'
        },
        {
          name: 'new',
          question: 'Whats new?',
          answer: 'Whats new Whats new Whats new'
        },
        {
          name: 'know',
          question: 'I dont know!',
          answer: 'I dont know I dont know I dont know'
        }
      ]
    },

    text: {
      list: [
        {
          name: 'alright',
          text: ['How can we help you?', 'ok bye~']
        },
        {
          name: 'ok',
          text: ['ok bye~', 'How can we help you?']
        },
      ],
      selected: null,
    },

    know: { // select image
      list: [
        {
          name: 'quantum',
          path: require('@/assets/logo.png'),
          url: 'https://hhey.studio/projects/quantum-ag',
          text: 'quantum quantum quantum',
        },
        {
          name: 'herold',
          path: require('@/assets/logo.png'),
          url: 'https://hhey.studio/projects/herold-carrent',
          text: 'herold herold herold',
        },
        {
          name: 'infected',
          path: require('@/assets/logo.png'),
          url: 'https://hhey.studio/projects/infected',
          text: 'infected infected infected',
        },
      ]
    },

    input: { // text input
      name: '',
      email: '',
    },
    // loadingDelay: {
    //   default: 2000,
    //   noise: 2000,
    // }
  },
  getters: {
    selectedText(state) {
      return state.text.selected;
    },
    // validateEmailForm() {
    //   return validateEmail(this.$store.state.input.email);
    // }
  },
  mutations: {
    SUBMIT_NAME(state, name) {
      state.input.name = name;
    },
    SUBMIT_EMAIL(state, email) {
      state.input.email = email;
    },
    SELECT_TEXT(state, item) {
      var length = state.text.list.length;
      for(var i = 0; i < length; i++) {
        if(state.text.list[i].name == item.name) {
          state.text.selected = state.text.list[i].text;
        }
      }
    }
  }
})