import Vuex from 'vuex'

import { codeStore } from './code.store'

export const store = Vuex.createStore({
    strict: true,
    modules: {
      codeStore
    },
  })