import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
Vue.use(VueRouter)



const originPush = VueRouter.prototype.push

VueRouter.prototype.push = function(location, resolve, reject){
    if(resolve&&reject){
        originPush.call(this, location, resolve, reject)
    }else{
        originPush.call(this,location, ()=>{}, ()=>{})
    }
}

const router = new VueRouter({
   routes,
   scrollBehavior(){
    return {x:0, y:0}
   }
})

router.beforeEach(async (to, from, next)=>{
    if(store.state.user.token){
        if(to.name==='login') next('/home')
        else{
            if(store.state.user.userInfo.name) next()
            else{
                try{
                    await store.dispatch('user/getUserInfo')
                    next()
                }catch(err){
                    // alert(err)
                    await store.dispatch('user/userLogout')
                    next('/login')
                }
            }
        }
    }else{
        if(to.path.includes('/trade') || to.path.includes('/pay') || to.path.includes('/center'))
            next(`/login?redirect=${to.path}`)
        next()
    }
})

export default router