import { reqCode, reqRegister, reqLogin, reqUserInfo, reqLogout, reqMyOrderList } from "@/api";

const state = {
    code:'',
    token:localStorage.getItem('TOKEN'),
    userInfo:{},
    myOrderList:[]
}
const actions = {
    async getCode({commit}, phone){
        let res = await reqCode(phone)
        if(res.code===200) commit('GET_CODE', res.data)
    },
    async userRegister({}, {phone, password, code}){
        let res = await reqRegister({phone, password, code})
        if(res.code===200){
             return 'ok'
        }
        return Promise.reject(res.message)
    },
    async userLogin({commit}, {phone, password}){
        let res = await reqLogin({phone, password})
        if(res.code===200){
            localStorage.setItem('TOKEN', res.data.token)
            commit('USER_LOGIN', res.data.token)
            return 'ok'
        }
        return Promise.reject(res.message)
    },
    async getUserInfo({commit}){
        let res = await reqUserInfo()
        if(res.code===200){
            commit('GET_USER_INFO', res.data)
            return 'ok'
        }
        return Promise.reject(res.message)
    },
    async userLogout({commit}){
        localStorage.removeItem('TOKEN')
        let res = await reqLogout()
        if(res.code===200){
            commit('USER_LOGOUT')
            return 'ok'
        }
        return Promise.reject(res.message)
    },
    async getMyOrderList({commit}, {page, limit}){
        let res = await reqMyOrderList(page, limit)
        if(res.code===200){
            commit('GET_MY_ORDER_LIST', res.data)
            return 'ok'
        }
        return Promise.reject(res.message)
    },
}
const mutations = {
    GET_CODE(state, code){
        state.code = code
    },
    USER_LOGIN(state, token){
        state.token = token
    },
    GET_USER_INFO(state, userInfo){
        state.userInfo = userInfo || {}
    },
    USER_LOGOUT(state){
        state.token = ''
        state.userInfo = {}
    },
    GET_MY_ORDER_LIST(state, myOrderList){
        state.myOrderList = myOrderList
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