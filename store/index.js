import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = () =>
  new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
      navbarTitle: 'Vuex SINPAGAPP',
      users: []
    },
    getters: {
      titleCount: state => state.navbarTitle.length
    },
    mutations: {
      changeTitle: (state, payload) => (state.navbarTitle = payload),
      setUsers: (state, payload) => (state.users = payload)
    },
    actions: {
      loadUsers({ commit }) {
        axios
          .get('http://localhost:3004/users')
          .then(response => commit('setUsers', response.data))
          .catch(error => console.error(error))
      }
    }
  })

export default store
