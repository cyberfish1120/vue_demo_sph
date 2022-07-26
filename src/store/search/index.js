import Vuex from 'vuex'
import {reqGetSearchInfo} from '@/api'

const state = {
    data:{},
}

const actions = {
    async getSearchList({commit}, params={}){
        let result = await reqGetSearchInfo(params)
        if(result.code===200) commit('GET_SEARCH_INFO', result.data)
    }
}

const mutations = {
    GET_SEARCH_INFO(state, data){
        state.data = data
    },
}

const getters = {
    goodsList(){
        return state.data.goodsList || []
    },
    trademarkList(){
        return state.data.trademarkList || []
    },
    attrsList(){
        return state.data.attrsList || []
    },
}

export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}