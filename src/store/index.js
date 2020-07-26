import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'

const base = {
  state: {
    type: 'SC'
  },
  mutations: {
    setType: (state, type) => {
      state.type = type
    }
  },
  actions: {
    CreateType ({ commit }, type) {
      commit('setType', type)
    }
  }
}

const params = {
  state: {
    param: {type: '', query: [{key: '', value: ''}]}
  },
  mutations: {
    setParam: (state, param) => {
      state.param = param
    }
  },
  actions: {
    CreateParam ({ commit }, param) {
      commit('setParam', param)
    }
  }
}

Vue.use(Vuex)

export default new Vuex.Store({
  getters: {
    type: state => state.base.type,
    param: state => state.params.param,
  },
  modules: {
    user,
    app,
    base,
    params
  }
})
