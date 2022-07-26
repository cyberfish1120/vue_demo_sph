import { reqUserAddressList, reqOrderInfo, reqSubmitOrder, reqPayInfo, reqQueryPayStatus } from "@/api";

const state = {
    userAddressList:[],
    orderInfo:{},
    orderId:undefined,
    payInfo:{}
}
const actions = {
    async getUserAddressList({commit}){
        let res = await reqUserAddressList()
        if(res.code===200){
            commit('GET_USER_ADDRESS_LIST', res.data)
            return 'ok'
        }
        return Promise.reject(res.message)
    },
    async getOrderInfo({commit}){
        let res = await reqOrderInfo()
        if(res.code===200){
            commit('GET_ORDER_INFO', res.data)
            return 'ok'
        }
        return Promise.reject(res.message)
    },
    async submit({commit}, {tradeNo, data}){
        let res = await reqSubmitOrder(tradeNo, data)
        if(res.code===200){
            commit('SUBMIT', res.data)
            return 'ok'
        }
        return Promise.reject(res.message)
    },
    async getPayInfo({commit}, orderId){
        let res = await reqPayInfo(orderId)
        if(res.code===200){
            commit('GET_PAY_INFO', res.data)
            return 'ok'
        }
        return Promise.reject(res.message)
    },
    async getPayStatus(_, orderId){
        let res = await reqQueryPayStatus(orderId)
        if(res.code===200){
            return res.message
        }
        return Promise.reject(res.message)
    }
}
const mutations = {
    GET_USER_ADDRESS_LIST(state, userAddressList){
        state.userAddressList = userAddressList
    },
    GET_ORDER_INFO(state, orderInfo){
        state.orderInfo = orderInfo
    },
    SUBMIT(state, orderId){
        state.orderId = orderId
    },
    GET_PAY_INFO(state, payInfo){
        state.payInfo = payInfo
    }
}
const getters = {}

export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}