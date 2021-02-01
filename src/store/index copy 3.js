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
      totalTime: '',
    },

    input: { // text input
      name: '',
      email: '',
    },

    chatItems: [
      { 
        id: 'greet-1',
        type: 'NormalText',
        fromWho: 'bot',
        loading: false,
        nextEvent: 'autoPlay', 
        nextId: 'gif-welcome',
        contents: {
          text: 'Nice to see you!'
        }
      },
      { 
        id: 'gif-welcome',
        type: 'Giphy',
        fromWho: 'bot',
        loading: true,
        loadingTime: 3000,
        nextEvent: 'autoPlay', 
        nextId: 'greet-2',
        contents: {
          query: 'nice+to+see+you',
          responseData: '',
        }
      },
      {
        id: 'greet-2',
        type: 'NormalText',
        fromWho: 'bot', 
        loading: true,
        nextEvent: 'autoPlay', 
        nextId: 'gif-looking',
        contents: {
          text: 'What are you looking for?'
        }
      },
      { 
        id: 'gif-looking',
        type: 'Giphy',
        fromWho: 'bot',
        loading: false,
        nextEvent: 'autoPlay', 
        nextId: 'select-default',
        contents: {
          query: 'looking+for',
          responseData: '',
        }
      },
      { 
        id: 'select-default',
        type: 'SelectText',
        fromWho: 'user', 
        loading: true,
        nextEvent: 'autoPlay', 
        nextId: 'gif-what',
        contents: [
          {
            nextId: 'project',
            text: 'project?-SelectText',
          },
          {
            nextId: 'cost',
            text: 'cost?-SelectImage'
          }, 
          {
            nextId: 'plzName',
            text: 'email?-NormalText'
          }, 
        ]
      },
      { 
        id: 'gif-what',
        type: 'Giphy',
        fromWho: 'user',
        loading: false,
        nextEvent: 'waitAnswer', 
        contents: {
          query: 'what',
          responseData: '',
        }
      },
      { 
        id: 'project',
        type: 'SelectText',
        fromWho: 'bot', 
        loading: true,
        nextEvent: 'waitAnswer', 
        contents: [
          {
            nextId: 'cost',
            text: 'cost?-SelectImage'
          },
          {
            nextId: 'plzName',
            text: 'email?-NormalText'
          }, 
        ]
      },
      { 
        id: 'cost',
        type: 'SelectImage',
        fromWho: 'bot', 
        loading: false,
        nextEvent: 'autoPlay', 
        nextId: 'clickToLearn',
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
      { 
        id: 'clickToLearn',
        type: 'NormalText',
        fromWho: 'bot', 
        loading: false,
        nextEvent: 'autoPlay', 
        nextId: 'select-default',
        contents: {
          text: 'Click To Learn'
        }
      },

      /////////////////////// email form
      { 
        id: 'plzName',
        type: 'NormalText',
        fromWho: 'bot', 
        loading: false,
        nextEvent: 'autoPlay', 
        nextId: 'nameInput',
        contents: {
          text: 'Your Name?'
        }
      },
      { 
        id: 'nameInput',
        type: 'TextInput',
        fromWho: 'user', 
        loading: false,
        nextEvent: 'waitAnswer', 
        contents: {
          nextId: 'plzEmail',
          text: 'name plz',
          inputType: 'name'
        }
      },
      { 
        id: 'plzEmail',
        type: 'NormalText',
        fromWho: 'bot', 
        loading: true,
        nextEvent: 'autoPlay', 
        nextId: 'emailInput',
        contents: {
          text: 'Your Email?'
        }
      },
      { 
        id: 'emailInput',
        type: 'TextInput',
        fromWho: 'user', 
        loading: false,
        nextEvent: 'waitAnswer', 
        contents: {
          nextId: 'else',
          text: 'email plz',
          inputType: 'email'
        }
      },
      { 
        id: 'else',
        type: 'NormalText',
        fromWho: 'bot', 
        loading: false,
        nextEvent: 'autoPlay', 
        nextId: 'select-default',
        contents: {
          text: 'Anything Else?'
        }
      },
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

    EXECUTE_NEXT_EVENT({ commit, state }, item) {
      state.mutableNextId = item.nextId;
      for(var chatItem of state.chatItems) {
        if(chatItem.id == item.nextId) {
          state.mutableNextType = chatItem.type;
          console.log(chatItem);
          if(chatItem.loading) {
            commit('TOGGLE_LOADING');
            var time 
            if(chatItem.loadingTime) {
              time = chatItem.loadingTime;
            } else {
              commit('GET_SHOW_TIME');
              time = state.loadingInfo.totalTime;
            }
            console.log("time", time);
            setTimeout(function() {
              commit('CHANGE_HISTORY');
              return commit('TOGGLE_LOADING');
            }, time);
          } else {
            setTimeout(function() {        
              commit('CHANGE_HISTORY');
            }, state.delayTime);
          }
        }
      }
    },

    FETCH_GIPHY(context, query) {
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
      console.log("index",state.currentItemIndex);
    },
    CHANGE_CURRENT_ID(state) {
      state.currentId = state.nextIdHistory[state.currentItemIndex];
    },


    // FIND_NEXT_CHAT_ITEM(state, item) { // 1
    //   // state.mutableNextType = item.nextInfo.nextType;
    //   // state.mutableNextId = item.nextInfo.nextId;

    //   state.mutableNextId = item.nextId;
    //   for(var chatItem of state.chatItems) {
    //     if(chatItem.id == item.nextId) {
    //       state.mutableNextType = chatItem.type;
    //       // return chatItem;
    //     }
    //   }
    // },
    CHANGE_HISTORY(state) {
      state.chatHistory.push(state.mutableNextType);
      state.nextIdHistory.push(state.mutableNextId);
    },
    
    // CHANGE_HISTORY(state, delayTime) {
    //   console.log("delayTime", delayTime);
    //   setTimeout(function() {
    //     state.chatHistory.push(state.mutableNextType);
    //     state.nextIdHistory.push(state.mutableNextId);
    //   }, delayTime);
    // },

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

    /////////////////////////////////
    TOGGLE_LOADING(state) {
      state.loadingInfo.toggleLoading = !state.loadingInfo.toggleLoading;
    },
    GET_SHOW_TIME(state) {
      state.loadingInfo.noise = Math.floor(Math.random() * 1000);   
      state.loadingInfo.totalTime = state.loadingInfo.default + state.loadingInfo.noise;
      console.log(state.loadingInfo.totalTime);  
    },

    // ///////////////////////
    // SHOW_LOADING(state) {
    //   // state.loadingInfo.toggleLoading = !state.loadingInfo.toggleLoading;
    //   state.loadingInfo.toggleLoading = true;
    //   state.loadingInfo.noise = Math.floor(Math.random() * 5000);   
    //   state.loadingInfo.totalTime = state.loadingInfo.default + state.loadingInfo.noise;
    //   console.log("totalTime", state.loadingInfo.totalTime);

    //   setTimeout(function() {
    //     console.log('test');
    //     // store.commit('CHANGE_HISTORY');
    //     // CHANGE_HISTORY
    //     return state.loadingInfo.toggleLoading = false;
    //   }, state.loadingInfo.totalTime);
    // },
    // /////////////////////////////
  }
})