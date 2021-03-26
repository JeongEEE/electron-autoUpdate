import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    packageJson: JSON.parse(unescape(process.env.PACKAGE_JSON || null))
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
