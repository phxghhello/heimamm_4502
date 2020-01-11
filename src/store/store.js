import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        userInfo:undefined
    },
    // mutations:{
    //     SETINFO(state,info){
    //         state.userInfo = info;
    //     }
    // }
})

export default store