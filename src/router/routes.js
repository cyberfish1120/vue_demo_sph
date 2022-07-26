export default [
    {
        path: '*',
        redirect: '/home'
    },
    {
        path: '/center',
        redirect: '/center/myorder'
    },
    {
        name:'home',
        path: '/home',
        component: ()=>import('@/pages/Home'),
        meta: {
            showFooter: true
        }
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: ()=>import('@/pages/Search'),
        meta: {
            showFooter: true
        }
    },
    {
        path: '/register',
        component: ()=>import('@/pages/Register')
    },
    {
        name:'login',
        path: '/login',
        component: ()=>import('@/pages/Login')
    },
    {
        name: 'detail',
        path: '/detail/:skuid',
        component: ()=>import('@/pages/Detail'),
        meta: {
            showFooter: true
        }
    },
    {
        name:'addcartsuccess',
        path:'/addcartsuccess/:skuNum',
        component: ()=>import('@/pages/AddCartSuccess'),
        meta: {
            showFooter: true
        }
    },
    {
        name:'shopcart',
        path:'/shopcart',
        component: ()=>import('@/pages/ShopCart'),
        meta: {
            showFooter: true
        }
    },
    {
        name:'trade',
        path:'/trade',
        component: ()=>import('@/pages/Trade'),
        meta: {
            showFooter: true
        },
        beforeEnter: (to, from, next) => {
            if(from.path=='/shopcart') next()
            else next(false)
        }
    },
    {
        name:'pay',
        path:'/pay',
        component: ()=>import('@/pages/Pay'),
        meta: {
            showFooter: true
        },
        beforeEnter: (to, from, next) => {
            if(from.path=='/trade') next()
            else next(false)
        }
    },
    {
        name:'paysuccess',
        path:'/paysuccess',
        component: ()=>import('@/pages/PaySuccess'),
        meta: {
            showFooter: true
        },
        beforeEnter: (to, from, next) => {
            if(from.path=='/pay') next()
            else next(false)
        }
    },
    {
        name:'center',
        path:'/center',
        component: ()=>import('@/pages/Center'),
        meta: {
            showFooter: true
        },
        children:[
            {
                name:'myorder',
                path:'myorder',
                component: ()=>import('@/pages/Center/MyOrder'),
                meta: {
                    showFooter: true
                }
            },
            {
                name:'grouporder',
                path:'grouporder',
                component: ()=>import('@/pages/Center/GroupOrder'),
                meta: {
                    showFooter: true
                }
            },
        ]
    },
]