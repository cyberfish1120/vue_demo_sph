import Vue from 'vue'
import vuex from 'vuex'
import { reqGoodsDetail, reqUpdateShopCart } from '@/api'
import {getUuid} from '@/utils/uuid_token'

const state = {
    data:{},
    uuid_token: getUuid(),
}
const actions = {
    async getGoodsDetail({commit}, skuid){
        let res = await reqGoodsDetail(skuid)
        if(res.code===200) commit('GET_GOODS_DETAIL', res.data)
    },
    async getShopcarInfo({commit}, {skuId, skuNum}){
        let res = await reqUpdateShopCart(skuId, skuNum)
        if(res.code===200) return 'ok'
        return Promise.reject(new Error('faile'))
    }
}
const mutations = {
    GET_GOODS_DETAIL(state, data){
        state.data = data
    },
    // UPDATE_SHOP_CART(state, data){
    //     state.shopcarDate = data
    // }
}
const getters = {
    categoryView:state=>state.data.categoryView||{},
    skuInfo:state=>state.data.skuInfo||{}
}

export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}