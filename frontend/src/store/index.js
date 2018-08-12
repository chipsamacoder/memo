import Vuex from 'vuex'
import cookieparser from 'cookieparser'
import jwtDecode from 'jwt-decode'

const createStore = () => {
  return new Vuex.Store({
    state: {
      username: ''
    },
    mutations: {
      SET_USERNAME (state, username) {
        state.username = username
      } 
    },
    actions: {
      async nuxtServerInit ({ commit, state }, { req }) {
        if (req.headers.cookie) {
          const parsed = cookieparser.parse(req.headers.cookie)
          if (parsed.token) {
            const token = parsed.token
            const username = jwtDecode(token).user.username
            commit('SET_USERNAME', username)
          }
        }
      }
    }
  })
}

export default createStore