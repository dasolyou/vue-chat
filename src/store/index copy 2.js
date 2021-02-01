import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

// import { fetchGiphy } from "../api/index.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    chatHistory: ['NormalText'],
    nextIdHistory: ['greet-1'],

    currentItemIndex: '',
    currentId: '',
    mutableNextType: '',
    mutableNextId: '',

    delayTime: 500,

    loadingInfo: {
      toggleLoading: false,
      default: 1000,
      noise: '',
      loadingTime: '',
    },

    input: { // text input
      name: '',
      email: '',
    },

    chatItems: [
      { // normal text 
        id: 'greet-1',
        componentType: 'NormalText',
        fromWho: 'bot',
        nextEvent: 'autoPlay', 
        nextLoading: false,
        nextInfo: {
          nextType: 'Giphy',
          nextId: 'gif-welcome',
        },
        contents: {
          text: 'Nice to see you!'
        }
      },
      { // Giphy
        id: 'gif-welcome',
        componentType: 'Giphy',
        fromWho: 'bot',
        // hasGif: 'gif-welcome',
        nextEvent: 'autoPlay', 
        nextLoading: false,
        nextInfo: {
          nextType: 'NormalText',
          nextId: 'greet-2',
        },
        contents: {
          query: 'nice+to+see+you',
          responseData: '',
        }
      },
      { // normal text
        id: 'greet-2',
        componentType: 'NormalText',
        fromWho: 'bot', 
        // hasGif: 'gif-looking',
        nextEvent: 'autoPlay', 
        nextLoading: true,
        nextInfo: {
          nextType: 'Giphy',
          nextId: 'gif-looking',
        },
        contents: {
          text: 'What are you looking for?'
        }
      },
      { // Giphy
        id: 'gif-looking',
        componentType: 'Giphy',
        fromWho: 'bot',
        // hasGif: 'gif-welcome',
        nextEvent: 'autoPlay', 
        nextLoading: false,
        nextInfo: {
          nextType: 'SelectText',
          nextId: 'select-default',
        },
        contents: {
          query: 'looking+for',
          responseData: '',
        }
      },
      { /////////////////////////////// select text
        id: 'select-default',
        componentType: 'SelectText',
        fromWho: 'user', 
        // hasGif: 'gif-what',
        // nextEvent: 'waitAnswer', 
        nextEvent: 'autoPlay', 
        nextLoading: true,
        nextInfo: {
          nextType: 'Giphy',
          nextId: 'gif-what',
        },
        contents: [
          {
            nextInfo: {
              nextType: 'SelectText',
              nextId: 'project',
            },
            text: 'project?-SelectText',
          },
          {
            nextInfo: {
              nextType: 'SelectImage',
              nextId: 'cost',
            },
            text: 'cost?-SelectImage'
          }, 
          {
            nextInfo: {
              nextType: 'NormalText',
              nextId: 'plzName',
            },
            text: 'email?-NormalText'
          }, 
        ]
      },
      { // Giphy
        id: 'gif-what',
        componentType: 'Giphy',
        fromWho: 'user',
        // hasGif: 'gif-welcome',
        nextEvent: 'waitAnswer', 
        nextLoading: false,
        // nextInfo: {
        //   nextType: 'SelectText',
        //   nextId: 'select-default',
        // },
        contents: {
          query: 'what',
          responseData: '',
        }
      },
      { // select text
        id: 'project',
        componentType: 'SelectText',
        fromWho: 'bot', 
        nextEvent: 'waitAnswer', 
        nextLoading: true,
        contents: [
          {
            nextInfo: {
              nextType: 'SelectImage',
              nextId: 'cost',
            },
            text: 'cost?-SelectImage'
          },
          {
            nextInfo: {
              nextType: 'NormalText',
              nextId: 'plzName',
            },
            text: 'email?-NormalText'
          }, 
        ]
      },
      { // SelectImage
        id: 'cost',
        componentType: 'SelectImage',
        fromWho: 'bot', 
        nextEvent: 'autoPlay', 
        nextLoading: false,
        nextInfo: {
          nextType: 'NormalText',
          nextId: 'clickToLearn',
        },
        contents: [
          {
            path: require('@/assets/logo.png'),
            url: 'https://hhey.studio/projects/quantum-ag',
            text: 'quantum',
          },
          {
            path: require('@/assets/logo.png'),
            url: 'https://hhey.studio/projects/infected',
            text: 'infected',
          }, 
        ]
      },
      { // normal text
        id: 'clickToLearn',
        componentType: 'NormalText',
        fromWho: 'bot', 
        nextEvent: 'autoPlay', 
        nextLoading: false,
        nextInfo: {
          nextType: 'SelectText',
          nextId: 'select-default',
        },
        contents: {
          text: 'Click To Learn'
        }
      },

      /////////////////////// email form
      { // normal text
        id: 'plzName',
        componentType: 'NormalText',
        fromWho: 'bot', 
        nextEvent: 'autoPlay', 
        nextLoading: false,
        nextInfo: {
          nextType: 'TextInput',
          nextId: 'nameInput',
        },
        contents: {
          text: 'Your Name?'
        }
      },
      { // TextInput
        id: 'nameInput',
        componentType: 'TextInput',
        fromWho: 'user', 
        nextEvent: 'waitAnswer', 
        nextLoading: true,
        contents: {
          nextInfo: {
            nextType: 'NormalText',
            nextId: 'plzEmail',
          },
          text: 'name plz',
          inputType: 'name'
        }
      },
      { // normal text
        id: 'plzEmail',
        componentType: 'NormalText',
        fromWho: 'bot', 
        nextEvent: 'autoPlay', 
        nextLoading: false,
        nextInfo: {
          nextType: 'TextInput',
          nextId: 'emailInput',
        },
        contents: {
          text: 'Your Email?'
        }
      },
      { // TextInput
        id: 'emailInput',
        componentType: 'TextInput',
        fromWho: 'user', 
        nextEvent: 'waitAnswer', 
        nextLoading: true,
        contents: {
          nextInfo: {
            nextType: 'NormalText',
            nextId: 'else',
          },
          text: 'email plz',
          inputType: 'email'
        }
      },
      { // normal text
        id: 'else',
        componentType: 'NormalText',
        fromWho: 'bot', 
        nextEvent: 'autoPlay', 
        nextLoading: false,
        nextInfo: {
          nextType: 'SelectText',
          nextId: 'select-default',
        },
        contents: {
          text: 'Anything Else?'
        }
      },



      // { 
      //   id: 'greet-2',
      //   nextId: 'greet-3',
      //   fromWho: 'user', // bot
      //   nextEvent: 'autoPlay', // waitAnswer
      //   contents: {
      //     nextId: '',
      //     text: []
      //   }
      // },
    ],
  },
  getters: {
    currentItem(state) {
      for(var chatItem of state.chatItems) {
        if(state.currentId === chatItem.id) {
          return chatItem;
        }
      }
    },
  },
  actions: {
    PASS_PROPS_INDEX({ commit }, propsIndex) {
      return commit('CHANGE_CURRENT_ITEM_INDEX', propsIndex);
    },

    FETCH_GIPHY(context, query) {
      // console.log("query", query);
      axios.get(`http://api.giphy.com/v1/gifs/search?q=${query}&api_key=9I2w1yetELumjpBXn2nKp4fbKLyIkETU&limit=5`)
      .then(response => {
        context.commit('SET_GIPHY', { responseData: response.data, query: query });
      }).catch(error => console.log(error))
    },
  },
    
  mutations: {
    SET_GIPHY(state, payload) {
      for(var chatItem of state.chatItems) {
        if(state.currentId === chatItem.id) {
          chatItem.contents.responseData = payload.responseData;
        }
      }
    },
    CHANGE_CURRENT_ITEM_INDEX(state, propsIndex) {
      state.currentItemIndex = propsIndex;
      console.log(state.currentItemIndex);
    },
    CHANGE_CURRENT_ID(state) {
      state.currentId = state.nextIdHistory[state.currentItemIndex];
    },


    FIND_NEXT_CHAT_ITEM(state, payload) {
      state.mutableNextType = payload.item.nextInfo.nextType;
      state.mutableNextId = payload.item.nextInfo.nextId;
    },
    CHANGE_HISTORY(state) {
      state.chatHistory.push(state.mutableNextType);
      state.nextIdHistory.push(state.mutableNextId);
    },


    SELECT_TEXT(state, item) {
      var length = state.text.list.length;
      for(var i = 0; i < length; i++) {
        if(state.text.list[i].name == item.name) {
          state.text.selected = state.text.list[i].text;
        }
      }
    },
    SUBMIT_NAME(state, name) {
      state.input.name = name;
    },
    SUBMIT_EMAIL(state, email) {
      state.input.email = email;
    },

    TOGGLE_LOADING(state) {
      state.loadingInfo.toggleLoading = !state.loadingInfo.toggleLoading;
    },
    GET_SHOW_TIME(state) {
      state.loadingInfo.noise = Math.floor(Math.random() * 1000);   
      state.loadingInfo.loadingTime = state.loadingInfo.default + state.loadingInfo.noise;
      console.log(state.loadingInfo.loadingTime);  
    }
  }
})