import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import '@/mock/mockServe'
//三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import {MessageBox} from 'element-ui'
import '@/plugins/validate'
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus = this
  }
}).$mount('#app')
