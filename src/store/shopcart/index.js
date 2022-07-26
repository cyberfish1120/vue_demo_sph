import { reqCartList, reqIsChecked, reqDeleteCart } from "@/api"
const state = {
    cartList:[]
}
const actions = {
    async getCartList({commit}){
        let res = await reqCartList()
        if(res.code===200) commit('GET_CART_LIST', res.data)
    },
    async getIsChecked({}, {skuId, isChecked}){
        let res = await reqIsChecked(skuId, isChecked)
        if(res.code===200) return 'ok'
        return Promise.reject(new Error(`faile:${res.code}`))
    },
    async getDeleteCart({}, skuId){
        let res = await reqDeleteCart(skuId)
        if(res.code===200) return 'ok'
        return Promise.reject(new Error(`faile:${res.code}`))
    }
}
const mutations = {
    GET_CART_LIST(state, data){
        if(data[0])
            state.cartList = data[0].cartInfoList || []
        else
            state.cartList = []
    }
}
const getters = {
    
}

export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}