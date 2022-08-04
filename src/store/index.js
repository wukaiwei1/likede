import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import createVuexPersistedstate from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
  },
  getters,
  plugins: [
    createVuexPersistedstate({
      reducer(state) {
        return {
          user: {
            userInfo: state.user.userInfo,
          },
        }
      },
    }),
  ],
})

export default store
