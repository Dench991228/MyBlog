import Vue from 'vue'
import Router from 'vue-router'
import testPage from '@/views/testPage.vue'
import home from '@/views/home.vue'

Vue.use(Router)

export default new Router({
    routes:[
        {
            path:'/',
            redirect:"/test"
        },
        {
            path:'/test',
            name:'Test',
            component:testPage
        },
        {
            path:'/home',
            component:home
        }
    ]
})