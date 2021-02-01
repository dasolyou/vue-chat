import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    chatHistory: [],

    delayTime: 500,

    loadingInfo: {
      toggleLoading: false,
      default: 1000,
      noise: 0,
      totalTime: 0,
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
        loadingTime: 1000,
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
    getChatItem(state) {
      let arr = [];
      state.chatHistory.forEach(id => {
        arr.push(state.chatItems.filter(item => item.id == id)[0]);
      });
      return arr;
    },
  },
  actions: {
    EXECUTE_NEXT_EVENT({ commit, state }, id) {
      for(var chatItem of state.chatItems) {
        if(chatItem.id == id) {
          var currentChatItem = chatItem;

          if(currentChatItem.loading){
            commit('ACTIVE_LOADING', currentChatItem);
          }
          setTimeout(() => {
            commit('CHANGE_HISTORY', currentChatItem.id);
          }, currentChatItem.loading ? state.loadingInfo.totalTime : state.delayTime );
        }
      }
    },
    FETCH_GIPHY(context, item) {
      axios.get(`http://api.giphy.com/v1/gifs/search?q=${item.contents.query}&api_key=9I2w1yetELumjpBXn2nKp4fbKLyIkETU&limit=5`)
      .then(response => {
        context.commit('SET_GIPHY', {responseData: response.data, item: item});
      }).catch(error => console.log(error))
    },
  },
    
  mutations: {
    INIT_CHAT(state) {
      state.chatHistory.push(state.chatItems[0].id);
    },
    SET_GIPHY(state, payload) {
      for(var chatItem of state.chatItems) {
        if(payload.item.id === chatItem.id) {
          var randomIndex = Math.floor(Math.random() * 5);
          chatItem.contents.responseData = payload.responseData.data[randomIndex];
        }
      }
    },
    CHANGE_HISTORY(state, id) {
      state.loadingInfo.toggleLoading = false;
      state.chatHistory.push(id);
    },

    SUBMIT_NAME(state, name) {
      state.input.name = name;
    },
    SUBMIT_EMAIL(state, email) {
      state.input.email = email;
    },
    ACTIVE_LOADING(state, chatItem) {
      state.loadingInfo.toggleLoading = !state.loadingInfo.toggleLoading;
      state.loadingInfo.noise = Math.floor(Math.random() * 1000);   
      var randomTime = state.loadingInfo.default + state.loadingInfo.noise;

      state.loadingInfo.totalTime = chatItem.loadingTime ? chatItem.loadingTime : randomTime;
      console.log(state.loadingInfo.totalTime);  
    },
  }
})