import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const strict = process.env.NODE_ENV !== 'production'

export const state = () => ({
  navbarTitle: 'Vuex SINPAGAPP',
  users: []
})

export const getters = {
  changeTitle: (state, payload) => (state.navbarTitle = payload),
  setUsers: (state, payload) => (state.users = payload)
}

export const mutations = {
  changeTitle: (state, payload) => (state.navbarTitle = payload),
  setUsers: (state, payload) => (state.users = payload)
}

export const actions = {
  loadUsers({ commit }) {
    axios
      .get('http://localhost:3004/users')
      .then(response => commit('setUsers', response.data))
      .catch(error => console.error(error))
  }
}
