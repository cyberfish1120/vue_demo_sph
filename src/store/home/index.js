import Vuex from 'vuex'
import {reqCategoryList, reqBannerList, reqFloorList} from '@/api'

const state = {
    categoryList:[],
    bannerList:[],
    floorList:[],
}

const actions = {
    getCategoryList({commit}){
        reqCategoryList().then((res)=>commit('GET_CATEGORY_LIST', res.data))
    },
    getBannerList({commit}){
        reqBannerList().then((res)=>commit('GET_BANNER_LIST', res.data))
    },
    getFloorList({commit}){
        reqFloorList().then((res)=>commit('GET_FLOOR_LIST', res.data))
    }
}

const mutations = {
    GET_CATEGORY_LIST(state, value){
        state.categoryList = value
    },
    GET_BANNER_LIST(state, value){
        state.bannerList = value
    },
    GET_FLOOR_LIST(state, value){
        state.floorList = value
    },
}

const getters = {}

export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}