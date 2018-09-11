import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                {
                    path: '/usertable',
                    component: resolve => require(['../components/page/UserTable.vue'], resolve)
                },
                {
                    path: '/admuser',
                    component: resolve => require(['../components/page/AdmUser.vue'], resolve)
                },
                {
                    path: '/admadd',
                    component: resolve => require(['../components/page/AdmAdd.vue'], resolve)
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
