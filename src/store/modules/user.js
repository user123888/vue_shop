import { getInfo, setInfo } from '@/utils/storage'
export default {
  namespaced: true,
  state () {
    return {

      userInfo: getInfo()
    }
  },
  mutations: {
    // 所有的第一个参数都是 state
    setUserInfo (state, obj) {
      state.userInfo = obj
      setInfo(obj)
    }
  },
  actions: {},
  getters: {
    userName (state) {
      return state.userInfo[0].name
    }
  }

}
